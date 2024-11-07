<template>
  <div class="bg h-100vh text-[18px] text-white">
    <a-row class="relative top-6em h-23em p-l-3em p-r-1.5em" :gutter="[8, 0]">
      <a-col flex="1">
        <FinishedProductBg class="wh-full" />
      </a-col>
      <a-col flex="5">
        <a-row justify="space-between" class="wh-full pl-16" :gutter="[16, 0]">
          <a-col :span="8">
            <AddMore class="wh-full" />
          </a-col>
          <a-col :span="8">
            <Print class="wh-full" />
          </a-col>
          <a-col :span="8">
            <Start class="wh-full" />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import FinishedProductBg from './finishedProduct.vue';
import AddMore from './addMore.vue';
import Print from './printPage.vue';
import Start from './startPage.vue';
// function formatDateTime() {
//   const now = new Date();
//   const year = now.getFullYear(); // 获取年份
//   const month = now.getMonth() + 1; // 获取月份，月份从0开始，所以需要+1
//   const day = now.getDate(); // 获取日
//   const hours = now.getHours(); // 获取小时
//   const minutes = now.getMinutes(); // 获取分钟
//   const seconds = now.getSeconds(); // 获取分钟

//   // 使用padStart方法确保月份和日期始终是两位数
//   const formattedMonth = month.toString().padStart(2, "0");
//   const formattedDay = day.toString().padStart(2, "0");
//   const formattedHours = hours.toString().padStart(2, "0");
//   const formattedMinutes = minutes.toString().padStart(2, "0");
//   const formattedSeconds = seconds.toString().padStart(2, "0");

//   // 拼接成指定格式
//   const formattedDateTime = `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
//   return formattedDateTime;
// }
</script>

<style scoped lang="less">
.bg {
  background-image: url('../../assets/image/bigScreen/bg.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
}
</style>
