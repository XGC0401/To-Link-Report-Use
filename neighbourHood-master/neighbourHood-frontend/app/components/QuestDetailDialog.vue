<template>
  <el-dialog 
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="quest?.title || ''"
    width="700px"
  >
    <div v-if="quest" class="quest-detail-content">
      <div class="detail-author">
        <el-avatar :size="50" :src="quest.avatar" />
        <div class="author-info">
          <p class="author-name">{{ quest.author }}</p>
          <p class="quest-time">{{ quest.time }}</p>
        </div>
        <el-tag type="warning" size="large">
          {{ quest.rewardPoints }} {{ $t('points') }}
        </el-tag>
      </div>

      <el-divider />

      <div class="detail-body">
        <h4>{{ $t('details') }}</h4>
        <p>{{ quest.detail }}</p>

        <h4 style="margin-top: 20px;">{{ $t('tags') }}</h4>
        <div class="quest-tags" style="margin-top: 8px;">
          <el-tag v-for="tag in quest.tags" :key="tag" class="tag-item">#{{ tag }}</el-tag>
        </div>

        <h4 style="margin-top: 20px;">{{ $t('paymentMethod') }}</h4>
        <el-tag :type="quest.paymentMethod === 'face-to-face' ? 'success' : 'info'" size="large" style="margin-top: 8px;">
          {{ quest.paymentMethod === 'face-to-face' ? 
             $t("faceToFace") : 
             $t('online') }}
        </el-tag>

        <div v-if="quest.acceptedBy" style="margin-top: 20px;">
          <h4>{{ $t('status') }}</h4>
          <el-tag type="info" size="large" style="margin-top: 8px;">
            {{ $t('acceptedBy') }}: {{ quest.acceptedBy }}
          </el-tag>
        </div>
        <div v-else-if="quest.status === 'hold'" style="margin-top: 20px;">
          <h4>{{ $t('status') }}</h4>
          <el-tag type="warning" size="large" style="margin-top: 8px;">
            {{ $t('questOnHold') }}
          </el-tag>
        </div>
      </div>

      <el-divider />

      <div class="detail-footer">
        <el-tooltip 
          :content="acceptButtonTooltip" 
          :disabled="canAccept"
          placement="top"
        >
          <el-button 
            type="primary" 
            size="large"
            :disabled="!canAccept"
            @click="$emit('showIntroductionDialog', quest)"
          >
            {{ $t('acceptQuest') }}
          </el-button>
        </el-tooltip>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
interface Quest {
  id: number
  authorId: number | string
  author: string
  avatar: string
  title: string
  detail: string
  tags: string[]
  paymentMethod: 'face-to-face' | 'online'
  rewardPoints: number
  time: string
  acceptedBy: string | null
  status?: 'open' | 'hold' | 'accepted'
}

defineProps<{
  modelValue: boolean
  quest: Quest | null
  language: 'en' | 'zh'
  canAccept: boolean
  acceptButtonTooltip: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'acceptQuest', quest: Quest): void
  (e: 'showIntroductionDialog', quest: Quest): void
}>()
</script>

<style scoped>
.quest-detail-content {
  padding: 16px 0;
}

.detail-author {
  display: flex;
  align-items: center;
  gap: 16px;
}

.author-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.author-name {
  margin: 0;
  font-weight: 600;
  color: #333;
}

.quest-time {
  margin: 0;
  font-size: 16px;
  color: #999;
}

.detail-body {
  padding: 16px 0;
}

.detail-body h4 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
}

.detail-body p {
  font-size: 20px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 16px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.quest-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  margin: 0;
}

.detail-footer {
  display: flex;
  justify-content: center;
}
</style>
