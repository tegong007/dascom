<template>
  <div class="bg h-100vh flex flex-col items-center text-[18px] text-white">
    <bigScreenHeader />
    <div
      class="absolute top-50 box-border h-800px w90% flex flex-col items-center gap-10 p-2em p-b-0"
    >
      <teamForm :add-team="addTeam" />
      <noTeamForm
        :add-team="addNoTeam"
        :update-no-team-num="updateNoTeamNum"
        :addor-edit-no-team="addorEditNoTeam"
      />
      <main class="box-border h-580px w-full">
        <MyTable
          ref="tableRef"
          :seq="true"
          page-name="AddBatch"
          :show-row="showRow"
          :colums="colums"
          :set-addor-edit-no-team="setAddorEditNoTeam"
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
      :handle-ok="() => setSuccessOpen(false)"
      :handle-cancel="() => setSuccessOpen(false)"
      :title="successTitle"
    />
    <TipModal
      :open="tipOpen"
      :handle-ok="() => setTipOpen(false)"
      :handle-cancel="() => setTipOpen(false)"
      title="是否确认添加批次？"
      :height="130"
      :handle-update="handleUpdate"
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
        <TheButton title="返回" @click="$goto('-1')" />
        <!-- <TheButton title="添加批次" @click="AddBatch()" /> -->
        <TheButton title="添加批次" @click="setTipOpen(true)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  dataSourceOptions,
  dispatchUnitOptions,
  findLabelByValue,
  urgencyOptions,
} from '../option';
import teamForm from './team-form.vue';
import noTeamForm from './notearm-form.vue';
import UpdateModal from './modal/updateModal.vue';
import SuceessModal from './modal/successModal.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import TheButton from '@/components/base/TheButton.vue';
import MyTable from '@/components/base/vxeTable.vue';
import TipModal from '@/components/modal/TheModal.vue';

const modal = ref('编辑团组');
const successTitle = ref('批次添加成功，是否查看详情?');
const open = ref<boolean>(false);
const tipOpen = ref<boolean>(false);
const successOpen = ref<boolean>(false);
const tableRef = ref(null);
const updateRef = ref(null);
const showSuccessData = ref({});
const isAddNoTeam = ref<boolean>(false);
const addorEditNoTeam = ref('add'); // 添加还是编辑
function setAddorEditNoTeam(value: string) {
  addorEditNoTeam.value = value;
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
const colums = ref([
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
function formatterValue({ cellValue, column }: any) {
  switch (column.field) {
    case 'dispatchUnit':
      return findLabelByValue('dispatchUnitOptions', cellValue);
    case 'dataSource':
      return findLabelByValue('dataSourceOptions', cellValue);
    case 'urgentType':
      return findLabelByValue('urgencyOptions', Number(cellValue));
    default:
      break;
  }
}

function addNoTeam(record: object) {
  if (tableRef.value) {
    tableRef.value.addEvent(record);
    isAddNoTeam.value = true;
    addorEditNoTeam.value = 'edit';
  }
}
function updateNoTeamNum(num: number) {
  if (tableRef.value) {
    tableRef.value.updateFirstRow(num);
  }
}
function addTeam(record: object) {
  if (tableRef.value) {
    tableRef.value.pushEvent(record);
  }
}
// 收到通知打开弹窗
async function showRow(record: object) {
  setOpen(true);
  if (updateRef.value) {
    // 弹窗要修改的值
    await updateRef.value.updateForm(record);
  }
}
// 修改成功关闭弹窗
function handleUpdate(record: object) {
  setOpen(false);
  if (tableRef.value) {
    tableRef.value.updateRow(record);
  }
}
// async function AddBatch() {
//   if (tableRef.value) {
//     const insertData = tableRef.value.exportEvent();
//     if (!insertData.length) {
//       return;
//     }
//     if (!isAddNoTeam.value) {
//       // 如果没有添加过，补一条数据
//       insertData.unshift({ num: 0 });
//     }
//     try {
//       const { respData } = await addBatch({ groups: insertData });
//       if (respData) {
//         showSuccessData.value = { ...respData };
//         setSuccessOpen(true);
//         tableRef.value.removeRow();
//         isAddNoTeam.value = false;
//         addorEditNoTeam.value = 'add';
//       }
//     } catch (error) {
//       error;
//     }
//   }
// }
</script>

<style scoped lang="less">
.bg {
  background-image: url('@/assets/image/bigScreen/bg-none.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
}
</style>
