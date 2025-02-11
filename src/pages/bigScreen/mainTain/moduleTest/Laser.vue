<template>
  <div class="w-full pb30px">
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>激光器</span>
    </div>
    <section class="flex flex-wrap gap-20">
      <div
        v-for="(laser, index) in props.data"
        :key="index"
        class="max-w280px p-l-3em p-t-1em"
      >
        <div class="text-[18px]">
          {{ laser.laserName }}：
        </div>

        <a-space wrap class="mt10 flex justify-between">
          <div v-for="(item, itemIndex) in laser.printItems" :key="itemIndex">
            <span class="ml20">{{ item.label }}：</span>
            <a-select
              v-model:value="item.value"
              size="large"
              class="ml25 w-100px"
            >
              <a-select-option
                v-for="(option, optionIndex) in item.option"
                :key="optionIndex"
                :value="option.value"
              >
                {{ option.label }}
              </a-select-option>
            </a-select>
          </div>
          <a-button
            type="link"
            class="btn hover:text-[#89f7ff]!"
            @click="readTest(reader.valueModel)"
          >
            预览标刻
          </a-button>
          <a-button type="link" class="btn hover:text-[#89f7ff]!">
            红光
          </a-button>
          <a-button type="link" class="btn hover:text-[#89f7ff]!">
            标刻测试页
          </a-button>

          <a-button type="link" class="btn hover:text-[#89f7ff]!">
            急停
          </a-button>
        </a-space>
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
// 定义按钮点击事件
// const showSuccessNotification = () => {
//   openNotify('topRight', '这是一条成功通知', true);
// };

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
