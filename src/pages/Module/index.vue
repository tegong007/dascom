<template>
  <div class="bg h-full text-[18px] text-white">
    <TheHeader :is-show-test-btn="true" />
    <TheModal
      :open="open"
      :handle-ok="reset"
      :handle-cancel="handleCancel"
      title="确认停止"
    />
    <div class="content flex justify-between p-[20px]">
      <div
        class="w-[49.5%] flex flex-col border-[4px] border-[#3F89DD] from-[#ffffff44] bg-gradient-to-t"
      >
        <div
          class="title relative z-10 h-[50px] w-full flex items-center justify-between bg-[#fff]/[0.2] pl-[20px] font-bold"
        >
          <span class="text-[20px]"> {{ $t('home.preview') }}</span>
        </div>
        <div
          class="relative h-full w-full flex flex-col items-center justify-evenly"
        >
          <span v-if="titleStatus !== ''" class="text-[50px]">{{
            titleStatus
          }}</span>
          <a-flex justify="center" align="center">
            <span
              v-if="imgIndex === 0"
              class="absolute z-[999] text-[80px] font-bold"
            >
              {{ $t('home.preparePrint') }}</span>
            <vxe-image
              v-if="imgIndex !== 0"
              :src="imgStatus[imgIndex]"
              :width="480"
              :show-preview="false"
            />
          </a-flex>
        </div>
      </div>
      <div class="w-[49.5%] flex flex-col justify-between">
        <div
          class="h-[78%] flex flex-col border-[4px] border-[#3F89DD] from-[#ffffff44] bg-gradient-to-t"
        >
          <div
            class="title relative z-10 h-[50px] w-full flex items-center justify-between bg-[#fff]/[0.2] pl-[20px] font-bold"
          >
            <span class="text-[20px]"> {{ $t('home.printInformation') }}</span>
          </div>
          <div
            class="info-box scrollable-box w-full overflow-auto p-[20px] leading-[25px]"
          >
            <InfoLog ref="infoRef" :flow-data="flowData" />
          </div>
        </div>
        <div class="h-[20%] w-full flex justify-between">
          <div
            class="printBtn relative h-full w-[63%] flex items-center justify-center"
          >
            <span class="relative text-[50px] font-bold">
              {{ $t('home.printCrtificateBtn') }}</span>
            <div
              :class="
                `${canClick ? 'bg-[#fff]/[0]  cursor-pointer hover:bg-[#fff]/[0.3]  active:bg-[#000]/[0.4]' : 'bg-[#000]/[0.4] pointer-events-none'}`
                  + ' absolute w-full h-full rounded-[1em] '
              "
              @click="startInterval"
            />
          </div>
          <div
            class="stopBtn relative h-full w-[35%] flex items-center justify-center"
          >
            <span class="relative text-[50px] font-bold">
              {{ $t('home.stopBtn') }}</span>
            <div
              :class="
                `${!canClick ? 'bg-[#fff]/[0]  cursor-pointer hover:bg-[#fff]/[0.3]  active:bg-[#000]/[0.4]' : 'bg-[#000]/[0.4] pointer-events-none'}`
                  + ' absolute w-full h-full rounded-[1em] '
              "
              @click="setOpen(true)"
            />
          </div>
        </div>
      </div>
    </div>
    <contextHolder />
  </div>
</template>

<script setup lang="ts">
import type { NotificationPlacement } from 'ant-design-vue';
import { notification } from 'ant-design-vue';
import { useAppStore } from '../../store/index';
import InfoLog from './info.vue';
import TheHeader from '@/components/TheHeader.vue';
import TheModal from '@/components/modal/TheModal.vue';
import { getDocStatus, startOrStopPrintTask } from '@/apis/webApi';
import { throttle } from '@/utils/throttle.js';
import readyImg from '@/assets/image/ready.png';
import defaultImg from '@/assets/image/default.png';
import laser1Img from '@/assets/image/laser1.png';
import laser2Img from '@/assets/image/laser2.png';
import lnkjetImg from '@/assets/image/lnkjet.png';

const [api, contextHolder] = notification.useNotification();
function openNotify(placement: NotificationPlacement, msg: any) {
  return openNotification(placement, msg);
}
function openNotification(placement: NotificationPlacement, msg: any) {
  api.error({
    message: '错误信息',
    description: ` ${msg}`,
    placement,
  });
}
definePage({
  name: 'Main',
  meta: {
    title: '首页',
  },
});
interface T {
  time?: string;
  ocrData?: string;
  readerData?: string;
  status: string;
  imgData?: string;
  error?: boolean; // 任务失败的标识
  showDivider?: string; // 分界线的标识
  stop?: boolean; // 用户手动停止
}
const appStore = useAppStore();

const imgStatus = [readyImg, defaultImg, laser1Img, laser2Img, lnkjetImg];

// 数据流
const flowData = ref<T[]>([]);
const currentObj = ref<T>(); // 当前对象
const canClick = ref(true); // 是否可以点击打印
const intervalRef = ref<number | null>(null); // 定时器
const imgIndex = ref(0); // 当前图片所处于的位置
const titleStatus = ref('');
const open = ref<boolean>(false);
const infoRef = ref<InstanceType<typeof InfoLog> | null>(null);

const moduleMap = {
  M1: '模组一',
  M2: '模组二',
  M3: '模组三',
  M4: '模组四',
  M5: '模组五',
  M6: '模组六',
};
const stoping = ref(false);
function handleCancel() {
  setOpen(false);
}
function setOpen(value: boolean) {
  open.value = value;
}
// 获取证本状态接口
async function getStatus() {
  if (!stoping.value) {
    try {
      titleStatus.value = '送本中';
      const data = await getDocStatus();
      const formatData: T = {
        status: `${data?.status}`,
        ocrData: data?.ocrData,
        imgData: data?.imgData,
        readerData: data?.readerData,
      };

      if (JSON.stringify(currentObj.value) !== JSON.stringify(formatData)) {
        currentObj.value = JSON.parse(JSON.stringify(formatData)); // 深拷贝，只拷贝当前的
        LeftTitle(formatData.status); // 标题
        changeImg(formatData.status); // 图片
        // 分割线
        if (
          flowData.value.length
          && flowData.value[0]?.status.match(/M\d+/)[0]
          !== formatData.status.match(/M\d+/)[0]
        ) {
          formatData.showDivider
            = moduleMap[flowData.value[0]?.status.match(/M\d+/)[0]];
        }

        // 数据流
        const newData: T = {
          time: formatDateTime(),
          status: formatData.status,
          ocrData: formatData.ocrData,
          imgData: formatData.imgData,
          readerData: formatData.readerData,
          showDivider: formatData.showDivider,
        };
        flowData.value.unshift(newData);

        // 流程正常结束
        if (
          formatData.status === 'M6-Product'
          || formatData.status === 'M6-Obsolete'
        ) {
          await stopInterval();
        }
      }

      stoping.value = false;
    }
    catch (error) {
      await stopInterval();
      openNotify('bottomRight', error);
      flowData.value.unshift({ status: 'error', error: true });
      stoping.value = true;
    }
    finally {
      appStore.setSpinning(false);
    }
  }
}
// 左边标题
function LeftTitle(status: string) {
  if (status.includes('Camera')) {
    titleStatus.value = `${
      moduleMap[status.match(/M\d+/)[0]] || '未知模组'
    }，OCR识别中`;
  }
  else if (status.includes('Reader')) {
    titleStatus.value = `${
      moduleMap[status.match(/M\d+/)[0]] || '未知模组'
    }，读写中`;
  }
  else if (status.includes('Laser')) {
    titleStatus.value = `${
      moduleMap[status.match(/M\d+/)[0]] || '未知模组'
    }，激光雕刻中`;
  }
  else if (status.includes('UV')) {
    titleStatus.value = `${
      moduleMap[status.match(/M\d+/)[0]] || '未知模组'
    }，喷墨打印中`;
  }
  else if (status.includes('Turn')) {
    titleStatus.value = `${
      moduleMap[status.match(/M\d+/)[0]] || '未知模组'
    }，翻页中`;
  }
  else if (status.includes('Product')) {
    titleStatus.value = `${
      moduleMap[status.match(/M\d+/)[0]] || '未知模组'
    }，已完成证本打印`;
  }
  else if (status.includes('Obsolete')) {
    titleStatus.value = `${
      moduleMap[status.match(/M\d+/)[0]] || '未知模组'
    }失败，请重试`;
  }
}

// 图片切换
function changeImg(status: string) {
  if (status.includes('M1-Warehouse')) {
    imgIndex.value = 1;
  }
  else if (status.includes('M2-Camera')) {
    imgIndex.value = 2;
  }
  else if (status.includes('M3-UV')) {
    imgIndex.value = 3;
  }
  else if (status.includes('M3-Camera')) {
    imgIndex.value = 4;
  }
}

//  开始任务后开始定时器
async function startInterval() {
  flowData.value = [];
  const startTaskStatus = await startTask();
  if (startTaskStatus) {
    canClick.value = false;
    // 开启定时器，每隔1.5秒访问一次
    intervalRef.value = setInterval(
      throttle(getStatus, 1500),
      1500,
    ) as unknown as number;
  }
}
//  开始任务调度
async function startTask() {
  imgIndex.value = 0;
  stoping.value = false;
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
      canClick.value = true;
      intervalRef.value = null;
      titleStatus.value = '';
      currentObj.value = {};
      appStore.setSpinning(false);
    }
  }
}
// 手动停止
async function reset() {
  open.value = false;
  // flowData.value = [];
  await stopInterval();
  flowData.value.unshift({ status: 'stop', stop: true });
  imgIndex.value = 0;
}

function formatDateTime() {
  const now = new Date();
  const year = now.getFullYear(); // 获取年份
  const month = now.getMonth() + 1; // 获取月份，月份从0开始，所以需要+1
  const day = now.getDate(); // 获取日
  const hours = now.getHours(); // 获取小时
  const minutes = now.getMinutes(); // 获取分钟
  const seconds = now.getSeconds(); // 获取分钟

  // 使用padStart方法确保月份和日期始终是两位数
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  // 拼接成指定格式
  const formattedDateTime = `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  return formattedDateTime;
}

// const formatted = useDateFormat(useNow(), "HH:mm");
</script>

<style scoped lang="less">
.bg {
  background-image: url('../assets/image/bg_dark.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
}

.content {
  height: calc(100vh - 66px);
}
.printBtn {
  background-image: url('../assets/image/printBtn.png');
  background-size: 100% 100%;
  background-repeat: no-repeat; /* 不重复 */
}
.stopBtn {
  background-image: url('../assets/image/stopBtn.png');
  background-size: 100% 100%;
  background-repeat: no-repeat; /* 不重复 */
}
.info-box {
  height: calc(100% - 50px);
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
</style>
