<template>
  <el-container class="home-container">
    <!-- Header -->
    <el-header class="home-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="app-title" @click="goToHome" style="cursor: pointer;">🔗 {{ $t('appName') }}</h1>
        </div>
        <div class="header-center">
          <el-input
            v-model="searchQuery"
            :placeholder="$t('searchPosts')"
            class="search-input"
            clearable
          >
            <template #suffix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>
        <div class="header-right">
          <el-badge :value="notifications" class="notification-badge">
            <el-button text :icon="Bell" />
          </el-badge>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar :size="32" :src="userAvatar" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  {{ $t('profile') }}
                </el-dropdown-item>
                <el-dropdown-item command="settings">
                  {{ $t('settings') }}
                </el-dropdown-item>
                <el-dropdown-item command="language">
                  {{ $t('language') }}
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  {{ $t('logout') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>

    <!-- Main Content -->
    <el-container class="main-content">
      <!-- Sidebar -->
      <el-aside class="home-sidebar">
        <div class="sidebar-header">
          <el-button type="primary" class="create-post-btn" @click="goToCreatePost">
            <template #icon>
              <el-icon><Plus /></el-icon>
            </template>
            {{ $t('createNewPost') }}
          </el-button>
        </div>

        <el-menu :default-active="activeMenu" class="sidebar-menu" @select="handleMenuSelect">
          <el-menu-item index="1">
            <el-icon><HomeFilled /></el-icon>
            <span>{{ $t('home') }}</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><DocumentCopy /></el-icon>
            <span>{{ $t('posts') }}</span>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><Location /></el-icon>
            <span>{{ $t('nearbyShops') }}</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><ChatLineRound /></el-icon>
            <span>{{ $t('messages') }}</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon><User /></el-icon>
            <span>{{ $t('friends') }}</span>
          </el-menu-item>
        </el-menu>

        <el-divider></el-divider>

        <div class="sidebar-footer">
          <el-statistic :title="$t('friends')" :value="125" />
          <el-statistic :title="$t('posts')" :value="42" />
        </div>
      </el-aside>

      <!-- Main Area -->
      <el-main class="home-main">
        <!-- Welcome Section -->
        <div class="welcome-section">
          <el-card class="welcome-card">
            <template #header>
              <div class="card-header">
                <h2>{{ $t('welcomeTitle') }}</h2>
              </div>
            </template>
            <p>{{ $t('welcomeMessage') }}</p>
            <div class="welcome-actions">
              <el-button type="primary" size="large" @click="goToCreatePost">
                <template #icon>
                  <el-icon><Edit /></el-icon>
                </template>
                {{ $t('createNewPost') }}
              </el-button>
              <el-button size="large">
                <template #icon>
                  <el-icon><Share /></el-icon>
                </template>
                {{ $t('browseCommunities') }}
              </el-button>
            </div>
          </el-card>
        </div>

        <!-- Posts Section -->
        <div class="posts-section">
          <div class="section-header">
            <h3>{{ $t('recentPosts') }}</h3>
            <el-space>
              <el-select v-model="selectedCategory" :placeholder="$t('category')" class="category-select">
                <el-option :label="$t('all')" value="" />
                <el-option :label="$t('news')" value="news" />
                <el-option :label="$t('events')" value="events" />
                <el-option :label="$t('help')" value="help" />
              </el-select>
            </el-space>
          </div>

          <el-empty
            :description="$t('noPosts')"
            v-if="posts.length === 0"
          />
          <div v-else class="posts-list">
            <el-card v-for="post in posts" :key="post.id" class="post-card">
              <template #header>
                <div class="post-header">
                  <div class="post-author">
                    <el-avatar :size="40" :src="post.avatar" />
                    <div class="author-info">
                      <p class="author-name">{{ post.author }}</p>
                      <p class="post-time">{{ post.time }}</p>
                    </div>
                  </div>
                  <el-dropdown trigger="click">
                    <el-button text :icon="MoreFilled" />
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item>{{ $t('edit') }}</el-dropdown-item>
                        <el-dropdown-item>{{ $t('delete') }}</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </template>

              <div class="post-content">
                <h4>{{ post.title }}</h4>
                <p>{{ post.content }}</p>
                <el-tag v-if="post.category" class="post-tag">{{ post.category }}</el-tag>
              </div>

              <template #footer>
                <div class="post-footer">
                  <el-space>
                    <el-button text :icon="CirclePlus">{{ post.likes || 0 }}</el-button>
                    <el-button text :icon="ChatDotRound">{{ post.comments || 0 }}</el-button>
                    <el-button text :icon="Share">{{ $t('share') }}</el-button>
                  </el-space>
                </div>
              </template>
            </el-card>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowDown,
  HomeFilled,
  DocumentCopy,
  Location,
  User,
  Plus,
  Search,
  Bell,
  Edit,
  Share,
  MoreFilled,
  CirclePlus,
  ChatDotRound,
  ChatLineRound
} from '@element-plus/icons-vue'

const router = useRouter()
const activeMenu = ref('1')
const language = ref<'en' | 'zh'>('en')
const searchQuery = ref('')
const selectedCategory = ref('')
const notifications = ref(3)
const posts = ref<any[]>([])
const userProfile = ref<any>(null)

// Computed property for user avatar
const userAvatar = computed(() => {
  return userProfile.value?.avatar || 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg'
})

// Load user profile from localStorage
onMounted(() => {
  const savedProfile = localStorage.getItem('userProfile')
  if (savedProfile) {
    userProfile.value = JSON.parse(savedProfile)
  }
})

const goToHome = () => {
  router.push('/home')
}

const handleMenuSelect = (index: string) => {
  activeMenu.value = index
  switch(index) {
    case '1':
      router.push('/home')
      break
    case '2':
      router.push('/posts')
      break
    case '3':
      router.push('/nearbyShops')
      break
    case '4':
      router.push('/chat')
      break
    case '5':
      router.push('/friends')
      break
  }
}

const handleCommand = (command: string) => {
  if (command === 'logout') {
    localStorage.removeItem('token')
    localStorage.removeItem('userToken')
    router.push('/')
  } else if (command === 'language') {
    language.value = language.value === 'en' ? 'zh' : 'en'
  } else if (command === 'profile') {
    router.push('/profile')
  } else if (command === 'settings') {
    router.push('/settings')
  }
}

const goToCreatePost = () => {
  router.push('/create-post')
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.home-container {
  height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.home-header {
  background: white;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  padding: 0 30px !important;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.header-left {
  flex: 0 0 auto;
}

.app-title {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #667eea;
  white-space: nowrap;
}

.header-center {
  flex: 1;
  min-width: 200px;
  max-width: 400px;
}

.search-input {
  width: 100%;
}

.header-right {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 15px;
}

.notification-badge {
  cursor: pointer;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  transition: color 0.3s;
}

.el-dropdown-link:hover {
  color: #667eea;
}

/* Main Content */
.main-content {
  flex: 1;
  overflow: hidden;
  display: flex;
}

/* Sidebar Styles */
.home-sidebar {
  width: 220px;
  background: white;
  border-right: 1px solid #ebeef5;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 15px;
  border-bottom: 1px solid #ebeef5;
}

.create-post-btn {
  width: 100%;
}

.sidebar-menu {
  border-right: none;
  flex: 1;
}

.sidebar-footer {
  padding: 15px;
  border-top: 1px solid #ebeef5;
  background: #f9fafc;
}

.sidebar-footer :deep(.el-statistic) {
  margin-bottom: 10px;
}

/* Main Area */
.home-main {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* Welcome Section */
.welcome-section {
  margin-bottom: 40px;
  width: 100%;
  flex-shrink: 0;
}

.welcome-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  width: 100%;
  display: block;
}

.welcome-card :deep(.el-card__header) {
  border-bottom: none;
  padding: 20px 30px;
}

.welcome-card :deep(.el-card__body) {
  padding: 20px 30px 30px 30px;
}

.card-header h2 {
  margin: 0;
  font-size: 36px;
  font-weight: 700;
  color: white;
}

.welcome-card p {
  margin: 15px 0 25px 0;
  font-size: 20px;
  opacity: 0.95;
  line-height: 1.6;
}

.welcome-actions {
  display: flex;
  gap: 15px;
}

.welcome-actions :deep(.el-button) {
  flex: 1;
}

/* Posts Section */
.posts-section {
  margin-top: 0;
  width: 100%;
  clear: both;
  flex-shrink: 0;
  display: block;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  margin: 0;
  font-size: 26px;
  font-weight: 600;
  color: #333;
}

.category-select {
  width: 150px;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-card {
  border: 1px solid #ebeef5;
  transition: all 0.3s ease;
  cursor: pointer;
}

.post-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: #667eea;
}

.post-card :deep(.el-card__header) {
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.post-card :deep(.el-card__body) {
  padding: 16px;
}

.post-card :deep(.el-card__footer) {
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
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
  flex: 1;
}

.author-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.author-name {
  margin: 0;
  font-weight: 600;
  color: #333;
  font-size: 18px;
}

.post-time {
  margin: 0;
  font-size: 16px;
  color: #999;
}

.post-content h4 {
  margin: 0 0 10px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.post-content p {
  margin: 0 0 15px 0;
  color: #666;
  line-height: 1.6;
  font-size: 18px;
}

.post-tag {
  margin-top: 10px;
}

.post-footer {
  display: flex;
  justify-content: space-between;
}

.post-footer :deep(.el-space) {
  width: 100%;
}

.post-footer :deep(.el-button) {
  color: #999;
  font-size: 18px;
}

.post-footer :deep(.el-button:hover) {
  color: #667eea;
}

/* Scrollbar Styles */
.home-main::-webkit-scrollbar,
.home-sidebar::-webkit-scrollbar {
  width: 8px;
}

.home-main::-webkit-scrollbar-track,
.home-sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.home-main::-webkit-scrollbar-thumb,
.home-sidebar::-webkit-scrollbar-thumb {
  background: #dcdfe6;
  border-radius: 4px;
}

.home-main::-webkit-scrollbar-thumb:hover,
.home-sidebar::-webkit-scrollbar-thumb:hover {
  background: #bfcfe7;
}

/* Responsive */
@media (max-width: 768px) {
  .home-sidebar {
    width: 180px;
  }

  .search-input {
    display: none;
  }

  .welcome-actions {
    flex-direction: column;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .category-select {
    width: 100%;
  }
}
</style>