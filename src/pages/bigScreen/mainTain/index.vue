<template>
  <div
    class="bg h-100vh w-full flex flex-col items-center text-[18px] text-white"
  >
    <bigScreenHeader title="维护" />
    <a-app class="h-100% w-full">
      <div class="h-100% w-full flex flex-col text-white">
        <div
          class="bg-color m-x-4em h-87% max-h-790px flex border-[4px] border-[#3F89DD]"
        >
          <div class="h-full w-[10%] flex flex-col">
            <a-radio-group
              v-model:value="currentModel"
              class="bg-color h-full w-full"
              button-style="outline"
              @change="labelChange"
            >
              <a-radio-button
                v-for="(item, index) in options"
                :key="index"
                :value="item.value"
                class="siyuan w-full flex cursor-pointer items-center justify-center border-0 bg-[#0000] py-[45px] text-[20px] text-white before:!w-0"
              >
                {{ item.label }}
              </a-radio-button>
            </a-radio-group>
          </div>
          <div
            class="box-border wh-full overflow-hidden border-l-[4px] border-[#3F89DD]"
          >
            <!-- 整机测试 -->
            <section
              v-if="currentModel === '0'"
              class="wh-full flex flex-col flex-1"
            >
              <OnlyTest />
            </section>
            <!-- 耗材 -->
            <section
              v-show="currentModel === '5'"
              class="scoll-bar box-border wh-full flex flex-col flex-1"
            >
              <Consumables :current-model="currentModel" />
            </section>
            <!-- 四个模块 -->
            <section
              v-if="
                currentModel !== '5'
                  && currentModel !== '6'
                  && currentModel !== '0'
                  && currentModel !== ''
              "
              class="scoll-bar box-border wh-full flex flex-col flex-1"
            >
              <ModuleTest :current-model="currentModel" />
            </section>
            <!-- 版本信息 -->
            <section
              v-show="currentModel === '6'"
              class="scoll-bar box-border wh-full flex flex-col flex-1"
            >
              <Version :current-model="currentModel" />
            </section>
          </div>
        </div>
      </div>
    </a-app>
    <div
      class="groupBtn absolute bottom-0 h8em w-full flex items-center justify-center gap-20"
    >
      <div class="flex gap-20">
        <TheButton
          title="返回首页"
          @click="
            () => {
              setCurrentModel('');
              $goto('BigScreen');
            }
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import OnlyTest from '@/pages/bigScreen/mainTain/onlyTest/index.vue';
import Consumables from '@/pages/bigScreen/mainTain/consumables/index.vue';
import ModuleTest from '@/pages/bigScreen/mainTain/moduleTest/index.vue';
import TheButton from '@/components/base/TheButton.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import Version from '@/pages/bigScreen/mainTain/version/index.vue';
// const { t } = useI18n();
definePage({
  name: 'MainTain',
  meta: {
    title: '维护页',
  },
});
const route = useRoute();
const currentModel = ref<string>('');
onActivated(() => {
  nextTick(() => {
    const query = route.query;
    currentModel.value = query.currentModel;
  });
});
// console.log(query); // 这里应该能获取到查询参数
const options = [
  { label: `耗材`, value: '5' },
  { label: `整机`, value: '0' },
  { label: `空白本校验`, value: '1' },
  { label: `主副页打印`, value: '2' },
  { label: `加注打印`, value: '3' },
  { label: `成本证本收集`, value: '4' },
  { label: `关于`, value: '6' },
];

function labelChange(value) {
  setCurrentModel(value?.target.value);
}
function setCurrentModel(value: string) {
  currentModel.value = value;
}
</script>

<style scoped lang="less">
.bg {
  background-image: url('@/assets/image/bigScreen/bg-none.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
  .bg-color {
    background: linear-gradient(
      359deg,
      rgba(255, 255, 255, 0.1885) 0%,
      rgba(255, 255, 255, 0.29) 33%,
      rgba(0, 142, 255, 0.29) 98%
    );
  }
}
.returnBtn {
  background-image: url('@/assets/image/bigScreen/returnBtn.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
}
.ant-radio-button-wrapper:first-child {
  border-inline-start: 0px solid #d9d9d9;
  border-start-start-radius: 0px;
  border-end-start-radius: 0px;
}
.ant-radio-button-wrapper:last-child {
  border-inline-start: 0px solid #d9d9d9;
  border-start-start-radius: 0px;
  border-end-start-radius: 0px;
}

.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
  z-index: 1;
  color: #ffffff;
  background: #ffffff2c;
}

::v-deep.scoll-bar {
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  // border-left: 3px solid #7ff3fd;
}
::-webkit-scrollbar-thumb {
  // background-color: #ffffff38;
  background-color: #ffffff69;
  border-radius: 5px;
}
</style>
