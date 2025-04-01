<template>
  <div class="startPage text-[18px] text-white">
    <a-flex justify="center" align="center">
      <div class="absolute left-0 top-0 h-3em w100% flex items-center">
        <span class="m-x-0.5em text-2.5em line-height-[1.1em] font-[youshe]">01</span>
        <span class="ml-10 text-[1.5em] color-[#CFDEF1]">{{
          props.data.name
        }}</span>
      </div>
      <div
        class="absolute top-[3.3em] h-4.8em w-90% flex justify-center gap-50"
      >
        <div v-for="(item, index) in props.data.items" :key="index">
          <div class="mt-5 text-[1em] color-[#CFDEF1]">
            {{ item.item }}
          </div>
          <div
            class="mt8 text-2em line-height-[1.1em] line-height-[1.1em] font-[youshe]"
          >
            <!-- <CountTo
                :start-val="0"
                separator
                :end-val="item.num"
                suffix="%"
                :duration="Math.floor(Math.random() * 2000) + 1000"
              /> -->
            {{ item.value }}
          </div>
        </div>
      </div>
      <div class="table-data absolute top-[8em] w-95%">
        <div class="p-x-10">
          <div class="h30px w-full flex items-center bg-[#fff]/[0.2]">
            <span class="ml3">证本状态</span>
          </div>
          <div class="scroll-table w-full">
            <SeamlessScroll :data="props.data.periodDataList" />
          </div>
        </div>
        <div
          v-if="props.data.status === 3 || props.data.status === 2"
          :class="[
            props.data.status === 3 ? 'bg-[#FF0000]/[0.5]' : '',
            props.data.status === 2 ? 'bg-[#FF9900]/[0.5]' : '',
          ]"
          class="absolute top-0 wh-full flex items-center justify-center"
        >
          <!-- <a-button
            type="link"
            class="bg-[#000]/[0.4] text-white p-y-20px p-x-40 flex justify-center items-center rounded-full border-1 border-[#fff]"
            >故障</a-button
          >
          <img src="../../assets/image/bigScreen/errorBtn.png" alt="" /> -->
          <div
            class="flex items-center justify-center p-x-40 p-y-20px text-center text-22px text-white font-bold"
          >
            {{
              props.data.status === 3
                ? '故障'
                : props.data.status === 2
                  ? '警告'
                  : ''
            }}
            <br>
            {{ props.data.msg }}
          </div>
        </div>
        <!-- 故障图片版本 -->
        <!-- <div class="absolute top-0 wh-full flex items-center justify-center bg-[#FFAA00]/[0.4]">
          <img src="@/assets/image/bigScreen/errorBtn.png" alt="">
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
