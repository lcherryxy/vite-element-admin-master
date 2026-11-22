<template>
  <div class="account-container flex-row flex-level-center">
    <!--  -->
    <div class="center-box">
      <!-- 基础信息 -->
      <div class="flex-row">
        <!--绑定手机-->
        <div class="card purple">
          <div class="flex-row flex-vertical-center">
            <div class="circle">
              <Phone class="icon" />
            </div>
            <div class="tips-info flex-column flex-vertical-center">
              <div class="f1">
                绑定手机
                <CircleCheck v-if="set.phone" class="status-ok" />
                <Warning v-else class="status-warning" />
              </div>
              <div class="f2">
                {{ set.phone ? '已绑定手机' : '未绑定，请尽快绑定' }}
              </div>
            </div>
          </div>
          <el-button class="btn" type="info" @click="bindHandle(1)">{{ set.phone ? '更换手机' : '去绑定' }}</el-button>
        </div>
        <!--实名认证-->
        <div class="card orange">
          <div class="flex-row flex-vertical-center">
            <div class="circle">
              <Lock class="icon" />
            </div>
            <div class="tips-info flex-column flex-vertical-center">
              <div class="f1">
                实名认证
                <CircleCheck v-if="set.identity" class="status-ok" />
                <Warning v-else class="status-warning" />
              </div>
              <div class="f2">
                {{ set.identity ? '已实名认证' : '请尽快完成实名认证' }}
              </div>
            </div>
          </div>
          <el-button class="btn" type="info" @click="bindHandle(2)">{{ set.identity ? '查看认证' : '去认证' }}</el-button>
        </div>
        <!--绑定邮箱-->
        <div class="card green">
          <div class="flex-row flex-vertical-center">
            <div class="circle">
              <ChatDotRound class="icon" />
            </div>
            <div class="tips-info flex-column flex-vertical-center">
              <div class="f1">
                绑定邮箱
                <CircleCheck v-if="set.email" class="status-ok" />
                <Warning v-else class="status-warning" />
              </div>
              <div class="f2">
                {{ set.email ? '已绑定邮箱' : '未绑定，请尽快绑定' }}
              </div>
            </div>
          </div>
          <el-button class="btn" type="info" @click="bindHandle(3)">{{ set.email ? '更换邮箱' : '去绑定' }}</el-button>
        </div>
        <!--个人信息-->
        <div class="card blue">
          <div class="flex-row flex-vertical-center">
            <div class="circle">
              <Document class="icon" />
            </div>
            <div class="tips-info flex-column flex-vertical-center">
              <div class="f1">
                个人信息
                <CircleCheck v-if="set.isPerfect" class="status-ok" />
                <Warning v-else class="status-warning" />
              </div>
              <div class="f2">
                {{ set.isPerfect ? '个人信息已完善' : '个人信息未完善' }}
              </div>
            </div>
          </div>
          <el-button class="btn" type="info" @click="bindHandle(4)">{{ set.isPerfect ? '更改信息' : '去完善' }}</el-button>
        </div>
      </div>

      <!-- 登录历史 -->
      <div class="card-section" ref="historySection" v-loading="loading">
        <div class="login-title flex-row flex-between flex-vertical-center">
          <el-tooltip class="box-item" effect="dark" content="此处模拟了10W条数据" placement="top-start">
            <span class="title">登录历史</span></el-tooltip
          >
          <p style="cursor: pointer">
            <span class="right-tips" @click="router.push('/user/history')">查看更多</span>
            <el-icon color="#1890ff"> <ArrowRight /> </el-icon>
          </p>
        </div>
        <!-- Element 虚拟表格-->
        <el-table-v2
          class="login-history-table"
          :columns="columns"
          :data="tableData"
          :width="historyTableWidth"
          :height="210"
          :fixed="false"
        >
          <!-- 自定义空状态：默认 ElEmpty 插画过大，会在卡片内溢出 -->
          <template #empty>
            <div class="table-empty">暂无数据</div>
          </template>
        </el-table-v2>

        <!-- Element 基础table -->
        <!--<el-table
            :data="tableData"
            ref="table"
            height="210"
            style="width: 100%"
        >
          <el-table-column
              prop="method"
              label="登录方式"
              width="106"
              align="center"
          >
            <template #default="{ row }">
              {{ LoginMethod[row.method] }}
            </template>
          </el-table-column>
          <el-table-column
              prop="deviceType"
              label="设备名称"
              width="231"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="deviceOs"
              label="系统"
              width="110"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="loginAddr"
              label="登录地点"
              width="231"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="loginTime"
              label="最后登录时间"
              width="231"
              align="center"
          >
          </el-table-column>
        </el-table>-->
      </div>
    </div>
    <!--  -->
    <div class="avatar-box flex-column flex-level-center flex-vertical-center">
      <YuThumb
        width="clamp(96px, 30vw, 150px)"
        height="clamp(96px, 30vw, 150px)"
        :image="set.avatar"
      >内容工坊</YuThumb>
      <span class="user-name ellipsis"> Hi,{{ set.name || '内容工坊用户' }} </span>
      <span class="phone">
        <span v-if="set.phone">{{ encryptionPhone(set.phone) }}</span>
        <span v-else> 你还未绑定手机 </span>
      </span>
    </div>

    <!-- 绑定 / 更换手机号、绑定 / 更换邮箱 -->
    <BindAccountDialog v-model="bindVisible" :type="bindType" />
    <!-- 完善个人信息 -->
    <ProfileDialog v-model="profileVisible" />
  </div>
</template>

<script setup lang="jsx">
import { ref, reactive, computed } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useUserStore } from '@/store'
import { loginHistory } from '@/api/user'
import { encryptionPhone } from '@/utils'
import { useRouter } from 'vue-router'
import YuThumb from '@/components/YuThumb'
import BindAccountDialog from './components/BindAccountDialog.vue'
import ProfileDialog from './components/ProfileDialog.vue'

const router = useRouter()

const loading = ref( false )

// 虚拟表格宽度跟随卡片容器，窄屏时不再撑破页面（列超出时表格内部横向滚动）
const historySection = ref( null )
const { width: historySectionWidth } = useElementSize( historySection )
const historyTableWidth = computed( () => historySectionWidth.value
  ? Math.max( historySectionWidth.value - 4, 320 )
  : 880 )

const userStore = useUserStore()

const LoginMethod = {
  0 : '未知',
  1 : '密码登录',
  2 : '验证码登录',
  3 : '第三方登录'
}

const set = reactive( {
  avatar : computed( () => {
    return userStore.avatar
  } ),
  name : computed( () => {
    return userStore.name
  } ),
  phone : computed( () => {
    return userStore.phone
  } ),
  email : computed( () => {
    return userStore.email
  } ),
  identity : computed( () => {
    return userStore.identity
  } ),
  isPerfect : computed( () => {
    // 个人信息完善度只看资料本身，手机 / 邮箱 / 实名由各自卡片单独提示
    return !!( userStore.avatar && userStore.name && userStore.gender && userStore.birthday )
  } )
} )

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

// 1 绑定手机, 2 实名认证, 3 绑定邮箱, 4 完善个人信息
const bindVisible = ref( false )
const bindType = ref( 'phone' )
const profileVisible = ref( false )

const bindHandle = step => {
  if ( step === 1 ) {
    bindType.value = 'phone'
    bindVisible.value = true
    return
  }
  if ( step === 3 ) {
    bindType.value = 'email'
    bindVisible.value = true
    return
  }
  if ( step === 4 ) {
    profileVisible.value = true
    return
  }
  router.push( '/user/attestation' )
}

defineOptions( {
  name : 'UserCenter'
} )
</script>

<style lang="scss" scoped>
.account-container {
  padding: 20px;
  /* 空间不足时右侧资料卡换行，避免整个页面横向溢出 */
  flex-wrap: wrap;
  align-items: flex-start;
  row-gap: 10px;
}
.center-box {
  flex: 1 1 920px;
  min-width: 0;
  margin-right: 10px;

  /* 状态卡片行：放不下时自动换行，用 gap 统一间距，换行后左边界仍对齐 */
  > .flex-row {
    flex-wrap: wrap;
    gap: 10px;
  }

  .card {
    padding: 20px 0 0 20px;
    background: var(--app-panel-bg);
    /* 四张卡片等分整行，随内容区宽度自适应，始终与下方卡片左右对齐 */
    flex: 1 1 0;
    min-width: 0;
    width: auto;
    height: 134px;
    border-radius: 10px;
    box-shadow: 0 4px 6px 0 rgba(152, 160, 179, 0.13);
    box-sizing: border-box;
    .circle {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      width: 44px;
      height: 44px;
    }

    .tips-info {
      margin-left: 15px;
      .f1 {
        width: 100%;
        margin-bottom: 6px;
        color: rgba(104, 114, 132, 1);
        font-size: 16px;
        text-align: left;
        font-family: 'syRegular';
        .status-ok {
          color: #2fdc23;
          width: 20px;
          height: 20px;
        }
        .status-warning {
          color: #ffbe2c;
          width: 20px;
          height: 20px;
        }
      }
      .f2 {
        width: 100%;
        color: rgba(165, 181, 210, 1);
        font-size: 12px;
        text-align: left;
      }
    }

    .icon {
      color: #fff;
      width: 24px;
      height: 24px;
    }

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 94px;
      height: 30px;
      border-radius: 5px;
      float: right;
      margin-right: 14px;
      margin-top: 25px;
      border: none;
    }

    &.purple {
      .circle {
        background-color: #b260ea;
        box-shadow: 0 0 10px 4px rgba(194, 127, 240, 0.26);
      }
      .btn {
        background-color: rgba(178, 96, 234, 100);
      }
    }
    &.orange {
      .circle {
        background-color: rgb(255, 158, 1);
        box-shadow: rgb(247 172 101 / 36%) 0 0 10px 4px;
      }
      .btn {
        background-color: rgb(255, 158, 1);
      }
    }
    &.green {
      .circle {
        background-color: rgb(96, 203, 176);
        box-shadow: rgb(125 230 203 / 38%) 0 0 10px 4px;
      }
      .btn {
        background-color: rgb(96, 203, 176);
      }
    }
    &.blue {
      .circle {
        background-color: rgb(1, 196, 226);
        box-shadow: rgb(1 196 226 / 28%) 0 0 10px 4px;
      }
      .btn {
        background-color: rgb(1, 196, 226);
      }
    }
  }
}

.card-section {
  background: var(--app-panel-bg);
  margin-top: 10px;
  width: 100%;
  height: 315px;
  border-radius: 10px;
  box-shadow: 0 4px 6px 0 rgba(152, 160, 179, 0.13);
  .login-title {
    padding: 20px 0 14px 0;
    margin: 0 20px;
    border-bottom: 1px solid rgba(237, 239, 242, 1);
    .title {
      color: rgba(104, 114, 132, 1);
      font-size: 20px;
    }
    .right-tips {
      color: rgba(24, 144, 255, 1);
      font-size: 14px;
      margin-right: 10px;
    }
    .el-icon {
      position: relative;
      top: 2px;
    }
  }
}

.login-history-table {
  margin: 0 auto;
  :deep(.el-table-v2__row-cell) {
    color: var(--app-text-secondary);
  }
}
.table-empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--app-text-secondary);
}

.avatar-box {
  background: var(--app-panel-bg);
  box-sizing: border-box;
  flex: 0 0 250px;
  min-width: 250px;
  height: 315px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px 0 rgba(152, 160, 179, 0.13);
  .user-name {
    margin: 30px 0 12px 0;
    color: rgba(104, 114, 132, 1);
    font-size: 20px;
    width: 200px;
    max-width: 100%;
  }
  .phone {
    color: rgba(166, 179, 202, 1);
    font-size: 16px;
    text-align: left;
    max-width: 100%;
  }
}

/* 窄桌面 / 平板：单列堆叠，资料卡改为横向通栏，避免孤零零悬浮 */
@media (max-width: 1439px) {
  .account-container {
    flex-direction: column;
    align-items: stretch;
  }

  .center-box {
    flex: none;
    width: 100%;
    margin-right: 0;
  }

  .avatar-box {
    flex: none;
    width: 100%;
    height: auto;
    padding: 20px 16px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px 24px;

    .user-name {
      margin: 0;
      width: auto;
      max-width: 100%;
      white-space: normal;
      word-break: break-all;
    }

    .phone {
      text-align: center;
    }
  }
}

/* 平板：状态卡片两列，仍铺满整行 */
@media (max-width: 991px) {
  .center-box .card {
    flex: 1 1 calc(50% - 5px);
  }
}

/* 手机端：收窄留白，卡片保持两列 */
@media (max-width: 767px) {
  .account-container {
    padding: 10px;
  }

  .center-box {
    > .flex-row {
      justify-content: center;
    }
  }

  .card-section {
    height: auto;
  }

  .login-title {
    flex-wrap: wrap;
    row-gap: 6px;
  }

  /* 头像与文字改为纵向排列，头像随屏幕宽度缩放，避免互相挤压错位 */
  .avatar-box {
    flex-direction: column;
    gap: 12px;
    padding: 16px;

    .user-name {
      font-size: 17px;
      line-height: 1.5;
      white-space: normal;
      word-break: break-all;
    }

    .phone {
      font-size: 14px;
      line-height: 1.5;
    }
  }
}

/* 仅超窄屏才单列：平板和窄窗口保持两列，避免一张卡片占满一行 */
@media (max-width: 560px) {
  .center-box .card {
    flex: 1 1 100%;
    width: auto;
  }
}
</style>
