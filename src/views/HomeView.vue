<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Biometrics Portal</h1>
          <nav class="flex space-x-4">
            <router-link to="/login" class="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">
              Login
            </router-link>
            <router-link to="/register" class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
              Get Started
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="flex-grow flex items-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          Secure Authentication
          <span class="block text-indigo-600 dark:text-indigo-400">with Biometrics</span>
        </h1>
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Experience the future of secure and convenient authentication with our biometric-based web portal.
        </p>
        <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div class="rounded-md shadow">
            <router-link to="/register" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
              Get Started
            </router-link>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <p class="mt-8 text-center text-base text-gray-500 dark:text-gray-400">
          &copy; 2025 Biometrics Portal. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// This is a basic home view component
</script>
