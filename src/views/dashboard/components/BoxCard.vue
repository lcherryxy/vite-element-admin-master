<template>
  <el-card class="box-card-component">
    <div class="box-card-profile">
      <YuThumb :image="set.avatar" width="48px" height="48px" class="yuThumb" />
      <div class="profile-info">
        <div class="profile-name">{{ set.name }}</div>
        <div class="profile-role">内容运营</div>
      </div>
    </div>

    <div v-for="item in metrics" :key="item.label" class="progress-item">
      <span>{{ item.label }}</span>
      <el-progress :percentage="item.value" />
    </div>
  </el-card>
</template>

<script setup>
import { reactive, computed } from 'vue'
import YuThumb from '@/components/YuThumb'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const set = reactive( {
  name : computed( () => {
    return userStore.name
  } ),

  avatar : computed( () => {
    return userStore.avatar
  } )
} )

// 内容团队的关键指标
const metrics = [
  { label : '本周发文', value : 90 },
  { label : '选题完成', value : 95 },
  { label : '审核通过', value : 70 },
  { label : '排版规范', value : 60 },
  { label : '封面完成', value : 90 },
  { label : '数据复盘', value : 88 }
]

defineOptions( {
  name : 'BoxCard'
} )
</script>

<style lang="scss" scoped>
.box-card-component {
  height: 100%;
  box-sizing: border-box;

  .box-card-profile {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 16px;
    margin-bottom: 14px;
    border-bottom: 1px solid var(--app-border-color);
  }

  .yuThumb {
    flex: 0 0 auto;
    box-shadow: none;

    :deep(.pan-info) {
      box-shadow: none;
    }
  }

  .profile-name {
    font-size: 16px;
    color: var(--app-text-primary);
  }

  .profile-role {
    margin-top: 4px;
    font-size: 12px;
    color: var(--app-text-secondary);
  }

  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }
}
</style>
