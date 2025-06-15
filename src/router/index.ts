import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/enroll',
    name: 'EnrollBiometric',
    component: () => import('@/views/auth/EnrollBiometricView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/verify',
    name: 'VerifyBiometric',
    component: () => import('@/views/auth/VerifyBiometricView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return next({ name: 'Dashboard' })
  }
  
  next()
})

export default router
