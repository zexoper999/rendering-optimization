<script setup lang="ts">
import { Moon, Sun, RefreshCw } from "lucide-vue-next";

defineProps<{
  count: number;
  renderTime: number;
  loading: boolean;
}>();

const emit = defineEmits(["toggleDark", "reload"]);

const isDark = document.documentElement.classList.contains("dark");
</script>

<template>
  <header
    class="bg-white dark:bg-gray-800 p-4 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300"
  >
    <div class="flex justify-between items-center mb-2">
      <h1
        class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2"
      >
        🚧 현장 작업 관리
      </h1>
      <div class="flex gap-2">
        <!-- 새로고침 버튼 -->
        <button
          @click="$emit('reload')"
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
          :disabled="loading"
        >
          <RefreshCw class="w-5 h-5" :class="{ 'animate-spin': loading }" />
        </button>
        <!-- 다크 모드 토글 -->
        <button
          @click="$emit('toggleDark')"
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-yellow-400 transition-colors"
        >
          <Moon v-if="!isDark" class="w-5 h-5" />
          <Sun v-else class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div class="flex justify-between items-end">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        총
        <span class="font-bold text-blue-600 dark:text-blue-400">{{
          count.toLocaleString()
        }}</span
        >개 작업
      </p>

      <!-- 성능 지표 -->
      <div
        v-if="!loading"
        class="text-xs bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded border border-red-100 dark:border-red-800/50 font-mono"
      >
        Render: <b>{{ renderTime }}ms</b>
      </div>
    </div>
  </header>
</template>
