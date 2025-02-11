<template>
  <div class="bg h-100vh flex flex-col items-center text-[18px] text-white">
    <bigScreenHeader />
    <div
      class="absolute top-3.1em h1.6em flex items-center justify-center rounded-2xl bg-[#919195b0] p-x-15"
    >
      <span class="text-[1.1em]">当前批次号：{{ statisticsData.batchID }}，证本数：{{
        statisticsData.docNum
      }}，待生产数：{{ statisticsData.waitingNum }}，良本数：{{
        statisticsData.productNum
      }}，废本数：{{ statisticsData.obsoleteNum }}，挂起数：{{
        statisticsData.hangUpNum
      }}</span>
    </div>

    <div
      class="absolute bottom-[12%] left-[-0.5] h-35% w-80% flex items-center justify-center opacity-0 hover:opacity-100"
    >
      <div
        class="m-t-10vh h-[124px] w-[271px] flex items-center justify-center rounded-[30px] bg-[#0000007a]"
        @click="$goto('WorkstationStatus', { batchID: statisticsData.batchID })"
      >
        <span
          class="cursor-default border-1 border-[#fff] rounded-[30px] bg-[#00000049] p-10 text-[36px] font-[youshe]"
        >点击查看详情
        </span>
      </div>
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
      <div class="flex">
        <TheButton title="批次查询" @click="$goto('BatchList')" />
      </div>
      <span class="h-50% w-2px bg-[#8BB2FF]" />
      <div class="flex gap-20">
        <TheButton
          title="设备设置"
          @click="$goto('SetPage', { currentModel: 'sort' })"
        />
        <TheButton
          title="设备维护"
          @click="$goto('MainTain', { currentModel: '5' })"
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
const statisticsData = ref({
  batchID: '',
  docNum: 0,
  hangUpNum: 0,
  obsoleteNum: 0,
  productNum: 0,
  waitingNum: 0,
});
onActivated(() => {
  getDataPage();
});
onDeactivated(() => {
  stop();
});
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
    startGetDataPage();
  }
  catch (error) {
    error;
    stop();
  }
}

async function startGetDataPage() {
  start(async () => {
    await getDataPage();
  }, 2);
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
    openNotify('bottomRight', `${tips}操作失败`);
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
@/components/base/useNotification
