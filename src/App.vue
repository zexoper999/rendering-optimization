<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { generateJobs, type Job } from "./utils/mockData";
import JobCard from "./components/JobCard.vue";

const jobs = ref<Job[]>([]);
const loading = ref(true);
const renderTime = ref(0); // 렌더링 시간 측정용

const loadData = async () => {
  loading.value = true;

  // 1. 데이터 생성 (약간의 지연 시뮬레이션)
  setTimeout(async () => {
    const start = performance.now();

    // 🔥 10,000개 데이터 생성 (무거움)
    jobs.value = generateJobs(10000);

    // 2. 렌더링 완료 대기 및 시간 측정
    await nextTick(); // DOM 업데이트 대기
    const end = performance.now();
    renderTime.value = Math.round(end - start);

    loading.value = false;
  }, 100);
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="max-w-md mx-auto bg-gray-50 min-h-screen flex flex-col">
    <!-- 헤더 -->
    <header
      class="bg-white p-4 sticky top-0 z-10 border-b border-gray-200 shadow-sm"
    >
      <h1 class="text-xl font-bold text-gray-900">🚧 현장 작업 관리</h1>
      <p class="text-sm text-gray-500 mt-1">
        총
        <span class="font-bold text-blue-600">{{
          jobs.length.toLocaleString()
        }}</span
        >개 작업
      </p>

      <!-- 성능 측정 결과 표시 -->
      <div
        v-if="!loading"
        class="mt-2 text-xs bg-red-50 text-red-600 p-2 rounded border border-red-100"
      >
        ⏱️ 렌더링 소요 시간: <b>{{ renderTime }}ms</b>
        <br />
        (스크롤이 버벅거리는지 확인해보세요!)
      </div>
    </header>

    <!-- 메인 리스트 영역 -->
    <main class="flex-1 p-4">
      <div
        v-if="loading"
        class="flex justify-center items-center h-64 text-gray-500"
      >
        데이터 로딩 중... (렉 걸릴 준비 중 💦)
      </div>

      <!-- ☠️ 성능 저하의 주범: 가상 스크롤 없는 v-for -->
      <div v-else class="flex flex-col">
        <JobCard v-for="job in jobs" :key="job.id" :job="job" />
      </div>
    </main>
  </div>
</template>
