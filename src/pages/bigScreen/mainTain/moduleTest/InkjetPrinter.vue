<template>
  <div class="wh-full">
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>喷墨机</span>
    </div>
    <section class="flex flex-wrap gap-20">
      <div
        v-for="(InkjetPrinter, index) in props.data"
        :key="index"
        class="w450px p-l-3em p-t-1em"
      >
        <div class="text-[18px]">
          {{ InkjetPrinter.InkjetPrinterName }}：
        </div>
        <br>
      </div>
    </section>
    <!-- <contextHolder /> -->
  </div>
</template>

<script lang="ts" setup>
// import { openNotify, contextHolder } from '@/components/base/useNotification';
const props = defineProps({
  data: Object,
});
// // 定义按钮点击事件
// const showSuccessNotification = () => {
//   openNotify('topRight', '这是一条成功通知', true);
// };

// const readTest = (value: string) => {
//   console.log('🚀 ~ readTest ~ value:', value);
// };
</script>

<style scoped>
.btn {
  border-radius: 6px;
  opacity: 1;
  background: linear-gradient(209deg, #90ecff 2%, #006af5 69%);
  box-sizing: border-box;
  border: 2px solid #89f7ff;
  padding: 6px 20px;
  color: white;
  height: 40px;
}
::v-deep(.ant-select-selection-item) {
  font-size: 16px;
}
</style>
