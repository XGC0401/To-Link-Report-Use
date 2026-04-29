<template>
  <NuxtLayout name="default">
    <div class="create-post-shell">
      <el-card class="create-post-card">
        <template #header>
          <div class="card-header">
            <h2>{{ $t('createNewPost') }}</h2>
          </div>
        </template>

        <el-form label-position="top" :model="form" class="create-post-form">
          <el-form-item :label="$t('title')" required>
            <el-input v-model="form.title" maxlength="120" show-word-limit />
          </el-form-item>

          <el-form-item :label="$t('content')" required>
            <el-input v-model="form.content" type="textarea" :rows="6" maxlength="1200" show-word-limit />
          </el-form-item>

          <el-form-item :label="$t('category')">
            <el-input
              v-model="form.category"
              :placeholder="'#birthday'"
            />
            <p class="form-hint">{{ $t('tagHint') }}</p>
          </el-form-item>

          <el-form-item :label="$t('imagesOptional')">
            <el-upload
              v-model:file-list="fileList"
              list-type="picture-card"
              :auto-upload="false"
              :multiple="true"
              :limit="4"
              accept="image/*"
              :on-change="handleFileChange"
              :on-remove="handleFileRemove"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
            <p class="form-hint">{{ $t('imageSize') }}</p>
          </el-form-item>

          <div class="actions">
            <el-button @click="handleCancel">{{ $t('cancel') }}</el-button>
            <el-button type="primary" :loading="isSubmitting" @click="handleSubmit">
              {{ $t('publishPost') }}
            </el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { publishPost } from '~/api/post'

const router = useRouter()
const { t } = useI18n()
const isSubmitting = ref(false)
const selectedFiles = ref<File[]>([])
const fileList = ref<UploadUserFile[]>([])

const form = reactive({
  title: '',
  content: '',
  category: ''
})

const normalizeCategory = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) {
    return ''
  }
  return trimmed.startsWith('#') ? trimmed : `#${trimmed}`
}

const handleFileChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  const rawFile = uploadFile.raw
  if (rawFile && rawFile.size > 5 * 1024 * 1024) {
    ElMessage.warning(t('imageSize'))
    fileList.value = uploadFiles.filter((item) => item.uid !== uploadFile.uid)
    selectedFiles.value = fileList.value
      .map((item) => item.raw)
      .filter((file): file is File => !!file)
    return
  }

  fileList.value = uploadFiles
  selectedFiles.value = uploadFiles
    .map((item) => item.raw)
    .filter((file): file is File => !!file)
}

const handleFileRemove: UploadProps['onRemove'] = (_uploadFile, uploadFiles) => {
  fileList.value = uploadFiles
  selectedFiles.value = uploadFiles
    .map((item) => item.raw)
    .filter((file): file is File => !!file)
}

const handleCancel = () => {
  router.push('/home')
}

const handleSubmit = async () => {
  if (isSubmitting.value) {
    return
  }

  if (!form.title.trim() || !form.content.trim()) {
    ElMessage.warning(t('fillAllFields'))
    return
  }

  isSubmitting.value = true
  try {
    const normalizedCategory = normalizeCategory(form.category)
    const formData = new FormData()
    formData.append('title', form.title.trim())
    formData.append('content', form.content.trim())
    formData.append('request_type', '4')
    formData.append('is_important', 'false')
    formData.append('redeemPoints', '0')
    if (normalizedCategory) {
      formData.append('category', normalizedCategory)
    }
    selectedFiles.value.forEach((file) => {
      formData.append('files', file)
    })

    const [error, response] = await publishPost(formData)
    if (error || !response?.success) {
      ElMessage.error(t('postCreateFailed'))
      return
    }

    ElMessage.success(t('postCreatedSuccess'))
    router.push('/posts')
  } catch (err) {
    console.error('Failed to publish post:', err)
    ElMessage.error(t('postCreateFailed'))
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.create-post-shell {
  max-width: 860px;
  margin: 0 auto;
  padding: 24px;
}

.create-post-card {
  border-radius: 20px;
}

.card-header h2 {
  margin: 0;
}

.form-hint {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 14px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

:global(.dark) .create-post-card {
  background: #0f172a;
  border-color: #334155;
}

:global(.dark) .card-header h2,
:global(.dark) .form-hint {
  color: #e2e8f0;
}
</style>