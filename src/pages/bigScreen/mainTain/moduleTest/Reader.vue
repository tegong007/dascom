<template>
  <div class="w-full pb30px">
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>读卡器</span>
    </div>
    <section class="flex flex-wrap gap-20">
      <div
        v-for="(reader, index) in props.data"
        :key="index"
        class="w450px p-l-3em p-t-1em"
      >
        <div class="text-[18px]">
          {{ reader.readerName }}：
        </div>
        <br>
        <a-input
          v-model:value="reader.valueModel"
          size="large"
          placeholder="读卡器数据"
        />
        <a-space wrap class="mt10 flex justify-between">
          <a-button
            type="link"
            class="btn hover:text-[#89f7ff]!"
            @click="readTest(reader.valueModel)"
          >
            读测试数据
          </a-button>
          <a-button
            type="link"
            class="btn hover:text-[#89f7ff]!"
            @click="showSuccessNotification"
          >
            读卡UID
          </a-button>
          <a-button type="link" class="btn hover:text-[#89f7ff]!">
            写入测试数据
          </a-button>
        </a-space>
      </div>
    </section>
    <contextHolder />
  </div>
</template>

<script lang="ts" setup>
import { contextHolder, openNotify } from '@/components/base/useNotification';

const props = defineProps({
  data: Object,
});
// 定义按钮点击事件
function showSuccessNotification() {
  openNotify('topRight', '这是一条成功通知', true);
}

function readTest(value: string) {
  console.log('🚀 ~ readTest ~ value:', value);
}
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
