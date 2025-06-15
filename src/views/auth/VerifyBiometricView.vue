<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
    <div class="w-full max-w-md space-y-8">
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900/30">
          <svg class="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 class="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Verify Your Identity</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Please verify your identity to continue
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
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Biometric Verification</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ verificationMessage || 'Please verify your identity using your biometric method to continue.' }}
            </p>
          </div>

          <div class="w-full pt-4">
            <button
              @click="verifyBiometric"
              :disabled="isVerifying"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="isVerifying" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isVerifying ? 'Verifying...' : 'Verify with Biometrics' }}
            </button>

            <div class="mt-4 text-center">
              <button
                @click="router.push('/login')"
                class="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Use a different method
              </button>
            </div>
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

const isVerifying = ref(false)
const verificationMessage = ref('')
const error = ref('')

// Check if biometrics is supported
const isBiometricSupported = ref(true) // This would be determined by the Web Authentication API in a real app

// Handle biometric verification
const verifyBiometric = async () => {
  if (isVerifying.value) return
  
  isVerifying.value = true
  verificationMessage.value = 'Waiting for biometric verification...'
  error.value = ''
  
  try {
    // In a real app, this would call the Web Authentication API
    // For now, we'll simulate a successful verification after a short delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simulate successful verification
    verificationMessage.value = 'Verification successful! Redirecting...'
    
    // In a real app, you would verify the biometric signature with your backend
    await authStore.verifyBiometric()
    
    // Redirect to dashboard on success
    router.push('/dashboard')
  } catch (err) {
    console.error('Biometric verification failed:', err)
    error.value = 'Verification failed. Please try again.'
    verificationMessage.value = 'Verification failed. Please try again.'
  } finally {
    isVerifying.value = false
  }
}

// Auto-trigger verification when component mounts
onMounted(() => {
  if (isBiometricSupported.value) {
    verifyBiometric()
  }
})
</script>
