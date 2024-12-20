<template>
  <div class="bg h-100vh flex flex-col items-center text-[18px] text-white">
    <bigScreenHeader />
    <div
      class="absolute top-50 box-border h-800px w90% flex flex-col items-center justify-between p-2em p-b-0"
    >
      <teamForm :add-team="addTeam" />
      <noTeamForm :add-team="addNoTeam" :update-no-team-num="updateNoTeamNum" />
      <main class="box-border h-580px w-full">
        <MyTable
          ref="tableRef"
          :seq="true"
          :row-delect="true"
          :show-row="showRow"
          :colums="colums"
        />
      </main>
    </div>
    <TheModal
      ref="modalRef"
      :open="open"
      :handle-ok="() => setOpen(false)"
      :handle-cancel="() => setOpen(false)"
      :title="modal"
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
        <TheButton title="返回首页" @click="$goto('BigScreen')" />
        <TheButton title="添加批次" @click="addBatch" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import teamForm from './team-form.vue';
import noTeamForm from './notearm-form.vue';
import {
  dataSourcesOptions,
  dispatchUnitsOptions,
  urgencyOptions,
} from './option';
import TheModal from './updateBatch.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import TheButton from '@/components/base/TheButton.vue';
import MyTable from '@/components/base/vxeTable.vue';

const modal = ref('编辑团组');
const open = ref<boolean>(false);
const tableRef = ref(null);
const modalRef = ref(null);
function setOpen(value: boolean) {
  open.value = value;
}
const colums = ref([
  {
    title: '派遣单位',
    field: 'dispatchUnits',
    options: dispatchUnitsOptions,
  },
  {
    title: '数据来源',
    field: 'dataSources',
    options: dataSourcesOptions,
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
  if (modalRef.value) {
    // 弹窗要修改的值
    await modalRef.value.updateForm(record);
  }
}
// 修改成功关闭弹窗
function handleUpdate(record: object) {
  setOpen(false);
  if (tableRef.value) {
    tableRef.value.updateRow(record);
  }
  // 告诉表格要修改值！
}
async function addBatch() {
  if (tableRef.value) {
    tableRef.value.exportEvent();
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
