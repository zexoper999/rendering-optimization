<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { generateJobs, type Job } from "../utils/mockData";
import JobCard from "./JobCard.vue";
import Header from "./Header.vue";
import { useTheme } from "../composables/useTheme";

const jobs = ref<Job[]>([]);
const loading = ref(true);
const renderTime = ref(0);

// 다크모드 컴포저블 사용
const { isDark, toggleDarkMode } = useTheme(true);

const loadData = async () => {
  loading.value = true;
  jobs.value = [];

  setTimeout(async () => {
    const start = performance.now();

    jobs.value = generateJobs(10000);
    await nextTick();

    setTimeout(() => {
      const end = performance.now();
      renderTime.value = Math.round(end - start);
      loading.value = false;
    }, 0);
  }, 100);
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300"
  >
    <!-- 헤더 -->
    <Header
      :count="jobs.length"
      :render-time="renderTime"
      :loading="loading"
      @toggle-dark="toggleDarkMode"
      @reload="loadData"
    />

    <!-- 메인 리스트 -->
    <main class="flex-1 p-4 max-w-md mx-auto w-full">
      <div
        v-if="loading"
        class="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400 gap-2"
      >
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p>데이터({{ jobs.length.toLocaleString() }}건) 로딩 중...</p>
      </div>

      <div v-else class="flex flex-col">
        <JobCard v-for="job in jobs" :key="job.id" :job="job" />
      </div>
    </main>
  </div>
</template>
