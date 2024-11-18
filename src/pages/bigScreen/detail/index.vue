<template>
  <div class="bg h-100vh w-full">
    <bigScreenHeader />
    <div class="content wh-full flex flex-col text-white">
      <div
        class="bg-color m-x-4em m-t-7em box-border h-83% flex gap-2.5em border-[4px] border-[#3F89DD] p-3em"
      >
        <!-- <a-table
      class="mytable"
      :columns="columns"
      :data-source="fixedData"
      bordered
      :rowClassName="rowClassName"
      :customHeaderRow="customHeaderRow"
    >
    </a-table> -->
        <div class="flex-1">
          <DetailTable :handle-click="getChooseId" />
        </div>
        <div
          v-if="chooseId"
          class="scrollable-box box-border flex-1 overflow-auto p-r-10"
        >
          <CamerTable />
        </div>
      </div>
    </div>
    <!-- <div class="absolute top-2em h6em w-full flex items-center justify-center">
      <span class="ml-10 text-[2.5em] color-[#CFDEF1]">维护</span>
    </div> -->

    <div class="absolute bottom-0 h6em w-full flex items-center justify-center">
      <div
        class="returnBtn h-8em w-13em transition-transform duration-300 hover:scale-115"
        @click="goto('BigScreen')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router/index.ts';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import DetailTable from '@/pages/bigScreen/detail/table.vue';
import CamerTable from '@/pages/bigScreen/detail/camerTable.vue';

const chooseId = ref('');
definePage({
  name: 'MainTain',
  meta: {
    title: '维护页',
  },
});

function goto(page: string) {
  router.push({ name: page });
}
function getChooseId(id: string) {
  console.log('🚀 ~ file: index.vue:55 ~ getChooseId ~ id:', id);
  chooseId.value = id ?? '';
}
</script>

<style scoped lang="less">
.content {
  height: calc(100vh - 66px);
}
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

/* 自定义滚动条样式 */
.scrollable-box::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

.scrollable-box::-webkit-scrollbar-thumb {
  background-color: #ffffff38;
  border-radius: 6px;
}

.scrollable-box::-webkit-scrollbar-track {
  /* background-color: #f1f1f1; */
  background-image: linear-gradient(to bottom, rgba(0, 140, 255, 0.329) 0%, rgba(255, 255, 255, 0.205) 100%);
  /* border-radius: 6px; */
}

.scrollable-box::-webkit-scrollbar-button {
  display: none;
}
</style>
