<template>
  <div class="addMore text-[18px] text-white">
    <a-flex justify="center" align="center">
      <div class="title absolute left-0 top-0">
        <span class="no m-x-0.4em">03</span>
        <span class="ml-10 text-[1.5em] color-[#CFDEF1]">加注打印</span>
      </div>
      <div class="sum absolute top-[3.5em] w-90% flex">
        <div v-for="(item, index) in items" :key="index" class="flex-1">
          <div
            :class="[
              item.status === 'error' ? 'bg-[#FF0000]/[0.4] border-[#E83131] border-1px' : '',
              item.status === 'warning' ? 'bg-[#FF9900]/[0.4] border-[#E8AB31] border-1px' : '',
            ]"
            class="w-full flex flex-col items-center"
          >
            <div class="mt-10 text-[1em] color-[#CFDEF1]">
              {{ item.name }}
            </div>
            <div class="good-num mt8">
              {{ item.num }}%
            </div>
          </div>
        </div>
      </div>
      <div class="table-data absolute top-[8.3em] w-90%">
        <div class="h30px w-full flex items-center bg-[#fff]/[0.2]">
          <span class="ml3">证件信息</span>
        </div>
        <div>
          <SeamlessScroll />
        </div>
      </div>
    </a-flex>
  </div>
</template>

<script setup lang="ts">
import SeamlessScroll from '../test/seamless-scroll.vue';

const items = [
  {
    name: 'Y色余量',
    num: '13',
    status: 'error',
  },
  {
    name: 'M色余量',
    num: '14',
    status: 'normal',
  },
  {
    name: 'C色余量',
    num: '26',
    status: 'warning',
  },
  {
    name: 'K色余量',
    num: '31',
    status: 'normal',
  },
  {
    name: '光油余量',
    num: '48',
    status: 'normal',
  },
];
</script>

<style scoped lang="less">
.addMore {
  background-image: url('../../assets/image/bigScreen/boxbg.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
  .title {
    height: 3.5em;
    width: 100%;
    .no {
      font-size: 2.5em;
      font-family: 'youshe';
    }
  }
  .sum {
    // height: calc(100% - 3.5em);
    height: 4.8em;
    .good-num {
      font-size: 2em;
      font-family: 'youshe';
    }
  }
  .table-data {
    height: calc(100% - 8.3em);
  }
}
</style>
