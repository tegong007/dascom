<template>
  <div class="bg h-100vh flex flex-col items-center text-[18px] text-white">
    <bigScreenHeader title="查询" />
    <div
      class="absolute left-160 top-126 z-99 flex items-center justify-between text-16px"
    >
      <span>搜索类型：</span>
      <a-select v-model:value="choose" @change="handleChange">
        <a-select-option :value="1">
          批次
        </a-select-option>
        <a-select-option :value="2">
          团组
        </a-select-option>
        <a-select-option :value="3">
          证本
        </a-select-option>
      </a-select>
    </div>

    <Batch v-if="choose === 1" />
    <!-- <Doc v-if="choose == 3" /> -->
  </div>
</template>

<script lang="ts" setup>
import Batch from './batch/index.vue';
// import Doc from './doc/index.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';

const choose = ref<number>(1);
function handleChange(value) {
  choose.value = value;
}
</script>

<style scoped lang="less">
.bg {
  background-image: url('@/assets/image/bigScreen/bg-none.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
  user-select: none;
}
</style>
