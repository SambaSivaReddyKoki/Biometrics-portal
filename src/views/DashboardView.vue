<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div class="flex items-center space-x-4">
          <button
            @click="toggleTheme"
            class="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg v-if="isDark" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <div class="relative" v-click-outside="closeProfileMenu">
            <button
              @click="isProfileMenuOpen = !isProfileMenuOpen"
              class="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              id="user-menu"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span class="sr-only">Open user menu</span>
              <div class="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300 font-medium">
                {{ userInitials }}
              </div>
            </button>
            
            <transition
              enter-active-class="transition ease-out duration-100 transform"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75 transform"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div 
                v-show="isProfileMenuOpen"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <div class="py-1" role="none">
                  <div class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700">
                    <div class="font-medium">{{ authStore.user?.name }}</div>
                    <div class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ authStore.user?.email }}</div>
                  </div>
                  <router-link 
                    to="/profile" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    Your Profile
                  </router-link>
                  <router-link 
                    to="/settings" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    role="menuitem"
                  >
                    Settings
                  </router-link>
                  <button
                    @click="handleLogout"
                    class="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Welcome Card -->
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-primary-100 dark:bg-primary-900/30 p-3 rounded-md">
                <svg class="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">Welcome back, {{ authStore.user?.name }}!</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Last login: {{ formatDate(new Date()) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Biometric Status Card -->
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-green-100 dark:bg-green-900/30 p-3 rounded-md">
                  <svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Biometric Authentication</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ authStore.user?.hasBiometric ? 'Active' : 'Not set up' }}
                  </p>
                </div>
              </div>
              <router-link 
                v-if="!authStore.user?.hasBiometric"
                to="/enroll"
                class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Set Up
              </router-link>
            </div>
          </div>
        </div>

        <!-- Quick Actions Card -->
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div class="grid grid-cols-2 gap-4">
              <button
                @click="showVerifyBiometric"
                class="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <svg class="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span class="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">Verify Identity</span>
              </button>
              <router-link
                to="/settings/security"
                class="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div class="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <svg class="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span class="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">Security</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity Section -->
      <div class="mt-8">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div class="bg-white dark:bg-gray-800 shadow-sm overflow-hidden rounded-lg">
          <ul class="divide-y divide-gray-200 dark:divide-gray-700">
            <li v-for="(activity, index) in recentActivities" :key="index" class="px-6 py-4">
              <div class="flex items-center">
                <div :class="`flex-shrink-0 bg-${activity.iconBg}-100 dark:bg-${activity.iconBg}-900/30 p-2 rounded-full`">
                  <component :is="activity.icon" :class="`h-5 w-5 text-${activity.iconColor}-600 dark:text-${activity.iconColor}-400" />
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.title }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ activity.description }}</p>
                </div>
                <div class="ml-auto text-sm text-gray-500 dark:text-gray-400">
                  {{ activity.time }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useDark, useToggle } from '@vueuse/core'
import { 
  CheckCircleIcon, 
  FingerPrintIcon, 
  ShieldCheckIcon, 
  ClockIcon,
  UserCircleIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const isDark = useDark()
const toggleTheme = useToggle(isDark)
const isProfileMenuOpen = ref(false)

// Format date as "Month Day, Year"
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Get user initials for avatar
const userInitials = computed(() => {
  if (!authStore.user?.name) return '?'
  return authStore.user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

// Close profile menu when clicking outside
const closeProfileMenu = () => {
  isProfileMenuOpen.value = false
}

// Handle logout
const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// Show biometric verification
const showVerifyBiometric = () => {
  router.push('/verify')
}

// Mock recent activities
const recentActivities = [
  {
    icon: CheckCircleIcon,
    iconColor: 'green',
    iconBg: 'green',
    title: 'Successfully logged in',
    description: 'Your account was accessed from this device',
    time: 'Just now'
  },
  {
    icon: FingerPrintIcon,
    iconColor: 'blue',
    iconBg: 'blue',
    title: 'Biometric authentication',
    description: 'Used fingerprint to sign in',
    time: '2 hours ago'
  },
  {
    icon: ShieldCheckIcon,
    iconColor: 'purple',
    iconBg: 'purple',
    title: 'Security update',
    description: 'Your password was updated',
    time: '1 day ago'
  },
  {
    icon: UserCircleIcon,
    iconColor: 'indigo',
    iconBg: 'indigo',
    title: 'Profile updated',
    description: 'Your profile information was updated',
    time: '3 days ago'
  }
]

// Check if user is authenticated, if not redirect to login
onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
  }
})
</script>
