<template>
  <el-dialog 
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="title"
    width="700px"
    @close="handleClose"
  >
    <el-form :model="feedbackForm" label-position="top">
      <el-form-item :label="$t('feedbackDescription')">
        <el-input
          v-model="feedbackForm.description"
          type="textarea"
          :rows="8"
          :placeholder="$t('feedbackPlaceholder')"
          show-word-limit
        />
      </el-form-item>

      <el-form-item :label="$t('attachments')">
        <el-upload
          v-model:file-list="feedbackForm.fileList"
          :auto-upload="false"
          :limit="5"
          accept="image/*,video/*"
          list-type="picture-card"
          :on-exceed="handleExceed"
          :on-preview="handlePreview"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <div class="upload-tip">
          {{ $t('uploadTip') }}
        </div>
      </el-form-item>
    </el-form>

    <el-dialog 
      v-model="previewDialogVisible" 
      :title="$t('preview')"
      width="60%"
    >
      <img v-if="isImage(previewUrl)" :src="previewUrl" :alt="$t('preview')" style="width: 100%;" />
      <video v-else-if="isVideo(previewUrl)" :src="previewUrl" controls style="width: 100%;"></video>
    </el-dialog>

    <template #footer>
      <el-button @click="handleCancel">
        {{ $t('cancel') }}
      </el-button>
      <el-button 
        type="primary" 
        :disabled="!feedbackForm.description.trim()"
        @click="handleSubmit"
      >
        {{ $t('submit') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { UploadUserFile } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  modelValue: boolean
  title: string
  feedbackType: 'app' | 'community'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', data: { type: string, description: string, files: UploadUserFile[] }): void
}>()

const feedbackForm = reactive({
  description: '',
  fileList: [] as UploadUserFile[]
})

const previewDialogVisible = ref(false)
const previewUrl = ref('')

// Reset form when dialog opens
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    feedbackForm.description = ''
    feedbackForm.fileList = []
  }
})

const handleExceed = () => {
  ElMessage.warning(t('maxFilesExceeded'))
}

const handlePreview = (file: UploadUserFile) => {
  previewUrl.value = file.url || ''
  previewDialogVisible.value = true
}

const isImage = (url: string) => {
  return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url)
}

const isVideo = (url: string) => {
  return /\.(mp4|webm|ogg|mov|avi)$/i.test(url)
}

const handleSubmit = () => {
  if (!feedbackForm.description.trim()) {
    ElMessage.warning(t('pleaseEnterFeedback'))
    return
  }

  emit('submit', {
    type: props.feedbackType,
    description: feedbackForm.description,
    files: feedbackForm.fileList
  })

  ElMessage.success(t('feedbackSubmitted'))
  emit('update:modelValue', false)
}

const handleCancel = () => {
  emit('update:modelValue', false)
}

const handleClose = () => {
  feedbackForm.description = ''
  feedbackForm.fileList = []
}
</script>

<style scoped>
.upload-tip {
  margin-top: 8px;
  font-size: 16px;
  color: #999;
}

/* Dark Mode Styles */
.dark .upload-tip {
  color: #b0b0b0 !important;
}
</style>
