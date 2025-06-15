import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const isBiometricAvailable = ref(false)
  const isBiometricEnrolled = ref(false)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  // Check if Web Authentication API is available
  const checkBiometricAvailability = () => {
    isBiometricAvailable.value = !!(
      window.PublicKeyCredential &&
      typeof window.PublicKeyCredential === 'function' &&
      window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable &&
      typeof window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function'
    )
    return isBiometricAvailable.value
  }

  // Register a new user
  async function register(userData: { name: string; email: string; password: string }) {
    try {
      loading.value = true
      error.value = null
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, this would be an API call to your backend
      user.value = {
        id: '1',
        name: userData.name,
        email: userData.email,
        role: 'user',
        hasBiometric: false
      }
      
      return user.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Login with email/password
  async function login(credentials: { email: string; password: string }) {
    try {
      loading.value = true
      error.value = null
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, this would be an API call to your backend
      user.value = {
        id: '1',
        name: 'Test User',
        email: credentials.email,
        role: 'user',
        hasBiometric: false
      }
      
      // Check biometric availability after login
      checkBiometricAvailability()
      
      return user.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Logout
  async function logout() {
    try {
      loading.value = true
      // In a real app, this would be an API call to your backend
      await new Promise(resolve => setTimeout(resolve, 500))
      user.value = null
      isBiometricEnrolled.value = false
    } finally {
      loading.value = false
    }
  }

  // Enroll biometric authentication
  async function enrollBiometric() {
    if (!isBiometricAvailable.value) {
      throw new Error('Biometric authentication is not available on this device')
    }

    try {
      loading.value = true
      
      // In a real app, this would register a new public key with your server
      // using the Web Authentication API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (user.value) {
        user.value.hasBiometric = true
        isBiometricEnrolled.value = true
      }
      
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to enroll biometric'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Authenticate with biometric
  async function authenticateWithBiometric() {
    if (!isBiometricAvailable.value || !isBiometricEnrolled.value) {
      throw new Error('Biometric authentication is not set up')
    }

    try {
      loading.value = true
      
      // In a real app, this would verify the biometric with your server
      // using the Web Authentication API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate successful authentication
      user.value = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        hasBiometric: true
      }
      
      return user.value
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Biometric authentication failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isBiometricAvailable,
    isBiometricEnrolled,
    checkBiometricAvailability,
    register,
    login,
    logout,
    enrollBiometric,
    authenticateWithBiometric
  }
})
