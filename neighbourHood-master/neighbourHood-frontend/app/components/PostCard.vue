<template>
  <el-card class="post-card">
    <template #header>
      <div class="post-header">
        <div class="post-author">
          <el-avatar :size="40" />
          <div class="author-info">
            <p class="author-name">{{ displayAuthorName }}</p>
            <p class="post-time">{{ formatDateTime(post.createTime) }}</p>
          </div>
        </div>
        <el-dropdown trigger="click" @command="handleCommand">
          <el-button text :icon="MoreFilled" circle />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="isOwnPost" command="edit">
                <el-icon>
                  <Edit />
                </el-icon>
                {{ $t('edit') }}
              </el-dropdown-item>
              <el-dropdown-item v-if="isOwnPost" command="delete">
                <el-icon>
                  <Delete />
                </el-icon>
                {{ $t('delete') }}
              </el-dropdown-item>
              <el-dropdown-item v-if="!isOwnPost" command="report" :divided="isOwnPost">
                <el-icon>
                  <Warning />
                </el-icon>
                {{ $t('report') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>

    <div class="post-content">
      <div class="post-information">
        <p class="post-title">{{ truncateText(post.title, 50) }}</p>
        <p class="post-range">{{ $t('timeSelect') }}: {{ formatDateTime(post.startTime) }} - {{ formatDateTime(post.endTime) }}</p>
      </div>
      <p class="post-text">
        {{ truncateText(post.content, 100) }}
        <span v-if="post.content.length > 100" class="read-more" @click="$emit('showDetail', post)">
          ...
        </span>
      </p>
      <div class="image">
        <el-image v-if="post.postPhotos" v-for="(photo, index) in post.postPhotos" :src="photo.url" :fit="'cover'"
          style="width: 100px; height: 100px" />
      </div>
      <el-tag class="tag" size="large">{{ tagValue }}</el-tag>
    </div>

    <template #footer>
      <div class="post-footer">
        <el-space>
          <el-button text :icon="Star" @click="">{{ 0 }}</el-button>
        </el-space>
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Star, MoreFilled, Edit, Delete, Warning } from '@element-plus/icons-vue'
import type { Post } from '../api/types/post'
import { likePost } from '~/api/post';

const props = defineProps<{
  post: Post
  currentUserEmail?: string
  currentUserDisplayName?: string
}>()

const emit = defineEmits<{
  (e: 'showDetail', post: Post): void
  (e: 'edit', post: Post): void
  (e: 'delete', post: Post): void
  (e: 'report', post: Post): void
}>()

const isOwnPost = computed(() => {
  return props.currentUserEmail && props.post.user?.email === props.currentUserEmail
})

// Display name: use profile display name for own posts, otherwise use username from post
const displayAuthorName = computed(() => {
  if (isOwnPost.value && props.currentUserDisplayName) {
    return props.currentUserDisplayName
  }
  return props.post.user ? props.post.user.username : "null"
})

function handleCommand(command: string) {
  switch (command) {
    case 'edit':
      emit('edit', props.post)
      break
    case 'delete':
      emit('delete', props.post)
      break
    case 'report':
      emit('report', props.post)
      break
  }
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text
  }
  return text.substring(0, maxLength)
}

function formatDateTime(dateTime: Date | undefined): string {
  if (!dateTime) return 'null'
  try {
    return new Date(dateTime).toLocaleString('en-US')
  } catch {
    return 'null'
  }
}

// async function handleLike() {
//   let isSubmitting = true
//   try {
//     await likePost(props.post.id);
//   } catch (e) {
//     console.log(e)
//   } finally {
//     isSubmitting = false;
//   }
// }

const tagValue = computed(() => {
  if (props.post.category && props.post.category.trim()) {
    return props.post.category.trim()
  }

  switch (props.post.request_type) {
    case 0: return $t('shopping')
    case 1: return $t('repair')
    case 2: return $t('care')
    case 3: return $t('daily')
    case 4: return $t('other')
    default: return $t('other')
  }
})
</script>

<style scoped>
.tag {
  max-width: 100px;
  margin-top: auto;
}

.post-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.post-information p {
  margin: 0 !important;
  color: black;
  line-height: 5px;
}

.post-title {
  font-size: 20px;
  font-weight: 800;
}

.post-range {
  font-size: 10px;
}

.image {
  display: flex;
  gap: 20px;
  overflow: hidden;
  margin-bottom: 20px;
  ;
}

.post-card {
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  min-width: 600px;
  width: 600px;
  max-width: 600px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-author {
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

.post-time {
  margin: 0;
  font-size: 16px;
  color: #999;
}


.post-title {
  overflow: hidden;
  white-space: nowrap;
}

.post-content p {
  margin: 12px 0 12px 0;
  color: #666;
  line-height: 1.6;
}


.post-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

.post-footer {
  display: flex;
  justify-content: space-between;
}
</style>
