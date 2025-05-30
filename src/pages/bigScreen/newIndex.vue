<template>
  <div
    class="bg relative h-100vh flex flex-col items-center text-[18px] text-white"
  >
    <bigScreenHeader />
    <div class="absolute top-8.7vh h20vh w100% flex gap-20 p-x-40">
      <Print class="relative h20vh flex-1" :data="mainPrint" />
      <Start class="relative h20vh flex-1" :data="blankCheck" />
    </div>
    <div class="absolute bottom-22vh h20vh w100% flex gap-20 p-x-40">
      <FinishedProductBg
        class="relative h20vh flex-1"
        :data="finishedProduct"
      />
      <AddMore class="relative h20vh flex-1" :data="additionPrint" />
    </div>

    <div
      class="absolute left-6vh top-45vh h-3vh w-6vh flex items-center justify-center opacity-0 hover:opacity-100"
      @click="
        $goto('WorkstationStatus', {
          light: 4,
        })
      "
    >
      <span
        class="absolute cursor-default rounded-[1vh] bg-[#0000007a] p-x-10 p-y-3 text-1vh line-height-[40px] line-height-[40px] font-[youshe]"
      >查看详情
      </span>
    </div>
    <div
      class="absolute left-13vh top-45vh h-3vh w-15vh flex items-center justify-center opacity-0 hover:opacity-100"
      @click="
        $goto('WorkstationStatus', {
          light: 3,
        })
      "
    >
      <span
        class="absolute cursor-default rounded-[1vh] bg-[#0000007a] p-x-10 p-y-3 text-1vh line-height-[40px] font-[youshe]"
      >查看详情
      </span>
    </div>
    <div
      class="absolute left-28vh top-45vh h-3vh w-15vh flex items-center justify-center opacity-0 hover:opacity-100"
      @click="
        $goto('WorkstationStatus', {
          light: 2,
        })
      "
    >
      <span
        class="absolute cursor-default rounded-[1vh] bg-[#0000007a] p-x-10 p-y-3 text-1vh line-height-[40px] font-[youshe]"
      >查看详情
      </span>
    </div>
    <div
      class="absolute right-9vh top-45vh h-3vh w-6vh flex items-center justify-center opacity-0 hover:opacity-100"
      @click="
        $goto('WorkstationStatus', {
          light: 1,
        })
      "
    >
      <span
        class="absolute cursor-default rounded-[1vh] bg-[#0000007a] p-x-10 p-y-3 text-1vh line-height-[40px] font-[youshe]"
      >查看详情
      </span>
    </div>

    <!-- <a-row
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
            <Start v-if="item === 0" class="wh-full" :data="blankCheck" />
            <Print v-if="item === 1" class="wh-full" :data="mainPrint" />
            <AddMore v-if="item === 2" class="wh-full" :data="additionPrint" />
          </a-col>
        </a-row>
      </a-col>
    </a-row> -->

    <!-- 左边按钮 -->
    <div
      class="groupBtn absolute bottom-10vh z-22 h8em flex items-center justify-center gap-20"
    >
      <TheButton
        :title="entire.hasTask ? '暂停进本' : '开始进本'"
        @click="setModal(entire.hasTas ? 1 : 0)"
      />
      <TheButton
        title="全线急停"
        :disable="entire.status !== 'error'"
        @click="setModal(2)"
      />
    </div> -->
    <div
      class="groupBtn absolute right-30 top-300 h-100vh flex flex-col items-center justify-center"
    >
      <TheButton
        :title="entire.hasTask ? '暂停进本' : '开始进本'"
        @click="setModal(entire.hasTas ? 1 : 0)"
      />
      <TheButton
        title="全线急停"
        class="mt2em"
        :disable="entire.status !== 'error'"
        @click="setModal(2)"
      />
    </div>
    <!-- 下边按钮 -->
    <div
      class="groupBtn absolute bottom-4vh h8em w-full flex items-center justify-center gap-20"
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
        <TheButton title="查询" @click="$goto('SearchCard', { choose: 1 })" />
      </div>
      <!-- <span class="h-50% w-2px bg-[#8BB2FF]" /> -->
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
      :handle-ok="controlMachine"
      :warn-icon="true"
      :handle-cancel="() => setOpen(false)"
      :title="modal"
    />
  </div>
</template>

<script setup lang="ts">
import { homeModule } from '@/apis/proApi';
import TheButton from '@/components/base/TheButton.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import TheModal from '@/components/modal/TheModal.vue';
import { useAppStore } from '@/store/index';
import useCustomTimer from '@/utils/useCustomTimer';
import { App } from 'ant-design-vue';
import AddMore from './module/addMore.vue';
import FinishedProductBg from './module/finishedProduct.vue';
import Print from './module/printPage.vue';
import Start from './module/startPage.vue';

const { notification } = App.useApp();

const { start, stop } = useCustomTimer();

const modal = ref('');
const open = ref<boolean>(false);
function setOpen(value: boolean) {
  open.value = value;
}
const entire = ref({});
const blankCheck = ref({});
const mainPrint = ref({});
const control = ref(null);
const additionPrint = ref({});
const finishedProduct = ref({});
const isProduce = ref(false);
// const statisticsData = ref({
//   batchID: '',
//   docNum: 0,
//   hangUpNum: 0,
//   obsoleteNum: 0,
//   productNum: 0,
//   waitingNum: 0,
// });
onActivated(async () => {
  useAppStore().setSpinning(true);
  const end = await getDataPage();
  !end
  && notification.error({
    message: `错误`,
    description: '接口超时',
    placement: 'bottomRight',
    class: 'notification-custom-class',
  });
  useAppStore().setSpinning(false);
  await startGetDataPage();
});
onDeactivated(() => {
  stop();
});
// function formatterStatus(cellValue: any) {
//   const item = TaskStatusOptions.find((item) => item.value === cellValue);
//   return item ? item.label : cellValue;
// }
async function getDataPage() {
  try {
    const data = await homeModule.getHomeList();
    // const statistics = await batchModule.getBatchStatistics({
    //   batchID: 'current',
    // });
    if (data.respData) {
      blankCheck.value = data.respData.blankCheck;
      mainPrint.value = data.respData.mainPrint;
      additionPrint.value = data.respData.additionPrint;
      finishedProduct.value = data.respData.finishedProduct;
      entire.value = data.respData.entire;
    }
    // if (statistics.respData) {
    //   statisticsData.value = { ...statistics.respData };
    //   machineStatus.value = statistics.respData.status;
    // }
    if (data.respData) {
      isProduce.value
        // statistics.respData.status !== 0 &&
        = mainPrint.value.status !== 1
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
async function controlMachine(num: string) {
  console.log('🚀 ~ controlMachine ~ num:', num);
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
    await homeModule.setControlMachine({
      control: control.value,
      docNum: Number(num),
    });
    notification.success({
      message: `成功`,
      description: `${tips}操作成功`,
      placement: 'bottomRight',
      class: 'notification-custom-class',
    });
  }
  catch (error) {
    error;
    notification.error({
      message: `错误`,
      description: error,
      placement: 'bottomRight',
      class: 'notification-custom-class',
    });
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
  background-image: url('../../assets/image/bigScreen/new-bg.png');
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
