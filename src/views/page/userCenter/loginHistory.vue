<template>
  <LoginHistory title="登录历史">
    <template #head>
      <div class="card-title flex-row flex-vertical-center">
        <span>以下是您最近4个月的登录历史，如有异常请尽快</span>
        <el-link type="primary" underline="never">修改密码</el-link>
      </div>
    </template>
    <template #body>
      <!-- Element 虚拟表格 -->
      <div ref="tableWrap" class="table-wrap">
        <el-table-v2
          v-loading="loading"
          class="login-history-table"
          :columns="columns"
          :data="tableData"
          :width="tableWidth"
          :height="300"
          :fixed="false"
        />
      </div>
    </template>
    <template #foot>
      <div class="line" />
    </template>
  </LoginHistory>
</template>

<script setup lang="jsx">
import { ref, computed } from 'vue'
import { useElementSize } from '@vueuse/core'
import { loginHistory } from '@/api/user'
import LoginHistory from './components/infoLayout'

const loading = ref( false )

// 表格宽度跟随容器，窄屏不再固定 985px 撑破页面
const tableWrap = ref( null )
const { width: wrapWidth } = useElementSize( tableWrap )
const tableWidth = computed( () => wrapWidth.value
  ? Math.max( wrapWidth.value - 2, 320 )
  : 880 )

const LoginMethod = {
  0 : '未知',
  1 : '密码登录',
  2 : '验证码登录',
  3 : '第三方登录'
}

const columns = ref( [
  {
    key : 'method',
    title : '登录方式',
    dataKey : 'method',
    align : 'center',
    width : 106,
    cellRenderer : ( { rowData } ) => {
      return <div>{LoginMethod[rowData.method]}</div>
    }
  },
  {
    key : 'deviceType',
    title : '设备名称',
    dataKey : 'deviceType',
    align : 'center',
    width : 231
  },
  {
    key : 'deviceOs',
    title : '系统',
    dataKey : 'deviceOs',
    align : 'center',
    width : 110
  },
  {
    key : 'loginAddr',
    title : '登录地点',
    dataKey : 'loginAddr',
    align : 'center',
    width : 231
  },
  {
    key : 'loginTime',
    title : '最后登录时间',
    dataKey : 'loginTime',
    align : 'center',
    width : 231
  }
] )
const tableData = ref( [] )

const getHistory = async() => {
  loading.value = true
  try {
    // 模拟了10w条数据，使用element 虚拟表格渲染
    const { code, data } = await loginHistory()
    if ( code == 200 ) {
      // 兼容后端多种返回结构：直接数组 / { list } / { records } / { data } / { rows }
      tableData.value = Array.isArray( data )
        ? data
        : Array.isArray( data?.list ) ? data.list
          : Array.isArray( data?.records ) ? data.records
            : Array.isArray( data?.data ) ? data.data
              : Array.isArray( data?.rows ) ? data.rows
                : []
    }
  } catch ( e ) {
  } finally {
    loading.value = false
  }
}
getHistory()

defineOptions( {
  name : 'LoginHistory'
} )
</script>

<style lang="scss" scoped>
:deep(.center-box) {
  margin: 80px 140px 0 70px;
  .card-title {
    color: rgba(109, 119, 136, 1);
    font-size: 16px;
    margin-bottom: 49px;
    .el-link {
      font-size: 16px;
    }
  }
  .line {
    margin-top: 170px;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid rgba(237, 239, 242, 1);
  }

  /* 窄屏收窄左右留白，避免内容被挤压 */
  @media (max-width: 1439px) {
    margin: 40px 40px 0 30px;
  }

  @media (max-width: 767px) {
    margin: 20px 12px 0;

    .line {
      margin-top: 60px;
    }
  }
}

.table-wrap {
  width: 100%;
}

.login-history-table {
  margin: 0 auto;
  ::v-deep(.el-table-v2__row-cell) {
    color: #606266;
  }
}
</style>
