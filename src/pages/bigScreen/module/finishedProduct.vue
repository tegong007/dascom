<template>
  <div class="finishedProduct absolute text-white">
    <a-flex justify="center" align="center">
      <div class="title absolute left-0 top-0 flex items-center">
        <span class="no m-x-10px">04</span>
        <span class="ml-10 text-[1.5em] color-[#CFDEF1]">成品证本收集</span>
      </div>
      <div class="sum absolute top-[3.5em] w-full flex flex-col flex-1">
        <div class="flex flex-col flex-1 items-center">
          <div class="mt-10 text-[1.5em] color-[#CFDEF1]">
            良本证本数量
          </div>
          <div class="good-num mt10">
            <CountTo :start-val="0" separator :end-val="13" :duration="1000" />
          </div>
        </div>
        <div class="flex flex-col flex-1 items-center">
          <div class="mt-10 text-[1.5em] color-[#CFDEF1]">
            費本证本数量
          </div>
          <div class="good-num mt10">
            <CountTo :start-val="0" separator :end-val="13" :duration="1500" />
          </div>
        </div>
      </div>
    </a-flex>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.finishedProduct {
  background-image: url('@/assets/image/bigScreen/finishedProductBg.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';

  .title {
    height: 3em;
    width: 100%;
    .no {
      font-size: 2.5em;
      font-family: 'youshe';
    }
  }
  .sum {
    height: calc(100% - 3.5em);
    .good-num {
      font-size: 4em;
      font-family: 'youshe';
    }
  }
}
</style>
