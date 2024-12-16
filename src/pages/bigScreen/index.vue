<template>
  <div class="bg h-100vh flex flex-col items-center text-[18px] text-white">
    <div
      class="absolute bottom-[12%] left-[-0.5] h-35% w-80% flex items-center justify-center opacity-0 hover:opacity-100"
    >
      <div
        class="m-t-10vh h-[124px] w-[271px] flex items-center justify-center rounded-[30px] bg-[#0000007a]"
        @click="goto('detail')"
      >
        <span
          class="cursor-default border-1 border-[#fff] rounded-[30px] bg-[#00000049] p-10 text-[36px] font-[youshe]"
        >点击查看详情
        </span>
      </div>
      <!-- <img
        src="@/assets/image/bigScreen/machine.png"
        class="h-21.8em w-87.5em border-8 border-sky-500"
        @click="goto('detail')"
      /> -->
    </div>
    <bigScreenHeader />
    <CloseOutlined
      class="absolute right-0em top-5 p-x-[1em] text-[25px] color-red hover:bg-[#f86e6e98] hover:color-white"
      @click="showQuitModal"
    />
    <a-flex
      justify="space-between"
      align="center"
      class="w-full p-x-5em p-t-0.4em text-[1.3em] color-[#CFDEF1]"
    >
      <span class="light relative" @click="init">网络状态:已连接</span>
      <span class="light relative">{{ currentTime }}</span>
    </a-flex>
    <a-row
      class="relative top-[6vh] h-33.7% w-full p-l-3em p-r-1.5em"
      :gutter="[8, 0]"
    >
      <a-col flex="1">
        <FinishedProductBg class="wh-full" :data="data.model4" />
      </a-col>
      <a-col flex="5">
        <a-row justify="space-between" class="wh-full pl-16" :gutter="[16, 0]">
          <a-col
            v-for="(item, index) in [2, 1, 0]"
            :key="index"
            :span="8"
            class="group"
          >
            <span
              class="absolute right-20 top-10 z-88 cursor-default border-1 border-[#fff] rounded-[30px] bg-[#00000049] p-6 text-[18px] font-[youshe] opacity-0 group-hover:opacity-100"
              @click="goto('SetPage', { currentModel: item })"
            >查看证本</span>
            <AddMore v-if="item === 2" class="wh-full" :data="data.model3" />
            <Print v-if="item === 1" class="wh-full" :data="data.model2" />
            <Start v-if="item === 0" class="wh-full" :data="data.model1" />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <div
      class="groupBtn absolute bottom-0 h6em w-full flex items-center justify-center"
    >
      <div class="flex">
        <div
          class="startBtn h-6em w-10em transition-transform duration-300 hover:scale-115"
          @click="setDocOpen(true)"
        />
        <div
          class="stopBtn h-6em w-10em transition-transform duration-300 hover:scale-115"
          @click="setOpen(true)"
        />
      </div>
      <span class="relative top--1em m-x-0.5em h-80% w-2px bg-[#8BB2FF]" />
      <div class="flex">
        <div
          class="setBtn h-6em w-10em transition-transform duration-300 hover:scale-115"
          @click="goto('SetPage', { currentModel: 0 })"
        />
        <div
          class="maintainBtn h-6em w-10em transition-transform duration-300 hover:scale-115"
          @click="goto('MainTain')"
        />
      </div>
    </div>
    <contextHolder />
  </div>

  <TheModal
    :open="open"
    :handle-ok="reset"
    :handle-cancel="handleCancel"
    :title="modal"
  />
  <docCountModal
    :open="docOpen"
    :handle-ok="startInterval"
    :handle-cancel="handleCancel"
    :title="docCount"
  />
</template>

<script setup lang="ts">
import type { NotificationPlacement } from 'ant-design-vue';
import { notification } from 'ant-design-vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import { useAppStore } from '../../store/index';
import FinishedProductBg from './module/finishedProduct.vue';
import AddMore from './module/addMore.vue';
import Print from './module/printPage.vue';
import Start from './module/startPage.vue';
import {
  initMachine,
  lineGetDocStatus,
  startOrStopPrintTask,
} from '@/apis/webApi';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import { formatDateTime } from '@/utils/time';
import { getWorkstationName } from '@/utils/workstationDefinitions';
import router from '@/router/index.ts';
import TheModal from '@/components/TheModal.vue';
import docCountModal from '@/components/modal/docCountModal.vue';

// 防抖+定時
import { throttle } from '@/utils/throttle.js';
// 加載中
const appStore = useAppStore();
const [api, contextHolder] = notification.useNotification();
function openNotify(
  placement: NotificationPlacement,
  msg: any,
  success?: string,
) {
  return openNotification(placement, msg, success);
}
function openNotification(
  placement: NotificationPlacement,
  msg: any,
  success?: string,
) {
  success
    ? api.success({
      message: '成功',
      description: ` ${msg}`,
      placement,
    })
    : api.error({
      message: '错误信息',
      description: ` ${msg}`,
      placement,
    });
}
const intervalRef = ref<number | null>(null); // 定时器
const stoping = ref(false);
const modal = ref('');
// 停止二次確認
const open = ref<boolean>(false);
const docOpen = ref<boolean>(false);
const docCount = ref(window.docCount);
function handleCancel() {
  setOpen(false);
  setDocOpen(false);
}
function setOpen(value: boolean) {
  open.value = value;
  modal.value = '确认停止？';
}
function setDocOpen(value: boolean) {
  docOpen.value = value;
}
function showQuitModal() {
  open.value = true;
  modal.value = '确认退出系统？';
}
// 时间展示
const currentTime = ref('');
setInterval(() => {
  currentTime.value = formatDateTime();
}, 1000);
// 页面跳转
function goto(page: string, query?: any) {
  router.push({ name: page, query });
}
// 假数据
const data = ref({
  model4: [
    {
      name: '良本证本数量',
      num: 0,
      position: 'error',
    },
    {
      name: '废本证本数量',
      num: 0,
      position: 'normal',
    },
  ],
  model3: {
    items: [
      {
        name: 'Y色余量',
        num: 99,
        position: 'error',
      },
      {
        name: 'M色余量',
        num: 99,
        position: 'normal',
      },
      {
        name: 'C色余量',
        num: 99,
        position: 'warning',
      },
      {
        name: 'K色余量',
        num: 99,
        position: 'normal',
      },
      {
        name: '光油余量',
        num: 99,
        position: 'normal',
      },
    ],

    // periodDataList: [],
  },
  model2: {
    items: [
      {
        name: 'Y色余量',
        num: 99,
        position: 'error',
      },
      {
        name: 'M色余量',
        num: 99,
        position: 'normal',
      },
      {
        name: 'C色余量',
        num: 99,
        position: 'warning',
      },
      {
        name: 'K色余量',
        num: 99,
        position: 'normal',
      },
      {
        name: '光油余量',
        num: 99,
        position: 'normal',
      },
    ],
  },
  model1: {
    items: [
      {
        name: '空白本余量',
        num: '∞',
        position: 'normal',
      },
    ],
  },
});

//  开始任务后开始定时器
async function startInterval(newDocCount: number) {
  window.electronAPI.setConfig('docCount', newDocCount);
  docCount.value = newDocCount;
  // flowData.value = [];
  const startTaskStatus = await startTask();
  if (startTaskStatus) {
    // canClick.value = false;
    // 开启定时器，每隔1.5秒访问一次
    intervalRef.value = setInterval(
      throttle(distributeData, 1000),
      1000,
    ) as unknown as number;
    // intervalRef.value = setInterval(throttle(updateNums, 3000), 3000) as unknown as number;
  }
}
async function distributeData() {
  if (!stoping.value) {
    try {
      const docData = await lineGetDocStatus();
      if (docData.respData) {
        // 初始化数组
        const Model1 = [];
        const Model2 = [];
        const Model3 = [];
        const FinishedGoods = [];
        const ObsoleteGoods = [];
        // 分发数据到相应的数组
        docData.respData.forEach((item) => {
          const description
            = getWorkstationName(item.position) || item.position;
          const newItem = { ...item, position: description };

          if (
            newItem.position.startsWith('模组一')
            && !newItem.position.includes('废品仓')
          ) {
            Model1.push({ ...newItem });
          }
          else if (
            newItem.position.startsWith('模组二')
            && !newItem.position.includes('废品仓')
          ) {
            Model2.push({ ...newItem });
          }
          else if (
            newItem.position.startsWith('模组三')
            && !newItem.position.includes('废品仓')
          ) {
            Model3.push({ ...newItem });
          }
          else if (newItem.position.includes('成品仓')) {
            FinishedGoods.push({ ...newItem, no: FinishedGoods.length + 1 });
          }
          else if (newItem.position.includes('废品仓')) {
            ObsoleteGoods.push({ ...newItem, no: ObsoleteGoods.length + 1 });
          }
        });
        data.value.model4[0].num = FinishedGoods.length;
        data.value.model4[1].num = ObsoleteGoods.length;
        data.value.model3.periodDataList = Model3.sort(
          (a, b) => new Date(b.operTime) - new Date(a.operTime),
        ).map((item, index) => ({ ...item, no: index + 1 }));

        data.value.model2.periodDataList = Model2.sort(
          (a, b) => new Date(b.operTime) - new Date(a.operTime),
        ).map((item, index) => ({ ...item, no: index + 1 }));

        data.value.model1.periodDataList = Model1.sort(
          (a, b) => new Date(b.operTime) - new Date(a.operTime),
        ).map((item, index) => ({ ...item, no: index + 1 }));
      }

      stoping.value = false;
    }
    catch (error) {
      await stopInterval();
      openNotify('bottomRight', error);
      stoping.value = true;
    }
    finally {
      appStore.setSpinning(false);
    }
  }
}

//  开始任务调度
async function startTask() {
  // imgIndex.value = 0;
  stoping.value = false;
  appStore.setSpinning(true);
  try {
    // await startOrStopPrintTask({ operate: 1 });
    await startOrStopPrintTask({
      operate: 0,
      taskData: { docCount: docCount.value },
    });
    return true;
  }
  catch (error) {
    error;
    openNotify('bottomRight', '执行打印任务失败');
    // await stopInterval();
    appStore.setSpinning(false);
  }
  return false;
}
//

// 手动停止
async function reset() {
  if (modal.value === '确认退出系统？') {
    window.electron.send('quit-app');
  }

  open.value = false;
  // flowData.value = [];
  await stopInterval();
  // flowData.value.unshift({ position: 'stop', stop: true });
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
    openNotify('bottomRight', '初始化接口调用成功', 'success');
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
    .startBtn {
      background-image: url('../../assets/image/bigScreen/btn/start.png');
    }
    .stopBtn {
      background-image: url('../../assets/image/bigScreen/btn/stop.png');
    }
    .setBtn {
      background-image: url('../../assets/image/bigScreen/btn/set.png');
    }
    .maintainBtn {
      background-image: url('../../assets/image/bigScreen/maintain.png');
    }
  }
}
</style>
