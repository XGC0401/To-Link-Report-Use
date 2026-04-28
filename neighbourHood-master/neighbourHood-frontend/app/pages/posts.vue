<template>
  <NuxtLayout name="default">
    <div class="post-page-shell">
      <div class="shell-orb orb-one"></div>
      <div class="shell-orb orb-two"></div>
      <div class="shell-grid"></div>
      <el-tabs v-model="activeTab" class="tabs-container">
      <!-- Posts Tab -->
      <el-tab-pane :label="$t('posts')" name="posts">
        <div class="posts-header">
          <div class="posts-header-left">
            <el-input v-model="searchQuery" :placeholder="$t('searchPosts')" clearable style="width: 300px;" />
            <el-select v-model="sortBy" :placeholder="$t('sortBy')" style="width: 180px;">
              <el-option :label="$t('latest')" value="latest" />
              <el-option :label="$t('oldest')" value="oldest" />
              <el-option :label="$t('mostLikes')" value="mostLikes" />
              <el-option :label="$t('leastLikes')" value="leastLikes" />
              <el-option :label="$t('mostComments')" value="mostComments" />
              <el-option :label="$t('leastComments')" value="leastComments" />
            </el-select>
          </div>
        </div>

        <div v-if="isLoadingPosts && filteredPosts.length === 0" class="posts-loading">
          <el-icon class="is-loading posts-loading-icon" :size="28"><Loading /></el-icon>
          <p class="posts-loading-text">{{ $t('loadingPosts') }}</p>
          <el-skeleton v-for="i in 4" :key="i" :rows="5" animated style="margin-bottom: 20px" />
        </div>
        <div v-else class="posts-list">
          <PostCard v-for="post in filteredPosts" :key="post.id" :post="post" :language="language"
            :current-user-email="currentUser.email" @show-detail="openPostDetail" @edit="editPost" @delete="deletePost"
            @report="reportPost" />
        </div>
        <el-empty v-if="!isLoadingPosts && filteredPosts.length === 0" :description="$t('noPosts')" />

        <button class="back-to-top-button" type="button" @click="scrollToTop" :aria-label="$t('backToTop')">
          <svg class="back-to-top-icon" viewBox="0 0 384 512" aria-hidden="true">
            <path
              d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
            />
          </svg>
          <span class="back-to-top-text">{{ $t('backToTop') }}</span>
        </button>
      </el-tab-pane>

      <!-- Quest Requests Tab -->
      <el-tab-pane :label="$t('questRequests')" name="quests">
        <div class="quests-header">
          <div class="quests-header-left">
            <el-input v-model="questSearchQuery" :placeholder="$t('searchQuests')" clearable style="width: 300px;" />
            <el-select v-model="questSortBy" :placeholder="$t('sortBy')" style="width: 180px;">
              <el-option :label="$t('latest')" value="latest" />
              <el-option :label="$t('oldest')" value="oldest" />
              <el-option :label="$t('highestReward')" value="highestReward" />
              <el-option :label="$t('lowestReward')" value="lowestReward" />
            </el-select>
          </div>
          <div class="rewards-info">
            <el-button type="primary" @click="showCreateQuestDialog = true">
              {{ $t('createQuestRequest') }}
            </el-button>
            <el-tag type="success" size="large">
              {{ $t('yourRewardPoints') }}: {{ currentUserRewardPoints }}
            </el-tag>
            <el-button type="warning" @click="showRedeemDialog = true">
              {{ $t('redeemRewards') }}
            </el-button>
          </div>
        </div>

        <div class="quests-list">
          <QuestCard v-for="quest in filteredQuests" :key="quest.id" :quest="quest" :language="language"
            :can-accept="canAcceptQuest(quest)" :accept-button-tooltip="getAcceptButtonTooltip(quest)"
            :current-user-name="currentUser.name" @show-detail="openQuestDetail" @accept-quest="acceptQuest"
            @show-introduction-dialog="openIntroductionDialog" @edit="editQuest" @delete="deleteQuest"
            @report="reportQuest" />
        </div>
      </el-tab-pane>
      </el-tabs>
    </div>

    <!-- Create Quest Dialog -->
    <CreateQuestDialog v-if="showCreateQuestDialog || questFormDraft.title || questFormDraft.detail"
      v-model="showCreateQuestDialog" :language="language" :available-tags="availableTags" @create="createQuest" />

    <!-- Redeem Rewards Dialog -->
    <RedeemRewardsDialog v-model="showRedeemDialog" :language="language" :current-points="currentUserRewardPoints"
      :rewards-catalog="rewardsCatalog" @redeem="redeemReward" />

    <!-- Post Detail Dialog -->
    <PostDetailDialog v-model="showPostDetailDialog" :post="selectedPost" :language="language" />

    <!-- Quest Detail Dialog -->
    <QuestDetailDialog v-model="showQuestDetailDialog" :quest="selectedQuest" :language="language"
      :can-accept="selectedQuest ? canAcceptQuest(selectedQuest) : false"
      :accept-button-tooltip="selectedQuest ? getAcceptButtonTooltip(selectedQuest) : ''" @accept-quest="acceptQuest"
      @show-introduction-dialog="openIntroductionDialog" />

    <!-- Self Introduction Dialog -->
    <SelfIntroductionDialog v-model="showIntroductionDialog" :quest="selectedQuest"
      @send-introduction="handleSendIntroduction" />

    <!-- Edit Post Dialog -->
    <EditPostDialog v-model="showEditPostDialog" :post="selectedEditPost" @save="saveEditedPost" />

    <!-- Edit Quest Dialog -->
    <EditQuestDialog v-model="showEditQuestDialog" :quest="selectedEditQuest" :available-tags="availableTags"
      @save="saveEditedQuest" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Loading } from '@element-plus/icons-vue'
import PostCard from '~/components/PostCard.vue'
import QuestCard from '~/components/QuestCard.vue'
import CreateQuestDialog from '~/components/CreateQuestDialog.vue'
import RedeemRewardsDialog from '~/components/RedeemRewardsDialog.vue'
import PostDetailDialog from '~/components/PostDetailDialog.vue'
import QuestDetailDialog from '~/components/QuestDetailDialog.vue'
import SelfIntroductionDialog from '~/components/SelfIntroductionDialog.vue'
import EditPostDialog from '~/components/EditPostDialog.vue'
import EditQuestDialog from '~/components/EditQuestDialog.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { getPost } from '~/api/post'
import { getUser } from '~/api/auth'
import type { Post } from '~/api/types/post'

const router = useRouter()
const { t, locale } = useI18n()
const language = computed(() => locale.value as 'en' | 'zh')
const searchQuery = ref('')
const questSearchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('latest')
const questSortBy = ref('latest')
const activeTab = ref('posts')
const isLoadingPosts = ref(false)

// Current user info (simulated - would come from auth in real app)
const currentUser = ref({
  id: '1',
  name: 'Current User',
  email: '',
  rewardPoints: 150
})

const currentUserRewardPoints = computed(() => currentUser.value.rewardPoints)

const posts = ref<Post[]>([]);

// Quest Requests
const questRequests = ref([
  {
    id: 1,
    authorId: '2',
    author: 'Jane Smith',
    avatar: 'https://cube.elemecdn.com/3/dc/1ea6beec64f4a146f6f02a42cc5f7.svg',
    title: 'Help Moving Furniture',
    detail: 'Need help moving some heavy furniture to my new apartment this Saturday. Should take about 2-3 hours.',
    tags: ['Physical Help', 'Moving'],
    paymentMethod: 'face-to-face',
    rewardPoints: 80,
    time: '1 hour ago',
    acceptedBy: null,
    acceptedById: null,
    status: 'open',
    pendingApplicants: []
  },
  {
    id: 2,
    authorId: '3',
    author: 'Mike Johnson',
    avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg',
    title: 'Pet Sitting for Weekend',
    detail: 'Looking for someone to take care of my dog for the weekend. He is friendly and well-behaved.',
    tags: ['Pet Care', 'Weekend'],
    paymentMethod: 'face-to-face',
    rewardPoints: 120,
    time: '3 hours ago',
    acceptedBy: null,
    acceptedById: null,
    status: 'open',
    pendingApplicants: []
  },
  {
    id: 3,
    authorId: '1',
    author: 'Current User',
    avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg',
    title: 'Website Design Help',
    detail: 'Need someone with web design experience to help redesign my portfolio website.',
    tags: ['Tech', 'Design'],
    paymentMethod: 'online',
    rewardPoints: 200,
    time: '5 hours ago',
    acceptedBy: null,
    acceptedById: null,
    status: 'open',
    pendingApplicants: []
  }
])

const persistQuestRequests = () => {
  localStorage.setItem('userQuests', JSON.stringify(questRequests.value))
}

const hasUserAppliedToQuest = (quest: any, userId: string) => {
  if (!quest?.pendingApplicants || !Array.isArray(quest.pendingApplicants)) {
    return false
  }
  return quest.pendingApplicants.some((applicant: any) => String(applicant.userId) === userId)
}

// Create Quest Dialog
const showCreateQuestDialog = ref(false)

// Quest form draft data (persisted)
const questFormDraft = ref({
  title: '',
  detail: '',
  tags: [] as string[],
  paymentMethod: 'face-to-face' as 'face-to-face' | 'online',
  rewardPoints: 50
})

const availableTags = [
  'Physical Help',
  'Moving',
  'Pet Care',
  'Tech',
  'Design',
  'Tutoring',
  'Errands',
  'Gardening',
  'Cleaning'
]

// Post Detail Dialog
const showPostDetailDialog = ref(false)
const selectedPost = ref<any>(null)

// Quest Detail Dialog
const showQuestDetailDialog = ref(false)
const selectedQuest = ref<any>(null)

// Self Introduction Dialog
const showIntroductionDialog = ref(false)

// Edit Dialogs
const showEditPostDialog = ref(false)
const selectedEditPost = ref<any>(null)
const showEditQuestDialog = ref(false)
const selectedEditQuest = ref<any>(null)

// Redeem Rewards Dialog
const showRedeemDialog = ref(false)
const rewardsCatalog = ref([
  {
    id: 1,
    name: 'Coffee Shop Voucher',
    description: '$5 voucher at local coffee shop',
    points: 50
  },
  {
    id: 2,
    name: 'Restaurant Discount',
    description: '10% off at partner restaurants',
    points: 100
  },
  {
    id: 3,
    name: 'Free Movie Ticket',
    description: 'One free movie ticket at local cinema',
    points: 150
  },
  {
    id: 4,
    name: 'Gym Day Pass',
    description: 'One day pass to community gym',
    points: 80
  },
  {
    id: 5,
    name: 'Gift Card',
    description: '$25 gift card for online shopping',
    points: 250
  }
])

const filteredPosts = computed(() => {
  if (!posts.value || !Array.isArray(posts.value)) {
    return []
  }

  let filtered = posts.value.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesSearch
  })

  // Sort posts based on selected sort option
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy.value) {
      case 'latest':
        return b.id - a.id // Assuming higher id means newer
      case 'oldest':
        return a.id - b.id
      case 'mostLikes':
        return (b.likes || 0) - (a.likes || 0)
      case 'leastLikes':
        return (a.likes || 0) - (b.likes || 0)
      case 'mostComments':
        return (b.shares || 0) - (a.shares || 0) // Using shares instead of comments
      case 'leastComments':
        return (a.shares || 0) - (b.shares || 0) // Using shares instead of comments
      default:
        return 0
    }
  })

  return sorted
})

const filteredQuests = computed(() => {
  let filtered = questRequests.value.filter(quest => {
    const matchesSearch = quest.title.toLowerCase().includes(questSearchQuery.value.toLowerCase()) ||
      quest.detail.toLowerCase().includes(questSearchQuery.value.toLowerCase()) ||
      quest.tags.some(tag => tag.toLowerCase().includes(questSearchQuery.value.toLowerCase()))
    return matchesSearch
  })

  // Sort quests based on selected sort option
  const sorted = [...filtered].sort((a, b) => {
    switch (questSortBy.value) {
      case 'latest':
        return b.id - a.id
      case 'oldest':
        return a.id - b.id
      case 'highestReward':
        return b.rewardPoints - a.rewardPoints
      case 'lowestReward':
        return a.rewardPoints - b.rewardPoints
      default:
        return 0
    }
  })

  return sorted
})

// Open post detail dialog
function openPostDetail(post: any) {
  selectedPost.value = post
  showPostDetailDialog.value = true
}

function scrollToTop() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Open quest detail dialog
function openQuestDetail(quest: any) {
  selectedQuest.value = quest
  showQuestDetailDialog.value = true
}

// Quest Functions
function createQuest(questData: any) {
  if (!questData.title || !questData.detail) {
    ElMessage.warning(t('fillAllFields'))
    return
  }

  const quest = {
    id: questRequests.value.length + 1,
    authorId: String(currentUser.value.id),
    author: currentUser.value.name,
    avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg',
    title: questData.title,
    detail: questData.detail,
    tags: [...questData.tags],
    paymentMethod: questData.paymentMethod,
    rewardPoints: questData.rewardPoints,
    time: 'Just now',
    acceptedBy: null,
    acceptedById: null,
    status: 'open',
    pendingApplicants: []
  }

  questRequests.value.unshift(quest)
  persistQuestRequests()

  ElMessage.success(t('questCreatedSuccess'))

  showCreateQuestDialog.value = false
}

function canAcceptQuest(quest: any): boolean {
  // Cannot accept own quest
  if (String(quest.authorId) === String(currentUser.value.id)) {
    return false
  }

  // Cannot accept if already accepted by owner
  if (quest.acceptedBy) {
    return false
  }

  // Cannot apply same quest twice
  if (hasUserAppliedToQuest(quest, String(currentUser.value.id))) {
    return false
  }

  return true
}

function getAcceptButtonTooltip(quest: any): string {
  if (String(quest.authorId) === String(currentUser.value.id)) {
    return t('cannotAcceptOwnRequest')
  }

  if (quest.acceptedBy) {
    return t('questAlreadyAccepted')
  }

  if (hasUserAppliedToQuest(quest, String(currentUser.value.id))) {
    return t('alreadyAppliedQuest')
  }

  return ''
}

function acceptQuest(quest: any) {
  if (!canAcceptQuest(quest)) {
    return
  }

  openIntroductionDialog(quest)
}

// Open introduction dialog when accept quest button is clicked
function openIntroductionDialog(quest: any) {
  if (!canAcceptQuest(quest)) {
    return
  }

  selectedQuest.value = quest
  showQuestDetailDialog.value = false
  showIntroductionDialog.value = true
}

// Handle sending introduction to requester
function handleSendIntroduction(data: { quest: any, introduction: string }) {
  const { quest, introduction } = data

  if (!quest.pendingApplicants || !Array.isArray(quest.pendingApplicants)) {
    quest.pendingApplicants = []
  }

  if (hasUserAppliedToQuest(quest, String(currentUser.value.id))) {
    ElMessage.warning(t('alreadyAppliedQuest'))
    showIntroductionDialog.value = false
    return
  }

  quest.pendingApplicants.push({
    userId: String(currentUser.value.id),
    userName: currentUser.value.name,
    introduction,
    appliedAt: new Date().toISOString()
  })
  quest.status = 'hold'
  persistQuestRequests()

  // Close the introduction dialog
  showIntroductionDialog.value = false

  // Create the introduction message data
  const introductionMessageData = {
    conversationId: quest.authorId, // Use author ID as conversation identifier
    requesterName: quest.author,
    requesterAvatar: quest.avatar,
    message: {
      id: Date.now(),
      text: introduction,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'quest-introduction',
      questInfo: {
        title: quest.title,
        detail: quest.detail,
        rewardPoints: quest.rewardPoints,
        paymentMethod: quest.paymentMethod,
        tags: quest.tags
      }
    }
  }

  // Store in localStorage to be picked up by chat page
  const existingConversations = JSON.parse(localStorage.getItem('chatConversations') || '[]')
  let conversation = existingConversations.find((c: any) => c.id === quest.authorId)

  if (conversation) {
    // Add message to existing conversation
    conversation.messages.push(introductionMessageData.message)
    conversation.lastMessage = introduction.substring(0, 50) + '...'
    conversation.lastMessageTime = introductionMessageData.message.time
  } else {
    // Create new conversation
    conversation = {
      id: quest.authorId,
      name: quest.author,
      avatar: quest.avatar,
      lastMessage: introduction.substring(0, 50) + '...',
      lastMessageTime: introductionMessageData.message.time,
      unread: 0,
      messages: [introductionMessageData.message]
    }
    existingConversations.push(conversation)
  }

  localStorage.setItem('chatConversations', JSON.stringify(existingConversations))

  ElMessage.success(t('questApplicationSubmitted'))

  console.log('Sending introduction to requester:', {
    questId: quest.id,
    requesterId: quest.authorId,
    acceptorId: currentUser.value.id,
    acceptorName: currentUser.value.name,
    introduction: introduction,
    questInfo: {
      title: quest.title,
      detail: quest.detail,
      rewardPoints: quest.rewardPoints,
      paymentMethod: quest.paymentMethod,
      tags: quest.tags
    }
  })

  // Navigate to chat page
  setTimeout(() => {
    router.push('/chat')
  }, 1000)
}

function redeemReward(reward: any) {
  if (currentUser.value.rewardPoints < reward.points) {
    ElMessage.warning(t('notEnoughPoints'))
    return
  }

  currentUser.value.rewardPoints -= reward.points

  ElMessage.success(t('redeemSuccess', { name: reward.name }))

  showRedeemDialog.value = false
}

// Post Actions
function editPost(post: any) {
  selectedEditPost.value = post
  showEditPostDialog.value = true
}

function saveEditedPost(data: { id: number, title: string, content: string, category: string }) {
  const postIndex = posts.value.findIndex(p => p.id === data.id)
  if (postIndex > -1) {
    posts.value[postIndex] = {
      ...posts.value[postIndex],
      title: data.title,
      content: data.content,
      category: data.category
    }

    // Update localStorage
    const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]')
    const userPostIndex = userPosts.findIndex((p: any) => p.id === data.id)
    if (userPostIndex > -1) {
      userPosts[userPostIndex] = {
        ...userPosts[userPostIndex],
        title: data.title,
        content: data.content,
        category: data.category
      }
      localStorage.setItem('userPosts', JSON.stringify(userPosts))
    }

    ElMessage.success(t('postUpdatedSuccess'))
  }
}

function deletePost(post: any) {
  ElMessageBox.confirm(
    t('confirmDeletePostMessage'),
    t('deletePostTitle'),
    {
      confirmButtonText: t('delete'),
      cancelButtonText: t('cancel'),
      type: 'warning',
    }
  ).then(() => {
    const index = posts.value.findIndex(p => p.id === post.id)
    if (index > -1) {
      posts.value.splice(index, 1)
      // Update localStorage
      const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]')
      const userPostIndex = userPosts.findIndex((p: any) => p.id === post.id)
      if (userPostIndex > -1) {
        userPosts.splice(userPostIndex, 1)
        localStorage.setItem('userPosts', JSON.stringify(userPosts))
      }
      ElMessage.success(t('postDeletedSuccess'))
    }
  }).catch(() => {
    // User cancelled
  })
}

function reportPost(post: any) {
  ElMessage.warning(t('reportComingSoon'))
  console.log('Reporting post:', post.id)
  // TODO: Implement report functionality
}

// Quest Actions
function editQuest(quest: any) {
  selectedEditQuest.value = quest
  showEditQuestDialog.value = true
}

function saveEditedQuest(data: { id: number, title: string, detail: string, tags: string[], paymentMethod: string, rewardPoints: number }) {
  const questIndex = questRequests.value.findIndex(q => q.id === data.id)
  if (questIndex > -1) {
    questRequests.value[questIndex] = {
      ...questRequests.value[questIndex],
      title: data.title,
      detail: data.detail,
      tags: data.tags,
      paymentMethod: data.paymentMethod,
      rewardPoints: data.rewardPoints
    }

    // Update localStorage
    const userQuests = JSON.parse(localStorage.getItem('userQuests') || '[]')
    const userQuestIndex = userQuests.findIndex((q: any) => q.id === data.id)
    if (userQuestIndex > -1) {
      userQuests[userQuestIndex] = {
        ...userQuests[userQuestIndex],
        title: data.title,
        detail: data.detail,
        tags: data.tags,
        paymentMethod: data.paymentMethod,
        rewardPoints: data.rewardPoints
      }
      localStorage.setItem('userQuests', JSON.stringify(userQuests))
    }

    ElMessage.success(t('questUpdatedSuccess'))
  }
}

function deleteQuest(quest: any) {
  ElMessageBox.confirm(
    t('confirmDeleteQuestMessage'),
    t('deleteQuestTitle'),
    {
      confirmButtonText: t('delete'),
      cancelButtonText: t('cancel'),
      type: 'warning',
    }
  ).then(() => {
    const index = questRequests.value.findIndex(q => q.id === quest.id)
    if (index > -1) {
      questRequests.value.splice(index, 1)

      // Update localStorage
      const userQuests = JSON.parse(localStorage.getItem('userQuests') || '[]')
      const userQuestIndex = userQuests.findIndex((q: any) => q.id === quest.id)
      if (userQuestIndex > -1) {
        userQuests.splice(userQuestIndex, 1)
        localStorage.setItem('userQuests', JSON.stringify(userQuests))
      }

      ElMessage.success(t('questDeletedSuccess'))
    }
  }).catch(() => {
    // User cancelled
  })
}

function reportQuest(quest: any) {
  ElMessage.warning(t('reportComingSoon'))
  console.log('Reporting quest:', quest.id)
  // TODO: Implement report functionality
}

onMounted(async () => {
  try {
    const [userError, userData] = await getUser()
    if (!userError && userData) {
      currentUser.value.id = String((userData as any).uuid || (userData as any).email || '1')
      currentUser.value.name = userData.username as string
      currentUser.value.email = userData.email as string
    }
  } catch (err) {
    console.error('Failed to load user:', err)
  }

  // Load cached posts immediately for instant display
  const cachedPosts = localStorage.getItem('cachedPosts')
  const userPosts = localStorage.getItem('userPosts')
  
  if (cachedPosts) {
    try {
      const parsed = JSON.parse(cachedPosts)
      const userPostsParsed = userPosts ? JSON.parse(userPosts) : []
      posts.value = [...userPostsParsed, ...parsed]
    } catch (e) {
      console.error('Error parsing cached posts', e)
    }
  } else if (userPosts) {
    try {
      posts.value = JSON.parse(userPosts)
    } catch (e) {
      console.error('Error parsing user posts', e)
    }
  }

  // Load user quests from localStorage immediately
  const userQuests = localStorage.getItem('userQuests')
  if (userQuests) {
    try {
      const parsed = JSON.parse(userQuests)
      if (Array.isArray(parsed)) {
        questRequests.value = parsed.map((quest: any) => ({
          ...quest,
          status: quest.status || (quest.acceptedBy ? 'accepted' : (quest.pendingApplicants?.length ? 'hold' : 'open')),
          acceptedById: quest.acceptedById || null,
          pendingApplicants: Array.isArray(quest.pendingApplicants) ? quest.pendingApplicants : []
        }))
      }
    } catch (e) {
      console.error('Error parsing user quests', e)
    }
  } else {
    persistQuestRequests()
  }

  // Fetch fresh data in the background
  isLoadingPosts.value = true
  try {
    const [error, data, options] = await getPost();
    if (!error && data && data.data && Array.isArray(data.data)) {
      // Cache the fresh data
      localStorage.setItem('cachedPosts', JSON.stringify(data.data))
      
      // Update posts with fresh data
      const userPostsParsed = userPosts ? JSON.parse(userPosts) : []
      posts.value = [...userPostsParsed, ...data.data]
    } else {
      console.error('wrong data format', data);
      if (posts.value.length === 0) {
        posts.value = [];
      }
    }
  } catch (err) {
    console.error('cannot get data', err);
    // Keep showing cached data if API fails
    if (posts.value.length === 0) {
      posts.value = [];
    }
  } finally {
    isLoadingPosts.value = false
  }
})
</script>

<style scoped>
.post-page-shell {
  position: relative;
  border-radius: 28px;
  padding: 22px;
  overflow: hidden;
  border: 1px solid rgba(109, 125, 219, 0.28);
  background:
    radial-gradient(140% 120% at 0% 0%, rgba(79, 70, 229, 0.22), rgba(255, 255, 255, 0) 58%),
    radial-gradient(130% 140% at 100% 0%, rgba(6, 182, 212, 0.16), rgba(255, 255, 255, 0) 62%),
    linear-gradient(165deg, rgba(255, 255, 255, 0.96), rgba(242, 247, 255, 0.92));
  box-shadow: 0 40px 72px rgba(39, 52, 130, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.78);
}

.shell-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(rgba(99, 102, 241, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.06) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: radial-gradient(circle at 50% 30%, #000 36%, transparent 82%);
}

.shell-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(0.5px);
  pointer-events: none;
}

.orb-one {
  width: 280px;
  height: 280px;
  top: -90px;
  left: -70px;
  background: radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.55), rgba(99, 102, 241, 0));
}

.orb-two {
  width: 320px;
  height: 320px;
  bottom: -120px;
  right: -90px;
  background: radial-gradient(circle at 50% 40%, rgba(6, 182, 212, 0.5), rgba(6, 182, 212, 0));
}

.tabs-container {
  margin-bottom: 24px;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(96, 109, 182, 0.2);
  background:
    radial-gradient(120% 140% at 0% 0%, rgba(99, 102, 241, 0.14), rgba(255, 255, 255, 0) 60%),
    radial-gradient(110% 130% at 100% 0%, rgba(14, 165, 233, 0.12), rgba(255, 255, 255, 0) 65%),
    linear-gradient(155deg, rgba(255, 255, 255, 0.94), rgba(245, 248, 255, 0.92));
  box-shadow: 0 26px 52px rgba(42, 55, 130, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.75);
}

.post-page-shell :deep(.el-button) {
  border-radius: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
  box-shadow: 0 12px 22px rgba(65, 78, 158, 0.14);
}

.post-page-shell :deep(.el-button--primary) {
  background: linear-gradient(145deg, #4f46e5, #6366f1) !important;
  border: 1px solid rgba(177, 188, 255, 0.55) !important;
}

.post-page-shell :deep(.el-tag) {
  border-radius: 999px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55);
}

.post-page-shell :deep(.el-tab-pane) {
  position: relative;
  z-index: 1;
}

.tabs-container :deep(.el-tabs__header) {
  margin-bottom: 20px;
}

.tabs-container :deep(.el-tabs__nav-wrap::after) {
  background: rgba(99, 102, 241, 0.16);
}

.tabs-container :deep(.el-tabs__item) {
  font-weight: 600;
  letter-spacing: 0.02em;
}

.tabs-container :deep(.el-tabs__item.is-active) {
  text-shadow: 0 0 10px rgba(79, 70, 229, 0.2);
}

.posts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
  padding: 16px 18px;
  border-radius: 16px;
  border: 1px solid rgba(99, 102, 241, 0.18);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(244, 247, 255, 0.9));
  box-shadow: 0 14px 30px rgba(36, 47, 110, 0.1);
}

.posts-header-left {
  display: flex;
  gap: 12px;
  align-items: center;
  flex: 1;
}

.posts-header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.posts-toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
}

.posts-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}

.posts-list :deep(.post-card),
.posts-list :deep(.el-card) {
  border-radius: 18px;
  border: 1px solid rgba(129, 140, 248, 0.16);
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.96), rgba(245, 248, 255, 0.95));
  box-shadow: 0 18px 32px rgba(52, 64, 140, 0.14);
  transition: transform 0.32s ease, box-shadow 0.32s ease, border-color 0.32s ease;
}

.posts-list :deep(.post-card:hover),
.posts-list :deep(.el-card:hover) {
  transform: translateY(-4px);
  box-shadow: 0 24px 42px rgba(52, 64, 140, 0.2);
  border-color: rgba(99, 102, 241, 0.28);
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

.back-to-top-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(145deg, #201f3e, #312d6a);
  border: 1px solid rgba(180, 172, 255, 0.55);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 4px rgba(180, 160, 255, 0.26), 0 16px 32px rgba(25, 22, 62, 0.35);
  cursor: pointer;
  transition-duration: 0.3s;
  overflow: hidden;
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1000;
}

.back-to-top-icon {
  width: 12px;
  transition-duration: 0.3s;
  flex-shrink: 0;
}

.back-to-top-icon path {
  fill: white;
}

.back-to-top-button:hover {
  width: 140px;
  border-radius: 50px;
  transition-duration: 0.3s;
  background: linear-gradient(145deg, rgb(181, 160, 255), rgb(137, 168, 255));
  align-items: center;
}

.back-to-top-button:hover .back-to-top-icon {
  transition-duration: 0.3s;
  transform: translateY(-200%);
}

.back-to-top-text {
  position: absolute;
  bottom: -20px;
  color: white;
  font-size: 0;
  transition-duration: 0.3s;
  white-space: nowrap;
}

.back-to-top-button:hover .back-to-top-text {
  font-size: 13px;
  opacity: 1;
  bottom: auto;
  transition-duration: 0.3s;
}

@media (max-width: 768px) {
  .posts-list {
    grid-template-columns: 1fr;
  }
}

/* Quest Requests Styles */
.quests-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
  padding: 16px 18px;
  border-radius: 16px;
  border: 1px solid rgba(99, 102, 241, 0.18);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(244, 247, 255, 0.9));
  box-shadow: 0 14px 30px rgba(36, 47, 110, 0.1);
}

.quests-header-left {
  display: flex;
  gap: 12px;
  align-items: center;
  flex: 1;
}

.quests-toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
}

.rewards-info {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(250, 250, 255, 0.88), rgba(235, 241, 255, 0.7));
  border: 1px solid rgba(129, 140, 248, 0.2);
}

.rewards-info :deep(.el-button) {
  order: -1;
}

.quests-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}

.quests-list :deep(.quest-card),
.quests-list :deep(.el-card) {
  border-radius: 18px;
  border: 1px solid rgba(129, 140, 248, 0.16);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.96), rgba(245, 248, 255, 0.95));
  box-shadow: 0 18px 32px rgba(52, 64, 140, 0.14);
  transition: transform 0.32s ease, box-shadow 0.32s ease, border-color 0.32s ease;
}

.quests-list :deep(.quest-card:hover),
.quests-list :deep(.el-card:hover) {
  transform: translateY(-4px);
  box-shadow: 0 24px 42px rgba(52, 64, 140, 0.2);
  border-color: rgba(99, 102, 241, 0.28);
}

.tabs-container :deep(.el-input__wrapper),
.tabs-container :deep(.el-select__wrapper) {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.22) inset, 0 10px 18px rgba(77, 90, 172, 0.12);
}

.tabs-container :deep(.el-button) {
  border-radius: 12px;
}

:global(.dark) .tabs-container {
  border-color: rgba(129, 140, 248, 0.38);
  background:
    radial-gradient(130% 130% at 0% 0%, rgba(79, 70, 229, 0.36), rgba(18, 24, 49, 0.12) 55%),
    radial-gradient(125% 145% at 100% 0%, rgba(14, 165, 233, 0.22), rgba(16, 22, 45, 0.1) 60%),
    linear-gradient(160deg, rgba(17, 22, 43, 0.95), rgba(25, 32, 60, 0.93));
  box-shadow: 0 30px 54px rgba(4, 7, 18, 0.62), inset 0 1px 0 rgba(170, 188, 255, 0.16);
}

:global(.dark) .post-page-shell {
  border-color: rgba(129, 140, 248, 0.45);
  background:
    radial-gradient(145% 125% at 0% 0%, rgba(79, 70, 229, 0.48), rgba(10, 16, 34, 0.08) 58%),
    radial-gradient(135% 150% at 100% 0%, rgba(6, 182, 212, 0.24), rgba(10, 16, 34, 0.08) 62%),
    linear-gradient(165deg, rgba(12, 18, 38, 0.98), rgba(20, 28, 56, 0.95));
  box-shadow: 0 42px 78px rgba(1, 5, 15, 0.72), inset 0 1px 0 rgba(169, 188, 255, 0.2);
}

:global(.dark) .shell-grid {
  background-image: linear-gradient(rgba(129, 140, 248, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(129, 140, 248, 0.08) 1px, transparent 1px);
}

:global(.dark) .post-page-shell :deep(.el-button) {
  box-shadow: 0 12px 24px rgba(3, 7, 20, 0.62);
}

:global(.dark) .posts-header,
:global(.dark) .quests-header {
  background: linear-gradient(150deg, rgba(24, 31, 61, 0.94), rgba(18, 24, 49, 0.92));
  border-color: rgba(129, 140, 248, 0.38);
  box-shadow: 0 16px 34px rgba(2, 6, 20, 0.55);
}

:global(.dark) .rewards-info {
  background: linear-gradient(145deg, rgba(41, 47, 80, 0.86), rgba(25, 31, 58, 0.82));
  border-color: rgba(129, 140, 248, 0.34);
}

:global(.dark) .posts-list :deep(.post-card),
:global(.dark) .posts-list :deep(.el-card),
:global(.dark) .quests-list :deep(.quest-card),
:global(.dark) .quests-list :deep(.el-card) {
  background: linear-gradient(160deg, rgba(24, 31, 61, 0.95), rgba(18, 24, 49, 0.92));
  border-color: rgba(129, 140, 248, 0.34);
  box-shadow: 0 22px 38px rgba(2, 6, 20, 0.58);
}

:global(.dark) .tabs-container :deep(.el-input__wrapper),
:global(.dark) .tabs-container :deep(.el-select__wrapper) {
  background: rgba(16, 22, 44, 0.88);
  box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.38) inset, 0 10px 18px rgba(1, 5, 16, 0.52);
}

:global(.dark) .back-to-top-button {
  border-color: rgba(173, 201, 255, 0.55);
  box-shadow: 0 0 0 4px rgba(173, 201, 255, 0.24), 0 16px 32px rgba(2, 6, 20, 0.65);
}

.post-page-shell {
  backdrop-filter: blur(14px);
}

.post-page-shell::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  pointer-events: none;
}

.post-page-shell :deep(.el-tabs__item) {
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 0.08em;
}

.post-page-shell :deep(.el-tabs__item.is-active) {
  color: #4b4fa3 !important;
  text-shadow: 0 0 16px rgba(94, 112, 220, 0.35);
}

.posts-list :deep(.el-card),
.quests-list :deep(.el-card) {
  position: relative;
  overflow: hidden;
}

.posts-list :deep(.el-card)::after,
.quests-list :deep(.el-card)::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, rgba(255, 255, 255, 0.36), rgba(255, 255, 255, 0) 45%);
  pointer-events: none;
}

.post-page-shell :deep(.el-input__wrapper),
.post-page-shell :deep(.el-select__wrapper) {
  backdrop-filter: blur(8px);
}

:global(.dark) .post-page-shell {
  backdrop-filter: blur(18px);
}

:global(.dark) .post-page-shell::before {
  border-color: rgba(171, 185, 255, 0.28);
}

:global(.dark) .post-page-shell :deep(.el-tabs__item.is-active) {
  color: #c7d2fe !important;
  text-shadow: 0 0 18px rgba(129, 140, 248, 0.55);
}

:global(.dark) .posts-list :deep(.el-card)::after,
:global(.dark) .quests-list :deep(.el-card)::after {
  background: linear-gradient(115deg, rgba(199, 210, 254, 0.14), rgba(199, 210, 254, 0) 45%);
}

@media (max-width: 768px) {
  .quests-list {
    grid-template-columns: 1fr;
  }

  .posts-header,
  .quests-header {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .posts-header-left,
  .quests-header-left {
    flex-wrap: wrap;
  }
}

/* Marketplace-inspired override */
.shell-orb,
.shell-grid {
  display: none !important;
}

.post-page-shell {
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}

.post-page-shell::before,
.post-page-shell::after {
  display: none !important;
}

.tabs-container {
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

.tabs-container :deep(.el-tabs__item) {
  text-transform: none !important;
  letter-spacing: normal !important;
  font-size: 14px !important;
}

.tabs-container :deep(.el-tabs__item.is-active) {
  color: #ff6f00 !important;
  text-shadow: none !important;
}

.tabs-container :deep(.el-tabs__active-bar) {
  background: #ff6f00 !important;
}

.posts-header,
.quests-header {
  padding: 14px !important;
  border: 1px solid #eceef3 !important;
  border-radius: 12px !important;
  background: #ffffff !important;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04) !important;
}

.rewards-info {
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
}

.posts-list :deep(.el-card),
.quests-list :deep(.el-card) {
  border: 1px solid #eceef3 !important;
  border-radius: 12px !important;
  background: #ffffff !important;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05) !important;
}

.posts-list :deep(.el-card:hover),
.quests-list :deep(.el-card:hover) {
  transform: none !important;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08) !important;
}

.posts-list :deep(.el-card)::after,
.quests-list :deep(.el-card)::after {
  display: none !important;
}

.post-page-shell :deep(.el-button--primary) {
  background: #ff6f00 !important;
  border-color: #ff6f00 !important;
}

.post-page-shell :deep(.el-button--primary:hover) {
  background: #f06500 !important;
  border-color: #f06500 !important;
}

.post-page-shell :deep(.el-input__wrapper),
.post-page-shell :deep(.el-select__wrapper) {
  background: #ffffff !important;
  box-shadow: 0 0 0 1px #dfe3eb inset !important;
  border-radius: 10px !important;
  backdrop-filter: none !important;
}

.back-to-top-button {
  background: #ff6f00 !important;
  border: none !important;
  box-shadow: 0 8px 24px rgba(255, 111, 0, 0.3) !important;
}

.back-to-top-button:hover {
  background: #f06500 !important;
}

:global(.dark) .post-page-shell,
:global(.dark) .tabs-container {
  background: transparent !important;
}

:global(.dark) .posts-header,
:global(.dark) .quests-header,
:global(.dark) .posts-list :deep(.el-card),
:global(.dark) .quests-list :deep(.el-card) {
  background: #111827 !important;
  border-color: #1f2937 !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35) !important;
}

:global(.dark) .post-page-shell :deep(.el-input__wrapper),
:global(.dark) .post-page-shell :deep(.el-select__wrapper) {
  background: #0f172a !important;
  box-shadow: 0 0 0 1px #334155 inset !important;
}

:global(.dark) .tabs-container :deep(.el-tabs__item.is-active) {
  color: #ff9f52 !important;
}

:global(.dark) .tabs-container :deep(.el-tabs__active-bar) {
  background: #ff9f52 !important;
}
</style>
