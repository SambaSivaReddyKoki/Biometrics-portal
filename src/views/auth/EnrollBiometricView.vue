<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/30">
          <svg class="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 class="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Set Up Biometric Login</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Add an extra layer of security to your account with biometric authentication
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div class="flex flex-col items-center text-center space-y-6">
          <div class="p-4 rounded-full bg-blue-50 dark:bg-blue-900/30">
            <svg class="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Biometric Authentication</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ enrollmentMessage || 'You can use your fingerprint, face, or other biometric method to sign in securely.' }}
            </p>
          </div>

          <div v-if="error" class="w-full p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-md text-sm">
            {{ error }}
          </div>

          <div v-if="isEnrolled" class="w-full p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-md text-sm">
            <div class="flex items-center justify-center space-x-2">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Biometric authentication has been successfully set up!</span>
            </div>
          </div>

          <div v-else class="w-full">
            <button
              @click="enrollBiometric"
              :disabled="isEnrolling || isEnrolled"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isEnrolling">Set Up Biometric Login</span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Setting up...
              </span>
            </button>
          </div>

          <div class="pt-4 border-t border-gray-200 dark:border-gray-700 w-full">
            <router-link 
              to="/dashboard" 
              class="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Skip for now
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isEnrolling = ref(false)
const isEnrolled = ref(false)
const enrollmentMessage = ref('')
const error = ref<string | null>(null)

// Check if biometric is already enrolled
onMounted(() => {
  if (authStore.user?.hasBiometric) {
    isEnrolled.value = true
  }
})

// Enroll biometric authentication
async function enrollBiometric() {
  if (isEnrolling.value || isEnrolled.value) return
  
  try {
    isEnrolling.value = true
    error.value = null
    enrollmentMessage.value = 'Please follow the prompts to set up biometric authentication...'
    
    // In a real app, this would call the Web Authentication API
    await authStore.enrollBiometric()
    
    // Simulate biometric enrollment
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    isEnrolled.value = true
    enrollmentMessage.value = 'Biometric authentication has been successfully set up!'
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  } catch (err) {
    console.error('Biometric enrollment error:', err)
    error.value = err instanceof Error ? err.message : 'Failed to set up biometric authentication. Please try again.'
    enrollmentMessage.value = 'There was an error setting up biometric authentication.'
  } finally {
    isEnrolling.value = false
  }
}
</script>
