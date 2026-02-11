import { ref, nextTick } from "vue";
import { generateJobs, type Job } from "../utils/mockData";

export function useDataLoader() {
  const jobs = ref<Job[]>([]);
  const loading = ref(true);
  const renderTime = ref(0);

  const loadData = async (count: number = 10000) => {
    loading.value = true;
    jobs.value = [];

    // 초기 딜레이 후 데이터 로딩 시작
    await new Promise((resolve) => setTimeout(resolve, 100));

    const start = performance.now();

    // 데이터 생성
    jobs.value = generateJobs(count);

    // DOM 업데이트 대기
    await nextTick();

    // 다음 프레임에서 렌더링 완료 측정
    await new Promise((resolve) => setTimeout(resolve, 0));

    const end = performance.now();
    renderTime.value = Math.round(end - start);
    loading.value = false;
  };

  return {
    jobs,
    loading,
    renderTime,
    loadData,
  };
}
