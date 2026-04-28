<template>
  <NuxtLayout name="default">
    <div class="chat-page-shell">
      <div class="chat-aura aura-left"></div>
      <div class="chat-aura aura-right"></div>
      <div class="chat-pattern"></div>
    <div class="chat-full">
      <div class="chat-container">
      <!-- Conversations List -->
      <div class="conversations-panel">
        <div class="search-bar">
          <el-input
            v-model="searchConversation"
            :placeholder="$t('search')"
            clearable
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>

        <div class="conversations-list">
          <div
            v-for="conversation in filteredConversations"
            :key="conversation.id"
            :class="['conversation-item', { active: selectedConversationId === conversation.id }]"
            @click="selectConversation(conversation)"
          >
            <el-avatar :size="48" :src="conversation.avatar" />
            <div class="conversation-info">
              <div class="conversation-header">
                <h4 class="conversation-name">{{ conversation.name }}</h4>
                <span class="conversation-time">{{ conversation.lastMessageTime }}</span>
              </div>
              <p class="conversation-preview">{{ conversation.lastMessage }}</p>
            </div>
            <el-badge :value="conversation.unread" v-if="conversation.unread > 0" />
          </div>
        </div>
      </div>

      <!-- Chat Area -->
      <div class="chat-panel">
        <template v-if="selectedConversation">
          <!-- Chat Header -->
          <div class="chat-header">
            <div class="chat-header-left">
              <el-avatar :size="40" :src="selectedConversation.avatar" />
              <div class="chat-header-info">
                <h3>{{ selectedConversation.name }}</h3>
                <p class="status">{{ $t('activeNow') }}</p>
              </div>
            </div>
            <div class="chat-header-right">
              <el-button text :icon="Phone" circle />
              <el-button text :icon="VideoCamera" circle />
              <el-button text :icon="MoreFilled" circle />
            </div>
          </div>

          <!-- Messages -->
          <div class="messages-container" ref="messagesContainer">
            <div
              v-for="message in selectedConversation.messages"
              :key="message.id"
              :class="['message', message.sender === 'user' ? 'sent' : 'received']"
            >
              <div v-if="message.sender === 'other'" class="message-avatar">
                <el-avatar :size="32" :src="selectedConversation.avatar" />
              </div>
              <div class="message-content">
                <!-- Normal Message Bubble -->
                <div v-if="!message.type || message.type === 'normal'" class="message-bubble">
                  {{ message.text }}
                </div>
                
                <!-- Photo Message -->
                <div v-else-if="message.type === 'photo'" class="message-bubble file-message">
                  <div class="file-preview-container">
                    <el-image
                      :src="message.fileUrl"
                      :alt="message.fileName"
                      fit="cover"
                      class="message-image"
                      :preview-src-list="[message.fileUrl]"
                    />
                  </div>
                  <div class="file-info">
                    <span class="file-name">{{ message.fileName }}</span>
                    <a :href="message.fileUrl" :download="message.fileName" class="file-download">
                      <el-icon><Download /></el-icon>
                      {{ $t('download') }}
                    </a>
                  </div>
                </div>
                
                <!-- Video Message -->
                <div v-else-if="message.type === 'video'" class="message-bubble file-message">
                  <div class="file-preview-container">
                    <video :src="message.fileUrl" controls class="message-video"></video>
                  </div>
                  <div class="file-info">
                    <span class="file-name">{{ message.fileName }}</span>
                    <a :href="message.fileUrl" :download="message.fileName" class="file-download">
                      <el-icon><Download /></el-icon>
                      {{ $t('download') }}
                    </a>
                  </div>
                </div>
                
                <!-- Document Message -->
                <div v-else-if="message.type === 'document'" class="message-bubble file-message document-message">
                  <div class="document-icon">
                    <el-icon :size="40"><Document /></el-icon>
                  </div>
                  <div class="file-info">
                    <span class="file-name">{{ message.fileName }}</span>
                    <span class="file-size" v-if="message.fileSize">{{ formatFileSize(message.fileSize) }}</span>
                  </div>
                  <a :href="message.fileUrl" :download="message.fileName" class="file-download-btn">
                    <el-icon><Download /></el-icon>
                    {{ $t('download') }}
                  </a>
                </div>
                
                <!-- Audio Message -->
                <div v-else-if="message.type === 'audio'" class="message-bubble file-message">
                  <div class="audio-container">
                    <audio :src="message.fileUrl" controls class="message-audio"></audio>
                  </div>
                  <div class="file-info">
                    <span class="file-name">{{ message.fileName }}</span>
                    <a :href="message.fileUrl" :download="message.fileName" class="file-download">
                      <el-icon><Download /></el-icon>
                      {{ $t('download') }}
                    </a>
                  </div>
                </div>
                
                <!-- Location Message -->
                <div v-else-if="message.type === 'location'" class="message-bubble location-message">
                  <div class="location-header">
                    <el-icon :size="20"><Location /></el-icon>
                    <span>{{ $t('sharedLocation') }}</span>
                  </div>
                  <div class="location-map-container">
                    <div :id="`map-${message.id}`" class="leaflet-map"></div>
                  </div>
                  <div class="location-info">
                    <span class="location-coords">{{ message.latitude?.toFixed(6) }}, {{ message.longitude?.toFixed(6) }}</span>
                    <a :href="`https://www.openstreetmap.org/?mlat=${message.latitude}&mlon=${message.longitude}#map=17/${message.latitude}/${message.longitude}`" target="_blank" class="location-link">
                      <el-icon><MapLocation /></el-icon>
                      {{ $t('openInMaps') }}
                    </a>
                  </div>
                </div>
                
                <!-- Quest Introduction Message Bubble -->
                <div 
                  v-else-if="message.type === 'quest-introduction'" 
                  class="message-bubble quest-intro-bubble clickable-quest"
                  @click="openQuestDetail(message)"
                >
                  <div class="quest-intro-header">
                    <el-icon><Memo /></el-icon>
                    <span>{{ $t('missionApplication') }}</span>
                  </div>
                  <el-divider style="margin: 8px 0;" />
                  <div class="quest-intro-mission">
                    <strong>{{ $t('mission') }}</strong>
                    <p class="mission-title">{{ message.questInfo?.title }}</p>
                    <div class="mission-tags">
                      <el-tag type="warning" size="small">
                        {{ message.questInfo?.rewardPoints }} {{ $t('points') }}
                      </el-tag>
                      <el-tag 
                        :type="message.questInfo?.paymentMethod === 'face-to-face' ? 'success' : 'info'" 
                        size="small"
                      >
                        {{ message.questInfo?.paymentMethod === 'face-to-face' ? 
                           $t('faceToFace') : 
                           $t('online') }}
                      </el-tag>
                    </div>
                  </div>
                  <el-divider style="margin: 8px 0;" />
                  <div class="quest-intro-text">
                    <strong>{{ $t('introduction') }}</strong>
                    <p>{{ message.text }}</p>
                  </div>
                  <div class="click-to-view">
                    <el-icon><View /></el-icon>
                    <span>{{ $t('clickToViewDetails') }}</span>
                  </div>
                </div>
                
                <span class="message-time">{{ message.time }}</span>
              </div>
            </div>
          </div>

          <!-- Message Input -->
          <div class="message-input-area">
            <input 
              ref="fileInputRef" 
              type="file" 
              style="display: none;" 
              @change="handleFileSelect"
              :accept="fileAcceptType"
            />
            <el-input
              v-model="messageInput"
              :placeholder="$t('typeMessage')"
              @keyup.enter="sendMessage"
            />
            <div class="composer-actions">
              <el-button text :icon="IceCreamRound" circle size="large" />
              <el-dropdown trigger="click" @command="handleAttachmentCommand">
                <el-button text :icon="Plus" circle size="large" />
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="photo">
                      <el-icon><Picture /></el-icon>
                      <span style="margin-left: 8px;">{{ $t('photo') }}</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="video">
                      <el-icon><VideoPlay /></el-icon>
                      <span style="margin-left: 8px;">{{ $t('video') }}</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="document">
                      <el-icon><Document /></el-icon>
                      <span style="margin-left: 8px;">{{ $t('document') }}</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="audio">
                      <el-icon><Headset /></el-icon>
                      <span style="margin-left: 8px;">{{ $t('audio') }}</span>
                    </el-dropdown-item>
                    <el-dropdown-item command="location">
                      <el-icon><Location /></el-icon>
                      <span style="margin-left: 8px;">{{ $t('location') }}</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-button type="primary" :icon="Promotion" circle size="large" @click="sendMessage" />
            </div>
          </div>
        </template>
        <template v-else>
          <div class="empty-chat">
            <el-icon><ChatDotRound /></el-icon>
            <p>{{ $t('selectConversation') }}</p>
          </div>
        </template>
      </div>
    </div>
    </div>
    </div>
  </NuxtLayout>

  <!-- Quest Detail Dialog -->
  <QuestDetailDialog
    v-model="showQuestDetailDialog"
    :quest="selectedQuestDetail"
    :language="language"
    :can-accept="false"
    :accept-button-tooltip="$t('questAlreadyAccepted')"
  />
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import QuestDetailDialog from '~/components/QuestDetailDialog.vue'
import {
  Search,
  Phone,
  VideoCamera,
  MoreFilled,
  Plus,
  IceCreamRound,
  Promotion,
  ChatDotRound,
  Memo,
  Picture,
  VideoPlay,
  Document,
  Headset,
  Location,
  Download,
  MapLocation,
  View
} from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

// Add Leaflet CSS
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
      integrity: 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=',
      crossorigin: ''
    }
  ]
})

const route = useRoute()
const { t, locale } = useI18n()
const language = computed(() => locale.value as 'en' | 'zh')
const searchConversation = ref('')
const messageInput = ref('')
const selectedConversationId = ref<number | null>(null)
const messagesContainer = ref<HTMLElement>()
const fileInputRef = ref<HTMLInputElement>()
const fileAcceptType = ref('')
const currentAttachmentType = ref('')
const mapInstances = ref<Map<number, any>>(new Map())
const showQuestDetailDialog = ref(false)
const selectedQuestDetail = ref<any>(null)

interface Message {
  id: number
  text: string
  sender: 'user' | 'other'
  time: string
  type?: 'normal' | 'quest-introduction' | 'photo' | 'video' | 'document' | 'audio' | 'location'
  questInfo?: {
    title: string
    detail: string
    rewardPoints: number
    paymentMethod: 'face-to-face' | 'online'
    tags: string[]
  }
  fileUrl?: string
  fileName?: string
  fileSize?: number
  latitude?: number
  longitude?: number
}

interface Conversation {
  id: number
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  unread: number
  messages: Message[]
}

const conversations = ref<Conversation[]>([
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg',
    lastMessage: 'Hey, how are you?',
    lastMessageTime: '10:30',
    unread: 2,
    messages: [
      { id: 1, text: 'Hi there!', sender: 'other', time: '10:20' },
      { id: 2, text: 'Hey, how are you?', sender: 'other', time: '10:30' },
      { id: 3, text: 'I\'m doing great, thanks!', sender: 'user', time: '10:35' }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://cube.elemecdn.com/3/dc/1ea6beec64f4a146f6f02a42cc5f7.svg',
    lastMessage: 'See you tomorrow!',
    lastMessageTime: '09:15',
    unread: 0,
    messages: [
      { id: 1, text: 'Don\'t forget about the meeting', sender: 'other', time: '09:00' },
      { id: 2, text: 'I won\'t!', sender: 'user', time: '09:05' },
      { id: 3, text: 'See you tomorrow!', sender: 'other', time: '09:15' },
      { 
        id: 4, 
        text: 'Hi! I have 5 years of experience in helping with furniture moving and I\'m available this Saturday. I have all the necessary equipment and would be happy to help!',
        sender: 'user', 
        time: '11:20',
        type: 'quest-introduction',
        questInfo: {
          title: 'Help Moving Furniture',
          detail: 'Need help moving some heavy furniture to my new apartment this Saturday.',
          rewardPoints: 80,
          paymentMethod: 'face-to-face',
          tags: ['Physical Help', 'Moving']
        }
      }
    ]
  },
  {
    id: 3,
    name: 'Mike Johnson',
    avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg',
    lastMessage: 'Thanks for the help!',
    lastMessageTime: '08:20',
    unread: 0,
    messages: [
      { id: 1, text: 'Can you help me with my computer?', sender: 'other', time: '08:00' },
      { id: 2, text: 'Sure, what\'s the issue?', sender: 'user', time: '08:05' },
      { id: 3, text: 'Thanks for the help!', sender: 'other', time: '08:20' }
    ]
  },
  {
    id: 4,
    name: 'Sarah Williams',
    avatar: 'https://cube.elemecdn.com/3/dc/1ea6beec64f4a146f6f02a42cc5f7.svg',
    lastMessage: 'Great class today!',
    lastMessageTime: '07:45',
    unread: 1,
    messages: [
      { id: 1, text: 'Are you coming to yoga?', sender: 'other', time: '07:30' },
      { id: 2, text: 'Yes, see you there!', sender: 'user', time: '07:35' },
      { id: 3, text: 'Great class today!', sender: 'other', time: '07:45' }
    ]
  },
  {
    id: 5,
    name: 'David Brown',
    avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg',
    lastMessage: 'Check out these photos!',
    lastMessageTime: '07:10',
    unread: 0,
    messages: [
      { id: 1, text: 'I went hiking yesterday', sender: 'other', time: '07:00' },
      { id: 2, text: 'That sounds amazing!', sender: 'user', time: '07:05' },
      { id: 3, text: 'Check out these photos!', sender: 'other', time: '07:10' }
    ]
  },
  {
    id: 6,
    name: 'Emily Davis',
    avatar: 'https://cube.elemecdn.com/3/dc/1ea6beec64f4a146f6f02a42cc5f7.svg',
    lastMessage: 'Love the design!',
    lastMessageTime: '06:55',
    unread: 3,
    messages: [
      { id: 1, text: 'What do you think of my new artwork?', sender: 'other', time: '06:45' },
      { id: 2, text: 'It looks incredible!', sender: 'user', time: '06:50' },
      { id: 3, text: 'Love the design!', sender: 'other', time: '06:55' }
    ]
  },
  {
    id: 7,
    name: 'Robert Martinez',
    avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg',
    lastMessage: 'Let\'s meet for coffee',
    lastMessageTime: 'Yesterday',
    unread: 0,
    messages: [
      { id: 1, text: 'Hey, long time no see!', sender: 'other', time: '15:30' },
      { id: 2, text: 'I know! How have you been?', sender: 'user', time: '15:35' },
      { id: 3, text: 'Let\'s meet for coffee', sender: 'other', time: '15:40' }
    ]
  },
  {
    id: 8,
    name: 'Lisa Anderson',
    avatar: 'https://cube.elemecdn.com/3/dc/1ea6beec64f4a146f6f02a42cc5f7.svg',
    lastMessage: 'Recipe coming soon!',
    lastMessageTime: 'Yesterday',
    unread: 0,
    messages: [
      { id: 1, text: 'That dinner was delicious', sender: 'user', time: '14:20' },
      { id: 2, text: 'Thank you! I\'ll send you the recipe', sender: 'other', time: '14:25' },
      { id: 3, text: 'Recipe coming soon!', sender: 'other', time: '14:30' }
    ]
  },
  {
    id: 9,
    name: 'Tom Wilson',
    avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg',
    lastMessage: 'Game night Friday?',
    lastMessageTime: 'Yesterday',
    unread: 2,
    messages: [
      { id: 1, text: 'Want to play some games?', sender: 'other', time: '13:15' },
      { id: 2, text: 'Sure! When?', sender: 'user', time: '13:20' },
      { id: 3, text: 'Game night Friday?', sender: 'other', time: '13:25' }
    ]
  },
  {
    id: 10,
    name: 'Amy Chen',
    avatar: 'https://cube.elemecdn.com/3/dc/1ea6beec64f4a146f6f02a42cc5f7.svg',
    lastMessage: 'Thanks for the recommendation',
    lastMessageTime: 'Yesterday',
    unread: 0,
    messages: [
      { id: 1, text: 'Have you read that book?', sender: 'other', time: '12:00' },
      { id: 2, text: 'Yes! It\'s amazing', sender: 'user', time: '12:05' },
      { id: 3, text: 'Thanks for the recommendation', sender: 'other', time: '12:10' }
    ]
  },
  {
    id: 100,
    name: 'Community Group',
    avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg',
    lastMessage: 'Thanks for organizing!',
    lastMessageTime: '08:45',
    unread: 5,
    messages: [
      { id: 1, text: 'Community event tomorrow at 5pm', sender: 'other', time: '08:30' },
      { id: 2, text: 'Count me in!', sender: 'user', time: '08:35' },
      { id: 3, text: 'Thanks for organizing!', sender: 'other', time: '08:45' }
    ]
  },
  {
    id: 101,
    name: 'Neighborhood Watch',
    avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg',
    lastMessage: 'Stay safe everyone',
    lastMessageTime: 'Feb 1',
    unread: 0,
    messages: [
      { id: 1, text: 'Reminder about safety meeting', sender: 'other', time: '10:00' },
      { id: 2, text: 'Will be there', sender: 'user', time: '10:05' },
      { id: 3, text: 'Stay safe everyone', sender: 'other', time: '10:10' }
    ]
  },
  {
    id: 102,
    name: 'Local Sports Club',
    avatar: 'https://cube.elemecdn.com/3/dc/1ea6beec64f4a146f6f02a42cc5f7.svg',
    lastMessage: 'Match this Saturday',
    lastMessageTime: 'Feb 1',
    unread: 1,
    messages: [
      { id: 1, text: 'Who wants to play soccer?', sender: 'other', time: '09:00' },
      { id: 2, text: 'I\'m in!', sender: 'user', time: '09:05' },
      { id: 3, text: 'Match this Saturday', sender: 'other', time: '09:10' }
    ]
  }
])

// Load conversations from localStorage on mount
onMounted(() => {
  const storedConversations = localStorage.getItem('chatConversations')
  if (storedConversations) {
    const parsed = JSON.parse(storedConversations)
    // Merge with existing conversations, adding new ones
    parsed.forEach((stored: Conversation) => {
      const existing = conversations.value.find(c => c.id === stored.id)
      if (existing) {
        existing.messages = stored.messages
        existing.lastMessage = stored.lastMessage
        existing.lastMessageTime = stored.lastMessageTime
      } else {
        conversations.value.push(stored)
      }
    })
  }
  
  // Check if userId query parameter is present
  const userId = route.query.userId
  if (userId) {
    const conversationId = parseInt(userId as string)
    const conversation = conversations.value.find(c => c.id === conversationId)
    if (conversation) {
      selectConversation(conversation)
    } else {
      // Create a new conversation if it doesn't exist
      createNewConversation(conversationId)
    }
  }
})

const filteredConversations = computed(() => {
  return conversations.value.filter(conv =>
    conv.name.toLowerCase().includes(searchConversation.value.toLowerCase())
  )
})

const selectedConversation = computed(() => {
  return conversations.value.find(c => c.id === selectedConversationId.value)
})

const selectConversation = (conversation: Conversation) => {
  selectedConversationId.value = conversation.id
  conversation.unread = 0
  nextTick(() => {
    scrollToBottom()
  })
}

const createNewConversation = (userId: number) => {
  // Friend data mapping (should match friends.vue)
  const friendsData: Record<number, { name: string, avatar: string }> = {
    1: { name: 'John Doe', avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg' },
    2: { name: 'Jane Smith', avatar: 'https://cube.elemecdn.com/3/dc/1ea6beec64f4a146f6f02a42cc5f7.svg' },
    3: { name: 'Mike Johnson', avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg' },
    4: { name: 'Sarah Williams', avatar: 'https://cube.elemecdn.com/3/dc/1ea6beec64f4a146f6f02a42cc5f7.svg' },
    5: { name: 'David Brown', avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg' },
    6: { name: 'Emily Davis', avatar: 'https://cube.elemecdn.com/3/dc/1ea6beec64f4a146f6f02a42cc5f7.svg' }
  }
  
  const friendData = friendsData[userId]
  if (friendData) {
    const newConversation: Conversation = {
      id: userId,
      name: friendData.name,
      avatar: friendData.avatar,
      lastMessage: '',
      lastMessageTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      unread: 0,
      messages: []
    }
    conversations.value.unshift(newConversation)
    selectConversation(newConversation)
  }
}

const sendMessage = () => {
  if (!messageInput.value.trim() || !selectedConversation.value) return

  const newMessage: Message = {
    id: (selectedConversation.value.messages.length || 0) + 1,
    text: messageInput.value,
    sender: 'user',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  selectedConversation.value.messages.push(newMessage)
  selectedConversation.value.lastMessage = messageInput.value
  selectedConversation.value.lastMessageTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  messageInput.value = ''

  nextTick(() => {
    scrollToBottom()
  })
}

// Handle attachment type selection
const handleAttachmentCommand = (command: string) => {
  currentAttachmentType.value = command
  
  // Set file accept type based on selection
  switch (command) {
    case 'photo':
      fileAcceptType.value = 'image/*'
      break
    case 'video':
      fileAcceptType.value = 'video/*'
      break
    case 'document':
      fileAcceptType.value = '.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx'
      break
    case 'audio':
      fileAcceptType.value = 'audio/*'
      break
    case 'location':
      // Handle location sharing separately
      handleLocationShare()
      return
    default:
      fileAcceptType.value = '*'
  }
  
  // Trigger file input
  nextTick(() => {
    fileInputRef.value?.click()
  })
}

// Handle file selection
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file || !selectedConversation.value) return
  
  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    ElMessage.error(t('fileTooLarge'))
    target.value = ''
    return
  }
  
  const fileType = currentAttachmentType.value
  let displayText = file.name
  
  // Convert file to base64 data URL for persistence
  const reader = new FileReader()
  
  reader.onload = (e) => {
    const fileUrl = e.target?.result as string
    
    const newMessage: Message = {
      id: (selectedConversation.value!.messages.length || 0) + 1,
      text: displayText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: fileType as 'photo' | 'video' | 'document' | 'audio',
      fileUrl: fileUrl,
      fileName: file.name,
      fileSize: file.size
    }
    
    selectedConversation.value!.messages.push(newMessage)
    selectedConversation.value!.lastMessage = `${t(fileType)}: ${file.name}`
    selectedConversation.value!.lastMessageTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    
    ElMessage.success(t('fileSent'))
    
    nextTick(() => {
      scrollToBottom()
    })
  }
  
  reader.onerror = () => {
    ElMessage.error(t('fileFailed'))
  }
  
  // Read file as data URL
  reader.readAsDataURL(file)
  
  // Clear file input
  target.value = ''
}

// Handle location sharing
const handleLocationShare = () => {
  if (!selectedConversation.value) return
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords
        const locationText = `${t('location')}: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        
        const newMessage: Message = {
          id: (selectedConversation.value!.messages.length || 0) + 1,
          text: locationText,
          sender: 'user',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'location',
          latitude: latitude,
          longitude: longitude
        }
        
        selectedConversation.value!.messages.push(newMessage)
        selectedConversation.value!.lastMessage = locationText
        selectedConversation.value!.lastMessageTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        
        ElMessage.success(t('locationShared'))
        
        nextTick(() => {
          scrollToBottom()
        })
      },
      (error) => {
        ElMessage.error(t('locationError'))
        console.error('Location error:', error)
      }
    )
  } else {
    ElMessage.error(t('locationNotSupported'))
  }
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Format file size
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

// Initialize Leaflet maps for location messages
const initializeLocationMaps = async () => {
  // Dynamically import Leaflet
  const L = await import('leaflet')
  
  if (!selectedConversation.value) return
  
  selectedConversation.value.messages.forEach((message) => {
    if (message.type === 'location' && message.latitude && message.longitude) {
      const mapId = `map-${message.id}`
      const mapElement = document.getElementById(mapId)
      
      if (mapElement && !mapInstances.value.has(message.id)) {
        // Initialize map
        const map = L.map(mapId).setView([message.latitude, message.longitude], 17)
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map)
        
        // Add marker
        const marker = L.marker([message.latitude, message.longitude]).addTo(map)
        
        // Add circle around marker
        const circle = L.circle([message.latitude, message.longitude], {
          color: '#07b981',
          fillColor: '#07b981',
          fillOpacity: 0.2,
          radius: 30 // 30 meters
        }).addTo(map)
        
        // Store map instance
        mapInstances.value.set(message.id, map)
      }
    }
  })
}

// Cleanup map instances
const cleanupMaps = () => {
  mapInstances.value.forEach((map) => {
    map.remove()
  })
  mapInstances.value.clear()
}

watch(() => selectedConversationId.value, () => {
  nextTick(() => {
    scrollToBottom()
    // Cleanup old maps
    cleanupMaps()
    // Initialize new maps after a short delay
    setTimeout(() => {
      initializeLocationMaps()
    }, 100)
  })
})

// Save conversations to localStorage when they change
watch(conversations, (newConversations) => {
  localStorage.setItem('chatConversations', JSON.stringify(newConversations))
  // Reinitialize maps when messages change
  nextTick(() => {
    setTimeout(() => {
      initializeLocationMaps()
    }, 100)
  })
}, { deep: true })

// Cleanup on unmount
onBeforeUnmount(() => {
  cleanupMaps()
})

// Open quest detail dialog
const openQuestDetail = (message: Message) => {
  if (message.questInfo) {
    selectedQuestDetail.value = {
      id: message.id,
      authorId: 1,
      author: selectedConversation.value?.name || 'Unknown',
      avatar: selectedConversation.value?.avatar || '',
      title: message.questInfo.title,
      detail: message.questInfo.detail,
      tags: message.questInfo.tags,
      paymentMethod: message.questInfo.paymentMethod,
      rewardPoints: message.questInfo.rewardPoints,
      time: message.time,
      acceptedBy: null
    }
    showQuestDetailDialog.value = true
  }
}
</script>

<style scoped>
.chat-page-shell {
  position: relative;
  border-radius: 28px;
  padding: 20px;
  overflow: hidden;
  border: 1px solid rgba(109, 125, 219, 0.28);
  background:
    radial-gradient(140% 120% at 0% 0%, rgba(79, 70, 229, 0.22), rgba(255, 255, 255, 0) 58%),
    radial-gradient(130% 140% at 100% 0%, rgba(6, 182, 212, 0.16), rgba(255, 255, 255, 0) 62%),
    linear-gradient(166deg, rgba(255, 255, 255, 0.96), rgba(242, 247, 255, 0.92));
  box-shadow: 0 40px 72px rgba(39, 52, 130, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.78);
}

.chat-aura {
  position: absolute;
  border-radius: 999px;
  pointer-events: none;
}

.chat-page-shell .aura-left {
  width: 300px;
  height: 300px;
  top: -110px;
  left: -80px;
  background: radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.54), rgba(99, 102, 241, 0));
}

.chat-page-shell .aura-right {
  width: 330px;
  height: 330px;
  bottom: -130px;
  right: -90px;
  background: radial-gradient(circle at 45% 40%, rgba(6, 182, 212, 0.48), rgba(6, 182, 212, 0));
}

.chat-pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: radial-gradient(circle at 50% 35%, #000 40%, transparent 82%);
}

.chat-full {
  height: 88vh;
  display: flex;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(129, 140, 248, 0.2);
  box-shadow: 0 30px 58px rgba(40, 53, 124, 0.18);
  position: relative;
  z-index: 1;
}

.chat-container {
  display: flex;
  width: 100%;
  background:
    radial-gradient(120% 130% at 0% 0%, rgba(99, 102, 241, 0.13), rgba(255, 255, 255, 0) 58%),
    radial-gradient(120% 140% at 100% 0%, rgba(14, 165, 233, 0.1), rgba(255, 255, 255, 0) 60%),
    linear-gradient(160deg, #ffffff, #f4f8ff);
}

.conversations-panel {
  width: 360px;
  border-right: 1px solid rgba(129, 140, 248, 0.2);
  display: flex;
  flex-direction: column;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.96), rgba(243, 247, 255, 0.92));
}

.search-bar {
  padding: 16px;
  border-bottom: 1px solid rgba(129, 140, 248, 0.18);
}

.search-bar :deep(.el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.2) inset, 0 8px 16px rgba(67, 80, 154, 0.1);
}

.conversations-list {
  flex: 1;
  overflow-y: auto;
}

.conversation-item {
  display: flex;
  align-items: center;
  padding: 13px 16px;
  border-bottom: 1px solid rgba(129, 140, 248, 0.14);
  cursor: pointer;
  transition: background-color 0.25s, transform 0.25s;
}

.conversation-item:hover {
  background-color: rgba(99, 102, 241, 0.12);
  transform: translateX(2px);
}

.conversation-item.active {
  background-color: rgba(99, 102, 241, 0.2);
  box-shadow: inset 3px 0 0 rgba(79, 70, 229, 0.7);
}

.conversation-info {
  flex: 1;
  margin-left: 12px;
  min-width: 0;
}

.conversation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.conversation-name {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #1e2952;
}

.conversation-time {
  font-size: 16px;
  color: #6f78a8;
}

.conversation-preview {
  margin: 0;
  font-size: 17px;
  color: #5d678f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.96), rgba(246, 249, 255, 0.93));
}

.empty-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6b76a8;
}

.empty-chat .el-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.chat-header {
  padding: 16px;
  border-bottom: 1px solid rgba(129, 140, 248, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(241, 246, 255, 0.86));
  backdrop-filter: blur(6px);
}

.chat-header-left {
  display: flex;
  align-items: center;
}

.chat-header-info {
  margin-left: 12px;
}

.chat-header-info h3 {
  margin: 0;
  font-size: 19px;
  font-weight: 500;
  color: #1f2a56;
}

.chat-header-info .status {
  margin: 0;
  font-size: 16px;
  color: #6671a2;
}

.chat-header-right {
  display: flex;
  gap: 8px;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: calc(100vh - 250px);
  min-height: 300px;
}

.message {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  margin-bottom: 8px;
}

.message.sent {
  justify-content: flex-end;
}

.message.sent .message-content {
  align-items: flex-end;
}

.message.received .message-avatar {
  flex-shrink: 0;
}

.message-avatar {
  display: flex;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message.received .message-content {
  align-items: flex-start;
}

.message.sent .message-content {
  align-items: flex-end;
}

.message-bubble {
  max-width: 70%;
  padding: 11px 14px;
  border-radius: 16px;
  font-size: 18px;
  word-wrap: break-word;
  line-height: 1.4;
  border: 1px solid transparent;
  box-shadow: 0 10px 18px rgba(57, 70, 148, 0.12);
}

.message.received .message-bubble {
  background: linear-gradient(145deg, #ffffff, #edf3ff);
  border-color: rgba(129, 140, 248, 0.16);
  color: #1e2952;
}

.message.sent .message-bubble {
  background: linear-gradient(145deg, #4f46e5, #6366f1);
  border-color: rgba(175, 190, 255, 0.3);
  color: #fff;
}

.quest-intro-bubble {
  max-width: 80% !important;
  padding: 12px 14px !important;
  border-radius: 14px !important;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: #fff !important;
  box-shadow: 0 12px 22px rgba(94, 92, 212, 0.28);
}

.clickable-quest {
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.clickable-quest:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.45);
}

.clickable-quest:active {
  transform: translateY(0);
}

.click-to-view {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 14px;
  opacity: 0.9;
}

.click-to-view .el-icon {
  font-size: 18px;
}

.quest-intro-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 19px;
}

.quest-intro-header .el-icon {
  font-size: 24px;
}

.quest-intro-mission {
  margin: 8px 0;
}

.quest-intro-mission strong {
  display: block;
  margin-bottom: 4px;
  font-size: 17px;
  opacity: 0.9;
}

.mission-title {
  margin: 4px 0 8px 0;
  font-size: 18px;
  font-weight: 500;
}

.mission-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.quest-intro-text {
  margin: 8px 0 0 0;
}

.quest-intro-text strong {
  display: block;
  margin-bottom: 4px;
  font-size: 17px;
  opacity: 0.9;
}

.quest-intro-text p {
  margin: 0;
  font-size: 18px;
  line-height: 1.6;
  white-space: pre-wrap;
}

.quest-intro-bubble :deep(.el-divider) {
  background-color: rgba(255, 255, 255, 0.3);
}

.quest-intro-bubble :deep(.el-tag) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
}

.message-time {
  font-size: 16px;
  color: #6f78a8;
  padding: 0 4px;
}

.file-message {
  padding: 8px !important;
  max-width: 350px;
}

.file-preview-container {
  margin-bottom: 8px;
}

.message-image {
  width: 100%;
  max-width: 300px;
  max-height: 300px;
  border-radius: 10px;
  cursor: pointer;
}

.message-video {
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
}

.message-audio {
  width: 100%;
  max-width: 300px;
}

.file-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.file-name {
  font-size: 14px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-size {
  font-size: 12px;
  color: #6d76a5;
  margin-left: 8px;
}

.file-download {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #4f46e5;
  text-decoration: none;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
}

.file-download:hover {
  color: #3730a3;
  text-decoration: underline;
}

.document-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px !important;
  background: linear-gradient(145deg, #ffffff, #edf3ff) !important;
  color: #1e2952 !important;
}

.message.sent .document-message {
  background: linear-gradient(145deg, #4f46e5, #6366f1) !important;
  color: #fff !important;
}

.document-icon {
  color: #4f46e5;
  flex-shrink: 0;
}

.message.sent .document-icon {
  color: #fff;
}

.document-message .file-info {
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  border-top: none;
  margin-top: 0;
  padding-top: 0;
}

.file-download-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: linear-gradient(145deg, #4f46e5, #6366f1);
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  flex-shrink: 0;
}

.file-download-btn:hover {
  background: linear-gradient(145deg, #4338ca, #4f46e5);
}

.message.sent .file-download-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.message.sent .file-download-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.message.sent .document-message .file-name {
  color: #fff;
}

.message.sent .document-message .file-size {
  color: rgba(255, 255, 255, 0.8);
}

.audio-container {
  width: 100%;
}

.location-message {
  padding: 12px !important;
  max-width: 350px;
}

.location-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-weight: 600;
  color: #4f46e5;
}

.location-map-container {
  position: relative;
  width: 100%;
  height: 200px;
  margin-bottom: 8px;
  border-radius: 10px;
  overflow: hidden;
}

.leaflet-map {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  z-index: 1;
}

.location-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.location-coords {
  font-size: 12px;
  color: #5d678f;
  font-family: monospace;
}

.location-link {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #4f46e5;
  text-decoration: none;
  font-size: 14px;
  white-space: nowrap;
}

.location-link:hover {
  color: #3730a3;
  text-decoration: underline;
}

.message-input-area {
  padding: 14px 16px;
  border-top: 1px solid rgba(129, 140, 248, 0.2);
  display: flex;
  gap: 8px;
  align-items: flex-end;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.92), rgba(241, 246, 255, 0.88));
}

.message-input-area :deep(.el-input) {
  flex: 1;
}

.composer-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 6px;
}

.message-input-area :deep(.el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.22) inset, 0 8px 16px rgba(67, 80, 154, 0.1);
}

.conversations-list::-webkit-scrollbar,
.messages-container::-webkit-scrollbar {
  width: 6px;
}

.conversations-list::-webkit-scrollbar-track,
.messages-container::-webkit-scrollbar-track {
  background: transparent;
}

.conversations-list::-webkit-scrollbar-thumb,
.messages-container::-webkit-scrollbar-thumb {
  background: #bcc6ea;
  border-radius: 3px;
}

.conversations-list::-webkit-scrollbar-thumb:hover,
.messages-container::-webkit-scrollbar-thumb:hover {
  background: #9aa7d9;
}

.dark .chat-full {
  border-color: rgba(129, 140, 248, 0.36);
  box-shadow: 0 34px 64px rgba(1, 5, 17, 0.68);
}

.dark .chat-page-shell {
  border-color: rgba(129, 140, 248, 0.45);
  background:
    radial-gradient(145% 125% at 0% 0%, rgba(79, 70, 229, 0.46), rgba(10, 16, 34, 0.08) 58%),
    radial-gradient(135% 150% at 100% 0%, rgba(6, 182, 212, 0.24), rgba(10, 16, 34, 0.08) 62%),
    linear-gradient(165deg, rgba(12, 18, 38, 0.98), rgba(20, 28, 56, 0.95));
  box-shadow: 0 44px 80px rgba(1, 5, 15, 0.72), inset 0 1px 0 rgba(169, 188, 255, 0.2);
}

.dark .chat-pattern {
  background-image: linear-gradient(rgba(129, 140, 248, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(129, 140, 248, 0.08) 1px, transparent 1px);
}

.dark .chat-container {
  background:
    radial-gradient(130% 130% at 0% 0%, rgba(79, 70, 229, 0.34), rgba(16, 22, 45, 0.08) 58%),
    radial-gradient(130% 145% at 100% 0%, rgba(14, 165, 233, 0.18), rgba(16, 22, 45, 0.08) 62%),
    linear-gradient(160deg, #11162d, #1a2345) !important;
}

.dark .conversations-panel {
  background: linear-gradient(160deg, rgba(24, 31, 61, 0.95), rgba(18, 24, 49, 0.92)) !important;
  border-right-color: rgba(129, 140, 248, 0.34) !important;
}

.dark .search-bar {
  border-bottom-color: rgba(129, 140, 248, 0.3) !important;
}

.dark .search-bar :deep(.el-input__wrapper) {
  background: rgba(16, 22, 44, 0.88) !important;
  box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.36) inset, 0 8px 16px rgba(1, 5, 15, 0.52) !important;
}

.dark .conversation-item {
  border-bottom-color: rgba(129, 140, 248, 0.24) !important;
}

.dark .conversation-item:hover {
  background-color: rgba(79, 70, 229, 0.24) !important;
}

.dark .conversation-item.active {
  background-color: rgba(79, 70, 229, 0.32) !important;
  box-shadow: inset 3px 0 0 rgba(165, 180, 252, 0.85);
}

.dark .conversation-name,
.dark .chat-header-info h3 {
  color: #e8eeff !important;
}

.dark .conversation-time,
.dark .conversation-preview,
.dark .chat-header-info .status,
.dark .empty-chat,
.dark .location-coords,
.dark .file-size,
.dark .message-time {
  color: #b8c3ed !important;
}

.dark .chat-panel {
  background: linear-gradient(160deg, rgba(21, 28, 57, 0.95), rgba(16, 22, 45, 0.92)) !important;
}

.dark .chat-header {
  background: linear-gradient(150deg, rgba(24, 31, 61, 0.95), rgba(18, 24, 49, 0.92)) !important;
  border-bottom-color: rgba(129, 140, 248, 0.32) !important;
}

.dark .message.received .message-bubble,
.dark .document-message,
.dark .location-message {
  background: linear-gradient(150deg, rgba(36, 42, 74, 0.88), rgba(24, 31, 58, 0.84)) !important;
  border-color: rgba(129, 140, 248, 0.3);
  color: #e5e5e5 !important;
}

.dark .message.sent .message-bubble,
.dark .message.sent .document-message {
  background: linear-gradient(145deg, #4f46e5, #6366f1) !important;
  color: #fff !important;
}

.dark .message-input-area {
  background: linear-gradient(150deg, rgba(24, 31, 61, 0.92), rgba(18, 24, 49, 0.9)) !important;
  border-top-color: rgba(129, 140, 248, 0.32) !important;
}

.dark .message-input-area :deep(.el-input__wrapper) {
  background: rgba(16, 22, 44, 0.88) !important;
  box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.38) inset, 0 8px 16px rgba(1, 5, 15, 0.52) !important;
}

.dark .message-input-area :deep(.el-input__inner),
.dark .message-input-area :deep(.el-button--text),
.dark .file-name {
  color: #e5e5e5 !important;
}

.dark .message-input-area :deep(.el-button--text:hover),
.dark .location-link,
.dark .location-header,
.dark .file-download,
.dark .document-icon {
  color: #a5b4fc !important;
}

.dark .location-link:hover,
.dark .file-download:hover {
  color: #c7d2fe !important;
}

.dark .message-image,
.dark .message-video {
  border: 1px solid rgba(129, 140, 248, 0.28);
}

.dark .clickable-quest:hover {
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.62);
}

.dark .click-to-view {
  border-top-color: rgba(255, 255, 255, 0.2);
}

@media (max-width: 1024px) {
  .chat-full {
    height: auto;
    min-height: 80vh;
  }

  .chat-container {
    flex-direction: column;
  }

  .conversations-panel {
    width: 100%;
    max-height: 280px;
  }
}

.chat-page-shell {
  backdrop-filter: blur(16px);
}

.chat-page-shell::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  pointer-events: none;
}

.chat-full {
  box-shadow: 0 40px 70px rgba(33, 46, 122, 0.22);
}

.chat-header {
  backdrop-filter: blur(10px);
}

.conversation-item.active {
  box-shadow: inset 3px 0 0 rgba(79, 70, 229, 0.7), 0 0 24px rgba(99, 102, 241, 0.24);
}

.message.sent .message-bubble {
  box-shadow: 0 12px 22px rgba(75, 88, 191, 0.28);
}

.message.received .message-bubble {
  box-shadow: 0 12px 22px rgba(76, 90, 170, 0.18);
}

.chat-page-shell :deep(.el-button.is-circle) {
  box-shadow: 0 8px 18px rgba(80, 93, 181, 0.2);
}

:global(.dark) .chat-page-shell {
  backdrop-filter: blur(20px);
}

:global(.dark) .chat-page-shell::before {
  border-color: rgba(171, 185, 255, 0.28);
}

:global(.dark) .chat-full {
  box-shadow: 0 44px 78px rgba(1, 5, 18, 0.74);
}

:global(.dark) .conversation-item.active {
  box-shadow: inset 3px 0 0 rgba(165, 180, 252, 0.85), 0 0 24px rgba(129, 140, 248, 0.26);
}

:global(.dark) .message.sent .message-bubble {
  box-shadow: 0 14px 24px rgba(79, 70, 229, 0.34);
}

:global(.dark) .chat-page-shell :deep(.el-button.is-circle) {
  box-shadow: 0 10px 20px rgba(2, 6, 19, 0.65);
}

/* Marketplace-inspired override */
.chat-aura,
.chat-pattern {
  display: none !important;
}

.chat-page-shell {
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}

.chat-page-shell::before,
.chat-page-shell::after {
  display: none !important;
}

.chat-full {
  border: 1px solid #eceef3 !important;
  border-radius: 12px !important;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.06) !important;
}

.chat-container,
.conversations-panel,
.chat-panel,
.chat-header,
.message-input-area {
  background: #ffffff !important;
}

.conversations-panel,
.chat-header,
.message-input-area {
  border-color: #eceef3 !important;
}

.conversation-item {
  border-bottom-color: #f1f3f7 !important;
}

.conversation-item:hover {
  background: #fff4eb !important;
  transform: none !important;
}

.conversation-item.active {
  background: #fff0e4 !important;
  box-shadow: inset 3px 0 0 #ff6f00 !important;
}

.message.received .message-bubble {
  background: #f5f7fb !important;
  border-color: #e5e7eb !important;
  color: #111827 !important;
}

.message.sent .message-bubble,
.message.sent .document-message,
.file-download-btn {
  background: #ff6f00 !important;
  border-color: #ff6f00 !important;
}

.file-download,
.location-link,
.location-header,
.document-icon {
  color: #ff6f00 !important;
}

.chat-page-shell :deep(.el-input__wrapper),
.search-bar :deep(.el-input__wrapper) {
  background: #ffffff !important;
  box-shadow: 0 0 0 1px #dfe3eb inset !important;
  border-radius: 10px !important;
}

:global(.dark) .chat-page-shell {
  background: transparent !important;
}

:global(.dark) .chat-full,
:global(.dark) .chat-container,
:global(.dark) .conversations-panel,
:global(.dark) .chat-panel,
:global(.dark) .chat-header,
:global(.dark) .message-input-area {
  background: #111827 !important;
  border-color: #1f2937 !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35) !important;
}

:global(.dark) .conversation-item {
  border-bottom-color: #1f2937 !important;
}

:global(.dark) .conversation-item:hover {
  background: #1f2937 !important;
}

:global(.dark) .conversation-item.active {
  background: #2b1b0d !important;
  box-shadow: inset 3px 0 0 #ff9f52 !important;
}

:global(.dark) .message.received .message-bubble {
  background: #1f2937 !important;
  border-color: #374151 !important;
}

:global(.dark) .chat-page-shell :deep(.el-input__wrapper),
:global(.dark) .search-bar :deep(.el-input__wrapper) {
  background: #0f172a !important;
  box-shadow: 0 0 0 1px #334155 inset !important;
}
</style>
