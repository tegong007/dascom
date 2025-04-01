<template>
  <div class="finishedProduct absolute text-white">
    <a-flex justify="center" align="center">
      <div class="absolute left-0 top-0 h-3em w100% flex items-center">
        <span class="m-x-10px text-2.5em line-height-[40px] font-[youshe]">04</span>
        <span class="ml-10 text-[1.5em] color-[#CFDEF1]">{{
          props.data.name
        }}</span>
      </div>
      <div
        class="sum absolute top-[3.2em] box-border w-full flex flex-col flex-1 gap-10 p-x-20"
      >
        <div
          v-for="item in props.data.items"
          :key="item.item"
          class="box box-border flex flex-col flex-1 items-center"
        >
          <div class="text-[1.5em] color-[#CFDEF1]">
            {{ item.item }}
          </div>
          <div
            class="m-t-8 text-[2em] line-height-[40px] line-height-none font-[youshe]"
          >
            <!-- <CountTo :start-val="0" :end-val="item.value" :duration="1500" />
            <CountTo
              v-if="item.hangingNum"
              :start-val="0"
              prefix="-"
              suffix="(挂起)"
              :end-val="item.hangingNum"
              :duration="1500"
            /> -->
            {{ item.value }}
          </div>
        </div>
      </div>
    </a-flex>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: Object,
});
</script>

<style scoped lang="less">
.finishedProduct {
  background-image: url('@/assets/image/bigScreen/finishedProductBg.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
  .sum {
    height: calc(100% - 4.5em);
    .box {
      opacity: 1;
      box-sizing: border-box;
      border: 3px solid;
      border-image: linear-gradient(180deg, #89f7ff 0%, rgba(0, 237, 255, 0.46) 100%) 3;
    }
  }
}
</style>
