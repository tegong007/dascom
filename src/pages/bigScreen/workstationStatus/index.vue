<template>
  <div class="bg h-100vh flex flex-col items-center text-[18px] text-white">
    <bigScreenHeader title="工位状态" />
    <main class="relative h-20px w-full">
      <div class="absolute top-0 w-full text-center text-[20px]">
        当前批次号:20145645564687486486
      </div>
      <div class="absolute right-20">
        <!-- 状态标识 -->
        <div class="w-400px flex justify-around">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="inline-block flex items-center justify-between"
          >
            <div
              :class="`${`w-20px h-20px ${item.color} rounded-[50px] inline-block`}`"
            />
            <span class="ml10 text-[20px]">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </main>
    <Card />
    <!-- 下边按钮 -->
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

<script setup lang="ts">
import Card from './card.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';

const items = [
  {
    color: 'bg-[#C7080B]',
    text: '异常',
  },
  {
    color: 'bg-[#CBCBCB]',
    text: '待机',
  },
  {
    color: 'bg-[#89F7FF]',
    text: '工作中',
  },
  {
    color: 'bg-[#FFB55B]',
    text: '警告',
  },
];
</script>

<style lang="less" scoped>
.siyuan {
  font-family: 'siyuan';
}
.bg {
  background-image: url('@/assets/image/bigScreen/bg-none.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
  .light {
    text-shadow: 0px 0px 8px #ffffff;
  }
  // .machine{
  //     background-image: url("../../assets/image/bigScreen/machine.png");
  // background-size: 100% 100%;
  // background-repeat: "no-repeat";
  // }
  .groupBtn {
    div {
      background-size: 100% 100%;
      background-repeat: 'no-repeat';
    }
  }
}
</style>
