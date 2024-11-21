<template>
  <div class="table-wrap relative h-92% w-full">
    <!-- 表頭 -->
    <div :class="`titleContent ${isScroll ? 'isScroll' : ''}`">
      <div class="tit">
        证本号
      </div>
      <div class="tit flex-[1.5]!">
        工位
      </div>
      <div class="tit flex-[1.5]!">
        图片
      </div>
      <div class="tit">
        状态
      </div>
      <div class="tit">
        废本原因
      </div>
      <div class="tit flex-[2]!">
        开始时间
      </div>
      <div class="tit flex-[2]!">
        结束时间
      </div>
      <!-- <div class="tit">详情</div> -->
    </div>
    <!-- 表格 -->
    <div ref="divRef" class="scrollable-box">
      <!-- <div
        v-for="(item, i) in data"
        :key="i"
        :class="`countContent w-full hover:bg-[#f0b092ad] ${isCheck === item.docID ? 'bg-[#f86dcf] hover:bg-none' : ''}`"
        @click="getdetailById(item?.docID)"
      > -->
      <div v-for="(item, i) in data" :key="i" class="countContent w-full">
        <div class="descr">
          {{ item?.docID }}
        </div>
        <div class="descr flex-[1.5]!">
          {{ getWorkstationName(item?.position) }}
        </div>
        <div class="descr flex-[1.5]!">
          <a-image
            :width="50"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div class="descr">
          {{
            item?.result === 0 ? "良本" : item?.result === 1 ? "制本中" : "废本"
          }}
        </div>
        <div class="descr">
          <a-tooltip placement="topLeft">
            <template #title>
              {{ item.resultMsg }}
            </template>
            {{ item?.resultMsg }}
          </a-tooltip>
          <!-- {{ item.resultMsg }} -->
        </div>
        <div class="descr flex-[2]!">
          {{ item?.startTime }}
        </div>
        <div class="descr flex-[2]!">
          {{ item?.endTime }}
        </div>
        <!-- <div class="descr">
          <a href="" class="color-[#f6ffed]">查看详情</a>
        </div> -->
      </div>
    </div>

    <div class="absolute bottom-10 right-10 w-full flex justify-end">
      <!-- :showSizeChanger="false" -->
      <a-pagination
        v-model:current="getdetailParams.page.number"
        :total="total"
        :page-size="15"
        :show-size-changer="false"
        show-less-items
        @change="onPageChange"
      />
    </div>
    <contextHolder />
  </div>
</template>

<script setup lang="ts">
// import { notification } from "ant-design-vue";
// import { lineGetDocdetail } from "@/apis/webApi";
// import { throttle } from "@/utils/throttle.js";
import { getWorkstationName } from '@/utils/workstationDefinitions';

// const props = defineProps({
//   handleClick: {
//     type: Function,
//   },
// });

// const [api, contextHolder] = notification.useNotification();
// function openNotify(
//   placement: NotificationPlacement,
//   msg: any,
//   success?: string,
// ) {
//   return openNotification(placement, msg, success);
// }
// function openNotification(
//   placement: NotificationPlacement,
//   msg: any,
//   success?: string,
// ) {
//   success
//     ? api.success({
//         message: "成功",
//         description: ` ${msg}`,
//         placement,
//       })
//     : api.error({
//         message: "错误信息",
//         description: ` ${msg}`,
//         placement,
//       });
// }
const intervalRef = ref<number | null>(null); // 定时器
const isScroll = ref(false);
const divRef = ref(null);
// const isCheck = ref("");
const total = ref(0);
const data = ref([
  {
    docId: 123234,
    result: 2,
    resultMsg: '我是个废本，为什么我是个废本呢 因为...',
  },
  { docID: 45 },
  {
    docId: 12356234,
    result: 1,
  },
  { docID: 3245653456 },
  {
    docId: 123234,
    result: 1,
  },
  { docID: 325643456 },
  { docId: 12378234, resultMsg: '我是个废本，为什么我是个废本呢 因为...' },
  { docID: 32953456 },
  { docId: 127893234, resultMsg: '我是个废本，为什么我是个废本呢 因为...' },
  { docID: 325643456 },
  { docId: 123234, resultMsg: '我是个废本，为什么我是个废本呢 因为...' },
  { docID: 325345566 },
  { docId: 12323784, resultMsg: '我是个废本，为什么我是个废本呢 因为...' },
  { docID: 3253445656 },
]);
const getdetailParams = ref({
  docID: [],
  page: {
    number: 1,
    amount: 15,
  },
});
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
onActivated(async () => {
  checkScrollbar(divRef.value);
  // const Issuccess = await getDetail();
  // if (Issuccess) {
  //   intervalRef.value = setInterval(
  //     throttle(await getDetail, 4000),
  //     4000,
  //   ) as unknown as number;
  // }
});

onDeactivated(() => {
  delInterval();
  // checkScrollbar(divRef.value);
  // await getDetail();
});
function delInterval() {
  if (intervalRef.value !== null) {
    clearInterval(intervalRef.value);
  }
  intervalRef.value = null;
}
//   async function getDetail() {
//     try {
//       const detailData = await lineGetDocdetail(getdetailParams.value);
//       total.value = detailData.rslts?.length;
//       data.value = detailData.rslts;
//       return true;
//     }
//     catch (error) {
//       console.log('🚀 ~ file: table.vue:172 ~ getDetail ~ error:', error);
//       openNotify('bottomRight', '获取证本详细接口');
//       delInterval();
//       return false;
//     }
//   }

async function onPageChange(page: number) {
  getdetailParams.value.page.number = page;
  // getdetailParams.value.page.number = page;
  // await getDetail();
  //  分页的时候调取接口数据
}
// async function getdetailById(docId: string) {
//   if (isCheck.value === docId) {
//     isCheck.value = "";
//     props.handleClick("");
//   } else {
//     isCheck.value = docId;
//     props.handleClick(docId);
//   }
// }
</script>

<style lang="scss" scoped>
.table-wrap {
  // width: 100%;
  // padding: 0 20px;
  //   border: 3px solid #7ff3fd; /* 设置边框 */
  // border-bottom:none;

  color: #ffffff;
  .scroll {
    max-height: 15vh;
    min-height: 15vh;
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
  border-top: 3px solid #7ff3fd; /* 底部边框 */
  color: #cfdef1;
  font-family: siyuan;
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
  color: #cfdef1;
  font-family: siyuan;
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
    border-left: 3px solid #7ff3fd;
  }
  .descr:last-child {
    // border-right: none; /* 最后一个元素不显示右侧边框 */
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
