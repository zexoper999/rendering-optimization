<script setup lang="ts">
import type { Worker } from "../utils/mockData";

defineProps<{ workers: Worker[] }>();
</script>

<template>
  <div
    class="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 p-3 animate-fade-in"
  >
    <h4 class="text-xs font-bold text-gray-500 mb-2">
      배정된 근로자 목록 ({{ workers.length }}명)
    </h4>
    <div class="space-y-2">
      <div
        v-for="worker in workers"
        :key="worker.id"
        class="flex justify-between items-center text-sm p-2 bg-white dark:bg-gray-800 rounded border border-gray-100 dark:border-gray-700 shadow-sm"
      >
        <div class="flex items-center gap-2">
          <div
            class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 flex items-center justify-center text-xs font-bold shrink-0"
          >
            {{ worker.name[0] }}
          </div>
          <span class="text-gray-900 dark:text-gray-200 font-medium">{{
            worker.name
          }}</span>
          <span class="text-xs text-gray-400">({{ worker.skill }})</span>
        </div>
        <span
          class="text-xs px-2 py-0.5 rounded font-medium"
          :class="{
            'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300':
              worker.attendanceStatus === 'ON_DUTY',
            'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300':
              worker.attendanceStatus === 'APPLIED',
            'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300':
              worker.attendanceStatus === 'NO_SHOW',
            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300':
              worker.attendanceStatus === 'OFF_DUTY',
          }"
        >
          {{
            {
              APPLIED: "지원완료",
              ON_DUTY: "출근완료",
              OFF_DUTY: "퇴근완료",
              NO_SHOW: "무단결근",
            }[worker.attendanceStatus]
          }}
        </span>
      </div>

      <div
        v-if="workers.length === 0"
        class="text-center text-xs text-gray-400 py-2"
      >
        배정된 인원이 없습니다.
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
