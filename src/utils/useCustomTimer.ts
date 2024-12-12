// timerUtils.ts
import { onUnmounted, ref } from 'vue';

type TimerCallback = (...args: any[]) => Promise<void> | void;

function useCustomTimer(): {
  start: (callback: TimerCallback, interval: number) => void;
  stop: () => void;
} {
  const timerRef = ref<number | null>(null);
  const isRunning = ref(false);

  const stopTimer = () => {
    if (timerRef.value !== null) {
      window.clearInterval(timerRef.value);
      timerRef.value = null;
      isRunning.value = false;
    }
  };

  const startTimer = (callback: TimerCallback, interval: number) => {
    if (typeof callback !== 'function') {
      console.error('The callback must be a function.');
      return;
    }
    if (interval <= 0) {
      console.error('Interval must be greater than 0.');
      return;
    }

    if (timerRef.value !== null) {
      stopTimer(); // 清除之前的定时器
    }

    isRunning.value = true;
    timerRef.value = window.setInterval(async () => {
      if (!isRunning.value)
        return; // 如果定时器已停止，则跳过此次执行
      try {
        await callback(); // 执行异步回调
      }
      catch (error) {
        console.error('Timer callback error:', error);
      }
    }, interval * 1000);
  };

  // 组件卸载时清除定时器
  onUnmounted(stopTimer);

  return { start: startTimer, stop: stopTimer };
}

export default useCustomTimer;
