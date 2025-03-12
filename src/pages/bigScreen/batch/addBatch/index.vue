<template>
  <div class="bg h-100vh flex flex-col items-center text-[18px] text-white">
    <bigScreenHeader />
    <div
      class="absolute top-50 box-border h78% w90% flex flex-col items-center gap-10 p-2em p-b-0"
    >
      <div class="w-full flex items-center">
        <a-button
          type="primary"
          class="btn flex items-center hover:text-[#89f7ff]!"
          @click="showRow(teamData, 'add')"
        >
          <PlusCircleFilled />
          添加团组
        </a-button>（只允许添加一个无团组）
      </div>
      <main class="box-border h-100% w-full">
        <MyTable
          ref="tableRef"
          :seq="true"
          page-name="AddBatch"
          :show-row="showRow"
          :colums="colums"
          :set-is-add-no-team="setIsAddNoTeam"
        />
      </main>
    </div>
    <UpdateModal
      ref="updateRef"
      :open="open"
      :handle-ok="() => setOpen(false)"
      :handle-cancel="() => setOpen(false)"
      :title="modal"
      :handle-update="handleUpdate"
    />
    <SuceessModal
      :open="successOpen"
      :success-icon="true"
      :data="showSuccessData"
      :handle-ok="() => topProduction()"
      :handle-cancel="() => setSuccessOpen(false)"
      :title="successTitle"
    />
    <TipModal
      :open="tipOpen"
      :handle-ok="
        () => {
          isgoback ? gotolast() : AddBatch();
        }
      "
      :handle-cancel="() => setTipOpen(false)"
      :title="
        isgoback ? '返回将失去填写的内容，确认返回？' : '是否确认添加批次？'
      "
      height="130"
    />

    <!-- 下边按钮 -->
    <div
      class="groupBtn absolute bottom-0 h8em w-full flex items-center justify-center gap-20"
    >
      <!-- <div class="flex">
        <TheButton title="批次查询" />
      </div> -->
      <!-- <span class="h-50% w-2px bg-[#8BB2FF]" /> -->
      <div class="flex gap-20">
        <!-- <TheButton title="返回首页" @click="$goto('BigScreen')" /> -->
        <TheButton title="返回" @click="handleTipModal(true)" />
        <!-- <TheButton title="添加批次" @click="AddBatch()" /> -->
        <TheButton title="添加批次" @click="handleTipModal(false)" />
      </div>
    </div>
    <contextHolder />
  </div>
</template>

<script lang="ts" setup>
import { PlusCircleFilled } from '@ant-design/icons-vue';
import {
  dataSourceOptions,
  dispatchUnitOptions,
  findLabelByValue,
  teamOptions,
  urgencyOptions,
} from '../option';
import SuceessModal from './modal/successModal.vue';
import UpdateModal from './modal/updateModal.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import TheButton from '@/components/base/TheButton.vue';
import MyTable from '@/components/base/vxeTable.vue';
import TipModal from '@/components/modal/TheModal.vue';
import router from '@/router/index.ts';
import { useAppStore } from '@/store/index';
import { addBatch } from '@/apis/testApi';
import { setBatchRank } from '@/apis/webApi';
import { contextHolder, openNotify } from '@/components/base/useNotification';

const modal = ref('新增团组');
const successTitle = ref('批次添加成功，是否立即生产?');
const open = ref<boolean>(false);
const tipOpen = ref<boolean>(false);
const successOpen = ref<boolean>(false);
const tableRef = ref(null);
const updateRef = ref(null);
const showSuccessData = ref({});
const isAddNoTeam = ref<boolean>(false);
const isgoback = ref(false);
const teamData = {
  isTeam: 1,
  dispatchUnit: 1,
  dataSource: 1,
  urgentType: 0,
  num: 1,
};
const colums = ref([
  {
    title: '是否团组',
    field: 'isTeam',
    options: teamOptions,
    formatter: formatterValue,
  },
  {
    title: '派遣单位',
    field: 'dispatchUnit',
    options: dispatchUnitOptions,
    formatter: formatterValue,
  },
  {
    title: '数据来源',
    field: 'dataSource',
    options: dataSourceOptions,
    formatter: formatterValue,
  },
  {
    title: '加急类型',
    field: 'urgentType',
    options: urgencyOptions,
    formatter: formatterValue,
  },
  {
    title: '组团人数',
    field: 'num',
    // isTip: true,
  },
]);
function setIsAddNoTeam(value: string) {
  isAddNoTeam.value = value;
}

function setOpen(value: boolean) {
  open.value = value;
}
function setTipOpen(value: boolean) {
  tipOpen.value = value;
}
function setSuccessOpen(value: boolean) {
  successOpen.value = value;
}
function handleTipModal(type: boolean) {
  if (tableRef.value.exportEvent().length === 0) {
    type && gotolast();
  }
  else {
    isgoback.value = type;
    setTipOpen(true);
  }
}
function gotolast() {
  setTipOpen(false);
  tableRef.value.removeRow();
  router.go(-1);
  isAddNoTeam.value = false;
}

function formatterValue({ cellValue, column }: any) {
  if (cellValue === '-------') {
    return cellValue;
  }
  switch (column.field) {
    case 'dispatchUnit':
      return findLabelByValue('dispatchUnitOptions', cellValue);
    case 'isTeam':
      return findLabelByValue('teamOptions', cellValue);
    case 'dataSource':
      return findLabelByValue('dataSourceOptions', cellValue);
    case 'urgentType':
      return findLabelByValue('urgencyOptions', Number(cellValue));
    default:
      break;
  }
}

// 收到通知打开弹窗
async function showRow(record: object, type: string) {
  const insertData = tableRef.value.exportEvent();
  if (insertData.length >= 200) {
    openNotify('bottomRight', `单次添加最多200条数据`);
    return;
  }
  setOpen(true);
  if (type === 'add') {
    modal.value = '新增团组';
  }
  else {
    modal.value = '编辑团组';
  }
  if (updateRef.value) {
    // 弹窗要修改的值
    await updateRef.value.updateForm(record);
  }
}
// 修改成功关闭弹窗
function handleUpdate(record: object, type: string) {
  setOpen(false);
  if (tableRef.value) {
    if (type === 'add') {
      if (record.dataSource === '-------') {
        if (isAddNoTeam.value) {
          tableRef.value.updateFirstRow(record.num);
        }
        else {
          tableRef.value.addEvent(record);
          isAddNoTeam.value = true;
        }
      }
      else {
        tableRef.value.pushEvent(record);
      }
    }
    else {
      tableRef.value.updateRow(record);
    }
  }
}
async function AddBatch() {
  setTipOpen(false);
  if (tableRef.value) {
    const insertData = tableRef.value.exportEvent();
    if (!insertData.length) {
      return;
    }
    if (!isAddNoTeam.value) {
      // 如果没有添加过，补一条数据
      insertData.unshift({ isTeam: 0, num: 0 });
    }
    // 改isTeam=0
    const result = insertData.map((item) => {
      if (item.isTeam === 0) {
        return { isTeam: item.isTeam, num: item.num };
      }
      return item; // 如果 isTeam 不为 0，保留原数据
    });

    try {
      useAppStore().setSpinning(true);
      const { respData } = await addBatch({ groups: result });
      if (respData) {
        showSuccessData.value = { ...respData };
        setSuccessOpen(true);
        tableRef.value.removeRow();
        isAddNoTeam.value = false;
      }
    }
    catch (error) {
      openNotify('bottomRight', `接口返回异常`);
      error;
    }
    finally {
      useAppStore().setSpinning(false);
    }
  }
}
async function topProduction() {
  setSuccessOpen(false);
  try {
    useAppStore().setSpinning(true);
    const params = {
      batchID: showSuccessData.value.batchID,
      rank: 0,
    };
    console.log('🚀 ~ topProduction ~ params:', params);
    await setBatchRank(params);
    setSuccessOpen(false);
    router.push({ name: 'BigScreen' });
    openNotify('bottomRight', `立即生产成功`, true);
  }
  catch (error) {
    openNotify('bottomRight', error);
  }
  finally {
    useAppStore().setSpinning(false);
  }
}
</script>

<style scoped lang="less">
.btn {
  border-radius: 6px;
  opacity: 1;
  background: linear-gradient(209deg, #90ecff 2%, #006af5 69%);
  box-sizing: border-box;
  border: 2px solid #89f7ff;
  padding: 0px 7px;
  color: white;
  height: 32px;
}
.bg {
  background-image: url('@/assets/image/bigScreen/bg-none.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
}
</style>
