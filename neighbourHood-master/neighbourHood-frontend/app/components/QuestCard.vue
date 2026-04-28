<template>
  <el-card class="quest-card clickable-quest-card" @click="handleCardClick">
    <template #header>
      <div class="quest-header" @click.stop>
        <div class="quest-author">
          <el-avatar :size="40" :src="quest.avatar" />
          <div class="author-info">
            <p class="author-name">{{ quest.author }}</p>
            <p class="quest-time">{{ quest.time }}</p>
          </div>
        </div>
        <div class="quest-header-right">
          <el-tag type="warning" size="large">
            {{ quest.rewardPoints }} {{ $t('points') }}
          </el-tag>
          <el-dropdown trigger="click" @command="handleCommand">
            <el-button text :icon="MoreFilled" circle />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if="isOwnQuest" command="edit">
                  <el-icon><Edit /></el-icon>
                  {{ $t('edit') }}
                </el-dropdown-item>
                <el-dropdown-item v-if="isOwnQuest" command="delete">
                  <el-icon><Delete /></el-icon>
                  {{ $t('delete') }}
                </el-dropdown-item>
                <el-dropdown-item v-if="!isOwnQuest" command="report" :divided="isOwnQuest">
                  <el-icon><Warning /></el-icon>
                  {{ $t('report') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </template>

    <div class="quest-content">
      <h3 class="quest-title-text">{{ truncateText(quest.title, 40) }}</h3>
      <p class="quest-detail-text">
        {{ truncateText(quest.detail, 80) }}
        <span v-if="quest.detail.length > 80" class="read-more">
          ...
        </span>
      </p>
      
      <div class="quest-tags">
        <el-tag v-for="tag in quest.tags.slice(0, 3)" :key="tag" class="tag-item">#{{ tag }}</el-tag>
        <el-tag v-if="quest.tags.length > 3" class="tag-item">+{{ quest.tags.length - 3 }}</el-tag>
      </div>

      <div class="quest-payment">
        <strong>{{ $t('payment') }}:</strong>
        <el-tag :type="quest.paymentMethod === 'face-to-face' ? 'success' : 'info'" size="small">
          {{ quest.paymentMethod === 'face-to-face' ? 
             $t('faceToFace') : 
             $t('online') }}
        </el-tag>
      </div>

      <div class="quest-status" v-if="quest.acceptedBy">
        <el-tag type="info" size="small">
          {{ $t('acceptedBy') }}: {{ quest.acceptedBy }}
        </el-tag>
      </div>
      <div class="quest-status" v-else-if="quest.status === 'hold'">
        <el-tag type="warning" size="small">
          {{ $t('questOnHold') }}
        </el-tag>
      </div>
    </div>

    <template #footer>
      <div class="quest-footer" @click.stop>
        <el-tooltip 
          :content="acceptButtonTooltip" 
          :disabled="canAccept"
          placement="top"
        >
          <el-button 
            type="primary" 
            size="small"
            :disabled="!canAccept"
            @click="$emit('showIntroductionDialog', quest)"
          >
            {{ $t('acceptQuest') }}
          </el-button>
        </el-tooltip>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MoreFilled, Edit, Delete, Warning } from '@element-plus/icons-vue'

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

const props = defineProps<{
  quest: Quest
  language: 'en' | 'zh'
  canAccept: boolean
  acceptButtonTooltip: string
  currentUserName?: string
}>()

const emit = defineEmits<{
  (e: 'showDetail', quest: Quest): void
  (e: 'acceptQuest', quest: Quest): void
  (e: 'showIntroductionDialog', quest: Quest): void
  (e: 'edit', quest: Quest): void
  (e: 'delete', quest: Quest): void
  (e: 'report', quest: Quest): void
}>()

const isOwnQuest = computed(() => {
  return props.currentUserName && props.quest.author === props.currentUserName
})

function handleCommand(command: string) {
  switch (command) {
    case 'edit':
      emit('edit', props.quest)
      break
    case 'delete':
      emit('delete', props.quest)
      break
    case 'report':
      emit('report', props.quest)
      break
  }
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  }
  return text.substring(0, maxLength)
}

function handleCardClick() {
  emit('showDetail', props.quest)
}
</script>

<style scoped>
.quest-card {
  border: none;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  border-radius: 8px;
}

.clickable-quest-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.clickable-quest-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.clickable-quest-card:active {
  transform: translateY(-2px);
}

.quest-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.quest-header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quest-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-info {
  display: flex;
  flex-direction: column;
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

.quest-content {
  margin: 16px 0;
}

.quest-content h3 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 26px;
}

.quest-title-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.quest-detail-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0 0 16px 0;
  color: #666;
  line-height: 1.6;
}

.read-more {
  color: #409eff;
  cursor: pointer;
  font-weight: 600;
  margin-left: 4px;
  transition: color 0.3s;
}

.read-more:hover {
  color: #66b1ff;
  text-decoration: underline;
}

.quest-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.tag-item {
  margin: 0;
}

.quest-payment {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.quest-status {
  margin-top: 12px;
}

.quest-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
