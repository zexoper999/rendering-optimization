<script setup lang="ts">
import { computed } from "vue";
import type { Job } from "../utils/mockData";
import { User, MapPin, Building2, HardHat } from "lucide-vue-next";

const props = defineProps<{ job: Job }>();

// 진행률 계산 (간단한 연산)
const progress = computed(() => {
  return Math.round((props.job.assignedCount / props.job.requiredCount) * 100);
});

// 상태에 따른 색상 (스타일 계산 부하)
const statusColor = computed(() => {
  switch (props.job.status) {
    case "RECRUITING":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "FULL":
      return "bg-green-100 text-green-800 border-green-200";
    case "IN_PROGRESS":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "DONE":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
});
</script>

<template>
  <div
    class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow mb-3 flex flex-col gap-3"
  >
    <!-- 헤더: 현장명 & 상태 -->
    <div class="flex justify-between items-start">
      <div class="flex flex-col">
        <span class="text-xs text-gray-500 flex items-center gap-1 mb-1">
          <Building2 class="w-3 h-3" /> {{ job.siteName.split(" ")[0] }} 현장
        </span>
        <h3 class="font-bold text-gray-900 text-lg leading-tight">
          {{ job.siteName }}
        </h3>
      </div>
      <span
        :class="`px-2 py-1 rounded-full text-xs font-bold border ${statusColor}`"
      >
        {{ job.status }}
      </span>
    </div>

    <!-- 상세 정보 그리드 -->
    <div class="grid grid-cols-2 gap-2 text-sm text-gray-600">
      <div class="flex items-center gap-2">
        <HardHat class="w-4 h-4 text-orange-500" />
        <span class="font-medium text-gray-900">{{ job.role }}</span>
      </div>
      <div class="flex items-center gap-2">
        <MapPin class="w-4 h-4 text-gray-400" />
        <span>서울 송파구</span>
        <!-- 위치는 더미 -->
      </div>
    </div>

    <!-- 인원 배정 현황 (프로그레스 바) -->
    <div class="mt-1">
      <div class="flex justify-between text-xs mb-1">
        <span class="text-gray-500 flex items-center gap-1">
          <User class="w-3 h-3" /> 배정 인원
        </span>
        <span class="font-bold text-gray-900"
          >{{ job.assignedCount }} / {{ job.requiredCount }}명 ({{
            progress
          }}%)</span
        >
      </div>
      <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          class="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>

    <!-- 하단: 근로자 아바타 (DOM 개수 늘리기용) -->
    <div class="flex -space-x-2 overflow-hidden py-1">
      <div
        v-for="worker in job.workers.slice(0, 5)"
        :key="worker.id"
        class="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600"
      >
        {{ worker.name[0] }}
      </div>
      <div
        v-if="job.workers.length > 5"
        class="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-[10px] text-gray-500"
      >
        +{{ job.workers.length - 5 }}
      </div>
    </div>
  </div>
</template>
