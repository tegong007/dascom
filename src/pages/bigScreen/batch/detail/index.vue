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
      <main class="box-border h78% w-full flex">
        <div class="card-box box-border h-full w-250px">
          <TeamCard :items="items" />
        </div>
        <div class="doc-box box-border h-full flex-1">
          <Doc />
        </div>
        <div class="info-box box-border h-full w-250px">
          1
        </div>
      </main>
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
import TeamForm from './team/team-form.vue';
import TeamCard from './team/team-card.vue';
import Doc from './team/doc/index.vue';
import TheButton from '@/components/base/TheButton.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';

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
const items = ref([
  {
    id: '01',
    teamName: '13112206029',
    teamId: '118',
    currentCertificate: '123',
    tStartTime: '2024.11.20',
  },
  {
    id: '02',
    teamName: '13112206029',
    teamId: '119',
    currentCertificate: '123',
    tStartTime: '2024.11.20',
  },
  {
    id: '03',
    teamName: '13112206029',
    teamId: '120',
    currentCertificate: '123',
    tStartTime: '2024.11.20',
  },
  {
    id: '04',
    teamName: '13112206029',
    teamId: '121',
    currentCertificate: '123',
    tStartTime: '2024.11.20',
  },
  {
    id: '05',
    teamName: '13112206029',
    teamId: '122',
    currentCertificate: '123',
    tStartTime: '2024.11.20',
  },
]);
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
  .card-box,
  .info-box {
    background: linear-gradient(187deg, rgba(144, 236, 255, 0.65) -22%, rgba(66, 134, 224, 0.459) 90%);
    box-sizing: border-box;
    border: 3px solid;
    border-image: linear-gradient(180deg, #89f7ff 0%, rgba(0, 237, 255, 0.46) 100%) 3;
  }
  .doc-box {
    background: linear-gradient(359deg, rgba(113, 175, 252, 0.5) 1%, rgba(0, 142, 255, 0.5) 96%);
    box-sizing: border-box;
    border: 4px solid #3f89dd;
    box-shadow:
      0px 4px 10px 0px rgba(0, 0, 0, 0.3),
      inset 0px -1px 1px 0px rgba(255, 255, 255, 0.34);
    border-left: 0px;
    border-right: 0px;
  }
}
</style>
