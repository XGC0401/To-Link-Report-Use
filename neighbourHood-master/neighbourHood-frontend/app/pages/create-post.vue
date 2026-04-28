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
            <el-select v-model="form.requestType" style="width: 100%">
              <el-option :label="$t('shopping')" :value="0" />
              <el-option :label="$t('repair')" :value="1" />
              <el-option :label="$t('care')" :value="2" />
              <el-option :label="$t('daily')" :value="3" />
              <el-option :label="$t('other')" :value="4" />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-switch v-model="form.isImportant" />
            <span class="switch-label">{{ $t('important') }}</span>
          </el-form-item>

          <el-form-item :label="$t('points')">
            <el-input-number v-model="form.redeemPoints" :min="0" :max="9999" />
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
import { useI18n } from 'vue-i18n'
import { publishPost } from '~/api/post'

const router = useRouter()
const { t } = useI18n()
const isSubmitting = ref(false)

const form = reactive({
  title: '',
  content: '',
  requestType: 4,
  isImportant: false,
  redeemPoints: 0
})

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
    const formData = new FormData()
    formData.append('title', form.title.trim())
    formData.append('content', form.content.trim())
    formData.append('request_type', String(form.requestType))
    formData.append('is_important', String(form.isImportant))
    formData.append('redeemPoints', String(form.redeemPoints || 0))

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

.switch-label {
  margin-left: 10px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>