<template>
  <div class="table-wrap w-full">
    <div class="titleContent w-full">
      <div class="tit">
        位置
      </div>
      <div class="tit">
        状态
      </div>
      <div class="tit">
        时间
      </div>
    </div>

    <!-- 配置详情请见 README.md -->
    <Vue3SeamlessScroll
      :list="props.data"
      class="scroll"
      direction="down"
      :step="0.5"
      :hover="true"
      :limit-scroll-num="7"
      :is-watch="true"
      :single-height="0"
      :single-width="0"
      :single-wait-time="1000"
      :wheel="false"
    >
      <div v-for="(item, i) in props.data" :key="i" class="countContent w-full">
        <div class="descr">
          {{ item.shouldArriveNumber }}
        </div>
        <div class="descr">
          {{ item.actualAttendance }}
        </div>
        <div class="descr">
          {{ item.endTime }}
        </div>
      </div>
    </Vue3SeamlessScroll>
  </div>
</template>

<script setup lang="ts">
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

const props = defineProps({
  data: Array,
});

// 如果需要在某个时刻停止定时器，可
</script>

<style lang="scss" scoped>
.table-wrap {
  width: 100%;
  // padding: 0 20px;
  border: 3px solid #7ff3fd; /* 设置边框 */

  color: #ffffff;
  .scroll {
    max-height: 145px;
    min-height: 145px;
    overflow: hidden;
  }
}
.titleContent {
  display: flex;
  align-items: center;
  border-bottom: 3px solid #7ff3fd; /* 底部边框 */
  // justify-content: space-between;
  // height: 40px;
  .tit {
    flex: 1;
    padding: 2px 0;
    // flex: 0 16.6%;
    text-align: center;
    border-right: 3px solid #7ff3fd;
    background: linear-gradient(229deg, rgba(144, 236, 255, 0.65) 0%, rgba(0, 106, 245, 0.06) 57%);
    // border: 2px solid red;
  }
  .tit:last-child {
    border-right: none; /* 最后一个元素不显示右侧边框 */
    flex: 1.5;
  }
  .tit:nth-child(2) {
    flex: 2;
  }
  /* 给中间的列设置更大的flex值 */
}

.countContent {
  display: flex;
  // flex-wrap: wrap;
  text-align: center;
  width: 100%;
  font-size: 14px;
  .descr {
    padding: 2px 0;
    border-right: 3px solid #7ff3fd;
    border-bottom: 3px solid #7ff3fd;
    flex: 1;
    background: rgba(255, 255, 255, 0.2);
  }
  .descr:last-child {
    border-right: none; /* 最后一个元素不显示右侧边框 */
    flex: 1.5;
  }
  .descr:nth-child(2) {
    flex: 2;
  }
}
// .countContent:nth-of-type(odd) {
//   background: #318699 !important;
//   .descr {
//     // border-right: 1px solid #247587;
//   }
// }
</style>
