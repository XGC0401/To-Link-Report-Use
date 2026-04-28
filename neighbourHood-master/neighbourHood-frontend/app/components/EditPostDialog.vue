<template>
  <el-dialog 
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="$t('edit') + ' ' + $t('posts')"
    width="700px"
  >
    <el-form
      v-if="post"
      ref="postFormRef"
      :model="formData"
      :rules="postRules"
      label-position="top"
    >
      <el-form-item :label="$t('title')" prop="title">
        <el-input
          v-model="formData.title"
          :placeholder="$t('enterTitle')"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>

      <el-form-item :label="$t('category')" prop="category">
        <el-select
          v-model="formData.category"
          :placeholder="$t('selectCategory')"
          style="width: 100%;"
        >
          <el-option :label="$t('news')" value="news" />
          <el-option :label="$t('events')" value="events" />
          <el-option :label="$t('help')" value="help" />
          <el-option :label="$t('general')" value="general" />
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('content')" prop="content">
        <el-input
          v-model="formData.content"
          type="textarea"
          :placeholder="$t('shareThoughts')"
          :rows="8"
          maxlength="2000"
          show-word-limit
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="$emit('update:modelValue', false)">
        {{ $t('cancel') }}
      </el-button>
      <el-button 
        type="primary" 
        :loading="saving"
        @click="handleSave"
      >
        {{ $t('save') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { FormInstance, FormRules } from 'element-plus'

const { t, locale } = useI18n()
const language = computed(() => locale.value as 'en' | 'zh')

interface Post {
  id: number
  author: string
  avatar: string
  title: string
  content: string
  time: string
  category?: string
  likes?: number
  comments?: number
}

const props = defineProps<{
  modelValue: boolean
  post: Post | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', data: { id: number, title: string, content: string, category: string }): void
}>()

const postFormRef = ref<FormInstance>()
const saving = ref(false)

const formData = reactive({
  title: '',
  category: '',
  content: ''
})

const postRules = reactive<FormRules>({
  title: [
    {
      required: true,
      message: t('pleaseEnterTitle'),
      trigger: 'blur'
    },
    {
      min: 3,
      max: 100,
      message: t('titleLength'),
      trigger: 'blur'
    }
  ],
  category: [
    {
      required: true,
      message: t('pleaseSelectCategory'),
      trigger: 'change'
    }
  ],
  content: [
    {
      required: true,
      message: t('enterContent'),
      trigger: 'blur'
    },
    {
      min: 10,
      max: 2000,
      message: t('contentLength'),
      trigger: 'blur'
    }
  ]
})

// Load post data when dialog opens
watch(() => props.modelValue, (newVal) => {
  if (newVal && props.post) {
    formData.title = props.post.title
    formData.content = props.post.content
    formData.category = props.post.category || ''
  }
})

async function handleSave() {
  if (!postFormRef.value || !props.post) return

  await postFormRef.value.validate((valid) => {
    if (valid) {
      saving.value = true
      
      emit('save', {
        id: props.post!.id,
        title: formData.title,
        content: formData.content,
        category: formData.category
      })
      
      saving.value = false
      emit('update:modelValue', false)
    }
  })
}
</script>

<style scoped>
.el-form {
  padding: 8px 0;
}
</style>
