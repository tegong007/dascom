<template>
  <div class="bg h-100vh flex flex-col items-center text-[18px] text-white">
    <bigScreenHeader title="查询" />
    <div
      class="absolute left-160 top-126 z-99 flex items-center justify-between text-16px"
    >
      <span>搜索类型：</span>
      <a-select v-model:value="choose" @change="changeChoose">
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

    <Batch
      v-if="choose === 1"
      :choose="choose"
      :doc-batch-id="docBatchId"
      :change-batch-id-o-rteam-id="changeBatchIdORteamId"
    />
    <Team
      v-if="choose === 2"
      :choose="choose"
      :doc-team-id="docTeamId"
      :doc-batch-id="docBatchId"
      :change-batch-id-o-rteam-id="changeBatchIdORteamId"
    />
    <Doc
      v-if="choose === 3"
      :choose="choose"
      :change-batch-id-o-rteam-id="changeBatchIdORteamId"
      :doc-team-id="docTeamId"
      :doc-batch-id="docBatchId"
    />
    <div
      class="groupBtn absolute bottom-0 h8em w-full flex items-center justify-center gap-20"
    >
      <!-- <div class="flex">
          <TheButton title="批次查询" />
        </div> -->
      <!-- <span class="h-50% w-2px bg-[#8BB2FF]" /> -->
      <div class="flex gap-20">
        <TheButton title="返回首页" @click="$goto('BigScreen')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import Batch from './batch/index.vue';
import Team from './team/index.vue';
import Doc from './doc/index.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';

const route = useRoute();
const choose = ref<number>(0);
const docBatchId = ref('');
const docTeamId = ref('');
onActivated(() => {
  nextTick(() => {
    const query = route.query;
    changeChoose(Number(query.choose));
  });
});
function changeChoose(value: number) {
  choose.value = value;
  changeBatchIdORteamId(0, '', '');
}
function changeBatchIdORteamId(
  value?: number,
  batchId?: string,
  teamId?: string,
) {
  if (value) {
    choose.value = value;
  }
  docBatchId.value = batchId;
  docTeamId.value = teamId;
}
onDeactivated(() => {
  // 清空筛选
  choose.value = 0;
});
</script>

<style scoped lang="less">
.bg {
  background-image: url('@/assets/image/bigScreen/bg-none.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
  user-select: none;
}
</style>
