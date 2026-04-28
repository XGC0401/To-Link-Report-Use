<template>
  <el-dialog 
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="post?.title || ''"
    width="700px"
  >
    <div v-if="post" class="post-detail-content">
      <div class="detail-author">
        <el-avatar :size="50" :src="post.avatar" />
        <div class="author-info">
          <p class="author-name">{{ post.author }}</p>
          <p class="post-time">{{ post.time }}</p>
        </div>
      </div>

      <el-divider />

      <div class="detail-body">
        <p>{{ post.content }}</p>
        <el-tag v-if="post.category" class="post-tag" size="large">
          {{ post.category }}
        </el-tag>
      </div>

      <el-divider />

      <div class="detail-footer">
        <el-space>
          <el-button :icon="CirclePlus">{{ post.likes || 0 }} {{ $t('likes') }}</el-button>
          <el-button :icon="ChatDotRound">{{ post.comments || 0 }} {{ $t('comments') }}</el-button>
          <el-button :icon="Share">{{ $t('share') }}</el-button>
        </el-space>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { CirclePlus, ChatDotRound, Share } from '@element-plus/icons-vue'

interface Post {
  id: number
  author: string
  avatar: string
  title: string
  content: string
  time: string
  category?: string
  likes?: number
  comments?: number
}

defineProps<{
  modelValue: boolean
  post: Post | null
  language: 'en' | 'zh'
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<style scoped>
.post-detail-content {
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
}

.author-name {
  margin: 0;
  font-weight: 600;
  color: #333;
}

.post-time {
  margin: 0;
  font-size: 16px;
  color: #999;
}

.detail-body {
  padding: 16px 0;
}

.detail-body p {
  font-size: 20px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 16px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.post-tag {
  margin-top: 8px;
}

.detail-footer {
  display: flex;
  justify-content: center;
}
</style>
