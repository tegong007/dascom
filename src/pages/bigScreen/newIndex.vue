<template>
  <div class="bg h-100vh flex flex-col items-center text-[18px] text-white">
    <bigScreenHeader />
    <div
      class="absolute top-3.1em h1.6em flex items-center justify-center rounded-2xl bg-[#919195b0] p-x-15"
    >
      <span class="text-[1.1em]">当前批次号：{{ statisticsData.batchID }}，证本总数：{{
        statisticsData.docNum
      }}，批次状态：{{ formatterStatus(statisticsData.status) }}，待生产数：{{
        statisticsData.waitingNum
      }}，良本数：{{ statisticsData.productNum }}，废本数：{{
        statisticsData.obsoleteNum
      }}，挂起数：{{ statisticsData.hangUpNum }}</span>
    </div>

    <div
      class="absolute bottom-[12%] left-180px h-35% w-10% flex items-center justify-center opacity-0 hover:opacity-100"
      @click="
        $goto('WorkstationStatus', {
          batchID: statisticsData.batchID,
          light: 4,
        })
      "
    >
      <span
        class="absolute bottom-50 left-20 cursor-default rounded-[30px] bg-[#0000007a] p-x-20 p-y-10 text-[32px] font-[youshe]"
      >查看详情
      </span>
    </div>
    <div
      class="absolute bottom-[12%] left-360px h-35% w-23% flex items-center justify-center opacity-0 hover:opacity-100"
      @click="
        $goto('WorkstationStatus', {
          batchID: statisticsData.batchID,
          light: 3,
        })
      "
    >
      <span
        class="absolute left-150 top-200px cursor-default rounded-[30px] bg-[#0000007a] p-x-20 p-y-10 text-[32px] font-[youshe]"
      >查看详情
      </span>
    </div>
    <div
      class="absolute bottom-[12%] left-800px h-35% w-30.5% flex items-center justify-center opacity-0 hover:opacity-100"
      @click="
        $goto('WorkstationStatus', {
          batchID: statisticsData.batchID,
          light: 2,
        })
      "
    >
      <span
        class="absolute left-220 top-200px cursor-default rounded-[30px] bg-[#0000007a] p-x-20 p-y-10 text-[32px] font-[youshe]"
      >查看详情
      </span>
    </div>
    <div
      class="absolute bottom-[12%] left-1380px h-35% w-18% flex items-center justify-center opacity-0 hover:opacity-100"
      @click="
        $goto('WorkstationStatus', {
          batchID: statisticsData.batchID,
          light: 1,
        })
      "
    >
      <span
        class="absolute left-80 top-200px cursor-default rounded-[30px] bg-[#0000007a] p-x-20 p-y-10 text-[32px] font-[youshe]"
      >查看详情
      </span>
    </div>

    <a-row
      class="relative top-[4.3vh] h-33.7% w-full p-l-3em p-r-1.5em"
      :gutter="[8, 0]"
    >
      <a-col flex="1">
        <FinishedProductBg class="wh-full" :data="finishedProduct" />
      </a-col>
      <a-col flex="5">
        <a-row justify="space-between" class="wh-full pl-16" :gutter="[16, 0]">
          <a-col
            v-for="(item, index) in [2, 1, 0]"
            :key="index"
            :span="8"
            class="group"
          >
            <!-- <span
              class="absolute right-20 top-10 z-88 cursor-default border-1 border-[#fff] rounded-[30px] bg-[#00000049] p-6 text-[18px] font-[youshe] opacity-0 group-hover:opacity-100"
              @click="$goto('SetPage', { currentModel: item })"
              >查看证本</span
            > -->
            <Start v-if="item === 0" class="wh-full" :data="blankCheck" />
            <Print v-if="item === 1" class="wh-full" :data="mainPrint" />
            <AddMore v-if="item === 2" class="wh-full" :data="additionPrint" />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <!-- 左边按钮 -->
    <div
      class="groupBtn absolute right-35 top-150 h-100vh flex flex-col items-center justify-center"
    >
      <TheButton
        :title="machineStatus === 0 ? '暂停进本' : '开始进本'"
        :disable="
          machineStatus === 3 || machineStatus === 4 || machineStatus === 5
            ? true
            : false
        "
        @click="
          machineStatus === 3 || machineStatus === 4 || machineStatus === 5
            ? null
            : setModal(machineStatus === 0 ? 1 : 0)
        "
      />
      <TheButton title="全线急停" class="mt2em" @click="setModal(2)" />
    </div>
    <!-- 下边按钮 -->
    <div
      class="groupBtn absolute bottom-0 h8em w-full flex items-center justify-center gap-20"
    >
      <!-- <div class="flex">
        <TheButton title="批次查询" @click="$goto('BatchList')" />
      </div>
     <div class="flex">
        <TheButton title="批次查询" @click="$goto('BatchList')" />
      </div>
      <div class="flex">
        <TheButton title="证本查询" @click="$goto('docList')" />
      </div> -->
      <div class="flex">
        <TheButton title="查询" @click="$goto('Search', { choose: 1 })" />
      </div>
      <span class="h-50% w-2px bg-[#8BB2FF]" />
      <div class="flex gap-20">
        <TheButton
          title="设备设置"
          @click="$goto('SetPage', { currentModel: 'sort', isProduce })"
        />
        <TheButton
          title="设备维护"
          @click="$goto('MainTain', { currentModel: '5', isProduce })"
        />
      </div>
    </div>
    <TheModal
      :open="open"
      :handle-ok="() => controlMachine()"
      :warn-icon="true"
      :handle-cancel="() => setOpen(false)"
      :title="modal"
    />
    <contextHolder />
  </div>
</template>

<script setup lang="ts">
import FinishedProductBg from './module/finishedProduct.vue';
import AddMore from './module/addMore.vue';
import Print from './module/printPage.vue';
import Start from './module/startPage.vue';
import TheButton from '@/components/base/TheButton.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import useCustomTimer from '@/utils/useCustomTimer';
import { contextHolder, openNotify } from '@/components/base/useNotification';
import { batchModule, homeModule } from '@/apis/proApi';
import { useAppStore } from '@/store/index';
import { BatchStatusOptions } from '@/pages/bigScreen/batch/option.ts';

const { start, stop } = useCustomTimer();

const modal = ref('');
const open = ref<boolean>(false);
function setOpen(value: boolean) {
  open.value = value;
}
const blankCheck = ref({});
const mainPrint = ref({});
const control = ref(null);
const additionPrint = ref({});
const machineStatus = ref(null);
const finishedProduct = ref({});
const isProduce = ref(false);
const statisticsData = ref({
  batchID: '',
  docNum: 0,
  hangUpNum: 0,
  obsoleteNum: 0,
  productNum: 0,
  waitingNum: 0,
});
onActivated(async () => {
  useAppStore().setSpinning(true);
  const end = await getDataPage();
  !end && openNotify('bottomRight', `接口超时`);
  useAppStore().setSpinning(false);
  await startGetDataPage();
});
onDeactivated(() => {
  stop();
});
function formatterStatus(cellValue: any) {
  const item = BatchStatusOptions.find(item => item.value === cellValue);
  return item ? item.label : cellValue;
}
async function getDataPage() {
  try {
    const data = await homeModule.getHomeList();
    const statistics = await batchModule.getBatchStatistics({
      batchID: 'current',
    });
    if (data.respData) {
      blankCheck.value = data.respData.blankCheck;
      mainPrint.value = data.respData.mainPrint;
      additionPrint.value = data.respData.additionPrint;
      finishedProduct.value = data.respData.finishedProduct;
    }
    if (statistics.respData) {
      statisticsData.value = { ...statistics.respData };
      machineStatus.value = statistics.respData.status;
    }
    if (data.respData && statistics.respData) {
      isProduce.value
        = statistics.respData.status !== 0
          && mainPrint.value.status !== 1
          && blankCheck.value.status !== 1
          && additionPrint.value.status !== 1
          && finishedProduct.value.status !== 1;
    }
    return true;

    // startGetDataPage();
  }
  catch (error) {
    error;
    return false;
    // stop();
  }
}

async function startGetDataPage() {
  start(async () => {
    await getDataPage();
  }, 5);
}
function setModal(value: number) {
  control.value = value;
  switch (value) {
    case 0:
      modal.value = '确认开始进本？';
      break;
    case 1:
      modal.value = '确认暂停进本？';
      break;
    case 2:
      modal.value = '确认全线急停？';
      break;
    default:
      break;
  }
  setOpen(true);
}
async function controlMachine() {
  let tips = '';
  switch (control.value) {
    case 0:
      tips = '开始进本';
      break;
    case 1:
      tips = '暂停进本';
      break;
    case 2:
      tips = '全线急停';
      break;
    default:
      break;
  }
  try {
    useAppStore().setSpinning(true);
    await homeModule.setControlMachine({ control: control.value });
    openNotify('bottomRight', `${tips}操作成功`, true);
  }
  catch (error) {
    error;
    openNotify('bottomRight', error);
  }
  finally {
    setOpen(false);
    useAppStore().setSpinning(false);
  }
}

// 初始化
// async function init() {
//   try {
//     appStore.setSpinning(true);
//     await initMachine({ module: 'm0' });
//     openNotify('bottomRight', '初始化接口调用成功', 'success');
//   } catch (error) {
//     error;
//     openNotify('bottomRight', '初始化接口调用失败');
//   } finally {
//     appStore.setSpinning(false);
//   }
// }
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
  }
}
</style>
