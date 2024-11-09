<template>
  <div class="bg h-100vh w-full">
    <div class="content wh-full flex flex-col text-white">
      <div class="bg-color m-x-4em m-t-7em h-83% flex border-[4px] border-[#3F89DD]">
        <div class="h-full w-[10%] flex flex-col">
          <a-radio-group
            v-model:value="currentModel"
            class="bg-color h-full w-full"
            button-style="outline"
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
        <div class="h-full flex flex-1 border-l-[4px] border-[#3F89DD]">
          <!-- <Transfer v-if="currentModel === 'test'" />
          <ModalForm
            v-else
            :current-model="currentModel"
            :options-data="getarrJson(currentModel)"
          />
        </div> -->
          <StartSet />
        </div>
        <!-- <div class="flex items-center justify-center">
          <a-button size="large" @click="goHome">
            {{ $t("moduleTest.gohomeBtn") }}
          </a-button>
        </div> -->
      </div>
    </div>
    <div class="absolute top-2em h6em w-full flex items-center justify-center">
      <span class="ml-10 text-[2.5em] color-[#CFDEF1]">设置</span>
    </div>

    <div class="absolute bottom-0 h6em w-full flex items-center justify-center">
      <div
        class="returnBtn h-8em w-13em transition-transform duration-300 hover:scale-115"
        @click="goto('BigScreen')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import StartSet from '@/pages/bigScreen/setting/startSet.vue';
import router from '@/router/index.ts';

// const { t } = useI18n();
definePage({
  name: 'SetPage',
  meta: {
    title: '设置页',
  },
});
const currentModel = ref<string>('test');
const options = [
  { label: `空白本校验`, value: 'test' },
  { label: `主副页打印`, value: 'm1' },
  { label: `加注打印`, value: 'm2' },
  { label: `成本证本收集`, value: 'm3' },
  // { label: `${t("moduleTest.module")}4`, value: "m4" },
];

function goto(page: string) {
  router.push({ name: page });
}
</script>

<style scoped lang="less">
.content {
  height: calc(100vh - 66px);
}
.bg {
  background-image: url('../../assets/image/bigScreen/bg-none.png');
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
  background-image: url('../../assets/image/bigScreen/returnBtn.png');
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
</style>
