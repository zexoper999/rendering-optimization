<script setup lang="ts">
    import { ref, onMounted, nextTick } from "vue";
    import { generateJobs, type Job } from "../utils/mockData";
    import JobCard from "./JobCard.vue";
    import Header from "./Header.vue";
    
    const jobs = ref<Job[]>([]);
    const loading = ref(true);
    const renderTime = ref(0);
    const isDark = ref(false);
    
    const toggleDarkMode = () => {
      isDark.value = !isDark.value;
      if (isDark.value) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    
    const loadData = async () => {
      loading.value = true;
      jobs.value = []; // 초기화
    
      setTimeout(async () => {
        const start = performance.now();
    
        // 데이터 생성
        jobs.value = generateJobs(1000);
    
        // DOM 업데이트 대기
        await nextTick();
    
        // v-for 렌더링이 끝난 직후 시간 측정
        setTimeout(() => {
          const end = performance.now();
          renderTime.value = Math.round(end - start);
          loading.value = false;
        }, 0);
      }, 100);
    };
    
    onMounted(() => {
      // 초기 다크모드 적용
      document.documentElement.classList.add("dark");
      isDark.value = true;
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
    