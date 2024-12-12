<template>
  <a-button @click="startClick">
    Start Timer
  </a-button>
  <a-button @click="stopClick">
    Stop Timer
  </a-button>
</template>

<script lang="ts" setup>
import useCustomTimer from '@/utils/useCustomTimer';

const { start, stop } = useCustomTimer();

async function startClick() {
  start(async () => {
    console.log('开始');
    await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟异步操作
  }, 1); // 每5秒执行一次
}

function stopClick() {
  stop();
  console.log('停止');
}
</script>
