<template>
  <NuxtLayout name="default">
    <div class="friends-page-shell">
      <div class="friends-light light-a"></div>
      <div class="friends-light light-b"></div>
      <div class="friends-pattern"></div>
    <div class="friends-toolbar">
      <div class="friends-toolbar-search">
        <el-input
          v-model="searchQuery"
          :placeholder="$t('searchFriends')"
          clearable
          style="width: 300px;"
        />
      </div>
      <div class="friends-toolbar-actions">
        <el-select v-model="filterStatus" :placeholder="$t('status')" style="width: 150px;">
          <el-option :label="$t('all')" value="" />
          <el-option :label="$t('online')" value="online" />
          <el-option :label="$t('offline')" value="offline" />
        </el-select>
      </div>
    </div>

    <div class="friends-grid">
      <el-card v-for="friend in filteredFriends" :key="friend.id" class="friend-card">
        <div class="friend-content">
          <div class="friend-avatar-wrapper">
            <el-avatar :size="80" :src="friend.avatar" />
            <span :class="['online-indicator', friend.status]"></span>
          </div>
          
          <div class="friend-info">
            <h3>{{ friend.name }}</h3>
            <p class="friend-status">{{ friend.status === 'online' ? $t('online') : $t('offline') }}</p>
          </div>

          <div class="friend-actions">
            <el-button size="small">
              <template #icon>
                <el-icon><Phone /></el-icon>
              </template>
              {{ $t('call') }}
            </el-button>
            <el-button type="primary" size="small" @click="sendMessage(friend)">
              <template #icon>
                <el-icon><Message /></el-icon>
              </template>
              {{ $t('message') }}
            </el-button>
          </div>

          <p class="friend-bio">{{ friend.bio }}</p>
        </div>
      </el-card>
    </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Message, Phone } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t, locale } = useI18n()
const language = computed(() => locale.value as 'en' | 'zh')
const searchQuery = ref('')
const filterStatus = ref('')

interface Friend {
  id: number
  name: string
  avatar: string
  status: 'online' | 'offline'
  bio: string
}

const friends = ref<Friend[]>([
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg',
    status: 'online',
    bio: 'Love hiking and outdoor activities'
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://cube.elemecdn.com/3/dc/1ea6beec64f4a146f6f02a42cc5f7.svg',
    status: 'online',
    bio: 'Coffee enthusiast and bookworm'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg',
    status: 'offline',
    bio: 'Tech enthusiast and gamer'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    avatar: 'https://cube.elemecdn.com/3/dc/1ea6beec64f4a146f6f02a42cc5f7.svg',
    status: 'online',
    bio: 'Yoga instructor and wellness coach'
  },
  {
    id: 5,
    name: 'David Brown',
    avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg',
    status: 'offline',
    bio: 'Photographer and travel blogger'
  },
  {
    id: 6,
    name: 'Emily Davis',
    avatar: 'https://cube.elemecdn.com/3/dc/1ea6beec64f4a146f6f02a42cc5f7.svg',
    status: 'online',
    bio: 'Artist and creative designer'
  }
])

const filteredFriends = computed(() => {
  return friends.value.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !filterStatus.value || friend.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

const sendMessage = (friend: Friend) => {
  router.push({ path: '/chat', query: { userId: friend.id } })
}
</script>

<style scoped>
.friends-page-shell {
  position: relative;
  border-radius: 28px;
  padding: 22px;
  overflow: hidden;
  border: 1px solid rgba(109, 125, 219, 0.28);
  background:
    radial-gradient(140% 120% at 0% 0%, rgba(79, 70, 229, 0.22), rgba(255, 255, 255, 0) 58%),
    radial-gradient(130% 140% at 100% 0%, rgba(6, 182, 212, 0.16), rgba(255, 255, 255, 0) 62%),
    linear-gradient(166deg, rgba(255, 255, 255, 0.96), rgba(242, 247, 255, 0.92));
  box-shadow: 0 40px 72px rgba(39, 52, 130, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.78);
}

.friends-light {
  position: absolute;
  border-radius: 999px;
  pointer-events: none;
}

.light-a {
  width: 260px;
  height: 260px;
  top: -90px;
  left: -70px;
  background: radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.54), rgba(99, 102, 241, 0));
}

.light-b {
  width: 300px;
  height: 300px;
  bottom: -120px;
  right: -80px;
  background: radial-gradient(circle at 45% 40%, rgba(6, 182, 212, 0.48), rgba(6, 182, 212, 0));
}

.friends-pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: radial-gradient(circle at 50% 35%, #000 40%, transparent 82%);
}

.friends-toolbar {
  display: flex;
  gap: 14px;
  margin-bottom: 24px;
  align-items: center;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid rgba(129, 140, 248, 0.2);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(244, 248, 255, 0.92));
  box-shadow: 0 16px 30px rgba(47, 60, 137, 0.14);
  position: relative;
  z-index: 1;
}

.friends-toolbar-search {
  flex: 1;
}

.friends-toolbar-actions {
  display: flex;
  justify-content: flex-end;
}

.friends-toolbar :deep(.el-input__wrapper),
.friends-toolbar :deep(.el-select__wrapper) {
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.2) inset, 0 8px 16px rgba(67, 80, 154, 0.1);
}

.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 22px;
  position: relative;
  z-index: 1;
}

.friend-card {
  border-radius: 20px;
  border: 1px solid rgba(129, 140, 248, 0.18);
  background:
    radial-gradient(130% 130% at 0% 0%, rgba(99, 102, 241, 0.12), rgba(255, 255, 255, 0) 60%),
    linear-gradient(150deg, rgba(255, 255, 255, 0.96), rgba(245, 249, 255, 0.94));
  box-shadow: 0 20px 36px rgba(47, 60, 137, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.76);
  transition: transform 0.3s, box-shadow 0.3s;
}

.friend-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 26px 44px rgba(47, 60, 137, 0.22);
}

.friend-content {
  padding: 24px 20px;
  text-align: center;
}

.friend-avatar-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 12px;
}

.online-indicator {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 3px solid #fff;
  bottom: 0;
  right: 0;
  box-shadow: 0 0 0 4px rgba(15, 23, 42, 0.08);
}

.online-indicator.online {
  background: #67c23a;
}

.online-indicator.offline {
  background: #999;
}

.friend-info h3 {
  margin: 12px 0 4px 0;
  color: #1d2850;
  font-size: 20px;
  letter-spacing: 0.01em;
}

.friend-status {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #6b74a3;
}

.friend-bio {
  margin: 8px 0;
  color: #596289;
  font-size: 17px;
  line-height: 1.5;
}

.friend-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: center;
}

.friend-actions button {
  flex: 1;
  border-radius: 12px;
}

.friends-page-shell :deep(.el-button--primary) {
  background: linear-gradient(145deg, #4f46e5, #6366f1) !important;
  border: 1px solid rgba(177, 188, 255, 0.55) !important;
}

:global(.dark) .friends-toolbar {
  border-color: rgba(129, 140, 248, 0.34);
  background: linear-gradient(150deg, rgba(23, 30, 58, 0.95), rgba(16, 22, 45, 0.92));
  box-shadow: 0 18px 34px rgba(2, 6, 20, 0.56);
}

:global(.dark) .friends-toolbar :deep(.el-input__wrapper),
:global(.dark) .friends-toolbar :deep(.el-select__wrapper) {
  background: rgba(16, 22, 44, 0.88);
  box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.36) inset, 0 8px 16px rgba(1, 5, 15, 0.52);
}

:global(.dark) .friend-card {
  border-color: rgba(129, 140, 248, 0.3);
  background:
    radial-gradient(130% 130% at 0% 0%, rgba(79, 70, 229, 0.28), rgba(21, 28, 57, 0.1) 60%),
    linear-gradient(155deg, rgba(24, 31, 61, 0.95), rgba(18, 24, 49, 0.92));
  box-shadow: 0 22px 38px rgba(2, 6, 20, 0.58), inset 0 1px 0 rgba(160, 178, 255, 0.14);
}

:global(.dark) .friend-info h3 {
  color: #e8eeff;
}

:global(.dark) .friend-status {
  color: #b8c3ed;
}

:global(.dark) .friend-bio {
  color: #d2dcff;
}

:global(.dark) .online-indicator {
  border-color: #1b2244;
  box-shadow: 0 0 0 4px rgba(129, 140, 248, 0.2);
}

:global(.dark) .friends-page-shell {
  border-color: rgba(129, 140, 248, 0.45);
  background:
    radial-gradient(145% 125% at 0% 0%, rgba(79, 70, 229, 0.46), rgba(10, 16, 34, 0.08) 58%),
    radial-gradient(135% 150% at 100% 0%, rgba(6, 182, 212, 0.24), rgba(10, 16, 34, 0.08) 62%),
    linear-gradient(165deg, rgba(12, 18, 38, 0.98), rgba(20, 28, 56, 0.95));
  box-shadow: 0 44px 80px rgba(1, 5, 15, 0.72), inset 0 1px 0 rgba(169, 188, 255, 0.2);
}

:global(.dark) .friends-pattern {
  background-image: linear-gradient(rgba(129, 140, 248, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(129, 140, 248, 0.08) 1px, transparent 1px);
}

.friends-page-shell {
  backdrop-filter: blur(14px);
}

.friends-page-shell::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  pointer-events: none;
}

.friend-card {
  overflow: hidden;
}

.friend-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(118deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0) 45%);
  pointer-events: none;
}

.friend-info h3 {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 15px;
  font-weight: 700;
}

.friends-page-shell :deep(.el-button) {
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 12px;
}

:global(.dark) .friends-page-shell {
  backdrop-filter: blur(18px);
}

:global(.dark) .friends-page-shell::before {
  border-color: rgba(171, 185, 255, 0.28);
}

:global(.dark) .friend-card::after {
  background: linear-gradient(118deg, rgba(199, 210, 254, 0.14), rgba(199, 210, 254, 0) 45%);
}

/* Marketplace-inspired override */
.friends-light,
.friends-pattern {
  display: none !important;
}

.friends-page-shell {
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}

.friends-page-shell::before,
.friends-page-shell::after {
  display: none !important;
}

.friends-toolbar,
.friend-card {
  background: #ffffff !important;
  border: 1px solid #eceef3 !important;
  border-radius: 12px !important;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05) !important;
}

.friend-card:hover {
  transform: none !important;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08) !important;
}

.friend-card::after {
  display: none !important;
}

.friend-info h3 {
  text-transform: none !important;
  letter-spacing: 0 !important;
  font-size: 20px !important;
}

.friends-page-shell :deep(.el-input__wrapper),
.friends-page-shell :deep(.el-select__wrapper) {
  background: #ffffff !important;
  box-shadow: 0 0 0 1px #dfe3eb inset !important;
  border-radius: 10px !important;
}

.friends-page-shell :deep(.el-button--primary) {
  background: #ff6f00 !important;
  border-color: #ff6f00 !important;
}

.friends-page-shell :deep(.el-button--primary:hover) {
  background: #f06500 !important;
  border-color: #f06500 !important;
}

:global(.dark) .friends-page-shell,
:global(.dark) .friends-toolbar,
:global(.dark) .friend-card {
  background: #111827 !important;
  border-color: #1f2937 !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35) !important;
}

:global(.dark) .friends-page-shell :deep(.el-input__wrapper),
:global(.dark) .friends-page-shell :deep(.el-select__wrapper) {
  background: #0f172a !important;
  box-shadow: 0 0 0 1px #334155 inset !important;
}

/* Final dark enforcement for friends page containers */
:global(html.dark) .friends-toolbar,
:global(body.dark) .friends-toolbar,
:global(.dark) .friends-toolbar,
:global(html.dark) .friend-card,
:global(body.dark) .friend-card,
:global(.dark) .friend-card {
  background: #111827 !important;
  border-color: #334155 !important;
  color: #e2e8f0 !important;
}

:global(html.dark) .friend-card :deep(.el-card__body),
:global(body.dark) .friend-card :deep(.el-card__body),
:global(.dark) .friend-card :deep(.el-card__body) {
  background: transparent !important;
}

:global(html.dark) .friends-toolbar :deep(.el-input__wrapper),
:global(html.dark) .friends-toolbar :deep(.el-select__wrapper),
:global(body.dark) .friends-toolbar :deep(.el-input__wrapper),
:global(body.dark) .friends-toolbar :deep(.el-select__wrapper),
:global(.dark) .friends-toolbar :deep(.el-input__wrapper),
:global(.dark) .friends-toolbar :deep(.el-select__wrapper) {
  background: #0f172a !important;
  box-shadow: 0 0 0 1px #334155 inset !important;
  color: #e2e8f0 !important;
}

:global(html.dark) .friend-info h3,
:global(html.dark) .friend-status,
:global(html.dark) .friend-bio,
:global(body.dark) .friend-info h3,
:global(body.dark) .friend-status,
:global(body.dark) .friend-bio,
:global(.dark) .friend-info h3,
:global(.dark) .friend-status,
:global(.dark) .friend-bio {
  color: #e2e8f0 !important;
}
</style>
