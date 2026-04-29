<template>
  <el-container class="app-layout">
    <el-header class="app-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="app-title" @click="goToHome">🔗 {{ $t('appName') }}</h1>
          <div class="top-nav">
            <el-button
              text
              class="top-nav-button"
              :class="{ 'top-nav-active': activeMenuPath.includes('/home') }"
              @click="handleMenuClick('/home')"
            >
              <el-icon><HomeFilled /></el-icon>
              <span>{{ $t('home') }}</span>
            </el-button>
            <el-button
              text
              class="top-nav-button"
              :class="{ 'top-nav-active': activeMenuPath.includes('/posts') }"
              @click="handleMenuClick('/posts')"
            >
              <el-icon><DocumentCopy /></el-icon>
              <span>{{ $t('posts') }}</span>
            </el-button>
            <el-button
              text
              class="top-nav-button"
              :class="{ 'top-nav-active': activeMenuPath.includes('/chat') }"
              @click="handleMenuClick('/chat')"
            >
              <el-icon><ChatLineRound /></el-icon>
              <span>{{ $t('messages') }}</span>
            </el-button>
            <el-button
              text
              class="top-nav-button"
              :class="{ 'top-nav-active': activeMenuPath.includes('/friends') }"
              @click="handleMenuClick('/friends')"
            >
              <el-icon><User /></el-icon>
              <span>{{ $t('friends') }}</span>
            </el-button>
          </div>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar :size="32" :src="userAvatar" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">{{ $t('profile') }}</el-dropdown-item>
                <el-dropdown-item command="settings">{{ $t('settings') }}</el-dropdown-item>
                <el-dropdown-item divided command="logout">{{ $t('logout') }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>

    <el-main class="app-main">
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { navigateTo } from '#app'
import { useI18n } from 'vue-i18n'
import { HomeFilled, DocumentCopy, User, ChatLineRound } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const { locale, setLocale } = useI18n()
const activeMenuPath = ref(route.path)
const userProfile = ref<any>(null)
const userSettings = ref<any>(null)

const userAvatar = computed(() => {
  return userProfile.value?.avatar || 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg'
})

const applyFontSize = (size: number | string) => {
  let fontSize = '18px'
  if (typeof size === 'number') {
    fontSize = `${size}px`
  }
  document.documentElement.style.setProperty('--base-font-size', fontSize)
  document.body.style.fontSize = fontSize
}

const applyThemeColor = (color: string) => {
  document.documentElement.style.setProperty('--el-color-primary', color)
  document.documentElement.style.setProperty('--user-theme-color', color)
}

const applyCompactMode = (isCompact: boolean) => {
  if (isCompact) {
    document.documentElement.style.setProperty('--spacing-unit', '8px')
    document.documentElement.style.setProperty('--card-padding', '12px')
    document.documentElement.style.setProperty('--element-height', '32px')
  } else {
    document.documentElement.style.setProperty('--spacing-unit', '16px')
    document.documentElement.style.setProperty('--card-padding', '20px')
    document.documentElement.style.setProperty('--element-height', '40px')
  }
}

const applyDarkMode = (isDark: boolean) => {
  if (isDark) {
    document.documentElement.classList.add('dark')
    document.body.classList.add('dark')
    document.body.style.backgroundColor = '#1a1a1a'
    document.body.style.color = '#e5e5e5'
  } else {
    document.documentElement.classList.remove('dark')
    document.body.classList.remove('dark')
    document.body.style.backgroundColor = '#f5f7fa'
    document.body.style.color = '#333'
  }
}

const loadUserSettings = () => {
  const savedSettings = localStorage.getItem('userSettings')
  if (!savedSettings) {
    applyDarkMode(false)
    return
  }
  userSettings.value = JSON.parse(savedSettings)
  if (userSettings.value.fontSizeValue) {
    applyFontSize(userSettings.value.fontSizeValue)
  }
  if (userSettings.value.themeColor) {
    applyThemeColor(userSettings.value.themeColor)
  }
  if (userSettings.value.darkMode !== undefined) {
    applyDarkMode(userSettings.value.darkMode)
  }
  if (userSettings.value.compactMode !== undefined) {
    applyCompactMode(userSettings.value.compactMode)
  }
}

const loadUserProfile = () => {
  const savedProfile = localStorage.getItem('userProfile')
  if (savedProfile) {
    userProfile.value = JSON.parse(savedProfile)
  }
}

const loadUserLanguage = () => {
  const savedLanguage = localStorage.getItem('userLanguage')
  if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh') && locale.value !== savedLanguage) {
    setLocale(savedLanguage)
  }
}

onMounted(() => {
  loadUserLanguage()
  loadUserProfile()
  loadUserSettings()
  window.addEventListener('storage', () => {
    loadUserLanguage()
    loadUserProfile()
    loadUserSettings()
  })
})

watch(
  () => route.path,
  (newPath) => {
    activeMenuPath.value = newPath
    loadUserProfile()
    loadUserSettings()
  },
  { immediate: true }
)

const handleMenuClick = (path: string) => {
  navigateTo(path)
}

const goToHome = () => {
  router.push('/home')
}

const handleCommand = (command: string) => {
  if (command === 'logout') {
    localStorage.removeItem('token')
    localStorage.removeItem('userToken')
    router.push('/')
  } else if (command === 'profile') {
    router.push('/profile')
  } else if (command === 'settings') {
    router.push('/settings')
  }
}
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f7fa;
}

.app-header {
  background: white;
  border-bottom: 1px solid #e5e5e5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 0 !important;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 18px;
  min-width: 0;
}

.app-title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #333;
  cursor: pointer;
  white-space: nowrap;
}

.top-nav {
  display: flex;
  align-items: center;
  gap: 6px;
}

.top-nav-button {
  border-radius: 12px;
  padding: 8px 12px;
}

.top-nav-button span {
  margin-left: 6px;
}

.top-nav-active {
  color: var(--el-color-primary) !important;
  background-color: color-mix(in srgb, var(--el-color-primary) 10%, transparent);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.el-dropdown-link {
  cursor: pointer;
}

.app-main {
  flex: 1;
  padding: var(--card-padding, 20px);
  overflow-y: auto;
  font-size: var(--base-font-size, 14px);
  background: transparent;
}

.app-main::-webkit-scrollbar {
  width: 6px;
}

.app-main::-webkit-scrollbar-track {
  background: transparent;
}

.app-main::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.app-main::-webkit-scrollbar-thumb:hover {
  background: #999;
}

:global(.dark) .app-layout {
  background: #020617;
}

:global(.dark) .app-header {
  background: #0f172a;
  border-bottom-color: #1e293b;
  box-shadow: 0 2px 8px rgba(2, 6, 23, 0.5);
}

:global(.dark) .app-title,
:global(.dark) .top-nav-button,
:global(.dark) .top-nav-button span {
  color: #e2e8f0;
}

:global(.dark) .top-nav-active {
  color: #f8fafc !important;
  background-color: color-mix(in srgb, var(--el-color-primary) 30%, transparent);
}

:global(.dark) .app-main::-webkit-scrollbar-thumb {
  background: #334155;
}

:global(.dark) .app-main::-webkit-scrollbar-thumb:hover {
  background: #475569;
}
</style>