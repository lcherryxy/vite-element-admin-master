<template>
  <div class="dashboard-editor-container">
    <!-- Element Plus：el-row / el-col 栅格布局首页卡片和图表 -->
    <el-row :gutter="20" class="card-row">
      <el-col :xs="12" :sm="12" :md="6" :lg="6" v-for="item in cardList" :key="item.id">
        <YuCard :end="item.end" :duration="item.duration" :title="item.title" :prefix="item.prefix">
          <template #icon>
            <i class="fr" :class="item.icon"></i>
          </template>
          <template #badge>
            <span class="badge" :class="item.badge.className">{{ item.badge.txt }}</span>
          </template>
          <template #info>{{ item.info }}</template>
        </YuCard>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chats-container">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <div class="chart-wrapper">
          <RaddarChart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <div class="chart-wrapper">
          <PieChart />
        </div>
      </el-col>
      <!-- 中等宽度下第三张图整行铺满，避免单张图占半行留下空白 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="8">
        <div class="chart-wrapper">
          <BarChart class-name="test" />
        </div>
      </el-col>
    </el-row>

    <!-- 待办列表与运营指标并排，高度接近，窄屏自动堆叠 -->
    <el-row :gutter="20" class="todo-row">
      <el-col :xs="24" :sm="24" :md="16" :lg="16">
        <TodoList />
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <BoxCard />
      </el-col>
    </el-row>

    <!-- 天气卡整行铺满，避免与短卡片并排时出现大片留白 -->
    <el-row :gutter="20" class="weather-row">
      <el-col :span="24">
        <YuWeather />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import YuCard from './components/Card/index.vue'
import RaddarChart from './components/RaddarChart.vue'
import PieChart from './components/PieChart.vue'
import BarChart from './components/BarChart.vue'
import YuWeather from './components/YuWeather'
import TodoList from './components/TodoList/index.vue'
import BoxCard from './components/BoxCard'

import { ref } from 'vue'

const cardList = ref( [
  {
    id : 1,
    end : 6666,
    duration : 3000,
    title : 'Order',
    icon : 'yu-icon-lifangti',
    badge : {
      className : 'bg-info',
      txt : '+56%'
    },
    info : 'From previous period'
  },
  {
    id : 2,
    end : 95270,
    duration : 3000,
    prefix : '￥',
    title : 'Income',
    icon : 'yu-icon-chanpin1',
    badge : {
      className : 'bg-danger',
      txt : '+78%'
    },
    info : 'From previous period'
  },
  {
    id : 3,
    end : 666,
    duration : 1000,
    prefix : '￥',
    title : 'Average Price',
    icon : 'yu-icon-jiagebiaoqian',
    badge : {
      className : 'bg-warning',
      txt : '-5.2%'
    },
    info : 'From previous period'
  },
  {
    id : 4,
    end : 9527,
    duration : 3000,
    title : 'Product Sold',
    icon : 'yu-icon-icon_xinyong_xianxing_jijin-129',
    badge : {
      className : 'bg-info',
      txt : '+22%'
    },
    info : 'From previous period'
  }
] )
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: var(--app-page-bg);
  position: relative;

  /* 四个指标卡等高：同一行卡片拉伸铺满，换行后底边依然对齐 */
  .card-row {
    :deep(.el-col) {
      display: flex;
    }

    :deep(.card-item) {
      flex: 1 1 auto;
      width: 100%;
    }
  }

  .chats-container {
    .chart-wrapper {
      border-radius: 5px;
      background: var(--app-panel-bg);
      padding: 20px;
      box-sizing: border-box;
      margin-bottom: 20px;
      box-shadow: 0 -3px 31px 0 rgb(0 0 0 / 5%), 0 6px 20px 0 rgb(0 0 0 / 2%);
      &:hover {
        transition: all 0.3s;
        transform: translateY(-6px);
      }
    }
  }

  .todo-row {
    /* 两列等高，待办卡与右侧运营卡底边对齐 */
    align-items: stretch;

    > .el-col {
      margin-bottom: 16px;
      display: flex;
    }

    /* 待办卡占满所在列并撑满列高，内部纵向 flex 布局 */
    :deep(.todoapp) {
      max-width: none;
      margin: 0;
      border-radius: 10px;
      overflow: hidden;
      flex: 1 1 auto;
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    /* 内容区撑满剩余高度，表格仍按内容自适应 */
    :deep(.todoapp .crud-table) {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
    }

    /* 分页沉底，避免表格与分页之间留出大空白 */
    :deep(.todoapp .pagination-wrapper) {
      margin-top: auto;
    }

    :deep(.box-card-component) {
      width: 100%;
    }
  }

  .weather-row {
    > .el-col {
      margin-bottom: 16px;
    }

    :deep(.weather) {
      width: 100%;
    }
  }

  @media (max-width: 991px) {
    padding: 16px;
  }

  @media (max-width: 767px) {
    padding: 10px;
  }
}
</style>
