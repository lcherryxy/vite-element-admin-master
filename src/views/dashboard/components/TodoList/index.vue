<template>
  <section class="todoapp">
    <div class="todo-add">
      <el-input
        ref="addInputRef"
        v-model="currentTodo"
        placeholder="添加待办事项，回车确认"
        clearable
        @keyup.enter="addTodo"
      />
      <el-button type="primary" @click="addTodo">添加</el-button>
    </div>

    <YuCrudTable
      v-model:data="todoData"
      :columns="columns"
      :form-fields="formFields"
      :search-keys="['text']"
      :status-filter="statusFilter"
      :page-size="5"
      :show-column-setting="false"
      :show-toolbar="false"
      :create-default="createDefault"
      compact
    />
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import YuCrudTable from '@/components/YuCrudTable'
import { localStorageHandle } from '@/utils/storage'

defineOptions({
  name: 'TodoList'
})

const TODO_LIST_KEY = 'content-studio-todos-v2'
const defaultTodo = [{ text: '整理本周选题', done: false }]

const columns = [
  { prop: 'done', label: '完成', type: 'switch', minWidth: 80, align: 'center' },
  { prop: 'text', label: '内容', editable: true, minWidth: 200 }
]

const formFields = [
  { prop: 'text', label: '内容', type: 'input', required: true },
  { prop: 'done', label: '完成', type: 'switch' }
]

const statusFilter = {
  prop: 'done',
  options: [
    { label: '全部', value: '' },
    { label: '进行中', value: false },
    { label: '已完成', value: true }
  ]
}

const createDefault = () => ({ text: '', done: false })

const stored = localStorageHandle.getItem(TODO_LIST_KEY)
const source = Array.isArray(stored) ? stored : defaultTodo

// 统一补上连续 id，供组件做 row-key 与增删改
const todoData = ref(
  source.map((item, index) => ({
    id: index + 1,
    text: String(item?.text ?? ''),
    done: Boolean(item?.done)
  }))
)

const currentTodo = ref('')
const addInputRef = ref(null)

// 快速添加时按现有最大 ID 递增，避免与已有行的 ID 重复
const nextTodoId = () => {
  return todoData.value.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1
}

const addTodo = () => {
  const text = currentTodo.value.trim()
  if (!text) {
    ElMessage.warning('请输入待办内容')
    addInputRef.value?.focus()
    return
  }
  todoData.value.push({
    id: nextTodoId(),
    text,
    done: false
  })
  currentTodo.value = ''
  addInputRef.value?.focus()
}

// 数据变化后写回 localStorage，保持原有存储结构
watch(
  todoData,
  value => {
    localStorageHandle.setItem(
      TODO_LIST_KEY,
      value.map(item => ({ text: item.text, done: item.done }))
    )
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.todoapp {
  margin: 0;
  background: var(--app-panel-bg);
  border-radius: 10px;
  overflow: hidden;
}

.todo-add {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px 0;
}
</style>
