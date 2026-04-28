<template>
  <NuxtLayout name="default">
    <div class="profile-page-shell">
      <div class="profile-aurora aurora-one"></div>
      <div class="profile-aurora aurora-two"></div>
      <div class="profile-grid"></div>
    <div class="profile-container">
      <el-card class="profile-card">
        <template #header>
          <div class="card-header">
            <h2>{{ $t('profileSettings') }}</h2>
            <div class="profile-header-actions">
              <el-button size="large" @click="handleCancel">
                {{ $t('cancel') }}
              </el-button>
              <el-button
                type="primary"
                size="large"
                :loading="saving"
                @click="handleSave"
              >
                {{ $t('saveChanges') }}
              </el-button>
            </div>
          </div>
        </template>

        <el-form
          ref="profileFormRef"
          :model="profileForm"
          :rules="profileRules"
          label-position="top"
          class="profile-form"
        >
          <!-- Profile Picture -->
          <el-form-item :label="$t('profilePicture')">
            <div class="avatar-uploader-wrapper">
              <el-avatar :size="120" :src="profileForm.avatar" />
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-change="handleAvatarChange"
                :auto-upload="false"
              >
                <el-button type="primary" size="small">
                  <el-icon><Upload /></el-icon>
                  {{ $t('changePhoto') }}
                </el-button>
              </el-upload>
            </div>
          </el-form-item>

          <!-- Username -->
          <el-form-item :label="$t('username')" prop="username">
            <el-input
              v-model="profileForm.username"
              :placeholder="$t('enterUsername')"
              maxlength="50"
              show-word-limit
              size="large"
            />
          </el-form-item>

          <!-- Email -->
          <el-form-item :label="$t('email')">
            <el-input
              v-model="profileForm.email"
              size="large"
            />
          </el-form-item>

          <!-- Bio -->
          <el-form-item :label="$t('bio')">
            <el-input
              v-model="profileForm.bio"
              type="textarea"
              :placeholder="$t('bioPlaceholder')"
              :rows="4"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>

          <!-- Address -->
          <el-form-item :label="$t('addressSection')">
            <div class="address-section">
              <p class="address-hint">{{ $t('addressHint') }}</p>
              <p class="address-hint-secondary">
                <el-icon><InfoFilled /></el-icon>
                <span>{{ $t('addressCustomOptionHint') }}</span>
              </p>

              <div
                v-for="item in addressFields"
                :key="item.key"
                class="address-item"
              >
                <span class="address-item-label">{{ item.label }}</span>
                <el-select
                  v-if="item.type === 'select'"
                  v-model="profileForm.address[item.key]"
                  :placeholder="getSelectPlaceholder(item.key, item.placeholder)"
                  :disabled="isSelectDisabled(item.key)"
                  :loading="getSelectLoading(item.key)"
                  :filterable="item.key === 'country' || item.key === 'nation' || item.key === 'area'"
                  :allow-create="item.key === 'nation' || item.key === 'area'"
                  :default-first-option="item.key === 'nation' || item.key === 'area'"
                  :reserve-keyword="!(item.key === 'nation' || item.key === 'area')"
                  size="large"
                  class="address-item-input"
                >
                  <el-option
                    v-for="option in getSelectOptions(item.key)"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  />
                </el-select>
                <el-input
                  v-else
                  v-model="profileForm.address[item.key]"
                  :placeholder="item.placeholder"
                  size="large"
                  class="address-item-input"
                />
                <el-button
                  circle
                  class="privacy-button"
                  @click="openAddressPrivacyDialog(item.key)"
                >
                  <el-icon><View /></el-icon>
                </el-button>
              </div>
            </div>
          </el-form-item>

          <!-- Availability Schedule -->
          <el-form-item :label="$t('availability')">
            <div class="availability-section">
              <p class="availability-hint">{{ $t('availabilityHint') }}</p>

              <div class="availability-actions">
                <el-button size="small" @click="setFullDayForAllDays">
                  {{ $t('fullDayAll') }}
                </el-button>
                <el-button size="small" @click="clearAvailability">
                  {{ $t('clearAll') }}
                </el-button>
              </div>
              
              <div 
                v-for="day in daysOfWeek" 
                :key="day.value"
                class="day-schedule"
              >
                <el-checkbox 
                  v-model="profileForm.availability[day.value].enabled"
                  :label="day.label"
                  size="large"
                />
                
                <div v-if="profileForm.availability[day.value].enabled" class="time-picker-group">
                  <el-checkbox
                    v-model="profileForm.availability[day.value].fullDay"
                    size="large"
                    @change="setFullDay(day.value)"
                  >
                    {{ $t('fullDay') }}
                  </el-checkbox>
                  <el-time-select
                    v-model="profileForm.availability[day.value].start"
                    :placeholder="$t('startTime')"
                    start="00:00"
                    step="00:30"
                    end="23:30"
                    :disabled="profileForm.availability[day.value].fullDay"
                  />
                  <span class="time-separator">-</span>
                  <el-time-select
                    v-model="profileForm.availability[day.value].end"
                    :placeholder="$t('endTime')"
                    start="00:00"
                    step="00:30"
                    end="23:30"
                    :min-time="profileForm.availability[day.value].start"
                    :disabled="profileForm.availability[day.value].fullDay"
                  />
                </div>
              </div>
            </div>
          </el-form-item>

        </el-form>
      </el-card>

      <el-dialog
        v-model="addressPrivacyDialogVisible"
        :title="t('addressPrivacyTitle', { item: selectedAddressLabel })"
        width="520px"
      >
        <el-form label-position="top">
          <el-form-item :label="t('showAddressTo')">
            <el-radio-group
              v-model="selectedAddressVisibility"
              class="privacy-options"
              @change="handleVisibilityChange"
            >
              <el-radio value="none">{{ t('showNoOne') }}</el-radio>
              <el-radio value="friends">{{ t('showFriendsOnly') }}</el-radio>
              <el-radio value="specific">{{ t('showSpecificPeopleOnly') }}</el-radio>
              <el-radio value="all">{{ t('showAllPeople') }}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item
            v-if="selectedAddressVisibility === 'specific'"
            :label="t('specificPeople')"
          >
            <el-input
              v-model="selectedSpecificPeople"
              :placeholder="t('specificPeoplePlaceholder')"
            />
          </el-form-item>
        </el-form>

        <template #footer>
          <el-button @click="addressPrivacyDialogVisible = false">
            {{ t('cancel') }}
          </el-button>
          <el-button type="primary" @click="saveAddressPrivacy">
            {{ t('save') }}
          </el-button>
        </template>
      </el-dialog>
    </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { Upload, View, InfoFilled } from '@element-plus/icons-vue'
import csc from 'countries-states-cities'
import { updateEmail } from '~/api/auth'
import { Storage } from '~/utils/storage'

const locationData = ((csc as unknown as { default?: typeof csc }).default ?? csc) as typeof csc

const router = useRouter()
const { t, locale } = useI18n()
const saving = ref(false)
const profileFormRef = ref<FormInstance>()
const currentEmail = ref('')

type AddressFieldKey = 'country' | 'nation' | 'area' | 'street' | 'building' | 'floor' | 'room'
type AddressVisibility = 'none' | 'friends' | 'specific' | 'all'

type AddressFieldType = 'input' | 'select'
type LocationOption = { value: string; label: string }

const addressFieldKeys: AddressFieldKey[] = ['country', 'nation', 'area', 'street', 'building', 'floor', 'room']

const createEmptyAddress = () => ({
  country: '',
  nation: '',
  area: '',
  street: '',
  building: '',
  floor: '',
  room: ''
})

const createDefaultAddressVisibility = () => ({
  country: 'friends' as AddressVisibility,
  nation: 'friends' as AddressVisibility,
  area: 'friends' as AddressVisibility,
  street: 'friends' as AddressVisibility,
  building: 'friends' as AddressVisibility,
  floor: 'friends' as AddressVisibility,
  room: 'friends' as AddressVisibility
})

const createEmptySpecificPeople = () => ({
  country: '',
  nation: '',
  area: '',
  street: '',
  building: '',
  floor: '',
  room: ''
})

const daysOfWeek = computed(() => [
  { value: 'monday', label: t('monday') },
  { value: 'tuesday', label: t('tuesday') },
  { value: 'wednesday', label: t('wednesday') },
  { value: 'thursday', label: t('thursday') },
  { value: 'friday', label: t('friday') },
  { value: 'saturday', label: t('saturday') },
  { value: 'sunday', label: t('sunday') }
])

const allCountries = computed(() => locationData.getAllCountries())

const selectedCountry = computed(() => {
  if (!profileForm.address.country) {
    return null
  }
  return allCountries.value.find((country) => country.name === profileForm.address.country) || null
})

const statesOfSelectedCountry = computed(() => {
  if (!selectedCountry.value) {
    return []
  }
  return locationData.getStatesOfCountry(selectedCountry.value.id)
})

const selectedNation = computed(() => {
  if (!profileForm.address.nation) {
    return null
  }
  return statesOfSelectedCountry.value.find((state) => state.name === profileForm.address.nation) || null
})

const countryOptions = computed<LocationOption[]>(() => allCountries.value.map((country) => ({
  value: country.name,
  label: country.name
})))

const nationOptions = computed<LocationOption[]>(() => statesOfSelectedCountry.value.map((state) => ({
  value: state.name,
  label: state.name
})))

const areaOptions = computed<LocationOption[]>(() => {
  if (!selectedNation.value) {
    return []
  }
  return locationData.getCitiesOfState(selectedNation.value.id).map((city) => ({
    value: city.name,
    label: city.name
  }))
})

const addressFields = computed(() => [
  { key: 'country' as AddressFieldKey, type: 'select' as AddressFieldType, label: t('country'), placeholder: t('countryPlaceholder') },
  { key: 'nation' as AddressFieldKey, type: 'select' as AddressFieldType, label: t('nation'), placeholder: t('nationPlaceholder') },
  { key: 'area' as AddressFieldKey, type: 'select' as AddressFieldType, label: t('area'), placeholder: t('areaPlaceholder') },
  { key: 'street' as AddressFieldKey, type: 'input' as AddressFieldType, label: t('street'), placeholder: t('streetPlaceholder') },
  { key: 'building' as AddressFieldKey, type: 'input' as AddressFieldType, label: t('buildingName'), placeholder: t('buildingPlaceholder') },
  { key: 'floor' as AddressFieldKey, type: 'input' as AddressFieldType, label: t('floor'), placeholder: t('floorPlaceholder') },
  { key: 'room' as AddressFieldKey, type: 'input' as AddressFieldType, label: t('roomNumber'), placeholder: t('roomPlaceholder') }
])

const getSelectOptions = (key: AddressFieldKey) => {
  if (key === 'country') {
    return countryOptions.value
  }
  if (key === 'nation') {
    return nationOptions.value
  }
  if (key === 'area') {
    return areaOptions.value
  }
  return []
}

const getSelectLoading = (key: AddressFieldKey) => {
  return false
}

const isSelectDisabled = (key: AddressFieldKey) => {
  if (key === 'nation') {
    return !profileForm.address.country
  }
  if (key === 'area') {
    return !profileForm.address.country || !profileForm.address.nation
  }
  return false
}

const getSelectPlaceholder = (key: AddressFieldKey, defaultPlaceholder: string) => {
  if (key === 'nation' && !profileForm.address.country) {
    return t('nationSelectCountryFirst')
  }
  if (key === 'area' && !profileForm.address.nation) {
    return t('areaSelectNationFirst')
  }
  return defaultPlaceholder
}

const addressPrivacyDialogVisible = ref(false)
const selectedAddressField = ref<AddressFieldKey>('street')
const selectedAddressVisibility = ref<AddressVisibility>('friends')
const previousAddressVisibility = ref<AddressVisibility>('friends')
const selectedSpecificPeople = ref('')

const selectedAddressLabel = computed(() => {
  const field = addressFields.value.find((item) => item.key === selectedAddressField.value)
  return field?.label || ''
})

const profileForm = reactive({
  username: 'Current User',
  email: 'user@example.com',
  avatar: 'https://cube.elemecdn.com/0/88/03b0f476b63c5258a53e1b43f2ecb3.svg',
  bio: '',
  address: createEmptyAddress(),
  addressVisibility: createDefaultAddressVisibility(),
  addressSpecificPeople: createEmptySpecificPeople(),
  availability: {
    monday: { enabled: false, fullDay: false, start: '', end: '' },
    tuesday: { enabled: false, fullDay: false, start: '', end: '' },
    wednesday: { enabled: false, fullDay: false, start: '', end: '' },
    thursday: { enabled: false, fullDay: false, start: '', end: '' },
    friday: { enabled: false, fullDay: false, start: '', end: '' },
    saturday: { enabled: false, fullDay: false, start: '', end: '' },
    sunday: { enabled: false, fullDay: false, start: '', end: '' }
  }
})

const profileRules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: t('pleaseEnterUsername'),
      trigger: 'blur'
    },
    {
      min: 2,
      max: 50,
      message: t('usernameLength'),
      trigger: 'blur'
    }
  ]
})

// Load profile from localStorage on mount
onMounted(() => {
  const savedProfile = localStorage.getItem('userProfile')
  if (savedProfile) {
    const parsed = JSON.parse(savedProfile)
    Object.assign(profileForm, parsed)
  } else {
    // Set translated default value if no profile exists
    profileForm.username = t('username')
  }

  currentEmail.value = profileForm.email

  const availability = profileForm.availability as Record<string, any>
  Object.keys(availability).forEach((dayKey) => {
    if (availability[dayKey].fullDay === undefined) {
      availability[dayKey].fullDay = false
    }
  })

  if (!profileForm.address) {
    profileForm.address = createEmptyAddress()
  }

  if (!profileForm.addressVisibility) {
    profileForm.addressVisibility = createDefaultAddressVisibility()
  }

  if (!profileForm.addressSpecificPeople) {
    profileForm.addressSpecificPeople = createEmptySpecificPeople()
  }

  addressFieldKeys.forEach((key) => {
    if (profileForm.address[key] === undefined) {
      profileForm.address[key] = ''
    }
    if (profileForm.addressVisibility[key] === undefined) {
      profileForm.addressVisibility[key] = 'friends'
    }
    if (profileForm.addressSpecificPeople[key] === undefined) {
      profileForm.addressSpecificPeople[key] = ''
    }
  })
})
watch(() => profileForm.address.country, (newCountry, oldCountry) => {
  if (newCountry !== oldCountry) {
    profileForm.address.nation = ''
    profileForm.address.area = ''
  }
})

watch(() => profileForm.address.nation, (newNation, oldNation) => {
  if (newNation !== oldNation) {
    profileForm.address.area = ''
  }
})

const openAddressPrivacyDialog = (key: AddressFieldKey) => {
  selectedAddressField.value = key
  selectedAddressVisibility.value = profileForm.addressVisibility[key]
  previousAddressVisibility.value = profileForm.addressVisibility[key]
  selectedSpecificPeople.value = profileForm.addressSpecificPeople[key]
  addressPrivacyDialogVisible.value = true
}

const handleVisibilityChange = async (value: string | number | boolean | undefined) => {
  const nextValue = value as AddressVisibility
  if (nextValue === 'all') {
    try {
      await ElMessageBox.confirm(
        t('addressAllWarningMessage'),
        t('warningTitle'),
        {
          confirmButtonText: t('yes'),
          cancelButtonText: t('no'),
          type: 'warning'
        }
      )
      previousAddressVisibility.value = nextValue
    } catch {
      selectedAddressVisibility.value = previousAddressVisibility.value
    }
    return
  }

  previousAddressVisibility.value = nextValue
}

const saveAddressPrivacy = () => {
  const key = selectedAddressField.value
  profileForm.addressVisibility[key] = selectedAddressVisibility.value
  profileForm.addressSpecificPeople[key] = selectedAddressVisibility.value === 'specific'
    ? selectedSpecificPeople.value
    : ''
  addressPrivacyDialogVisible.value = false
}

const setFullDayForAllDays = () => {
  daysOfWeek.value.forEach((day) => {
    const dayState = profileForm.availability[day.value]
    if (!dayState) {
      return
    }
    dayState.enabled = true
    dayState.fullDay = true
    dayState.start = '00:00'
    dayState.end = '23:30'
  })
}


const clearAvailability = () => {
  daysOfWeek.value.forEach((day) => {
    const dayState = profileForm.availability[day.value]
    if (!dayState) {
      return
    }
    dayState.enabled = false
    dayState.fullDay = false
    dayState.start = ''
    dayState.end = ''
  })
}

const setFullDay = (dayKey: string) => {
  const day = profileForm.availability[dayKey]
  if (day?.fullDay) {
    day.start = '00:00'
    day.end = '23:30'
  }
}

const beforeAvatarUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error(t('onlyImages'))
    return false
  }
  if (!isLt2M) {
    ElMessage.error(t('avatarSize'))
    return false
  }
  return true
}

const handleAvatarChange = (file: any) => {
  // Convert image to base64 for localStorage persistence
  if (file.raw) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profileForm.avatar = e.target?.result as string
    }
    reader.readAsDataURL(file.raw)
  }
}

const handleSave = async () => {
  if (!profileFormRef.value) return

  await profileFormRef.value.validate((valid) => {
    if (valid) {
      saveProfile()
    } else {
      ElMessage.warning(t('fillRequired'))
    }
  })
}

const saveProfile = async () => {
  saving.value = true

  try {
    if (profileForm.email && profileForm.email !== currentEmail.value) {
      const [emailError, emailData] = await updateEmail(profileForm.email)
      const emailStatus = (emailError as any)?.response?.status

      if (emailStatus === 401 || emailStatus === 403) {
        ElMessage.warning(t('emailUpdateUnauthorized'))
        profileForm.email = currentEmail.value
      } else {
      if (emailError || !emailData?.success) {
        const message = emailData?.message || t('profileSaveFailed')
        ElMessage.error(String(message))
        return
      }

      if (typeof emailData.data === 'string' && emailData.data) {
        Storage.set('token', emailData.data)
      }

      currentEmail.value = profileForm.email
      }
    }

    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profileForm))

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    ElMessage.success(t('profileSaved'))

    // Redirect back or to home
    router.push('/home')
  } catch (error) {
    console.error('Error saving profile:', error)
    ElMessage.error(t('profileSaveFailed'))
  } finally {
    saving.value = false
  }
}

const handleCancel = () => {
  router.back()
}
</script>

<style scoped>
.profile-page-shell {
  position: relative;
  border-radius: 28px;
  padding: 24px;
  overflow: hidden;
  border: 1px solid rgba(109, 125, 219, 0.28);
  background:
    radial-gradient(140% 120% at 0% 0%, rgba(79, 70, 229, 0.22), rgba(255, 255, 255, 0) 58%),
    radial-gradient(130% 140% at 100% 0%, rgba(6, 182, 212, 0.16), rgba(255, 255, 255, 0) 62%),
    linear-gradient(166deg, rgba(255, 255, 255, 0.96), rgba(242, 247, 255, 0.92));
  box-shadow: 0 40px 72px rgba(39, 52, 130, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.78);
}

.profile-aurora {
  position: absolute;
  border-radius: 999px;
  pointer-events: none;
}

.aurora-one {
  width: 300px;
  height: 300px;
  top: -110px;
  left: -80px;
  background: radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.54), rgba(99, 102, 241, 0));
}

.aurora-two {
  width: 330px;
  height: 330px;
  bottom: -130px;
  right: -90px;
  background: radial-gradient(circle at 45% 40%, rgba(6, 182, 212, 0.48), rgba(6, 182, 212, 0));
}

.profile-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: radial-gradient(circle at 50% 35%, #000 40%, transparent 82%);
}

.profile-container {
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  padding: 24px;
  position: relative;
  z-index: 1;
}

.profile-card {
  border-radius: 22px;
  border: 1px solid rgba(129, 140, 248, 0.22);
  background:
    radial-gradient(130% 135% at 0% 0%, rgba(99, 102, 241, 0.14), rgba(255, 255, 255, 0) 60%),
    radial-gradient(130% 140% at 100% 0%, rgba(14, 165, 233, 0.12), rgba(255, 255, 255, 0) 62%),
    linear-gradient(155deg, rgba(255, 255, 255, 0.96), rgba(244, 248, 255, 0.94));
  box-shadow: 0 28px 56px rgba(41, 54, 128, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.78);
}

.card-header h2 {
  margin: 0;
  color: #202d5b;
  font-size: 34px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-shadow: 0 2px 12px rgba(99, 102, 241, 0.2);
}

.profile-form {
  padding: 24px 0 8px;
}

.profile-form :deep(.el-form-item__label) {
  font-weight: 600;
  color: #243265;
  font-size: 19px;
  letter-spacing: 0.01em;
}

.profile-form :deep(.el-input__wrapper),
.profile-form :deep(.el-textarea__inner),
.profile-form :deep(.el-select__wrapper),
.profile-form :deep(.el-time-select .el-input__wrapper) {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.2) inset, 0 10px 18px rgba(67, 80, 154, 0.1);
}

.avatar-uploader-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid rgba(129, 140, 248, 0.2);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.8), rgba(241, 246, 255, 0.7));
}

.color-picker-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.color-value {
  font-family: monospace;
  color: #5a648e;
  font-size: 18px;
}

.color-preview {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 26px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
}

.theme-preview-text {
  margin-top: 12px;
  font-size: 18px;
  font-weight: 600;
  transition: color 0.3s;
}

.availability-section {
  width: 100%;
}

.address-section {
  width: 100%;
}

.address-hint {
  margin: 0 0 16px 0;
  font-size: 17px;
  color: #58628d;
}

.address-hint-secondary {
  margin: -8px 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--el-color-warning);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.address-item {
  display: grid;
  grid-template-columns: 140px 1fr auto;
  gap: 12px;
  align-items: center;
  margin-bottom: 14px;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid rgba(129, 140, 248, 0.16);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.76), rgba(241, 246, 255, 0.68));
}

.address-item:last-child {
  margin-bottom: 0;
}

.address-item-label {
  color: #263266;
  font-weight: 500;
  font-size: 16px;
}

.privacy-button {
  width: 40px;
  height: 40px;
}

.privacy-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.privacy-options :deep(.el-radio) {
  width: 100%;
  margin-right: 0;
  justify-content: flex-start;
}

.privacy-options :deep(.el-radio__label) {
  text-align: left;
}

.availability-hint {
  margin: 0 0 16px 0;
  font-size: 17px;
  color: #58628d;
}

.availability-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.day-schedule {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border: 1px solid rgba(129, 140, 248, 0.16);
  border-radius: 12px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.74), rgba(241, 246, 255, 0.66));
  margin-bottom: 10px;
}

.day-schedule:last-child {
  margin-bottom: 0;
}

.time-picker-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 24px;
}

.time-separator {
  color: #999;
  font-weight: 500;
}

.notification-settings {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.notification-settings :deep(.el-switch__label) {
  color: #333;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid rgba(129, 140, 248, 0.2);
}

.form-actions :deep(.el-button) {
  border-radius: 12px;
  min-width: 130px;
}

:global(.dark) .profile-card {
  border-color: rgba(129, 140, 248, 0.38);
  background:
    radial-gradient(130% 130% at 0% 0%, rgba(79, 70, 229, 0.35), rgba(16, 22, 45, 0.1) 60%),
    radial-gradient(130% 145% at 100% 0%, rgba(14, 165, 233, 0.2), rgba(16, 22, 45, 0.08) 62%),
    linear-gradient(160deg, rgba(17, 22, 45, 0.96), rgba(24, 31, 60, 0.94));
  box-shadow: 0 30px 58px rgba(2, 6, 20, 0.64), inset 0 1px 0 rgba(168, 186, 255, 0.16);
}

:global(.dark) .profile-page-shell {
  border-color: rgba(129, 140, 248, 0.45);
  background:
    radial-gradient(145% 125% at 0% 0%, rgba(79, 70, 229, 0.46), rgba(10, 16, 34, 0.08) 58%),
    radial-gradient(135% 150% at 100% 0%, rgba(6, 182, 212, 0.24), rgba(10, 16, 34, 0.08) 62%),
    linear-gradient(165deg, rgba(12, 18, 38, 0.98), rgba(20, 28, 56, 0.95));
  box-shadow: 0 44px 80px rgba(1, 5, 15, 0.72), inset 0 1px 0 rgba(169, 188, 255, 0.2);
}

:global(.dark) .profile-grid {
  background-image: linear-gradient(rgba(129, 140, 248, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(129, 140, 248, 0.08) 1px, transparent 1px);
}

:global(.dark) .card-header h2,
:global(.dark) .profile-form :deep(.el-form-item__label),
:global(.dark) .address-item-label {
  color: #e8eeff;
}

:global(.dark) .address-hint,
:global(.dark) .availability-hint {
  color: #b8c3ed;
}

:global(.dark) .profile-form :deep(.el-input__wrapper),
:global(.dark) .profile-form :deep(.el-textarea__inner),
:global(.dark) .profile-form :deep(.el-select__wrapper),
:global(.dark) .profile-form :deep(.el-time-select .el-input__wrapper) {
  background: rgba(16, 22, 44, 0.88);
  box-shadow: 0 0 0 1px rgba(129, 140, 248, 0.36) inset, 0 10px 18px rgba(1, 5, 15, 0.54);
}

:global(.dark) .avatar-uploader-wrapper,
:global(.dark) .address-item,
:global(.dark) .day-schedule {
  border-color: rgba(129, 140, 248, 0.34);
  background: linear-gradient(150deg, rgba(35, 41, 74, 0.86), rgba(24, 31, 58, 0.84));
}

:global(.dark) .form-actions {
  border-top-color: rgba(129, 140, 248, 0.3);
}

.profile-page-shell {
  backdrop-filter: blur(14px);
}

.profile-page-shell::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  pointer-events: none;
}

.card-header h2 {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 20px;
}

.profile-card,
.avatar-uploader-wrapper,
.address-item,
.day-schedule {
  backdrop-filter: blur(8px);
}

.profile-form :deep(.el-form-item__label) {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 13px;
}

.form-actions :deep(.el-button) {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

:global(.dark) .profile-page-shell {
  backdrop-filter: blur(18px);
}

:global(.dark) .profile-page-shell::before {
  border-color: rgba(171, 185, 255, 0.28);
}

:global(.dark) .card-header h2 {
  text-shadow: 0 0 18px rgba(129, 140, 248, 0.38);
}

/* Marketplace-inspired override */
.profile-aurora,
.profile-grid {
  display: none !important;
}

.profile-page-shell {
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
}

.profile-page-shell::before,
.profile-page-shell::after {
  display: none !important;
}

.profile-container {
  max-width: 980px !important;
  padding: 0 !important;
}

.profile-card,
.avatar-uploader-wrapper,
.address-item,
.day-schedule {
  background: #ffffff !important;
  border: 1px solid #eceef3 !important;
  border-radius: 12px !important;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.05) !important;
  backdrop-filter: none !important;
}

.card-header h2 {
  text-transform: none !important;
  letter-spacing: 0 !important;
  font-size: 28px !important;
  color: #111827 !important;
  text-shadow: none !important;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.profile-header-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.profile-form :deep(.el-form-item__label) {
  text-transform: none !important;
  letter-spacing: 0 !important;
  font-size: 15px !important;
}

.profile-form :deep(.el-input__wrapper),
.profile-form :deep(.el-textarea__inner),
.profile-form :deep(.el-select__wrapper),
.profile-form :deep(.el-time-select .el-input__wrapper) {
  background: #ffffff !important;
  box-shadow: 0 0 0 1px #dfe3eb inset !important;
  border-radius: 10px !important;
}

.form-actions :deep(.el-button) {
  text-transform: none !important;
  letter-spacing: 0 !important;
}

.form-actions :deep(.el-button--primary) {
  background: #ff6f00 !important;
  border-color: #ff6f00 !important;
}

.form-actions :deep(.el-button--primary:hover) {
  background: #f06500 !important;
  border-color: #f06500 !important;
}

:global(.dark) .profile-page-shell,
:global(.dark) .profile-card,
:global(.dark) .avatar-uploader-wrapper,
:global(.dark) .address-item,
:global(.dark) .day-schedule {
  background: #111827 !important;
  border-color: #1f2937 !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35) !important;
}

:global(.dark) .card-header h2 {
  color: #f9fafb !important;
}

:global(.dark) .profile-form :deep(.el-input__wrapper),
:global(.dark) .profile-form :deep(.el-textarea__inner),
:global(.dark) .profile-form :deep(.el-select__wrapper),
:global(.dark) .profile-form :deep(.el-time-select .el-input__wrapper) {
  background: #0f172a !important;
  box-shadow: 0 0 0 1px #334155 inset !important;
}

@media (max-width: 768px) {
  .profile-container {
    padding: 10px;
  }

  .card-header h2 {
    font-size: 20px;
  }

  .time-picker-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .address-item {
    grid-template-columns: 1fr auto;
  }

  .address-item-label {
    grid-column: 1 / -1;
  }

  .time-separator {
    display: none;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions .el-button {
    width: 100%;
  }
}
</style>
