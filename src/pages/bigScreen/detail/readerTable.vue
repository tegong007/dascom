<template>
  <div class="table-wrap relative w-full">
    <div class="m-x-20 m-y-8 text-[25px] font-[youshe]">
      读写器数据
    </div>
    <main>
      <!-- 表頭 -->
      <div class="titleContent">
        <div class="tit">
          工位
        </div>
        <div class="tit flex-[1.5]!">
          图片
        </div>
        <div class="tit">
          ocr数据
        </div>
        <div class="tit">
          偏移数据
        </div>
        <div class="tit">
          识别结果
        </div>
      </div>
      <!-- 表格 -->
      <div>
        <div v-for="(item, i) in data" :key="i" class="countContent w-full">
          <div class="descr">
            {{ getWorkstationName(item?.position) }}
          </div>
          <div class="descr flex-[1.5]!">
            <vxe-image
              :width="50"
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </div>
          <div class="descr">
            {{ getWorkstationName(item?.ocrData) }}
          </div>
          <div class="descr">
            {{ getWorkstationName(item?.offsetData) }}
          </div>
          <div class="descr">
            {{ getWorkstationName(item?.qualityCheck) }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// const props = defineProps({
//   handleClick: {
//     type: Function,
//   },
// });
// import { lineGetDocdetail } from "@/apis/webApi";
// import { throttle } from "@/utils/throttle.js";
import { getWorkstationName } from '@/utils/workstationDefinitions';
// const intervalRef = ref<number | null>(null); // 定时器

const data = ref([
  {
    docId: 123234,
    position: 'M2-Camera-1',
    resultMsg: '我是个废本，为什么我是个废本呢 因为...',
  },
  { docID: 3253456, position: 'M2-Camera-1' },
]);
</script>

<style lang="scss" scoped>
.table-wrap {
  // width: 100%;
  // padding: 0 20px;
  // border: 3px solid #7ff3fd; /* 设置边框 */
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
  border-top: 3px solid #7ff3fd;
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
    border-left: 3px solid #7ff3fd;
  }
  .tit:last-child {
    // border-right: none; /* 最后一个元素不显示右侧边框 */
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
    display: flex;
    align-items: center;
    justify-content: center;
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
    border-left: 3px solid #7ff3fd;
  }
  .descr:last-child {
    // border-right: none; /* 最后一个元素不显示右侧边框 */
  }
}
</style>
