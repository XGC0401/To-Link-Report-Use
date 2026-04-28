<template>
  <el-dialog 
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="$t('introduceYourself')"
    width="600px"
  >
    <div class="intro-content">
      <div v-if="quest" class="quest-summary">
        <h4>{{ $t('missionDetails') }}</h4>
        <div class="quest-info">
          <p class="quest-title">{{ quest.title }}</p>
          <div class="quest-meta">
            <el-tag type="warning" size="small">
              {{ quest.rewardPoints }} {{ $t('points') }}
            </el-tag>
            <el-tag :type="quest.paymentMethod === 'face-to-face' ? 'success' : 'info'" size="small">
              {{ quest.paymentMethod === 'face-to-face' ? $t('faceToFace') : $t('online') }}
            </el-tag>
          </div>
        </div>
      </div>

      <el-divider v-if="quest" />

      <div class="intro-form">
        <h4>{{ $t('yourIntroduction') }}</h4>
        <p class="intro-hint">
          {{ $t('introductionHint') }}
        </p>
        <el-input
          v-model="introduction"
          type="textarea"
          :rows="6"
          :placeholder="$t('introductionPlaceholder')"
          maxlength="500"
          show-word-limit
        />
      </div>
    </div>

    <template #footer>
      <el-button @click="$emit('update:modelValue', false)">
        {{ $t('cancel') }}
      </el-button>
      <el-button 
        type="primary" 
        :disabled="!introduction.trim()"
        @click="handleSend"
      >
        {{ $t('sendIntroduction') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const language = computed(() => locale.value as 'en' | 'zh')

interface Quest {
  id: number
  authorId: number
  author: string
  avatar: string
  title: string
  detail: string
  tags: string[]
  paymentMethod: 'face-to-face' | 'online'
  rewardPoints: number
  time: string
  acceptedBy: string | null
}

const props = defineProps<{
  modelValue: boolean
  quest: Quest | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'sendIntroduction', data: { quest: Quest, introduction: string }): void
}>()

const introduction = ref('')

// Reset introduction when dialog opens
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    introduction.value = ''
  }
})

function handleSend() {
  console.log('handleSend called')
  console.log('introduction:', introduction.value)
  console.log('quest:', props.quest)
  
  if (!introduction.value.trim()) {
    console.log('No introduction text')
    return
  }
  
  if (!props.quest) {
    console.log('No quest')
    return
  }
  
  console.log('Emitting sendIntroduction event')
  emit('sendIntroduction', {
    quest: props.quest,
    introduction: introduction.value
  })
  
  emit('update:modelValue', false)
}
</script>

<style scoped>
.intro-content {
  padding: 8px 0;
}

.quest-summary h4 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
}

.quest-info {
  padding: 12px;
  background: #f5f7fa;
  border-radius: 8px;
}

.quest-title {
  margin: 0 0 8px 0;
  font-size: 19px;
  font-weight: 500;
  color: #333;
}

.quest-meta {
  display: flex;
  gap: 8px;
}

.intro-form {
  margin-top: 8px;
}

.intro-form h4 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
}

.intro-hint {
  margin: 0 0 12px 0;
  font-size: 18px;
  color: #666;
  line-height: 1.6;
}

/* Dark Mode Styles */
.dark .quest-summary h4 {
  color: #fff !important;
}

.dark .quest-info {
  background: #3a3a3a !important;
}

.dark .quest-title {
  color: #e5e5e5 !important;
}

.dark .intro-form h4 {
  color: #fff !important;
}

.dark .intro-hint {
  color: #b0b0b0 !important;
}
</style>
