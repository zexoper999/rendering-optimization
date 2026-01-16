<script setup lang="ts">
import { ref, computed } from "vue";
import type { Job } from "../utils/mockData";
import {
  User,
  MapPin,
  Building2,
  HardHat,
  ChevronDown,
  ChevronUp,
} from "lucide-vue-next";
import WorkerList from "./WorkerList.vue";

const props = defineProps<{ job: Job }>();
const isOpen = ref(false);

const progress = computed(() => {
  return Math.round((props.job.assignedCount / props.job.requiredCount) * 100);
});

const statusColor = computed(() => {
  switch (props.job.status) {
    case "모집중":
      return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
    case "모집완료":
      return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
    case "작업중":
      return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
  }
});
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all mb-3 overflow-hidden cursor-pointer"
    @click="isOpen = !isOpen"
  >
    <!-- 작업 정보 카드 -->
    <div class="p-4 flex flex-col gap-3">
      <div class="flex justify-between items-start">
        <div class="flex flex-col">
          <span
            class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-1"
          >
            <Building2 class="w-3 h-3" /> {{ job.siteName.split(" ")[0] }}
          </span>
          <h3
            class="font-bold text-gray-900 dark:text-white text-lg leading-tight"
          >
            {{ job.siteName }}
          </h3>
        </div>
        <span
          :class="`px-2 py-1 rounded-full text-xs font-bold border ${statusColor}`"
        >
          {{ job.status }}
        </span>
      </div>

      <div
        class="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-300"
      >
        <div class="flex items-center gap-2">
          <HardHat class="w-4 h-4 text-orange-500" />
          <span class="font-medium text-gray-900 dark:text-gray-100">{{
            job.role
          }}</span>
        </div>
        <div class="flex items-center gap-2">
          <MapPin class="w-4 h-4 text-gray-400" />
          <span class="truncate">{{ job.location }}</span>
        </div>
      </div>

      <div class="mt-1 pointer-events-none">
        <div class="flex justify-between text-xs mb-1">
          <span
            class="text-gray-500 dark:text-gray-400 flex items-center gap-1"
          >
            <User class="w-3 h-3" /> 배정 인원 (클릭하여 근로자 보기)
          </span>
          <div class="flex items-center gap-1">
            <span class="font-bold text-gray-900 dark:text-white"
              >{{ job.assignedCount }} / {{ job.requiredCount }}명 ({{
                progress
              }}%)</span
            >
            <component
              :is="isOpen ? ChevronUp : ChevronDown"
              class="w-4 h-4 text-gray-400"
            />
          </div>
        </div>
        <div
          class="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden"
        >
          <div
            class="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full transition-all duration-500"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- 근로자 리스트 -->
    <WorkerList v-if="isOpen" :workers="job.workers" @click.stop />
  </div>
</template>
