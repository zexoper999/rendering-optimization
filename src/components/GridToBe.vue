<script setup lang="ts">
  import { ref, onMounted, nextTick } from 'vue';
  import { generateJobs, type Job } from '../utils/mockData';
  import JobCard from './JobCard.vue';
  import Header from './Header.vue';
  import { useVirtualizer } from '@tanstack/vue-virtual';
  
  const jobs = ref<Job[]>([]);
  const loading = ref(true);
  const renderTime = ref(0);
  const isDark = ref(true); // 기본 다크모드
  
  // 가상 스크롤을 위한 부모 컨테이너 참조 (DOM)
  const parentRef = ref<HTMLElement | null>(null);
  
  // TanStack Virtualizer 설정
  const rowVirtualizer = useVirtualizer({
    get count() {
      return jobs.value.length; // 카운트 반응형
    },
    getScrollElement: () => parentRef.value, // 스크롤 이벤트 감지할 요소
    estimateSize: () => 140, // 대략적인 아이템 높이 (헤더+본문) - 너무 작게 잡으면 스크롤 튐
    overscan: 5, // 위아래로 미리 렌더링할 개수
  });
  
  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle('dark', isDark.value);
  };
  
  const loadData = async () => {
    loading.value = true;
    jobs.value = [];
    
    setTimeout(async () => {
      const start = performance.now();
      
      // 데이터 1만 개 생성
      jobs.value = generateJobs(10000); 
  
      // Virtualizer 업데이트
      await nextTick();
      
      // 렌더링
      setTimeout(() => {
          const end = performance.now();
          renderTime.value = Math.round(end - start);
          loading.value = false;
      }, 0);
    }, 100);
  };
  
  onMounted(() => {
    document.documentElement.classList.add('dark');
    loadData();
  });
  </script>
  
  <template>
    <div class="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300 overflow-hidden">
      <!-- 헤더 (고정) -->
      <Header 
        :count="jobs.length" 
        :render-time="renderTime" 
        :loading="loading"
        @toggle-dark="toggleDarkMode"
        @reload="loadData"
      />
  
      <!-- 메인 영역 (스크롤 컨테이너) -->
      <main 
        ref="parentRef" 
        class="w-full overflow-y-auto"
        style="height: calc(100vh - 80px);"
      >
        <div v-if="loading" class="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400 gap-2">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p>최적화 로딩 중...</p>
        </div>
  
        <!-- 🔥 가상 스크롤 영역 -->
        <div 
          v-else 
          class="relative w-full max-w-md mx-auto"
          :style="{ height: `${rowVirtualizer.getTotalSize()}px` }" 
        >
          <!-- 
            getTotalSize(): 전체 아이템의 총 높이를 잡아줌으로써 
            스크롤바가 제대로 생기게 함 
          -->
  
          <div
            v-for="virtualRow in rowVirtualizer.getVirtualItems()"
            :key="virtualRow.key.toString()"
            :data-index="virtualRow.index"
            :ref="(el: any) => rowVirtualizer.measureElement(el as HTMLElement | null)" 
            class="absolute top-0 left-0 w-full px-4"
            :style="{
              transform: `translateY(${virtualRow.start}px)`
            }"
          >
            <!-- 
               measureElement: 이 요소의 실제 높이를 측정해서 Virtualizer에 알림 
               (아코디언 펼쳤을 때 높이 변화 자동 감지!)
            -->
            <JobCard :job="jobs[virtualRow.index]" />
          </div>
        </div>
      </main>
    </div>
  </template>
  