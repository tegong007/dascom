<template>
  <div class="bg h-100vh text-[18px] text-white">
    <bigScreenHeader />
    <a-flex
      justify="space-between"
      align="center"
      class="p-x-5em p-t-0.4em text-[1.3em] color-[#CFDEF1]"
    >
      <span class="relative">网络状态:xxx</span>
      <span class="relative">{{ currentTime }}</span>
    </a-flex>
    <a-row class="relative top-4em h-23em p-l-3em p-r-1.5em" :gutter="[8, 0]">
      <a-col flex="1">
        <FinishedProductBg class="wh-full" />
      </a-col>
      <a-col flex="5">
        <a-row justify="space-between" class="wh-full pl-16" :gutter="[16, 0]">
          <a-col :span="8">
            <AddMore class="wh-full" />
          </a-col>
          <a-col :span="8">
            <Print class="wh-full" />
          </a-col>
          <a-col :span="8">
            <Start class="wh-full" />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <div class="absolute bottom-0 h5em w-full flex items-center justify-center">
      <div
        class="setBtn h-7em w-12em transition-transform duration-300 hover:scale-115"
        @click="goto('SetPage')"
      />
      <div
        class="maintainBtn h-7em w-12em transition-transform duration-300 hover:scale-115"
        @click="goto('MainTain')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import FinishedProductBg from './module/finishedProduct.vue';
import AddMore from './module/addMore.vue';
import Print from './module/printPage.vue';
import Start from './module/startPage.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import { formatDateTime } from '@/utils/time'; // 确保路径正确
import router from '@/router/index.ts';

const currentTime = ref('');
setInterval(() => {
  currentTime.value = formatDateTime();
}, 1000);
function goto(page: string) {
  router.push({ name: page });
}
</script>

<style lang="less">
.siyuan {
  font-family: 'siyuan';
}
.bg {
  background-image: url('../../assets/image/bigScreen/bg.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
}
.setBtn {
  background-image: url('../../assets/image/bigScreen/setBtn.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
}
.maintainBtn {
  background-image: url('../../assets/image/bigScreen/maintain.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
}
</style>
