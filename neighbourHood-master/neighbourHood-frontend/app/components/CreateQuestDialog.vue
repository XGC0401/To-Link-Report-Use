<template>
  <el-dialog 
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="$t('createQuestRequest')"
    width="600px"
  >
    <el-form :model="formData" label-position="top">
      <el-form-item :label="$t('title')">
        <el-input 
          v-model="formData.title" 
          :placeholder="$t('enterQuestTitle')" 
        />
      </el-form-item>

      <el-form-item :label="$t('detail')">
        <el-input 
          v-model="formData.detail"
          type="textarea"
          :rows="4"
          :placeholder="$t('enterQuestDetails')"
        />
      </el-form-item>

      <el-form-item :label="$t('tags')">
        <div class="tag-selector">
          <el-button 
            v-for="tag in availableTags" 
            :key="tag"
            :type="formData.tags.includes(tag) ? 'primary' : 'default'"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </el-button>
        </div>
      </el-form-item>

      <el-form-item :label="$t('paymentMethod')">
        <el-radio-group v-model="formData.paymentMethod">
          <el-radio-button label="face-to-face">
            {{ $t('faceToFace') }}
          </el-radio-button>
          <el-radio-button label="online">
            {{ $t('online') }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="$t('rewardPoints')">
        <div class="reward-points-input">
          <el-slider 
            v-model="formData.rewardPoints" 
            :min="0" 
            :max="500" 
            :step="50"
            :marks="marks"
            show-stops
          />
          <el-input-number 
            v-model="formData.rewardPoints" 
            :min="0" 
            :max="500"
            :step="10"
            controls-position="right"
            style="width: 140px;"
          />
        </div>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="$emit('update:modelValue', false)">
        {{ $t('cancel') }}
      </el-button>
      <el-button type="primary" @click="handleCreate">
        {{ $t('create') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

interface QuestFormData {
  title: string
  detail: string
  tags: string[]
  paymentMethod: 'face-to-face' | 'online'
  rewardPoints: number
}

const props = defineProps<{
  modelValue: boolean
  language: 'en' | 'zh'
  availableTags: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'create', data: QuestFormData): void
}>()

// Define marks for the slider
const marks = {
  0: '0',
  50: '50',
  100: '100',
  150: '150',
  200: '200',
  250: '250',
  300: '300',
  350: '350',
  400: '400',
  450: '450',
  500: '500'
}

const formData = reactive<QuestFormData>({
  title: '',
  detail: '',
  tags: [],
  paymentMethod: 'face-to-face',
  rewardPoints: 50
})

function toggleTag(tag: string) {
  const index = formData.tags.indexOf(tag)
  if (index > -1) {
    formData.tags.splice(index, 1)
  } else {
    formData.tags.push(tag)
  }
}

function handleCreate() {
  emit('create', { ...formData })
  // Reset form
  formData.title = ''
  formData.detail = ''
  formData.tags = []
  formData.paymentMethod = 'face-to-face'
  formData.rewardPoints = 50
}
</script>

<style scoped>
.tag-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.reward-points-input {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.reward-points-input :deep(.el-slider) {
  flex: 1;
  margin-right: 12px;
  padding: 0 8px 20px 8px;
}

.reward-points-input :deep(.el-slider__runway) {
  height: 8px;
}

.reward-points-input :deep(.el-slider__bar) {
  height: 8px;
}

.reward-points-input :deep(.el-slider__button-wrapper) {
  top: -16px;
}

.reward-points-input :deep(.el-slider__button) {
  width: 24px;
  height: 24px;
}

.reward-points-input :deep(.el-slider__stop) {
  width: 4px;
  height: 8px;
  background-color: #dcdfe6;
}

.reward-points-input :deep(.el-slider__marks-text) {
  font-size: 12px;
  color: #909399;
  margin-top: 8px;
}

/* Dark mode support for input number controls */
:deep(.el-input-number) {
  line-height: 1;
}

:deep(.el-input-number__decrease),
:deep(.el-input-number__increase) {
  background-color: transparent;
  color: #606266;
}

:deep(.el-input-number__decrease:hover),
:deep(.el-input-number__increase:hover) {
  color: var(--el-color-primary);
}

/* Ensure buttons are visible in both light and dark mode */
.dark :deep(.el-input-number__decrease),
.dark :deep(.el-input-number__increase) {
  color: #e5e5e5 !important;
  background-color: transparent !important;
}

.dark :deep(.el-input-number__decrease:hover),
.dark :deep(.el-input-number__increase:hover) {
  color: var(--el-color-primary) !important;
}

.dark :deep(.el-input-number .el-input__wrapper) {
  background-color: #3d3d3d;
  box-shadow: 0 0 0 1px #555 inset;
}

.dark :deep(.el-input-number .el-input__inner) {
  color: #e5e5e5;
}

/* Fix slider in dark mode */
.dark :deep(.el-slider__button) {
  border-color: var(--el-color-primary);
  background-color: #fff;
}

.dark :deep(.el-slider__bar) {
  background-color: var(--el-color-primary);
}

.dark :deep(.el-slider__runway) {
  background-color: #4c4d4f;
}

.dark :deep(.el-slider__stop) {
  background-color: #6c6d6f;
}

.dark :deep(.el-slider__marks-text) {
  color: #a8abb2;
}
</style>
