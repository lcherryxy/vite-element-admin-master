<template>
  <div class="crud-table" :class="{ 'is-compact': compact }">
    <div v-if="title" class="crud-title">{{ title }}</div>

    <div v-if="searchKeys.length || statusFilter" class="filter-container">
      <el-input
        v-if="searchKeys.length"
        v-model="keyword"
        class="filter-item keyword-input"
        placeholder="搜索关键字"
        clearable
        :prefix-icon="Search"
        @keyup.enter="handleSearch"
      />
      <el-select
        v-if="statusFilter"
        v-model="statusValue"
        class="filter-item status-select"
        placeholder="全部"
        clearable
        @change="handleSearch"
        @clear="statusValue = ''"
      >
        <el-option
          v-for="item in statusFilter.options || []"
          :key="String(item.value)"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button class="filter-item" type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
      <el-button class="filter-item" :icon="Refresh" @click="handleReset">重置</el-button>
    </div>

    <div v-if="showToolbar" class="table-toolbar">
      <div class="toolbar-left">
        <el-button type="primary" :icon="Plus" :size="compact ? 'small' : 'default'" @click="openCreate">新增</el-button>
        <el-button
          type="danger"
          :icon="Delete"
          :size="compact ? 'small' : 'default'"
          :disabled="!selectedRows.length"
          @click="handleBatchDelete"
        >
          批量删除
        </el-button>
      </div>
      <div class="toolbar-right">
        <span class="total-text">共 {{ filteredRows.length }} 条</span>
        <el-popover
          v-if="showColumnSetting"
          v-model:visible="columnPopoverVisible"
          placement="bottom-end"
          :width="220"
          trigger="click"
        >
          <template #reference>
            <el-button :icon="Setting" size="small">列设置</el-button>
          </template>
          <div class="column-setting">
            <div class="column-title">显示列</div>
            <el-checkbox-group v-model="columnDraft" class="column-group">
              <el-checkbox v-for="item in columnOptions" :key="item.key" :value="item.key">
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
            <div class="column-actions">
              <el-button size="small" @click="handleResetColumns">重置</el-button>
              <el-button size="small" type="primary" @click="handleApplyColumns">确认</el-button>
            </div>
          </div>
        </el-popover>
      </div>
    </div>

    <el-table
      :key="tableKey"
      ref="tableRef"
      v-loading="loading"
      :data="pagedRows"
      row-key="id"
      border
      highlight-current-row
      class="table-main"
      :size="compact ? 'small' : 'default'"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" min-width="45" align="center" />
      <el-table-column
        v-for="col in visibleColumns"
        :key="col.prop"
        :label="col.label"
        :min-width="col.minWidth || 100"
        :align="col.align || 'left'"
      >
        <template #default="{ row }">
          <el-image
            v-if="col.type === 'image'"
            class="preview-image"
            :class="{ 'is-compact': compact }"
            :src="row[col.prop]"
            :preview-src-list="row[col.prop] ? [row[col.prop]] : []"
            :z-index="3000"
            fit="cover"
            loading="lazy"
          />
          <template v-else-if="col.type === 'star'">
            <el-icon v-for="n in starCount(row[col.prop])" :key="n" class="star-icon">
              <Star />
            </el-icon>
          </template>
          <el-switch
            v-else-if="col.type === 'switch'"
            v-model="row[col.prop]"
            :size="compact ? 'small' : 'default'"
            @change="notifyChange"
          />
          <el-tag v-else-if="col.type === 'tag'" :type="tagType(col, row[col.prop])">
            {{ optionLabel(col, row[col.prop]) }}
          </el-tag>
          <span v-else-if="col.type === 'date'">{{ formatDate(row[col.prop]) }}</span>
          <template v-else-if="col.editable">
            <el-input
              v-if="isEditing(row, col)"
              v-model="editingValue"
              class="inline-input"
              size="small"
              :type="isNumberCell(row, col) ? 'number' : 'text'"
              @keyup.enter="saveInlineEdit(true)"
              @keyup.esc="cancelInlineEdit"
              @blur="saveInlineEdit(true)"
            />
            <span v-else class="editable-cell" title="双击编辑" @dblclick="startInlineEdit(row, col)">
              {{ row[col.prop] ?? '' }}
            </span>
          </template>
          <span v-else>{{ row[col.prop] ?? '' }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="showActions" label="操作" :min-width="compact ? 110 : 150" align="center">
        <template #default="{ row }">
          <el-button type="primary" link size="small" @click="openEdit(row)">编辑</el-button>
          <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column v-if="draggable" label="拖拽" min-width="50" align="center">
        <template #default>
          <el-icon class="drag-handle"><Rank /></el-icon>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据" :image-size="compact ? 48 : 80" />
      </template>
    </el-table>

    <div class="pagination-wrapper">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="filteredRows.length"
        :layout="compact ? 'prev, pager, next' : 'total, prev, pager, next, jumper'"
        :small="compact"
        background
      />
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="dialogMode === 'create' ? '新增' : '编辑'"
      width="520px"
      destroy-on-close
    >
      <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="88px">
        <el-form-item v-for="field in formFields" :key="field.prop" :label="field.label" :prop="field.prop">
          <el-input
            v-if="!field.type || field.type === 'input'"
            v-model="formModel[field.prop]"
            :placeholder="`请输入${field.label}`"
            clearable
          />
          <el-input
            v-else-if="field.type === 'textarea'"
            v-model="formModel[field.prop]"
            type="textarea"
            :rows="3"
            :placeholder="`请输入${field.label}`"
          />
          <el-select
            v-else-if="field.type === 'select'"
            v-model="formModel[field.prop]"
            class="full-width"
            :placeholder="`请选择${field.label}`"
          >
            <el-option
              v-for="item in field.options || []"
              :key="String(item.value)"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-input-number
            v-else-if="field.type === 'number'"
            v-model="formModel[field.prop]"
            :min="field.min"
            :max="field.max"
          />
          <el-date-picker
            v-else-if="field.type === 'date'"
            v-model="formModel[field.prop]"
            class="full-width"
            type="datetime"
            :placeholder="`请选择${field.label}`"
          />
          <el-switch v-else-if="field.type === 'switch'" v-model="formModel[field.prop]" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Delete, Search, Refresh, Setting, Star, Rank } from '@element-plus/icons-vue'
import Sortable from 'sortablejs'
import { parseTime } from '@/utils'

defineOptions({
  name: 'YuCrudTable'
})

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    default: () => []
  },
  formFields: {
    type: Array,
    default: () => []
  },
  searchKeys: {
    type: Array,
    default: () => []
  },
  statusFilter: {
    type: Object,
    default: null
  },
  pageSize: {
    type: Number,
    default: 10
  },
  createDefault: {
    type: Function,
    default: () => ({})
  },
  draggable: {
    type: Boolean,
    default: true
  },
  showColumnSetting: {
    type: Boolean,
    default: true
  },
  showToolbar: {
    type: Boolean,
    default: true
  },
  compact: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:data'])

const notifyChange = () => {
  emit('update:data', props.data)
}

// 查询与分页
const keyword = ref('')
const statusValue = ref('')
const currentPage = ref(1)
const selectedRows = ref([])
const tableRef = ref(null)
// 拖拽直接改了 tbody 的物理顺序，递增 key 让表格按数据重建
const tableKey = ref(0)

// 列设置
const allColumnKeys = computed(() => [...props.columns.map(item => item.prop), '__actions__'])
const visibleKeys = ref([...props.columns.map(item => item.prop), '__actions__'])
const columnDraft = ref([...visibleKeys.value])
const columnPopoverVisible = ref(false)
const columnOptions = computed(() => [
  ...props.columns.map(item => ({ key: item.prop, label: item.label })),
  { key: '__actions__', label: '操作' }
])
const visibleColumns = computed(() => props.columns.filter(col => visibleKeys.value.includes(col.prop)))
const showActions = computed(() => visibleKeys.value.includes('__actions__'))

const filteredRows = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  return props.data.filter(row => {
    if (kw && props.searchKeys.length) {
      const matched = props.searchKeys.some(key => String(row[key] ?? '').toLowerCase().includes(kw))
      if (!matched) return false
    }
    if (props.statusFilter) {
      const filterValue = statusValue.value
      if (filterValue !== '' && filterValue !== null && filterValue !== undefined) {
        if (row[props.statusFilter.prop] !== filterValue) return false
      }
    }
    return true
  })
})

const pagedRows = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize
  return filteredRows.value.slice(start, start + props.pageSize)
})

// 单元格展示
const formatDate = value => (value ? parseTime(value, '{y}-{m}-{d} {h}:{i}') : '')
const starCount = value => Math.max(0, Math.min(5, Number(value) || 0))
const tagType = (col, value) => (col.tagMap && col.tagMap[value]) || 'info'
const optionLabel = (col, value) => {
  const option = (col.options || []).find(item => item.value === value)
  return option ? option.label : value
}
const isNumberCell = (row, col) => typeof row[col.prop] === 'number'

// 行内编辑
const editingCell = reactive({ id: null, prop: '' })
const editingValue = ref('')

const isEditing = (row, col) => editingCell.id !== null &&
  String(editingCell.id) === String(row.id) &&
  editingCell.prop === col.prop

const focusInlineInput = () => {
  nextTick(() => {
    const input = tableRef.value?.$el?.querySelector('.inline-input input')
    input?.focus()
    input?.select?.()
  })
}

const startInlineEdit = (row, col) => {
  if (editingCell.id !== null && !saveInlineEdit(false)) return
  editingCell.id = row.id
  editingCell.prop = col.prop
  editingValue.value = row[col.prop] ?? ''
  focusInlineInput()
}

const cancelInlineEdit = () => {
  editingCell.id = null
  editingCell.prop = ''
  editingValue.value = ''
}

const saveInlineEdit = (cancelOnInvalid = false) => {
  if (editingCell.id === null) return true
  const row = props.data.find(item => String(item.id) === String(editingCell.id))
  if (!row) {
    cancelInlineEdit()
    return true
  }
  const col = props.columns.find(item => item.prop === editingCell.prop)
  const label = col?.label || '内容'
  const isNumber = isNumberCell(row, col || { prop: editingCell.prop })
  const value = isNumber ? Number(editingValue.value) : String(editingValue.value ?? '').trim()

  if (isNumber && (!Number.isFinite(value) || value < 0)) {
    ElMessage.warning(`${label}必须是有效数字`)
    if (cancelOnInvalid) cancelInlineEdit()
    return false
  }
  if (!isNumber && !value) {
    ElMessage.warning(`${label}不能为空`)
    if (cancelOnInvalid) cancelInlineEdit()
    return false
  }

  row[editingCell.prop] = value
  cancelInlineEdit()
  notifyChange()
  return true
}

// ID 维护：新增、删除、拖拽后统一连续编号
const resetIds = () => {
  props.data.forEach((row, index) => {
    row.id = index + 1
  })
}

const clampPage = () => {
  const maxPage = Math.max(1, Math.ceil(filteredRows.value.length / props.pageSize))
  if (currentPage.value > maxPage) currentPage.value = maxPage
}

const handleSearch = () => {
  currentPage.value = 1
}

const handleReset = () => {
  keyword.value = ''
  statusValue.value = ''
  currentPage.value = 1
}

const handleSelectionChange = rows => {
  selectedRows.value = rows
}

// 拖拽排序
let sortableInstance = null

const initSortable = () => {
  if (sortableInstance) {
    sortableInstance.destroy()
    sortableInstance = null
  }
  if (!props.draggable) return
  nextTick(() => {
    const tbody = tableRef.value?.$el?.querySelector('.el-table__body-wrapper tbody')
    if (!tbody) return
    sortableInstance = Sortable.create(tbody, {
      handle: '.drag-handle',
      animation: 180,
      ghostClass: 'sortable-ghost',
      onEnd: handleDragEnd
    })
  })
}

const handleDragEnd = ({ oldIndex, newIndex }) => {
  if (oldIndex === undefined || newIndex === undefined || oldIndex === newIndex) return
  if (editingCell.id !== null) saveInlineEdit(false)

  const pageRows = pagedRows.value
  const movedRow = pageRows[oldIndex]
  const anchorRow = pageRows[newIndex]
  if (!movedRow || !anchorRow) return

  // 先把 Sortable 改乱的 DOM 抛掉，再按数据重排
  if (sortableInstance) {
    sortableInstance.destroy()
    sortableInstance = null
  }

  const from = props.data.indexOf(movedRow)
  if (from < 0) return
  props.data.splice(from, 1)
  const anchorIndex = props.data.indexOf(anchorRow)
  if (anchorIndex < 0) {
    props.data.splice(from, 0, movedRow)
    return
  }
  // 向下拖放在目标行之后，向上拖放在目标行之前
  const insertIndex = oldIndex < newIndex ? anchorIndex + 1 : anchorIndex
  props.data.splice(insertIndex, 0, movedRow)

  resetIds()
  notifyChange()
  selectedRows.value = []
  // 强制 el-table 按新的数据顺序重建，避免出现 ID 与行顺序不一致
  tableKey.value += 1
  nextTick(initSortable)
}

// 列设置
const handleApplyColumns = () => {
  visibleKeys.value = [...columnDraft.value]
  columnPopoverVisible.value = false
  nextTick(() => {
    tableRef.value?.doLayout?.()
    initSortable()
  })
}

const handleResetColumns = () => {
  columnDraft.value = [...allColumnKeys.value]
  visibleKeys.value = [...allColumnKeys.value]
  nextTick(() => {
    tableRef.value?.doLayout?.()
    initSortable()
  })
}

watch(columnPopoverVisible, visible => {
  if (visible) columnDraft.value = [...visibleKeys.value]
})

// 新增 / 编辑
const dialogVisible = ref(false)
const dialogMode = ref('create')
const editingRowId = ref(null)
const formRef = ref(null)
const formModel = reactive({})

const formRules = computed(() => {
  const rules = {}
  props.formFields.forEach(field => {
    if (!field.required) return
    const isChoice = ['select', 'date', 'switch'].includes(field.type)
    rules[field.prop] = [
      {
        required: true,
        type: field.type === 'number' ? 'number' : undefined,
        message: `${isChoice ? '请选择' : '请输入'}${field.label}`,
        trigger: isChoice ? 'change' : 'blur'
      }
    ]
  })
  return rules
})

const clearFormModel = () => {
  Object.keys(formModel).forEach(key => {
    delete formModel[key]
  })
}

const openCreate = () => {
  cancelInlineEdit()
  dialogMode.value = 'create'
  editingRowId.value = null
  clearFormModel()
  const base = typeof props.createDefault === 'function' ? props.createDefault() : {}
  props.formFields.forEach(field => {
    let value = base[field.prop]
    if (field.type === 'date' && value) value = new Date(value)
    if (value === undefined) value = field.type === 'switch' ? false : field.type === 'number' ? 0 : ''
    formModel[field.prop] = value
  })
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate())
}

const openEdit = row => {
  cancelInlineEdit()
  dialogMode.value = 'update'
  editingRowId.value = row.id
  clearFormModel()
  props.formFields.forEach(field => {
    const value = row[field.prop]
    if (field.type === 'date' && value) {
      formModel[field.prop] = new Date(value)
    } else if (value === undefined) {
      formModel[field.prop] = field.type === 'switch' ? false : field.type === 'number' ? 0 : ''
    } else {
      formModel[field.prop] = value
    }
  })
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate())
}

const submitForm = async () => {
  if (!formRef.value) return
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return

  const payload = {}
  props.formFields.forEach(field => {
    let value = formModel[field.prop]
    if (field.type === 'date' && value) value = new Date(value).getTime()
    if (field.type === 'number' && value !== undefined && value !== '') value = Number(value)
    payload[field.prop] = value
  })

  if (dialogMode.value === 'create') {
    const base = typeof props.createDefault === 'function' ? props.createDefault() : {}
    props.data.unshift({ ...base, ...payload, id: 0 })
    resetIds()
    currentPage.value = 1
    notifyChange()
    ElMessage.success('新增成功')
  } else {
    const row = props.data.find(item => String(item.id) === String(editingRowId.value))
    if (row) Object.assign(row, payload)
    notifyChange()
    ElMessage.success('编辑成功')
  }
  dialogVisible.value = false
}

// 删除
const handleDelete = async row => {
  try {
    await ElMessageBox.confirm('确定删除这条记录吗？', '删除确认', {
      type: 'warning',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
  } catch {
    return
  }
  if (editingCell.id !== null && String(editingCell.id) === String(row.id)) cancelInlineEdit()
  const index = props.data.indexOf(row)
  if (index < 0) return
  props.data.splice(index, 1)
  resetIds()
  clampPage()
  notifyChange()
  ElMessage.success('删除成功')
}

const handleBatchDelete = async () => {
  if (!selectedRows.value.length) return
  try {
    await ElMessageBox.confirm(`确定删除选中的 ${selectedRows.value.length} 条记录吗？`, '删除确认', {
      type: 'warning',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
  } catch {
    return
  }
  const ids = new Set(selectedRows.value.map(item => String(item.id)))
  const kept = props.data.filter(item => !ids.has(String(item.id)))
  props.data.splice(0, props.data.length, ...kept)
  selectedRows.value = []
  tableRef.value?.clearSelection()
  resetIds()
  clampPage()
  notifyChange()
  ElMessage.success('批量删除成功')
}

watch(
  () => pagedRows.value.map(item => item.id).join(','),
  () => {
    if (editingCell.id !== null && !pagedRows.value.some(item => String(item.id) === String(editingCell.id))) {
      cancelInlineEdit()
    }
    initSortable()
  },
  { flush: 'post' }
)

watch(
  () => filteredRows.value.length,
  () => {
    clampPage()
  }
)

onMounted(initSortable)

onBeforeUnmount(() => {
  if (sortableInstance) {
    sortableInstance.destroy()
    sortableInstance = null
  }
})
</script>

<style lang="scss" scoped>
.crud-table {
  padding: 16px;
  background: var(--app-panel-bg);
  border-radius: 6px;

  &.is-compact {
    padding: 12px;
  }
}

.crud-title {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  color: var(--app-text-primary);
}

.filter-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--app-border-color);

  .keyword-input {
    width: 240px;
  }

  .status-select {
    width: 140px;
  }
}

.table-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 0;

  .toolbar-left,
  .toolbar-right {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }

  .total-text {
    color: var(--app-text-secondary);
    font-size: 14px;
  }
}

.table-main {
  width: 100%;
}

.editable-cell {
  display: inline-block;
  width: 100%;
  min-height: 23px;
  line-height: 23px;
  cursor: text;
  border-bottom: 1px dashed transparent;
  transition: border-color 0.2s;

  &:hover {
    border-bottom-color: var(--el-color-primary-light-5);
  }
}

.inline-input {
  width: 100%;
}

.star-icon {
  margin-right: 2px;
  color: var(--el-color-warning);
}

.preview-image {
  width: 56px;
  height: 56px;
  border-radius: 4px;

  &.is-compact {
    width: 36px;
    height: 36px;
  }
}

.drag-handle {
  width: 18px;
  height: 18px;
  color: var(--app-text-secondary);
  cursor: move;
}

.column-setting {
  .column-title {
    margin-bottom: 8px;
    font-weight: 600;
    color: var(--app-text-primary);
  }

  .column-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .column-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 12px;
  }
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.full-width {
  width: 100%;
}

:global(.sortable-ghost) {
  opacity: 0.8;
  color: var(--el-color-primary);
  background: var(--el-color-primary-light-8);
}
</style>
