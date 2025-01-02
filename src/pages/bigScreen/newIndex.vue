<template>
  <div class="bg h-100vh flex flex-col items-center text-[18px] text-white">
    <bigScreenHeader />
    <div
      class="absolute top-3.1em h1.6em flex items-center justify-center rounded-2xl bg-[#919195b0] p-x-15"
    >
      <span class="text-[1.1em]">当前批次号：20241010，证本数：1000，待生产数：100，成功数：888，失败数：12，挂起数：0</span>
    </div>

    <div
      class="absolute bottom-[12%] left-[-0.5] h-35% w-80% flex items-center justify-center opacity-0 hover:opacity-100"
    >
      <div
        class="m-t-10vh h-[124px] w-[271px] flex items-center justify-center rounded-[30px] bg-[#0000007a]"
        @click="$goto('WorkstationStatus')"
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
      <TheButton title="暂停进本" @click="setOpen(true)" />
      <TheButton title="全线急停" class="mt2em" />
      <!-- <TheButton
        title="新增批次"
        class="mt2em"
        @click="setAddBatchOpen(true)"
      /> -->
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
          @click="$goto('MainTain', { currentModel: 'haocai' })"
        />
        <!-- <div
            class="startBtn h-6em w-10em transition-transform duration-300 hover:scale-115"
            @click="setDocOpen(true)"
          />
         -->
      </div>
    </div>
    <contextHolder />
  </div>

  <!-- <TheModal
     :open="open"
    :handle-ok="reset"
    :warn-icon="true"
    :handle-cancel="handleCancel"
    :title="modal"
  />
  <docCountModal
    :open="docOpen"
    :handle-ok="startInterval"
    :handle-cancel="handleCancel"
    :title="docCount"
  /> -->
</template>

<script setup lang="ts">
// import type { NotificationPlacement } from 'ant-design-vue';
// import { notification } from 'ant-design-vue';
// import { useAppStore } from '../../store/index';
import FinishedProductBg from './module/finishedProduct.vue';
import AddMore from './module/addMore.vue';
import Print from './module/printPage.vue';
import Start from './module/startPage.vue';
import TheButton from '@/components/base/TheButton.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import useCustomTimer from '@/utils/useCustomTimer';
import { getHomeList } from '@/apis/proApi';

const { start, stop } = useCustomTimer();
// import TheModal from '@/components/modal/TheModal.vue';
// import docCountModal from '@/components/modal/docCountModal.vue';
// 加載中
// const appStore = useAppStore();
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
//         message: '成功',
//         description: ` ${msg}`,
//         placement,
//       })
//     : api.error({
//         message: '错误信息',
//         description: ` ${msg}`,
//         placement,
//       });
// }
const modal = ref('');
const open = ref<boolean>(false);
function setOpen(value: boolean) {
  open.value = value;
  modal.value = '确认停止？';
}
const blankCheck = ref({});
const mainPrint = ref({});
const additionPrint = ref({});
const finishedProduct = ref({});
onActivated(() => {
  getDataPage();
});
onDeactivated(() => {
  stop();
});
async function getDataPage() {
  try {
    const data = await getHomeList();
    if (data.respData) {
      blankCheck.value = data.respData.blankCheck;
      mainPrint.value = data.respData.mainPrint;
      additionPrint.value = data.respData.additionPrint;
      finishedProduct.value = data.respData.finishedProduct;
    }
    startGetDataPage();
  }
  catch (error) {
    console.log('🚀 ~ file: newIndex.vue:182 ~ getDataPage ~ error:', error);
    stop();
  }
}

async function startGetDataPage() {
  start(async () => {
    await getDataPage();
  }, 1);
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
