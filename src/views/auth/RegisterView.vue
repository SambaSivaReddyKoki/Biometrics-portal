<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Create your account</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Already have an account? 
          <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
            Sign in
          </router-link>
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div v-if="error" class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-md text-sm">
            {{ error }}
          </div>

          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div class="mt-1">
                <input
                  id="name"
                  v-model="formData.name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  :disabled="loading"
                />
              </div>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  v-model="formData.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  :disabled="loading"
                />
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div class="mt-1 relative">
                <input
                  id="password"
                  v-model="formData.password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white pr-10"
                  :class="{ 'border-red-300': !isPasswordValid && formData.password }"
                  :disabled="loading"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                  @click="showPassword = !showPassword"
                  :disabled="loading"
                >
                  <span class="sr-only">{{ showPassword ? 'Hide password' : 'Show password' }}</span>
                  <svg
                    v-if="!showPassword"
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                </button>
              </div>
              <p v-if="!isPasswordValid && formData.password" class="mt-1 text-sm text-red-600 dark:text-red-400">
                Password must be at least 8 characters long
              </p>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <div class="mt-1">
                <input
                  id="confirmPassword"
                  v-model="formData.confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autocomplete="new-password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                  :class="{ 'border-red-300': !passwordsMatch && formData.confirmPassword }"
                  :disabled="loading"
                />
              </div>
              <p v-if="!passwordsMatch && formData.confirmPassword" class="mt-1 text-sm text-red-600 dark:text-red-400">
                Passwords do not match
              </p>
            </div>
          </div>

          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                v-model="formData.agreeToTerms"
                name="terms"
                type="checkbox"
                class="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                :disabled="loading"
                required
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="font-medium text-gray-700 dark:text-gray-300">
                I agree to the
                <a href="#" class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                  Terms
                </a>
                and
                <a href="#" class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="!isFormValid || loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!loading">Create account</span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false
})

const showPassword = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)

// Form validation
const isPasswordValid = computed(() => formData.value.password.length >= 8)
const passwordsMatch = computed(() => formData.value.password === formData.value.confirmPassword)
const isFormValid = computed(() => 
  formData.value.name && 
  formData.value.email && 
  isPasswordValid.value && 
  passwordsMatch.value && 
  formData.value.agreeToTerms
)

// Handle form submission
async function handleSubmit() {
  if (!isFormValid.value || loading.value) return
  
  try {
    loading.value = true
    error.value = null
    
    await authStore.register({
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password
    })
    
    // Redirect to biometric enrollment
    router.push('/enroll')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Registration failed. Please try again.'
    console.error('Registration error:', err)
  } finally {
    loading.value = false
  }
}
</script>
