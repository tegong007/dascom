<template>
  <div class="w-full">
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>喷墨机</span>
    </div>
    <div class="w-full flex flex-wrap gap-20">
      <div
        v-for="(uvPrinters, index) in props.data"
        :key="index"
        class="w-full p-l-3em p-t-1em"
      >
        <div class="text-[18px]">
          {{ uvPrinters.printerName }}：
        </div>
        <main class="w-full flex items-end justify-start gap-50">
          <!-- 位置 -->
          <section>
            <div class="mt-10 w-full flex flex-col items-end gap-10">
              <div
                v-for="(item, itemIndex) in uvPrinters.positionItems"
                :key="itemIndex"
                class="text-[18px]"
              >
                {{ item.label }}：
                <a-select
                  v-if="item.label !== '目标位置'"
                  v-model:value="item.value"
                  size="large"
                  class="m-r-10 w-150px"
                >
                  <a-select-option
                    v-for="(option, optionIndex) in item.option"
                    :key="optionIndex"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </a-select-option>
                </a-select>
                <a-input
                  v-else
                  v-model:value="item.value"
                  size="large"
                  placeholder=""
                  suffix="mm"
                  class="m-r-10 w-150px"
                />
              </div>
            </div>
            <a-space wrap class="mt10 flex justify-evenly">
              <a-button type="link" class="btn hover:text-[#89f7ff]!">
                复位
              </a-button>
              <a-button type="link" class="btn hover:text-[#89f7ff]!">
                移动
              </a-button>
            </a-space>
          </section>

          <!-- 清洗 -->
          <section>
            <div class="mt-10 w-full flex flex-col items-end gap-10">
              <div
                v-for="(item, itemIndex) in uvPrinters.cleanItems"
                :key="itemIndex"
                class="text-[18px]"
              >
                {{ item.label }}：
                <a-select
                  v-model:value="item.value"
                  size="large"
                  class="m-r-10 w-150px"
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
            </div>
            <a-space wrap class="mt10 flex justify-center">
              <a-button type="link" class="btn hover:text-[#89f7ff]!">
                清洗
              </a-button>
            </a-space>
          </section>
          <!-- 打印平台 -->
          <section>
            <div class="mt-10 w-full flex flex-col items-center gap-10">
              <div
                v-for="(item, itemIndex) in uvPrinters.printItems"
                :key="itemIndex"
                class="text-[18px]"
              >
                {{ item.label }}：
                <a-select
                  v-model:value="item.value"
                  size="large"
                  class="m-r-10 w-150px"
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
            </div>
            <a-space wrap class="mt10 flex justify-center">
              <a-button type="link" class="btn hover:text-[#89f7ff]!">
                打印测试页
              </a-button>
            </a-space>
          </section>
        </main>
      </div>

      <!-- 打印平台 -->
    </div>
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
