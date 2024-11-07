<template>
  <div class="table-wrap">
    <div class="titleContent">
      <div class="tit">
        日期
      </div>
      <div class="tit">
        开始时间
      </div>
      <div class="tit">
        结束时间
      </div>
      <div class="tit">
        应到人数
      </div>
      <div class="tit">
        实到人数
      </div>
      <div class="tit">
        实到占比
      </div>
    </div>

    <!-- 配置详情请见 README.md -->
    <Vue3SeamlessScroll
      :list="periodDataList"
      class="scroll"
      direction="up"
      :step="0.9"
      :hover="true"
      :limit-scroll-num="7"
      :is-watch="true"
      :single-height="0"
      :single-width="0"
      :single-wait-time="1000"
      :wheel="false"
    >
      <div v-for="(item, i) in periodDataList" :key="i" class="countContent">
        <div class="descr">
          {{ item.dateTime }}
        </div>
        <div class="descr">
          {{ item.startTime }}
        </div>
        <div class="descr">
          {{ item.endTime }}
        </div>
        <div class="descr">
          {{ item.shouldArriveNumber }}
        </div>
        <div class="descr">
          {{ item.actualAttendance }}
        </div>
        <div class="descr">
          {{ item.bl }}
        </div>
      </div>
    </Vue3SeamlessScroll>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

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
// const generateItem = () => {
//   return {
//     shouldArriveNumber: Math.floor(Math.random() * 10) + 1,
//     actualAttendance: Math.floor(Math.random() * 1000),
//     bl: (Math.random() * 100).toFixed(2) + "%",
//   };
// };

// const updateData = () => {
//   // 随机修改数据
//   const length = Math.floor(Math.random() * 10) + 1;
//   periodDataList.value = Array.from({ length }, () => generateItem());
// };

// let intervalId = setInterval(() => {
//   // 添加新数据到数组的当前索引位置
//   // const newData = generateNewData();
//   updateData();
//   // periodDataList.value.push(newData);
//   // periodDataList.value.unshift(newData);
//   // if (periodDataList.value.length >= 5) {
//   //   // 假设最大长度为3
//   //   periodDataList.value.pop(); // 移除第一个元素
//   // }
// }, 1000);
// const changeScroll = () => {
//   console.log("🚀 ~ file: seamless-scroll.vue:111 ~ changeScroll ~ periodDataList:");
//   // periodDataList
// };
</script>

<style lang="scss" scoped>
.table-wrap {
  width: 100%;

  // padding: 0 20px;
  color: #ffffff;
  .scroll {
    max-height: 145px;
    overflow: hidden;
  }
}
.titleContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  .tit {
    flex: 0 0 16.6%;
    text-align: center;
  }
}
.countContent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  .descr {
    flex: 0 0 16%;
    padding: 10px 0;
    text-align: center;
  }
}
.countContent:nth-of-type(odd) {
  background: #318699 !important;
  .descr {
    border-right: 1px solid #247587;
  }
}
</style>
