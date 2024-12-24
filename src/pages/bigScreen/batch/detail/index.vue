<template>
  <div class="bg h-100vh flex flex-col items-center text-[18px] text-white">
    <bigScreenHeader title="批次详情" />
    <div
      class="absolute top-70 box-border h-85vh w90% flex flex-col items-center gap-20 p-2em p-b-0"
    >
      <span>批次号：20241113，
        生产总数：1000，良本数：990，废本数：8，待生产数：2，状态：生产中，接收：2024-12-12
        15:10:10，生产：2024-12-12 15:10:10，完成：2024-12-12 15:10:10</span>
      <TeamForm />

      <main class="box-border h80% w-full flex" />
    </div>
    <div
      class="groupBtn absolute bottom-0 h8em w-full flex items-center justify-center gap-20"
    >
      <div class="flex gap-20">
        <TheButton title="返回首页" @click="$goto('BigScreen')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import TeamForm from './team-form.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import TheButton from '@/components/base/TheButton.vue';

const route = useRoute();
const batchId = ref<string>('');
onMounted(() => {
  nextTick(() => {
    const query = route.query;
    batchId.value = query.BatchId;
    console.log(
      '🚀 ~ file: index.vue:40 ~ nextTick ~ query.batchId:',
      query.BatchId,
    );
  });
});
</script>

<style scoped lang="less">
.bg {
  background-image: url('@/assets/image/bigScreen/bg-none.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
  .btn {
    border-radius: 6px;
    opacity: 1;
    background: linear-gradient(209deg, #90ecff 2%, #006af5 69%);
    box-sizing: border-box;
    border: 2px solid #89f7ff;
    padding: 0px 7px;
    color: white;
    height: 32px;
  }
}
</style>
