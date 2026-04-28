<template>
  <el-dialog 
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="$t('edit') + ' ' + $t('questRequests')"
    width="700px"
  >
    <el-form
      v-if="quest"
      ref="questFormRef"
      :model="formData"
      :rules="questRules"
      label-position="top"
    >
      <el-form-item :label="$t('title')" prop="title">
        <el-input
          v-model="formData.title"
          :placeholder="$t('enterQuestTitle')"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>

      <el-form-item :label="$t('detail')" prop="detail">
        <el-input
          v-model="formData.detail"
          type="textarea"
          :placeholder="$t('enterQuestDetails')"
          :rows="6"
          maxlength="500"
          show-word-limit
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
            :min="10" 
            :max="500" 
            :step="10"
            show-stops
            style="flex: 1;"
          />
          <el-input-number 
            v-model="formData.rewardPoints" 
            :min="10" 
            :max="500"
            :step="10"
            style="width: 120px; margin-left: 16px;"
          />
        </div>
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
  availableTags: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'save', data: { id: number, title: string, detail: string, tags: string[], paymentMethod: string, rewardPoints: number }): void
}>()

const questFormRef = ref<FormInstance>()
const saving = ref(false)

const formData = reactive({
  title: '',
  detail: '',
  tags: [] as string[],
  paymentMethod: 'face-to-face' as 'face-to-face' | 'online',
  rewardPoints: 50
})

const questRules = reactive<FormRules>({
  title: [
    {
      required: true,
      message: t('pleaseEnterTitle'),
      trigger: 'blur'
    }
  ],
  detail: [
    {
      required: true,
      message: t('pleaseEnterQuestDetails'),
      trigger: 'blur'
    }
  ]
})

// Load quest data when dialog opens
watch(() => props.modelValue, (newVal) => {
  if (newVal && props.quest) {
    formData.title = props.quest.title
    formData.detail = props.quest.detail
    formData.tags = [...props.quest.tags]
    formData.paymentMethod = props.quest.paymentMethod
    formData.rewardPoints = props.quest.rewardPoints
  }
})

function toggleTag(tag: string) {
  const index = formData.tags.indexOf(tag)
  if (index > -1) {
    formData.tags.splice(index, 1)
  } else {
    formData.tags.push(tag)
  }
}

async function handleSave() {
  if (!questFormRef.value || !props.quest) return

  await questFormRef.value.validate((valid) => {
    if (valid) {
      saving.value = true
      
      emit('save', {
        id: props.quest!.id,
        title: formData.title,
        detail: formData.detail,
        tags: formData.tags,
        paymentMethod: formData.paymentMethod,
        rewardPoints: formData.rewardPoints
      })
      
      saving.value = false
      emit('update:modelValue', false)
    }
  })
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
}
</style>
