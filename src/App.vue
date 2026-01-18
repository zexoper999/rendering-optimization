<script setup lang="ts">
  import { ref } from 'vue';
  import GridAsIs from './components/GridAsIs.vue';
  import GridToBe from './components/GridToBe.vue';
  
  const mode = ref<'AS-IS' | 'TO-BE'>('AS-IS');
  </script>
  
  <template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <!-- 모드 전환 컨트롤러 -->
      <div class="fixed bottom-6 right-6 z-50 flex gap-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
        <button 
          @click="mode = 'AS-IS'"
          class="px-4 py-2 rounded-full text-sm font-bold transition-all"
          :class="mode === 'AS-IS' ? 'bg-red-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'"
        >
          AS-IS (느림)
        </button>
        <button 
          @click="mode = 'TO-BE'"
          class="px-4 py-2 rounded-full text-sm font-bold transition-all"
          :class="mode === 'TO-BE' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'"
        >
          TO-BE (빠름)
        </button>
      </div>
  
      <GridAsIs v-if="mode === 'AS-IS'" />
      <GridToBe v-else />
    </div>
  </template>
  