import { ref, onMounted } from "vue";

export function useTheme(initialDark = true) {
  const isDark = ref(initialDark);

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle("dark", isDark.value);
  };

  const initializeDarkMode = () => {
    document.documentElement.classList.toggle("dark", isDark.value);
  };

  onMounted(() => {
    initializeDarkMode();
  });

  return {
    isDark,
    toggleDarkMode,
  };
}
