<template>
  <div class="startPage text-[18px] text-white">
    <a-flex justify="center" align="center">
      <div class="absolute left-0 top-0 h-3em w100% flex items-center">
        <span class="m-x-0.5em text-2.5em font-[youshe]">01</span>
        <span class="ml-10 text-[1.5em] color-[#CFDEF1]">空白本余量</span>
      </div>
      <div class="absolute top-[3.5em] h-4.8em w-90% flex">
        <div v-for="(item, index) in props.data.items" :key="index" class="flex-1">
          <div
            :class="[
              item.status === 'error' ? 'bg-[#FF0000]/[0.4] border-[#E83131] border-1px' : '',
              item.status === 'warning' ? 'bg-[#FF9900]/[0.4] border-[#E8AB31] border-1px' : '',
            ]"
            class="w-full flex flex-col items-center"
          >
            <div class="mt-5 text-[1em] color-[#CFDEF1]">
              {{ item.name }}
            </div>
            <div class="mt8 text-2em font-[youshe]">
              <!-- <CountTo
                :start-val="0"
                separator
                :end-val="item.num"
                suffix="%"
                :duration="Math.floor(Math.random() * 2000) + 1000"
              /> -->
              {{ item.num }}
            </div>
          </div>
        </div>
      </div>
      <div class="table-data absolute top-[8em] w-95%">
        <div class="p-x-10">
          <div class="h30px w-full flex items-center bg-[#fff]/[0.2]">
            <span class="ml3">证件信息</span>
          </div>
          <div class="scroll-table w-full">
            <SeamlessScroll :data="props.data.periodDataList" />
          </div>
        </div>
        <!-- <div class="wh-full bg-[#FF0000]/[0.4] absolute top-0 flex justify-center items-center">
          <a-button
            type="link"
            class="bg-[#000]/[0.4] text-white p-20px flex justify-center items-center rounded-full border-1 border-[#fff]"
            >故障</a-button
          >
          <img src="../../assets/image/bigScreen/errorBtn.png" alt="" />
        </div> -->
      </div>
    </a-flex>
  </div>
</template>

<script setup lang="ts">
import SeamlessScroll from '@/components/bigScreen/seamless-scroll.vue';

const props = defineProps({
  data: Object,
});
</script>

<style scoped lang="less">
.startPage {
  background-image: url('@/assets/image/bigScreen/boxbg.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';

  .table-data {
    height: calc(100% - 8.3em);
    .scroll-table {
      height: calc(100% - 10em);
    }
  }
}
</style>
