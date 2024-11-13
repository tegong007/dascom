<template>
  <div class="bg h-100vh text-[18px] text-white">
    <bigScreenHeader />
    <a-flex
      justify="space-between"
      align="center"
      class="p-x-5em p-t-0.4em text-[1.3em] color-[#CFDEF1]"
    >
      <span class="light relative" @click="init">网络状态:已连接</span>
      <span class="light relative">{{ currentTime }}</span>
    </a-flex>
    <a-row class="relative top-4em h-23em p-l-3em p-r-1.5em" :gutter="[8, 0]">
      <a-col flex="1">
        <FinishedProductBg class="wh-full" :data="data.model4" />
      </a-col>
      <a-col flex="5">
        <a-row justify="space-between" class="wh-full pl-16" :gutter="[16, 0]">
          <a-col :span="8">
            <AddMore class="wh-full" :data="data.model3" />
          </a-col>
          <a-col :span="8">
            <Print class="wh-full" :data="data.model2" />
          </a-col>
          <a-col :span="8">
            <Start class="wh-full" :data="data.model1" />
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
import { initMachine, startOrStopPrintTask } from '@/apis/webApi';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import { formatDateTime } from '@/utils/time';
import router from '@/router/index.ts';
// 防抖+定時
import { throttle } from '@/utils/throttle.js';
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
const intervalRef = ref<number | null>(null); // 定时器
const stoping = ref(false);
// 停止二次確認
const open = ref<boolean>(false);
function handleCancel() {
  setOpen(false);
}
function setOpen(value: boolean) {
  open.value = value;
}
// 时间展示
const currentTime = ref('');
setInterval(() => {
  currentTime.value = formatDateTime();
}, 1000);
// 页面跳转
function goto(page: string) {
  router.push({ name: page });
}
/*
const workstationDefinitions = {
  "M1-Warehouse": "模组一卡仓位",
  "M1-Ready-1": "模组一发证位1",
  "M1-Ready-2": "模组一发证位2",
  "M1-Camera-1": "模组一摄像位",
  "M1-Reader-1": "模组一读写位1",
  "M1-Reader-2": "模组一读写位2",
  "M1-Reader-3": "模组一读写位3",
  "M1-Obsolete-1": "模组一废本槽1",
  "M2-Laser-1": "模组二激光位1",
  "M2-Laser-2": "模组二激光位2",
  "M2-Laser-3": "模组二激光位3",
  "M2-Camera-1": "模组二摄像位",
  "M2-Reader-1": "模组二读写位1",
  "M2-Reader-2": "模组二读写位2",
  "M2-Reader-3": "模组二读写位3",
  "M2-Laser-4": "模组二激光位4",
  "M2-Laser-5": "模组二激光位5",
  "M2-Laser-6": "模组二激光位6",
  "M2-UV-1": "模组二喷墨位1",
  "M2-UV-2": "模组二喷墨位2",
  "M2-UV-3": "模组二喷墨位3",
  "M2-Camera-2": "模组二摄像位",
  "M3-Turn-1": "模组三翻页器1",
  "M3-Reader-1": "模组三读写位1",
  "M3-Reader-2": "模组三读写位2",
  "M3-Reader-3": "模组三读写位3",
  "M3-UV-1": "模组三喷墨位1",
  "M3-UV-2": "模组三喷墨位2",
  "M3-UV-3": "模组三喷墨位3",
  "M3-Camera-1": "模组三摄像位",
  "M4-Reader-1": "模组四读写器1",
  "M4-Product-1": "模组四成品仓1",
  "M4-Product-2": "模组四成品仓2",
  "M4-Obsolete-1": "模组四废品仓1",
};
*/
// 假数据
const data = ref({
  model4: [
    {
      name: '良本证本数量',
      num: 0,
      status: 'error',
    },
    {
      name: '废本证本数量',
      num: 0,
      status: 'normal',
    },
  ],
  model3: {
    items: [
      {
        name: 'Y色余量',
        num: 0,
        status: 'error',
      },
      {
        name: 'M色余量',
        num: 0,
        status: 'normal',
      },
      {
        name: 'C色余量',
        num: 0,
        status: 'warning',
      },
      {
        name: 'K色余量',
        num: 0,
        status: 'normal',
      },
      {
        name: '光油余量',
        num: 0,
        status: 'normal',
      },
    ],

    // periodDataList: [],
  },
  model2: {
    items: [
      {
        name: 'Y色余量',
        num: 0,
        status: 'error',
      },
      {
        name: 'M色余量',
        num: 0,
        status: 'normal',
      },
      {
        name: 'C色余量',
        num: 0,
        status: 'warning',
      },
      {
        name: 'K色余量',
        num: 0,
        status: 'normal',
      },
      {
        name: '光油余量',
        num: 0,
        status: 'normal',
      },
    ],
  },
  model1: {
    items: [
      {
        name: '空白本余量',
        num: '∞',
        status: 'normal',
      },
    ],
  },
});

//  开始任务后开始定时器
async function startInterval() {
  // flowData.value = [];
  const startTaskStatus = await startTask();
  if (startTaskStatus) {
    // canClick.value = false;
    // 开启定时器，每隔1.5秒访问一次
    intervalRef.value = setInterval(throttle(updateNums, 1000), 1000) as unknown as number;
  }
}
// const distributeData = async () => {
//   if (!stoping.value) {
//     try {
//       const data = await lineGetDocStatus;
//       // 初始化数组
//       const Model1 = [];
//       const Model2 = [];
//       const Model3 = [];
//       const FinishedGoods = [];
//       const ObsoleteGoods = [];
//       // 分发数据到相应的数组
//       data.forEach((item) => {
//         const description = workstationDefinitions[item.status] || item.status;
//         const newItem = { ...item, status: description };

//         if (newItem.status.startsWith("模组一") && !newItem.status.includes("废品仓")) {
//           Model1.push({ ...newItem, no: Model1.length + 1 });
//         } else if (newItem.status.startsWith("模组二") && !newItem.status.includes("废品仓")) {
//           Model2.push({ ...newItem, no: Model2.length + 1 });
//         } else if (newItem.status.startsWith("模组三") && !newItem.status.includes("废品仓")) {
//           Model3.push({ ...newItem, no: Model3.length + 1 });
//         } else if (newItem.status.includes("成品仓")) {
//           FinishedGoods.push({ ...newItem, no: FinishedGoods.length + 1 });
//         } else if (newItem.status.includes("废品仓")) {
//           ObsoleteGoods.push({ ...newItem, no: ObsoleteGoods.length + 1 });
//         }
//       });
//       data.value.model4[0].name = FinishedGoods.length;
//       data.value.model4[1].name = ObsoleteGoods.length;
//       data.value.model3.periodDataList = Model3;
//       data.value.model3.items.forEach((item) => {
//         item.num = 100;
//       });
//       data.value.model2.periodDataList = Model2;
//       data.value.model2.items.forEach((item) => {
//         item.num = 100;
//       });
//       data.value.model1.periodDataList = Model1;
//       stoping.value = false;
//     } catch (error) {
//       await stopInterval();
//       openNotify("bottomRight", "获取证本状态失败");
//       stoping.value = true;
//     }
//   }
// };

// 现在先模拟
function updateNums() {
  // 04
  data.value.model4.forEach((item) => {
    // 随机增加1到5之间的数
    item.num += Math.floor(Math.random() * 5) + 1;
    // 确保num不超过99
    if (item.num > 99) {
      item.num = 0;
    }
  });
  // 03
  data.value.model3.items.forEach((item) => {
    // 随机增加1到5之间的数
    item.num += Math.floor(Math.random() * 5) + 1;
    // 确保num不超过99
    if (item.num > 99) {
      item.num = 0;
    }
  });
  data.value.model3.periodDataList = [
    {
      no: 1,
      certificateID: '13112206029',
      status: '模组三翻页器1',
      time: '2022-06-06 12:41:10',
    },
    { no: 2, certificateID: '13712998598', status: '模组三读写位1', time: '2022-08-17 11:20:13' },
    {
      no: 3,
      certificateID: '13396827528',
      status: '模组三读写位2',
      time: '2022-09-08 08:43:40',
    },
    {
      no: 4,
      certificateID: '15818822212',
      status: '模组三读写位3',
      time: '2022-09-08 08:40:32',
    },
    {
      no: 5,
      certificateID: '18728292626',
      status: '模组三喷墨位1',
      time: '2022-06-27 12:36:12',
    },
    {
      no: 6,
      certificateID: '15034529999',
      status: '模组三喷墨位2',
      time: '2022-06-27 12:44:48',
    },
    { no: 7, certificateID: '13654373011', status: '模组三喷墨位3', time: '2022-06-27 12:30:39' },
    {
      no: 8,
      certificateID: '18991604525',
      status: '模组三摄像位',
      time: '2022-06-27 12:57:24',
    },
  ];
  // 02
  data.value.model2.items.forEach((item) => {
    // 随机增加1到5之间的数
    item.num += Math.floor(Math.random() * 5) + 1;
    // 确保num不超过99
    if (item.num > 99) {
      item.num = 0;
    }
  });
  data.value.model2.periodDataList = [
    {
      no: 1,
      certificateID: '186287989',
      status: '模组二激光位1',
      time: '2024-10-23 11:45:33',
    },
    {
      no: 2,
      certificateID: '661563058',
      status: '模组二激光位2',
      time: '2024-10-23 11:44:33',
    },
    {
      no: 3,
      certificateID: '131606629',
      status: '模组二激光位3',
      time: '2024-10-23 11:43:33',
    },
    {
      no: 4,
      certificateID: '136169902',
      status: '模组二摄像位',
      time: '2024-10-23 11:42:33',
    },
    {
      no: 5,
      certificateID: '131777771',
      status: '模组二读写位1',
      time: '2024-10-23 11:41:33',
    },
    {
      no: 6,
      certificateID: '131675711',
      status: '模组二读写位2',
      time: '2024-10-23 11:40:33',
    },
    {
      no: 7,
      certificateID: '131740065',
      status: '模组二读写位3',
      time: '2024-10-23 11:39:33',
    },
    {
      no: 8,
      certificateID: '136573011',
      status: '模组二激光位4',
      time: '2024-10-23 11:38:33',
    },
  ];
  // 01

  data.value.model1.periodDataList = [
    {
      no: 1,
      certificateID: '139722077',
      status: '激光刻蚀',
      time: '2022-06-06 12:41:10',
    },
    {
      no: 2,
      certificateID: '138129999',
      status: '读芯片',
      time: '2022-09-08 08:43:40',
    },
    {
      no: 3,
      certificateID: '136722077',
      status: '发证位2',
      time: '2022-09-08 08:40:32',
    },
    {
      no: 4,
      certificateID: '186798642',
      status: '摄像位',
      time: '2022-06-27 12:36:12',
    },
    {
      no: 5,
      certificateID: '133798798',
      status: '读写位1',
      time: '2022-06-27 12:44:48',
    },
    {
      no: 6,
      certificateID: '156592483',
      status: '读写位2',
      time: '2022-06-27 12:30:39',
    },
    {
      no: 7,
      certificateID: '153218326',
      status: '读写位3',
      time: '2022-06-27 12:57:24',
    },
  ];
  appStore.setSpinning(false);
}

//  开始任务调度
async function startTask() {
  // imgIndex.value = 0;
  stoping.value = false;
  appStore.setSpinning(true);
  try {
    // await startOrStopPrintTask({ operate: 1 });
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
  if (intervalRef.value !== null) {
    appStore.setSpinning(true);
    clearInterval(intervalRef.value);
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
}
// 初始化
async function init() {
  try {
    appStore.setSpinning(true);
    await initMachine({ module: 'm0' });
    openNotify('bottomRight', '初始化接口调用成功');
  }
  catch (error) {
    error;
    openNotify('bottomRight', '初始化接口调用失败');
  }
  finally {
    appStore.setSpinning(false);
  }
}
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
