<template>
  <div class="finishedProduct absolute text-white">
    <a-flex justify="center" align="center">
      <div class="absolute left-0 top-0 h-3em w100% flex items-center">
        <span class="m-x-10px text-2.5em font-[youshe]">04</span>
        <span class="ml-10 text-[1.5em] color-[#CFDEF1]">成品证本收集</span>
      </div>
      <div class="sum absolute top-[3.5em] w-full flex flex-col flex-1">
        <div v-for="item in items" :key="item.name" class="flex flex-col flex-1 items-center">
          <div class="mt-10 text-[1.5em] color-[#CFDEF1]">
            {{ item.name }}
          </div>
          <div class="mt10 text-4em font-[youshe]">
            <CountTo :start-val="0" :end-val="item.num" :duration="1500" />
          </div>
        </div>
      </div>
    </a-flex>
  </div>
</template>

<script setup lang="ts">
import { CountTo } from 'vue3-count-to';
// 使用ref创建响应式数据
const items = ref([
  {
    name: '良本证本数量',
    num: 13,
    status: 'error',
  },
  {
    name: '費本证本数量',
    num: 14,
    status: 'normal',
  },
]);

function updateNums() {
  items.value.forEach((item) => {
    // 随机增加1到5之间的数
    item.num += Math.floor(Math.random() * 5) + 1;
    // 确保num不超过99
    if (item.num > 99) {
      item.num = 0;
    }
  });
}
// 设置定时器，每隔1秒执行一次updateNums函数
setInterval(updateNums, 5000);
</script>

<style scoped lang="less">
.finishedProduct {
  background-image: url('@/assets/image/bigScreen/finishedProductBg.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
  .sum {
    height: calc(100% - 3.5em);
  }
}
</style>
