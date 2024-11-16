<template>
  <div class="table-wrap relative h-100% w-full">
    <!-- 表頭 -->
    <div :class="`titleContent ${isScroll ? 'isScroll' : ''}`">
      <div class="tit">
        序号
      </div>
      <div class="tit">
        证本ID
      </div>
      <div class="tit">
        状态
      </div>
      <div class="tit">
        时间
      </div>
    </div>
    <!-- 表格 -->
    <div ref="divRef" class="scrollable-box">
      <div v-for="(item, i) in data" :key="i" class="countContent w-full">
        <div class="descr">
          {{ item.no }}
        </div>
        <div class="descr">
          {{ item.docID }}
        </div>
        <div class="descr">
          {{ item.position }}
        </div>
        <div class="descr">
          {{ item.operTime }}
        </div>
      </div>
    </div>

    <div class="absolute bottom-10 right-10 w-full flex justify-end">
      <a-pagination v-model:current="current" :total="49" show-less-items @change="onPageChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
// const props = defineProps({
//   data: Array,
// });
import { onMounted, ref, watch } from 'vue';

const current = ref(1);
const isScroll = ref(false);
const divRef = ref(null);

const data = ref([
  {
    no: 1,
    docID: '13112206029',
    position: '模组三翻页器1',
    operTime: '2022-06-06 12:41:10',
  },
  { no: 2, docID: '13712998598', position: '模组三读写位1', operTime: '2022-08-17 11:20:13' },
  {
    no: 3,
    docID: '13396827528',
    position: '模组三读写位2',
    operTime: '2022-09-08 08:43:40',
  },
  {
    no: 4,
    docID: '15818822212',
    position: '模组三读写位3',
    operTime: '2022-09-08 08:40:32',
  },
  {
    no: 5,
    docID: '18728292626',
    position: '模组三喷墨位1',
    operTime: '2022-06-27 12:36:12',
  },
  {
    no: 6,
    docID: '15034529999',
    position: '模组三喷墨位2',
    operTime: '2022-06-27 12:44:48',
  },
  { no: 7, docID: '13654373011', position: '模组三喷墨位3', operTime: '2022-06-27 12:30:39' },
  {
    no: 8,
    docID: '18991604525',
    position: '模组三摄像位',
    operTime: '2022-06-27 12:57:24',
  },
  {
    no: 8,
    docID: '18991604525',
    position: '模组三摄像位',
    operTime: '2022-06-27 12:57:24',
  },
  {
    no: 8,
    docID: '18991604525',
    position: '模组三摄像位',
    operTime: '2022-06-27 12:57:24',
  },
  {
    no: 8,
    docID: '18991604525',
    position: '模组三摄像位',
    operTime: '2022-06-27 12:57:24',
  },
  {
    no: 8,
    docID: '18991604525',
    position: '模组三摄像位',
    operTime: '2022-06-27 12:57:24',
  },
  {
    no: 8,
    docID: '18991604525',
    position: '模组三摄像位',
    operTime: '2022-06-27 12:57:24',
  },
  {
    no: 8,
    docID: '18991604525',
    position: '模组三摄像位',
    operTime: '2022-06-27 12:57:24',
  },
  {
    no: 8,
    docID: '18991604525',
    position: '模组三摄像位',
    operTime: '2022-06-27 12:57:24',
  },

  {
    no: 8,
    docID: '18991604525',
    position: '模组三摄像位',
    operTime: '2022-06-27 12:57:24',
  },
]);
// 监视 divRef 变化的函数
function checkScrollbar(divElement) {
  if (divElement) {
    // 检查是否有垂直滚动条
    if (divElement.scrollHeight > divElement.clientHeight) {
      console.log('垂直滚动条出现');
      isScroll.value = true;
      // 可以在这里执行其他操作，比如通知用户
    }
    else {
      isScroll.value = false;
    }
    // 检查是否有水平滚动条
    if (divElement.scrollWidth > divElement.clientWidth) {
      console.log('水平滚动条出现');
      // 可以在这里执行其他操作，比如通知用户
    }
  }
}

// 使用 watch 监视 divRef 值的变化
watch(data, (newValue) => {
  if (newValue) {
    checkScrollbar(newValue);
  }
});

// 也可以在组件挂载后检查一次
onMounted(() => {
  checkScrollbar(divRef.value);
});

function onPageChange(page: number) {
  current.value = page;
  //  分页的时候调取接口数据
}
</script>

<style lang="scss" scoped>
.table-wrap {
  // width: 100%;
  // padding: 0 20px;
  border: 3px solid #7ff3fd; /* 设置边框 */
  // border-bottom:none;

  color: #ffffff;
  .scroll {
    max-height: 145px;
    min-height: 145px;
    overflow: hidden;
  }
  .isScroll {
    width: calc(100% - 12px);
  }
}

.titleContent {
  // width: calc(100% - 12px);
  display: flex;
  align-items: center;
  border-bottom: 3px solid #7ff3fd; /* 底部边框 */
  // justify-content: space-between;
  // height: 40px;
  .tit {
    flex: 1;
    padding: 8px 0;
    // flex: 0 16.6%;
    text-align: center;
    border-right: 3px solid #7ff3fd;
    background: linear-gradient(229deg, rgba(144, 236, 255, 0.65) 0%, rgba(0, 106, 245, 0.06) 57%);
    white-space: nowrap;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /* 限制在3行内 */
    text-overflow: ellipsis; /* 超出部分显示为... */
    // border: 2px solid red;
  }
  .tit:first-child {
    // border-right: none; /* 最后一个元素不显示右侧边框 */
    flex: 0.5;
  }
  .tit:nth-child(2) {
    flex: 1.2;
  }
  .tit:nth-child(3) {
    flex: 1.5;
  }
  .tit:last-child {
    border-right: none; /* 最后一个元素不显示右侧边框 */
    flex: 2;
  }
}

.countContent {
  display: flex;
  // flex-wrap: wrap;
  text-align: center;
  width: 100%;
  font-size: 16px;
  .descr {
    padding: 8px 0;
    border-right: 3px solid #7ff3fd;
    border-bottom: 3px solid #7ff3fd;
    flex: 1;
    background: rgba(255, 255, 255, 0.2);
    overflow: hidden;
    white-space: nowrap;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /* 限制在3行内 */
    text-overflow: ellipsis; /* 超出部分显示为... */
  }
  .descr:first-child {
    // border-right: none; /* 最后一个元素不显示右侧边框 */
    flex: 0.5;
  }

  .descr:nth-child(2) {
    flex: 1.2;
  }
  .descr:nth-child(3) {
    flex: 1.5;
  }
  .descr:last-child {
    border-right: none; /* 最后一个元素不显示右侧边框 */
    flex: 2;
  }
}
.scrollable-box {
  height: calc(100% - 110px);
  // max-height: 650px;
  overflow: auto;
  // overflow: hidden;
}

/* 自定义滚动条样式 */
.scrollable-box::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

.scrollable-box::-webkit-scrollbar-thumb {
  background-color: #ffffff38;
  border-radius: 6px;
}

.scrollable-box::-webkit-scrollbar-track {
  /* background-color: #f1f1f1; */
  background-image: linear-gradient(to bottom, rgba(0, 140, 255, 0.329) 0%, rgba(255, 255, 255, 0.205) 100%);
  /* border-radius: 6px; */
}

.scrollable-box::-webkit-scrollbar-button {
  display: none;
}

::v-deep(.ant-pagination) {
  a,
  button {
    color: #fff;
  }
  .ant-pagination-item-active {
    background-color: #ffffff1e;
  }
}
// .countContent:nth-of-type(odd) {
//   background: #318699 !important;
//   .descr {
//     // border-right: 1px solid #247587;
//   }
// }
</style>
