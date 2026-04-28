<template>
  <el-dialog 
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="$t('redeemRewards')"
    width="500px"
  >
    <div class="redeem-content">
      <p class="points-display">
        {{ $t('availablePoints') }}: 
        <strong>{{ currentPoints }}</strong>
      </p>

      <el-divider />

      <div class="rewards-catalog">
        <div 
          v-for="reward in rewardsCatalog" 
          :key="reward.id"
          class="reward-item"
        >
          <div class="reward-info">
            <h4>{{ reward.name }}</h4>
            <p>{{ reward.description }}</p>
            <el-tag type="warning">{{ reward.points }} {{ $t('points') }}</el-tag>
          </div>
          <el-button 
            type="primary"
            :disabled="currentPoints < reward.points"
            @click="$emit('redeem', reward)"
          >
            {{ $t('redeem') }}
          </el-button>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
interface Reward {
  id: number
  name: string
  description: string
  points: number
}

defineProps<{
  modelValue: boolean
  language: 'en' | 'zh'
  currentPoints: number
  rewardsCatalog: Reward[]
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'redeem', reward: Reward): void
}>()
</script>

<style scoped>
.redeem-content {
  padding: 16px 0;
}

.points-display {
  font-size: 24px;
  text-align: center;
  margin-bottom: 8px;
}

.points-display strong {
  color: #f56c6c;
  font-size: 32px;
}

.rewards-catalog {
  display: grid;
  gap: 16px;
}

.reward-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: all 0.3s;
}

.reward-item:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-color: #409eff;
}

.reward-info h4 {
  margin: 0 0 8px 0;
  color: #333;
}

.reward-info p {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 18px;
}
</style>
