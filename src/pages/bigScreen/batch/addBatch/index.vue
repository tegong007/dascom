<template>
  <div class="bg h-100vh flex flex-col items-center text-[18px] text-white">
    <bigScreenHeader />
    <div
      class="absolute top-50 box-border h-800px w90% flex flex-col items-center gap-10 p-2em p-b-0"
    >
      <teamForm :add-team="addTeam" />
      <noTeamForm :add-team="addNoTeam" :update-no-team-num="updateNoTeamNum" />
      <main class="box-border h-580px w-full">
        <MyTable
          ref="tableRef"
          :seq="true"
          page-name="AddBatch"
          :show-row="showRow"
          :colums="colums"
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
    <!-- 下边按钮 -->
    <div
      class="groupBtn absolute bottom-0 h8em w-full flex items-center justify-center gap-20"
    >
      <!-- <div class="flex">
        <TheButton title="批次查询" />
      </div> -->
      <!-- <span class="h-50% w-2px bg-[#8BB2FF]" /> -->
      <div class="flex gap-20">
        <TheButton title="返回首页" @click="$goto('BigScreen')" />
        <TheButton title="添加批次" @click="AddBatch()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  dataSourceOptions,
  dispatchUnitOptions,
  urgencyOptions,
} from '../option';
import teamForm from './team-form.vue';
import noTeamForm from './notearm-form.vue';
import UpdateModal from './modal/updateModal.vue';
import SuceessModal from './modal/successModal.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import TheButton from '@/components/base/TheButton.vue';
import MyTable from '@/components/base/vxeTable.vue';
import { addBatch } from '@/apis/testApi';

const modal = ref('编辑团组');
const successTitle = ref('批次添加成功，是否查看详情?');
const open = ref<boolean>(false);
const successOpen = ref<boolean>(false);
const tableRef = ref(null);
const updateRef = ref(null);
const showSuccessData = ref({});
const isAddNoTeam = ref<boolean>(false);
function setOpen(value: boolean) {
  open.value = value;
}
function setSuccessOpen(value: boolean) {
  successOpen.value = value;
}
const colums = ref([
  {
    title: '派遣单位',
    field: 'dispatchUnit',
    options: dispatchUnitOptions,
  },
  {
    title: '数据来源',
    field: 'dataSource',
    options: dataSourceOptions,
  },
  {
    title: '加急类型',
    field: 'urgentType',
    options: urgencyOptions,
  },
  {
    title: '组团人数',
    field: 'num',
    // isTip: true,
  },
]);
function addNoTeam(record: object) {
  if (tableRef.value) {
    isAddNoTeam.value = true;
    tableRef.value.addEvent(record);
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
async function AddBatch() {
  if (tableRef.value) {
    const insertData = tableRef.value.exportEvent();
    if (!insertData.length) {
      return;
    }
    if (!isAddNoTeam.value) {
      insertData.unshift({ num: 0 });
    }
    try {
      const { respData } = await addBatch({ groups: insertData });
      if (respData) {
        showSuccessData.value = { ...respData };
        setSuccessOpen(true);
        tableRef.value.removeRow();
      }
    }
    catch (error) {
      error;
    }
  }
}
</script>

<style scoped lang="less">
.bg {
  background-image: url('@/assets/image/bigScreen/bg-none.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
}
</style>
