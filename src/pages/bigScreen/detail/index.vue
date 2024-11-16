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
        <div class="w50%">
          <MyTable />
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
import MyTable from '@/components/bigScreen/table.vue';

definePage({
  name: 'MainTain',
  meta: {
    title: '维护页',
  },
});

function goto(page: string) {
  router.push({ name: page });
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
</style>
