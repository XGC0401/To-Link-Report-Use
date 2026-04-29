<template>
  <NuxtLayout name="default">
    <div class="home-page-shell">
      <div class="home-aurora aurora-left"></div>
      <div class="home-aurora aurora-right"></div>
      <div class="home-grain"></div>
    <!-- Welcome Section -->
    <div class="welcome-section">
      <div class="weather-card" aria-label="weather card">
        <section class="weather-info-section">
          <div class="weather-background-design">
            <div class="weather-circle"></div>
            <div class="weather-circle"></div>
            <div class="weather-circle"></div>
          </div>
          <div class="weather-left-side">
            <div class="weather-main">
              <div>
                <svg stroke="#ffffff" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                  <path
                    d="M512 704a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm0-704a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 768a32 32 0 0 1 32 32v64a32 32 0 1 1-64 0v-64a32 32 0 0 1 32-32zM195.2 195.2a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 1 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm543.104 543.104a32 32 0 0 1 45.248 0l45.248 45.248a32 32 0 0 1-45.248 45.248l-45.248-45.248a32 32 0 0 1 0-45.248zM64 512a32 32 0 0 1 32-32h64a32 32 0 0 1 0 64H96a32 32 0 0 1-32-32zm768 0a32 32 0 0 1 32-32h64a32 32 0 1 1 0 64h-64a32 32 0 0 1-32-32zM195.2 828.8a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248L240.448 828.8a32 32 0 0 1-45.248 0zm543.104-543.104a32 32 0 0 1 0-45.248l45.248-45.248a32 32 0 0 1 45.248 45.248l-45.248 45.248a32 32 0 0 1-45.248 0z"
                    fill="#ffffff"
                  ></path>
                </svg>
              </div>
              <div>{{ weather.condition }}</div>
            </div>
            <div class="weather-temperature">{{ weather.temperature }}</div>
            <div class="weather-range">{{ weather.range }}</div>
          </div>
          <div class="weather-right-side">
            <div>
              <div class="weather-hour">{{ weather.hour }}</div>
              <div class="weather-date">{{ weather.date }}</div>
            </div>
            <div class="weather-city">{{ weather.city }}</div>
          </div>
        </section>
        <section class="weather-days-section">
          <button v-for="day in weather.days" :key="day.date" type="button">
            <span class="weather-day">{{ day.label }}</span>
            <span class="weather-day-range">{{ day.range }}</span>
            <span class="weather-day-condition">{{ day.condition }}</span>
          </button>
        </section>
      </div>
      <el-card class="welcome-card">
        <template #header>
          <div class="card-header">
            <h2>{{ $t('welcomeTitle') }}</h2>
          </div>
        </template>
        <p>{{ $t('welcomeMessage') }}</p>
        <div class="welcome-actions">
          <el-button type="primary" size="large" @click="goToCreatePost">
            {{ $t('createNewPost') }}
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- Content Grid: Recent Posts, Pending Quest, Accepted Quest -->
    <div class="content-grid">
      <!-- Recent Posts Section -->
      <div class="posts-section">
        <div class="section-header">
          <h3>{{ $t('recentPosts') }}</h3>
        </div>

        <div v-if="isLoadingPosts" class="posts-loading">
          <el-icon class="is-loading posts-loading-icon" :size="28"><Loading /></el-icon>
          <p class="posts-loading-text">{{ $t('loadingPosts') }}</p>
          <el-skeleton :rows="3" animated />
        </div>
        <el-empty
          v-else-if="recentPosts.length === 0"
          :description="$t('noPosts')"
        />
        <div v-else class="posts-list">
          <el-card v-for="post in recentPosts" :key="post.id" class="post-card">
            <template #header>
              <div class="post-header">
                <div class="post-author">
                  <el-avatar :size="40" />
                  <div class="author-info">
                    <p class="author-name">{{ post.user?.username || post.user?.email || $t('unknownUser') }}</p>
                    <p class="post-time">{{ formatDate(post.createTime) }}</p>
                  </div>
                </div>
              </div>
            </template>

            <div class="post-content">
              <h4>{{ post.title }}</h4>
              <p>{{ post.content }}</p>
              <div class="post-tags">
                <el-tag v-if="isMyPost(post)" type="info" class="post-tag">{{ $t('yourPost') }}</el-tag>
                <el-tag class="post-tag">{{ getCategoryLabel(post) }}</el-tag>
                <el-tag v-if="post.is_important" type="danger" class="post-tag">{{ $t('important') }}</el-tag>
                <el-tag v-if="post.redeemPoints" type="warning" class="post-tag">
                  {{ post.redeemPoints }} {{ $t('points') }}
                </el-tag>
              </div>
            </div>

            <template #footer>
              <div class="post-footer">
                <el-space>
                  <el-button text :icon="Star">{{ 0 }}</el-button>
                  <el-button text :icon="ChatDotRound">{{ 0 }}</el-button>
                </el-space>
              </div>
            </template>
          </el-card>
        </div>
      </div>

      <!-- Pending Quest Section -->
      <div class="quests-section">
        <div class="section-header">
          <h3>{{ $t('pendingQuest') }}</h3>
        </div>

        <el-empty
          v-if="pendingQuests.length === 0"
          :description="$t('noPendingQuests')"
        />
        <div v-else class="quests-list pending-list">
          <el-card v-for="quest in pendingQuests" :key="`pending-${quest.id}`" class="post-card">
            <template #header>
              <div class="post-header">
                <div class="post-author">
                  <el-avatar :size="40" />
                  <div class="author-info">
                    <p class="author-name">{{ quest.author || $t('unknownUser') }}</p>
                    <p class="post-time">{{ quest.time }}</p>
                  </div>
                </div>
              </div>
            </template>

            <div class="post-content">
              <h4>{{ quest.title }}</h4>
              <p>{{ quest.detail }}</p>
              <div class="post-tags">
                <el-tag type="warning" class="post-tag">{{ $t('questOnHold') }}</el-tag>
                <el-tag type="info" class="post-tag">
                  {{ $t('pendingApplicants') }}: {{ quest.pendingApplicants?.length || 0 }}
                </el-tag>
              </div>

              <div class="pending-applicants" v-if="quest.pendingApplicants?.length">
                <div v-for="applicant in quest.pendingApplicants" :key="`${quest.id}-${applicant.userId}`" class="applicant-item">
                  <el-button type="primary" size="small" @click="approveApplicant(quest.id, applicant.userId)">
                    {{ $t('approve') }}
                  </el-button>
                  <div class="applicant-info">
                    <p class="author-name">{{ applicant.userName }}</p>
                    <p class="post-time">{{ applicant.introduction }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>

      <!-- Accepted Quest Section -->
      <div class="quests-section">
        <div class="section-header">
          <h3>{{ $t('acceptedQuest') }}</h3>
        </div>

        <el-empty
          v-if="acceptedQuests.length === 0"
          :description="$t('noAcceptedQuests')"
        />
        <div v-else class="quests-list accepted-list">
          <el-card v-for="quest in acceptedQuests" :key="`accepted-${quest.id}`" class="post-card">
            <template #header>
              <div class="post-header">
                <div class="post-author">
                  <el-avatar :size="40" />
                  <div class="author-info">
                    <p class="author-name">{{ quest.acceptedBy || $t('unknownUser') }}</p>
                    <p class="post-time">{{ quest.time }}</p>
                  </div>
                </div>
              </div>
            </template>

            <div class="post-content">
              <h4>✅ {{ quest.title }}</h4>
              <p>{{ quest.detail }}</p>
              <div class="post-tags">
                <el-tag type="success" class="post-tag">{{ $t('acceptedQuest') }}</el-tag>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import {
  Star,
  ChatDotRound,
  Loading
} from '@element-plus/icons-vue'
import { getPost } from '~/api/post'
import { getUser } from '~/api/auth'
import type { Post } from '~/api/types/post'

const router = useRouter()
const { t, locale } = useI18n()
const allPosts = ref<Post[]>([])
const questRequests = ref<any[]>([])
const isLoadingPosts = ref(false)
const currentUserEmail = ref<string>('')
const currentUserId = ref<string>('')

type WeatherDay = {
  date: string
  label: string
  range: string
  condition: string
}

type ClientIpLocation = {
  latitude?: number
  longitude?: number
  city?: string
  country_name?: string
}

const weather = ref({
  condition: t('weatherUnknown'),
  temperature: '--°',
  range: '--°/--°',
  hour: '--:--',
  date: '--',
  city: t('weatherCity'),
  days: [] as WeatherDay[]
})

const resolvedWeatherLocation = ref<{
  lat: number
  lon: number
  hint?: string
} | null>(null)
let weatherRefreshTimer: ReturnType<typeof setInterval> | null = null

const formatWeatherDayLabel = (date: string) => {
  const formatterLocale = locale.value === 'zh' ? 'zh-HK' : 'en-US'
  return new Date(`${date}T00:00:00`).toLocaleDateString(formatterLocale, {
    weekday: 'short'
  }).toUpperCase()
}

const getWeatherConditionKey = (weatherCode: number) => {
  if (weatherCode === 0) return 'weatherClear'
  if ([1, 2].includes(weatherCode)) return 'weatherPartlyCloudy'
  if (weatherCode === 3) return 'weatherCloudy'
  if ([45, 48].includes(weatherCode)) return 'weatherFog'
  if ([51, 53, 55, 56, 57].includes(weatherCode)) return 'weatherDrizzle'
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) return 'weatherRain'
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return 'weatherSnow'
  if ([95, 96, 99].includes(weatherCode)) return 'weatherThunderstorm'
  return 'weatherUnknown'
}

const loadWeather = async (lat?: number, lon?: number, locationHint?: string) => {
  try {
    const query = new URLSearchParams({
      lang: locale.value === 'zh' ? 'zh' : 'en'
    })

    if (typeof lat === 'number' && typeof lon === 'number') {
      query.set('lat', String(lat))
      query.set('lon', String(lon))
    }

    const response = await $fetch<{
      city?: string
      country?: string
      timezone?: string
      coordinates?: {
        latitude: number
        longitude: number
      }
      locationSource?: 'query' | 'header' | 'ip' | 'default'
      current?: {
        time?: string
        temperature?: number
        weatherCode?: number
      }
      daily?: Array<{
        date: string
        weatherCode: number
        minTemperature: number
        maxTemperature: number
      }>
    }>(`/api/weather?${query.toString()}`)

    const now = new Date()
    const formatterLocale = locale.value === 'zh' ? 'zh-HK' : 'en-US'
    const timezone = response.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
    const hour = now.toLocaleTimeString(formatterLocale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: timezone
    })
    const date = now.toLocaleDateString(formatterLocale, {
      weekday: 'short',
      month: '2-digit',
      day: '2-digit',
      timeZone: timezone
    }).toUpperCase()

    const today = response.daily?.[0]
    const weatherCode = response.current?.weatherCode ?? today?.weatherCode ?? -1
    const dayRange = today
      ? `${Math.round(today.maxTemperature)}°/${Math.round(today.minTemperature)}°`
      : '--°/--°'
    const coordinateLabel =
      typeof response.coordinates?.latitude === 'number' && typeof response.coordinates?.longitude === 'number'
        ? `${response.coordinates.latitude.toFixed(3)}, ${response.coordinates.longitude.toFixed(3)}`
        : (typeof lat === 'number' && typeof lon === 'number'
          ? `${lat.toFixed(3)}, ${lon.toFixed(3)}`
          : '')

    const locationLabel =
      [response.city, response.country].filter(Boolean).join(', ')
      || locationHint
      || coordinateLabel
      || t('weatherLocationUnknown')

    if (typeof lat === 'number' && typeof lon === 'number') {
      resolvedWeatherLocation.value = {
        lat,
        lon,
        hint: locationHint
      }
    }

    weather.value = {
      condition: t(getWeatherConditionKey(weatherCode)),
      temperature: typeof response.current?.temperature === 'number' ? `${Math.round(response.current.temperature)}°` : '--°',
      range: dayRange,
      hour,
      date,
      city: locationLabel,
      days: (response.daily || [])
        .slice(1, 5)
        .map((item) => ({
          date: item.date,
          label: formatWeatherDayLabel(item.date),
          range: `${Math.round(item.maxTemperature)}°/${Math.round(item.minTemperature)}°`,
          condition: t(getWeatherConditionKey(item.weatherCode))
        }))
    }
  } catch (error) {
    console.error('Failed to load weather:', error)
  }
}

const loadWeatherByClientIp = async () => {
  try {
    const ipLocation = await $fetch<ClientIpLocation>('https://ipapi.co/json/', {
      timeout: 3000
    })

    const latitude = ipLocation.latitude
    const longitude = ipLocation.longitude
    const hint = [ipLocation.city, ipLocation.country_name].filter(Boolean).join(', ')

    if (typeof latitude === 'number' && typeof longitude === 'number') {
      resolvedWeatherLocation.value = {
        lat: latitude,
        lon: longitude,
        hint
      }
      await loadWeather(latitude, longitude, hint)
      return
    }
  } catch (error) {
    console.error('Failed to resolve client IP location:', error)
  }

  await loadWeather()
}

const refreshWeatherCard = async () => {
  if (resolvedWeatherLocation.value) {
    await loadWeather(
      resolvedWeatherLocation.value.lat,
      resolvedWeatherLocation.value.lon,
      resolvedWeatherLocation.value.hint
    )
    return
  }

  await loadWeatherByClientIp()
}

const goToCreatePost = () => {
  router.push('/create-post')
}

const mergePosts = (localPosts: Post[], remotePosts: Post[]) => {
  const postMap = new Map<number, Post>()

  ;[...localPosts, ...remotePosts].forEach((post) => {
    if (!post || typeof post.id !== 'number') {
      return
    }

    const existing = postMap.get(post.id)
    postMap.set(post.id, {
      ...existing,
      ...post,
      user: post.user || existing?.user
    })
  })

  return Array.from(postMap.values()).sort((a, b) => {
    const left = a.createTime ? new Date(a.createTime).getTime() : a.id
    const right = b.createTime ? new Date(b.createTime).getTime() : b.id
    return right - left
  })
}

// Show all posts (or limit to a reasonable number like 20)
const recentPosts = computed(() => {
  return allPosts.value
    .slice(0, 20)
})

const pendingQuests = computed(() => {
  if (!currentUserId.value) {
    return []
  }

  return questRequests.value.filter((quest) =>
    String(quest.authorId) === String(currentUserId.value)
    && !quest.acceptedBy
    && Array.isArray(quest.pendingApplicants)
    && quest.pendingApplicants.length > 0
  )
})

const acceptedQuests = computed(() => {
  if (!currentUserId.value) {
    return []
  }

  return questRequests.value.filter((quest) =>
    String(quest.authorId) === String(currentUserId.value)
    && !!quest.acceptedBy
  )
})

// Check if post belongs to current user
const isMyPost = (post: Post) => {
  return currentUserEmail.value && post.user?.email === currentUserEmail.value
}

// Format date helper
const formatDate = (date: Date | undefined) => {
  if (!date) return 'Unknown'
  return new Date(date).toLocaleString()
}

// Get category label
const getCategoryLabel = (post: Post) => {
  if (post.category && post.category.trim()) {
    return post.category.trim()
  }

  const categories: Record<number, string> = {
    0: t('shopping'),
    1: t('repair'),
    2: t('care'),
    3: t('daily'),
    4: t('other')
  }
  return categories[post.request_type] || t('other')
}

const persistQuestRequests = () => {
  localStorage.setItem('userQuests', JSON.stringify(questRequests.value))
}

const approveApplicant = (questId: number, applicantId: string) => {
  const quest = questRequests.value.find((item) => item.id === questId)
  if (!quest || !Array.isArray(quest.pendingApplicants)) {
    return
  }

  const targetApplicant = quest.pendingApplicants.find((applicant: any) => String(applicant.userId) === String(applicantId))
  if (!targetApplicant) {
    return
  }

  quest.acceptedBy = targetApplicant.userName
  quest.acceptedById = targetApplicant.userId
  quest.status = 'accepted'
  quest.pendingApplicants = []
  persistQuestRequests()
  ElMessage.success(t('questApprovedSuccess'))
}

// Load posts from API and accepted quests from localStorage
onMounted(async () => {
  if (typeof navigator !== 'undefined' && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        resolvedWeatherLocation.value = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
        await loadWeather(position.coords.latitude, position.coords.longitude)
      },
      async () => {
        await loadWeatherByClientIp()
      },
      {
        timeout: 8000,
        maximumAge: 5 * 60 * 1000
      }
    )
  } else {
    await loadWeatherByClientIp()
  }

  weatherRefreshTimer = setInterval(() => {
    refreshWeatherCard()
  }, 60 * 1000)

  // Load current user info
  try {
    const [userError, userData] = await getUser()
    if (!userError && userData) {
      currentUserEmail.value = userData.email as string
      currentUserId.value = String((userData as any).uuid || userData.email)
      console.log('Current user loaded:', currentUserEmail.value)
    }
  } catch (err) {
    console.error('Failed to load user:', err)
  }

  // Load quests from localStorage
  const userQuests = localStorage.getItem('userQuests')
  if (userQuests) {
    try {
      const quests = JSON.parse(userQuests)
      if (Array.isArray(quests)) {
        questRequests.value = quests
      }
    } catch (e) {
      console.error('Error parsing quests:', e)
    }
  }
  
  // Fetch recent posts from API
  isLoadingPosts.value = true
  try {
    const userPostsRaw = localStorage.getItem('userPosts')
    const userPosts = userPostsRaw ? JSON.parse(userPostsRaw) : []
    if (Array.isArray(userPosts) && userPosts.length > 0) {
      allPosts.value = mergePosts(userPosts, allPosts.value)
    }

    const [error, data] = await getPost()
    if (!error && data && data.data && Array.isArray(data.data)) {
      allPosts.value = mergePosts(userPosts, data.data)
      console.log('Loaded posts:', data.data.length)
    } else {
      console.error('Error fetching posts:', error)
    }
  } catch (err) {
    console.error('Failed to fetch posts:', err)
  } finally {
    isLoadingPosts.value = false
  }
})

onUnmounted(() => {
  if (weatherRefreshTimer) {
    clearInterval(weatherRefreshTimer)
    weatherRefreshTimer = null
  }
})

</script>

<style scoped>
.home-page-shell {
  position: relative;
  padding: 24px;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid rgba(109, 125, 219, 0.28);
  background:
    radial-gradient(140% 120% at 0% 0%, rgba(79, 70, 229, 0.2), rgba(255, 255, 255, 0) 58%),
    radial-gradient(130% 140% at 100% 0%, rgba(6, 182, 212, 0.15), rgba(255, 255, 255, 0) 62%),
    linear-gradient(166deg, rgba(255, 255, 255, 0.96), rgba(242, 247, 255, 0.92));
  box-shadow: 0 40px 72px rgba(39, 52, 130, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.78);
}

.home-aurora {
  position: absolute;
  border-radius: 999px;
  pointer-events: none;
}

.aurora-left {
  width: 320px;
  height: 320px;
  top: -120px;
  left: -90px;
  background: radial-gradient(circle at 35% 35%, rgba(99, 102, 241, 0.52), rgba(99, 102, 241, 0));
}

.aurora-right {
  width: 340px;
  height: 340px;
  bottom: -140px;
  right: -90px;
  background: radial-gradient(circle at 45% 40%, rgba(6, 182, 212, 0.5), rgba(6, 182, 212, 0));
}

.home-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
  background-size: 26px 26px;
  mask-image: radial-gradient(circle at 40% 35%, #000 36%, transparent 84%);
}

.welcome-section {
  margin-bottom: 28px;
  width: 100%;
  position: relative;
  z-index: 1;
}

.welcome-card {
  border-radius: 22px;
  border: 1px solid rgba(129, 140, 248, 0.24);
  background:
    radial-gradient(120% 130% at 0% 0%, rgba(99, 102, 241, 0.18), rgba(255, 255, 255, 0) 58%),
    radial-gradient(130% 140% at 100% 0%, rgba(14, 165, 233, 0.14), rgba(255, 255, 255, 0) 62%),
    linear-gradient(150deg, rgba(255, 255, 255, 0.96), rgba(243, 247, 255, 0.92));
  box-shadow: 0 26px 54px rgba(43, 57, 134, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.78);
}

.card-header h2 {
  margin: 0;
  font-size: 34px;
  color: #222c55;
  letter-spacing: 0.02em;
  text-shadow: 0 2px 12px rgba(99, 102, 241, 0.22);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.welcome-actions {
  display: flex;
  gap: 14px;
  margin-top: 0;
}

.welcome-actions :deep(.el-button--primary) {
  background-color: var(--el-color-primary) !important;
  border-color: var(--el-color-primary) !important;
  color: white !important;
}

.welcome-actions :deep(.el-button--primary:hover) {
  background-color: color-mix(in srgb, var(--el-color-primary) 80%, black) !important;
  border-color: color-mix(in srgb, var(--el-color-primary) 80%, black) !important;
}

.welcome-actions :deep(.el-button--primary:focus),
.welcome-actions :deep(.el-button--primary:active) {
  background-color: color-mix(in srgb, var(--el-color-primary) 80%, black) !important;
  border-color: color-mix(in srgb, var(--el-color-primary) 80%, black) !important;
}

.posts-loading {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.posts-loading-icon {
  align-self: center;
  color: var(--el-color-primary);
}

.posts-loading-text {
  margin: 0;
  text-align: center;
  color: var(--el-text-color-secondary);
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
  margin-top: 0;
  width: 100%;
  position: relative;
  z-index: 1;
}

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

.posts-section {
  width: 100%;
  padding: 18px;
  border-radius: 18px;
  border: 1px solid rgba(129, 140, 248, 0.2);
  background: linear-gradient(152deg, rgba(255, 255, 255, 0.94), rgba(246, 249, 255, 0.9));
  box-shadow: 0 18px 36px rgba(48, 62, 140, 0.12);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(129, 140, 248, 0.2);
}

.section-header h3 {
  margin: 0;
  font-size: 24px;
  color: #273163;
  letter-spacing: 0.01em;
}

.category-select {
  width: 150px;
}

.posts-list {
  display: grid;
  gap: 16px;
}

.post-card {
  border-radius: 16px;
  border: 1px solid rgba(129, 140, 248, 0.16);
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.96), rgba(247, 250, 255, 0.95));
  box-shadow: 0 14px 28px rgba(50, 63, 134, 0.14);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 38px rgba(50, 63, 134, 0.2);
}

.home-page-shell :deep(.el-button) {
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 12px 20px rgba(64, 77, 152, 0.14);
}

.home-page-shell :deep(.el-button--primary) {
  background: linear-gradient(145deg, #4f46e5, #6366f1) !important;
  border: 1px solid rgba(177, 188, 255, 0.55) !important;
}

.home-page-shell :deep(.el-empty) {
  border-radius: 14px;
  border: 1px dashed rgba(129, 140, 248, 0.3);
  background: rgba(255, 255, 255, 0.52);
  padding: 10px;
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
  color: #1f2a56;
}

.post-time {
  margin: 0;
  font-size: 16px;
  color: #6f78a8;
}

.post-content {
  margin: 16px 0;
}

.post-content h4 {
  margin: 0 0 8px 0;
  color: #1e2952;
}

.post-content p {
  margin: 0 0 12px 0;
  color: #5d678f;
  line-height: 1.6;
}

.post-tag {
  margin-top: 8px;
}

.post-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.post-footer {
  display: flex;
  justify-content: space-between;
}

.posts-loading {
  padding: 20px;
}

.quests-section {
  width: 100%;
  padding: 18px;
  border-radius: 18px;
  border: 1px solid rgba(129, 140, 248, 0.2);
  background: linear-gradient(152deg, rgba(255, 255, 255, 0.94), rgba(246, 249, 255, 0.9));
  box-shadow: 0 18px 36px rgba(48, 62, 140, 0.12);
}

.quests-list {
  display: grid;
  gap: 20px;
}

.pending-applicants {
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.applicant-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid rgba(129, 140, 248, 0.2);
  border-radius: 12px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.88), rgba(241, 246, 255, 0.86));
  box-shadow: 0 10px 20px rgba(57, 70, 148, 0.1);
}

.applicant-item :deep(.el-button) {
  order: 2;
  margin-left: auto;
}

.applicant-info {
  min-width: 0;
}

:global(.dark) .welcome-card {
  border-color: rgba(129, 140, 248, 0.38);
  background:
    radial-gradient(130% 130% at 0% 0%, rgba(79, 70, 229, 0.35), rgba(17, 22, 47, 0.1) 58%),
    radial-gradient(135% 145% at 100% 0%, rgba(14, 165, 233, 0.2), rgba(16, 22, 45, 0.08) 62%),
    linear-gradient(155deg, rgba(17, 22, 45, 0.96), rgba(24, 31, 60, 0.94));
  box-shadow: 0 30px 56px rgba(3, 6, 18, 0.64), inset 0 1px 0 rgba(169, 188, 255, 0.17);
}

:global(.dark) .home-page-shell {
  border-color: rgba(129, 140, 248, 0.45);
  background:
    radial-gradient(145% 125% at 0% 0%, rgba(79, 70, 229, 0.46), rgba(10, 16, 34, 0.08) 58%),
    radial-gradient(135% 150% at 100% 0%, rgba(6, 182, 212, 0.24), rgba(10, 16, 34, 0.08) 62%),
    linear-gradient(165deg, rgba(12, 18, 38, 0.98), rgba(20, 28, 56, 0.95));
  box-shadow: 0 44px 80px rgba(1, 5, 15, 0.72), inset 0 1px 0 rgba(169, 188, 255, 0.2);
}

:global(.dark) .home-grain {
  background-image: linear-gradient(rgba(129, 140, 248, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(129, 140, 248, 0.08) 1px, transparent 1px);
}

:global(.dark) .home-page-shell :deep(.el-empty) {
  border-color: rgba(129, 140, 248, 0.34);
  background: rgba(25, 32, 58, 0.58);
}

:global(.dark) .card-header h2 {
  color: #e8eeff;
  text-shadow: 0 3px 14px rgba(120, 150, 255, 0.28);
}

:global(.dark) .posts-section,
:global(.dark) .quests-section {
  border-color: rgba(129, 140, 248, 0.34);
  background: linear-gradient(155deg, rgba(21, 28, 57, 0.95), rgba(16, 22, 45, 0.92));
  box-shadow: 0 22px 40px rgba(2, 6, 20, 0.58);
}

:global(.dark) .section-header {
  border-bottom-color: rgba(129, 140, 248, 0.32);
}

:global(.dark) .section-header h3,
:global(.dark) .author-name,
:global(.dark) .post-content h4 {
  color: #e6ecff;
}

:global(.dark) .post-time,
:global(.dark) .post-content p {
  color: #b8c3ed;
}

:global(.dark) .post-card {
  border-color: rgba(129, 140, 248, 0.3);
  background: linear-gradient(155deg, rgba(24, 31, 61, 0.95), rgba(18, 24, 49, 0.92));
  box-shadow: 0 20px 36px rgba(2, 6, 20, 0.54);
}

:global(.dark) .applicant-item {
  border-color: rgba(129, 140, 248, 0.32);
  background: linear-gradient(150deg, rgba(36, 42, 74, 0.88), rgba(24, 31, 57, 0.86));
  box-shadow: 0 12px 24px rgba(3, 7, 21, 0.52);
}

.home-page-shell {
  backdrop-filter: blur(14px);
}

.home-page-shell::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  pointer-events: none;
}

.card-header h2 {
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.section-header h3 {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 15px;
  font-weight: 700;
}

.welcome-card,
.posts-section,
.quests-section,
.post-card,
.applicant-item {
  backdrop-filter: blur(8px);
}

.home-page-shell :deep(.el-tag) {
  border-radius: 999px;
  border: 1px solid rgba(129, 140, 248, 0.26);
}

:global(.dark) .home-page-shell {
  backdrop-filter: blur(18px);
}

:global(.dark) .home-page-shell::before {
  border-color: rgba(171, 185, 255, 0.28);
}

:global(.dark) .card-header h2 {
  text-shadow: 0 0 18px rgba(129, 140, 248, 0.38);
}

:global(.dark) .home-page-shell :deep(.el-tag) {
  border-color: rgba(171, 185, 255, 0.34);
}

/* Marketplace-inspired override */
.home-aurora,
.home-grain {
  display: none !important;
}

.home-page-shell {
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}

.home-page-shell::before,
.home-page-shell::after {
  display: none !important;
}

.welcome-card,
.posts-section,
.quests-section,
.post-card,
.applicant-item {
  background: #ffffff !important;
  border: 1px solid #eceef3 !important;
  border-radius: 12px !important;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05) !important;
  backdrop-filter: none !important;
}

.section-header {
  border-bottom: 1px solid #eceef3 !important;
}

.section-header h3 {
  text-transform: none !important;
  letter-spacing: 0 !important;
  font-size: 18px !important;
  color: #111827 !important;
}

.card-header h2 {
  text-transform: none !important;
  letter-spacing: 0 !important;
  font-size: 28px !important;
  color: #111827 !important;
  text-shadow: none !important;
}

.home-page-shell :deep(.el-button--primary) {
  background: #ff6f00 !important;
  border-color: #ff6f00 !important;
}

.home-page-shell :deep(.el-button--primary:hover) {
  background: #f06500 !important;
  border-color: #f06500 !important;
}

.home-page-shell :deep(.el-tag) {
  border: 1px solid #ffd6b8 !important;
  border-radius: 999px !important;
  box-shadow: none !important;
}

:global(.dark) .home-page-shell,
:global(.dark) .welcome-card,
:global(.dark) .posts-section,
:global(.dark) .quests-section,
:global(.dark) .post-card,
:global(.dark) .applicant-item {
  background: #111827 !important;
  border-color: #1f2937 !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35) !important;
}

:global(.dark) .section-header {
  border-bottom-color: #1f2937 !important;
}

:global(.dark) .section-header h3,
:global(.dark) .card-header h2 {
  color: #f9fafb !important;
  text-shadow: none !important;
}

.welcome-section {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 16px;
  align-items: stretch;
}

.welcome-card {
  height: 100%;
}

.weather-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 180px;
  width: 280px;
  border-radius: 25px;
  background: #f1f1f1;
  overflow: hidden;
  transition: 100ms ease;
  box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 4px;
}

.weather-info-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 75%;
  color: white;
}

.weather-background-design {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #ec7263;
  overflow: hidden;
}

.weather-circle {
  background-color: #efc745;
}

.weather-circle:nth-child(1) {
  position: absolute;
  top: -80%;
  right: -50%;
  width: 300px;
  height: 300px;
  opacity: 0.4;
  border-radius: 50%;
}

.weather-circle:nth-child(2) {
  position: absolute;
  top: -70%;
  right: -30%;
  width: 210px;
  height: 210px;
  opacity: 0.4;
  border-radius: 50%;
}

.weather-circle:nth-child(3) {
  position: absolute;
  top: -35%;
  right: -8%;
  width: 100px;
  height: 100px;
  opacity: 1;
  border-radius: 50%;
}

.weather-left-side {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  z-index: 1;
  padding-left: 18px;
}

.weather-main {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
}

.weather-main div {
  display: flex;
  align-items: center;
}

.weather-main div:nth-child(1) {
  width: 22px;
  height: 22px;
}

.weather-temperature {
  font-size: 34px;
  font-weight: 500;
  line-height: 1;
}

.weather-range {
  font-size: 14px;
}

.weather-right-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  height: 100%;
  padding-right: 18px;
  z-index: 1;
}

.weather-right-side > div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.weather-hour {
  font-size: 28px;
  line-height: 1;
  font-weight: 700;
}

.weather-date {
  font-size: 18px;
  font-weight: 600;
}

.weather-city {
  font-size: 14px;
}

.weather-days-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 25%;
  background-color: #974859;
  gap: 2px;
  box-shadow: inset 0 2px 5px #974859;
}

.weather-days-section button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: none;
  background-color: #a75265;
  box-shadow: inset 0 2px 5px #974859;
  cursor: pointer;
  transition: 100ms ease;
}

.weather-days-section button:hover {
  transform: scale(0.93);
  border-radius: 10px;
}

.weather-day {
  font-size: 11px;
  font-weight: 500;
  color: white;
  opacity: 0.75;
}

.weather-day-range {
  font-size: 10px;
  color: white;
  opacity: 0.85;
  line-height: 1.1;
}

.weather-day-condition {
  font-size: 9px;
  color: white;
  opacity: 0.8;
  line-height: 1.1;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 1024px) {
  .welcome-section {
    grid-template-columns: 1fr;
  }

  .weather-card {
    width: 100%;
    max-width: 360px;
  }
}

:global(.dark) .home-page-shell :deep(.el-tag) {
  border-color: #6b3f16 !important;
}

/* Final dark enforcement for Home: keep containers and text readable */
:global(html.dark) .home-page-shell .welcome-card,
:global(html.dark) .home-page-shell .posts-section,
:global(html.dark) .home-page-shell .quests-section,
:global(html.dark) .home-page-shell .post-card,
:global(html.dark) .home-page-shell .applicant-item,
:global(body.dark) .home-page-shell .welcome-card,
:global(body.dark) .home-page-shell .posts-section,
:global(body.dark) .home-page-shell .quests-section,
:global(body.dark) .home-page-shell .post-card,
:global(body.dark) .home-page-shell .applicant-item,
:global(.dark) .home-page-shell .welcome-card,
:global(.dark) .home-page-shell .posts-section,
:global(.dark) .home-page-shell .quests-section,
:global(.dark) .home-page-shell .post-card,
:global(.dark) .home-page-shell .applicant-item {
  background: #111827 !important;
  border-color: #334155 !important;
  color: #e2e8f0 !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35) !important;
}

:global(html.dark) .home-page-shell .section-header,
:global(body.dark) .home-page-shell .section-header,
:global(.dark) .home-page-shell .section-header {
  border-bottom-color: #334155 !important;
}

:global(html.dark) .home-page-shell .section-header h3,
:global(html.dark) .home-page-shell .card-header h2,
:global(html.dark) .home-page-shell .author-name,
:global(html.dark) .home-page-shell .post-time,
:global(html.dark) .home-page-shell .post-content,
:global(html.dark) .home-page-shell .post-content h4,
:global(html.dark) .home-page-shell .post-content p,
:global(body.dark) .home-page-shell .section-header h3,
:global(body.dark) .home-page-shell .card-header h2,
:global(body.dark) .home-page-shell .author-name,
:global(body.dark) .home-page-shell .post-time,
:global(body.dark) .home-page-shell .post-content,
:global(body.dark) .home-page-shell .post-content h4,
:global(body.dark) .home-page-shell .post-content p,
:global(.dark) .home-page-shell .section-header h3,
:global(.dark) .home-page-shell .card-header h2,
:global(.dark) .home-page-shell .author-name,
:global(.dark) .home-page-shell .post-time,
:global(.dark) .home-page-shell .post-content,
:global(.dark) .home-page-shell .post-content h4,
:global(.dark) .home-page-shell .post-content p {
  color: #e2e8f0 !important;
  text-shadow: none !important;
}
</style>