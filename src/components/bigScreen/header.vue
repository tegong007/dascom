<template>
  <div class="w-full">
    <div class="w-full flex items-center justify-center">
      <span class="title text-[38px] color-[#fff] font-[youshe]">数字孪生平台</span>
    </div>
    <div class="mt10 w-full flex items-center justify-center">
      <span class="text-[2.2em] font-[youshe]">{{ props.title }}</span>
    </div>

    <a-flex
      justify="space-between"
      align="center"
      class="absolute top-0 w-full p-x-5em p-t-0.4em text-[1.3em] color-[#CFDEF1]"
    >
      <span class="light relative">网络状态:已连接</span>
      <span class="light relative">{{ currentTime }}</span>
    </a-flex>
    <!-- <CloseOutlined
      class="absolute right-0em top-5 p-x-[1em] text-[25px] color-red hover:bg-[#f86e6e98] hover:color-white"
      @click="showQuitModal"
    /> -->
    <!-- <TheModal
      :open="open"
      :handle-ok="ok"
      :warn-icon="true"
      :handle-cancel="() => setOpen(false)"
      :title="modal"
    /> -->
  </div>
</template>

<script lang="ts" setup>
import useCustomTimer from '@/utils/useCustomTimer';
import { formatDateTime } from '@/utils/time';
// import TheModal from '@/components/modal/TheModal.vue';

const props = defineProps({
  title: String,
});
// const open = ref<boolean>(false);
// const modal = ref('');
// function showQuitModal() {
//   open.value = true;
//   modal.value = '是否退出系统？';
// }
// function setOpen(value: boolean) {
//   open.value = value;
// }
// 手动停止
// async function ok() {
//   if (modal.value === '是否退出系统？') {
//     window.electron.send('quit-app');
//   }

//   open.value = false;
// }
// 时间展示
const currentTime = ref('2024-12-18 14:37:23');
const { start } = useCustomTimer();
async function startClick() {
  start(async () => {
    currentTime.value = formatDateTime();
    await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟异步操作
  }, 1);
}
startClick();
</script>

<style scoped>
.light {
  text-shadow: 0px 0px 1px #ffffff;
}
</style>
