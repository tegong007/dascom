<template>
  <div class="startPage text-[18px] text-white">
    <a-flex justify="center" align="center">
      <div class="title absolute left-0 top-0 flex items-center">
        <span class="no m-x-0.5em">01</span>
        <span class="ml-10 text-[1.5em] color-[#CFDEF1]">空白本余量</span>
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
            <div class="mt-5 text-[1em] color-[#CFDEF1]">
              {{ item.name }}
            </div>
            <div class="good-num mt8">
              <CountTo
                :start-val="0"
                separator
                :end-val="item.num"
                suffix="%"
                :duration="Math.floor(Math.random() * 2000) + 1000"
              />
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
            <SeamlessScroll :data="periodDataList" />
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
import SeamlessScroll from '../../../components/seamless-scroll.vue';

const items = ref([
  {
    name: '空白本余量',
    num: 13,
    status: 'normal',
  },
]);
const periodDataList = ref<any>([
  {
    dateTime: '2022-05-03',
    startTime: '2022-05-03',
    endTime: '2022-05-03',
    shouldArriveNumber: '1',
    actualAttendance: '100',
    bl: '10%',
  },
  {
    dateTime: '2022-05-03',
    startTime: '2022-05-03',
    endTime: '2022-05-03',
    shouldArriveNumber: '2',
    actualAttendance: '200',
    bl: '10%',
  },
  {
    dateTime: '2022-05-03',
    startTime: '2022-05-03',
    endTime: '2022-05-03',
    shouldArriveNumber: '3',
    actualAttendance: '300',
    bl: '10%',
  },
  {
    dateTime: '2022-05-03',
    startTime: '2022-05-03',
    endTime: '2022-05-03',
    shouldArriveNumber: '4',
    actualAttendance: '400',
    bl: '10%',
  },
  {
    dateTime: '2022-05-03',
    startTime: '2022-05-03',
    endTime: '2022-05-03',
    shouldArriveNumber: '5',
    actualAttendance: '500',
    bl: '10%',
  },
  {
    dateTime: '2022-05-03',
    startTime: '2022-05-03',
    endTime: '2022-05-03',
    shouldArriveNumber: '6',
    actualAttendance: '600',
    bl: '10%',
  },
  {
    dateTime: '2022-05-03',
    startTime: '2022-05-03',
    endTime: '2022-05-03',
    shouldArriveNumber: '7',
    actualAttendance: '700',
    bl: '10%',
  },
  {
    dateTime: '2022-05-03',
    startTime: '2022-05-03',
    endTime: '2022-05-03',
    shouldArriveNumber: '8',
    actualAttendance: '800',
    bl: '10%',
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
.startPage {
  background-image: url('@/assets/image/bigScreen/boxbg.png');
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
    // height: calc(100% - 3.5em);
    height: 4.8em;
    .good-num {
      font-size: 2em;
      font-family: 'youshe';
    }
  }
  .table-data {
    height: calc(100% - 8.3em);
    .scroll-table {
      height: calc(100% - 10em);
    }
  }
}
</style>
