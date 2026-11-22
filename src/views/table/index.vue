<template>
  <YuLayout title="表格综合示例">
    <template #body>
      <div class="app-container">
        <YuCrudTable
          v-model:data="list"
          :columns="columns"
          :form-fields="formFields"
          :search-keys="['title', 'author']"
          :status-filter="statusFilter"
          :page-size="10"
          :create-default="createDefault"
          :loading="listLoading"
        />
      </div>
    </template>
  </YuLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import YuLayout from '@/components/YuLayout'
import YuCrudTable from '@/components/YuCrudTable'
import { getArticle } from '@/api/article'
import logoImg from '@/assets/logo.png'

const statusOptions = [
  { label: '已发布', value: 'published' },
  { label: '草稿', value: 'draft' },
  { label: '已删除', value: 'deleted' }
]
const statusTagMap = { published: 'success', draft: 'info', deleted: 'danger' }
const statusTextMap = { published: '已发布', draft: '草稿', deleted: '已删除' }
const reviewerPool = ['李审核', '王审核', '赵审核', '周审核']

const columns = [
  { prop: 'id', label: 'ID', minWidth: 70, align: 'center' },
  { prop: 'timestamp', label: '日期', minWidth: 120, align: 'center', type: 'date' },
  { prop: 'title', label: '标题', minWidth: 160, editable: true },
  { prop: 'author', label: '作者', minWidth: 90, align: 'center', editable: true },
  { prop: 'reviewer', label: '审核人', minWidth: 90, align: 'center' },
  { prop: 'importance', label: '重要性', minWidth: 90, align: 'center', type: 'star' },
  { prop: 'pageviews', label: '阅读量', minWidth: 90, align: 'center', editable: true },
  {
    prop: 'status',
    label: '状态',
    minWidth: 90,
    align: 'center',
    type: 'tag',
    options: statusOptions,
    tagMap: statusTagMap
  },
  { prop: 'image_uri', label: '预览图', minWidth: 80, align: 'center', type: 'image' }
]

const formFields = [
  { prop: 'title', label: '标题', type: 'input', required: true },
  { prop: 'author', label: '作者', type: 'input', required: true },
  { prop: 'reviewer', label: '审核人', type: 'input', required: true },
  { prop: 'importance', label: '重要性', type: 'number', required: true, min: 1, max: 5 },
  { prop: 'status', label: '状态', type: 'select', options: statusOptions, required: true },
  { prop: 'timestamp', label: '日期', type: 'date', required: true }
]

const statusFilter = {
  prop: 'status',
  options: statusOptions
}

const createDefault = () => ({
  title: '',
  author: '',
  reviewer: '',
  importance: 3,
  status: 'published',
  timestamp: Date.now(),
  pageviews: 0,
  image_uri: logoImg
})

const list = ref([])
const listLoading = ref(false)

const normalizeRow = (item, index) => ({
  ...item,
  id: index + 1,
  title: item.title || '未命名文章',
  author: item.author || '佚名',
  reviewer: item.reviewer || reviewerPool[index % reviewerPool.length],
  importance: Number(item.importance) || 1,
  pageviews: Number(item.pageviews) || 0,
  status: statusTextMap[item.status] ? item.status : 'draft',
  timestamp: item.timestamp || Date.now(),
  image_uri: item.image_uri || logoImg
})

const getList = async () => {
  listLoading.value = true
  try {
    const { data } = await getArticle({ page: 1, limit: 100 })
    const items = Array.isArray(data)
      ? data
      : Array.isArray(data?.items)
        ? data.items
        : Array.isArray(data?.list)
          ? data.list
          : Array.isArray(data?.records)
            ? data.records
            : Array.isArray(data?.rows)
              ? data.rows
              : []
    list.value = items.map(normalizeRow)
  } catch {
    list.value = []
    ElMessage.error('获取列表失败')
  } finally {
    listLoading.value = false
  }
}

onMounted(getList)

defineOptions({
  name: 'TablePage'
})
</script>

<style lang="scss" scoped>
.app-container {
  padding: 16px;
  background: var(--app-panel-bg);
  border-radius: 6px;
}
</style>
