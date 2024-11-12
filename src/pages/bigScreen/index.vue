<template>
  <div class="bg h-100vh text-[18px] text-white">
    <bigScreenHeader />
    <a-flex
      justify="space-between"
      align="center"
      class="p-x-5em p-t-0.4em text-[1.3em] color-[#CFDEF1]"
    >
      <span class="light relative">网络状态:xxx</span>
      <span class="light relative">{{ currentTime }}</span>
    </a-flex>
    <a-row class="relative top-4em h-23em p-l-3em p-r-1.5em" :gutter="[8, 0]">
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
    <div class="groupBtn absolute bottom-0 h5em w-full flex items-center justify-center">
      <div class="flex">
        <div
          class="startBtn h-7em w-12em transition-transform duration-300 hover:scale-115"
          @click="startInterval()"
        />
        <div
          class="stopBtn h-7em w-12em transition-transform duration-300 hover:scale-115"
          @click="setOpen(true)"
        />
      </div>
      <span class="relative top--1em m-x-0.5em h-80% w-2px bg-[#8BB2FF]" />
      <div class="flex">
        <div
          class="setBtn h-7em w-12em transition-transform duration-300 hover:scale-115"
          @click="goto('SetPage')"
        />
        <div
          class="maintainBtn h-7em w-12em transition-transform duration-300 hover:scale-115"
          @click="goto('MainTain')"
        />
      </div>
    </div>
    <contextHolder />
  </div>

  <TheModal :open="open" :handle-ok="reset" :handle-cancel="handleCancel" title="确认停止" />
</template>

<script setup lang="ts">
import type { NotificationPlacement } from 'ant-design-vue';
import { notification } from 'ant-design-vue';
import { useAppStore } from '../../store/index';
import FinishedProductBg from './module/finishedProduct.vue';
import AddMore from './module/addMore.vue';
import Print from './module/printPage.vue';
import Start from './module/startPage.vue';
import { startOrStopPrintTask } from '@/apis/webApi';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import { formatDateTime } from '@/utils/time';
import router from '@/router/index.ts';
// 加載中
const appStore = useAppStore();
// 通知
const [api, contextHolder] = notification.useNotification();
const openNotify = (placement: NotificationPlacement, msg: any) => openNotification(placement, msg);
function openNotification(placement: NotificationPlacement, msg: any) {
  api.error({
    message: '错误信息',
    description: ` ${msg}`,
    placement,
  });
}
// 防抖+定時
// import { throttle } from '@/utils/throttle.js';
const intervalRef = ref<number | null>(null); // 定时器
// 停止二次確認
const open = ref<boolean>(false);
function handleCancel() {
  setOpen(false);
}
function setOpen(value: boolean) {
  open.value = value;
}
const currentTime = ref('');
// 自动一秒
setInterval(() => {
  currentTime.value = formatDateTime();
}, 1000);
// 手动一秒
function goto(page: string) {
  router.push({ name: page });
}

//  开始任务后开始定时器
async function startInterval() {
  // flowData.value = [];
  // const startTaskStatus =
  await startTask();
  // if (startTaskStatus) {
  //   // canClick.value = false;
  //   // 开启定时器，每隔1.5秒访问一次
  //   intervalRef.value = setInterval(
  //     throttle(getStatus, 1500),
  //     1500,
  //   ) as unknown as number;
  // }
}
//  开始任务调度
async function startTask() {
  // imgIndex.value = 0;
  // stoping.value = false;
  appStore.setSpinning(true);
  try {
    await startOrStopPrintTask({ operate: 1 });
    await startOrStopPrintTask({ operate: 0 });
    return true;
  }
  catch (error) {
    error;
    openNotify('bottomRight', '执行打印任务失败');
    await stopInterval();
    appStore.setSpinning(false);
  }
  return false;
}

// 手动停止
async function reset() {
  open.value = false;
  // flowData.value = [];
  await stopInterval();
  // flowData.value.unshift({ status: 'stop', stop: true });
  // imgIndex.value = 0;
}

//  清除定时器
async function stopInterval() {
  // if (intervalRef.value !== null) {
  appStore.setSpinning(true);
  // clearInterval(intervalRef.value);
  try {
    await startOrStopPrintTask({ operate: 1 });
  }
  catch (error) {
    error;
    openNotify('bottomRight', '任务停止失败');
  }
  finally {
    // canClick.value = true;
    intervalRef.value = null;
    appStore.setSpinning(false);
  }
}
// }

// const periodDataList = ref<any>({
//   network_status: "已连接",
//   finished_document_collection: {
//     good_document_count: 18,
//     faulty_document_count: 23,
//   },
//   refill_printing: {
//     Y_color_remaining: "18%",
//     M_color_remaining: "23%",
//     C_color_remaining: "24%",
//     K_color_remaining: "38%",
//     varnish_remaining: "64%",
//     document_info: [
//       { position: 1, status: 100, time: "2022-05-03" },
//       { position: 2, status: 200, time: "2022-05-03" },
//       { position: 3, status: 300, time: "2022-05-03" },
//       { position: 4, status: 400, time: "2022-05-03" },
//       { position: 5, status: 500, time: "2022-05-03" },
//     ],
//   },
//   main_and_sub_page_printing: {
//     Y_color_remaining: "13%",
//     M_color_remaining: "24%",
//     C_color_remaining: "39%",
//     K_color_remaining: "29%",
//     varnish_remaining: "53%",
//     document_info: [
//       { position: 1, status: 771, time: "2022-05-03" },
//       { position: 2, status: 385, time: "2022-05-03" },
//       { position: 3, status: 266, time: "2022-05-03" },
//     ],
//     status: "Fault",
//   },
//   blank_document_remaining: {
//     blank_document_remaining: "5%",
//     document_info: [
//       { position: 1, status: 100, time: "2022-05-03" },
//       { position: 2, status: 200, time: "2022-05-03" },
//       { position: 3, status: 300, time: "2022-05-03" },
//       { position: 4, status: 400, time: "2022-05-03" },
//       { position: 5, status: 500, time: "2022-05-03" },
//     ],
//   },
// });
</script>

<style lang="less">
.siyuan {
  font-family: 'siyuan';
}
.bg {
  background-image: url('../../assets/image/bigScreen/bg.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
  .light {
    text-shadow: 0px 0px 8px #ffffff;
  }
  .groupBtn {
    div {
      background-size: 100% 100%;
      background-repeat: 'no-repeat';
    }
    .startBtn {
      background-image: url('../../assets/image/bigScreen/startBtn.png');
    }
    .stopBtn {
      background-image: url('../../assets/image/bigScreen/stopBtn.png');
    }
    .setBtn {
      background-image: url('../../assets/image/bigScreen/setBtn.png');
    }
    .maintainBtn {
      background-image: url('../../assets/image/bigScreen/maintain.png');
    }
  }
}
</style>
