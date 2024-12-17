<template>
  <a-modal
    :get-container="false"
    :open="props.open"
    wrap-class-name="test"
    :closable="false"
    width="90%"
    centered
    force-render
    @ok="props.handleCancel"
  >
    <div class="delete-modal h-50em w-full">
      <div
        class="wh-full flex flex-col items-center justify-center p-2em p-b-0"
      >
        <teamForm :add-team="callChildMethod" />
        <noTeamForm :add-team="callChildMethod" />
        <main class="mt20 h-100% w-full">
          <MyTable
            ref="tableRef"
            :seq="true"
            :row-delect="true"
            :colums="colums"
            :is-edit="true"
          />
        </main>
      </div>
    </div>

    <template #footer>
      <a-flex
        justify="space-around"
        align="center"
        class="w-full rounded-none p-b-[2em]"
      >
        <TheButton
          title="返回"
          class="drop-shadow-[0_37px_10px_rgba(0,0,0,0.3)]"
          @click="props.handleCancel"
        />
        <TheButton
          title="新增批次"
          class="drop-shadow-[0_37px_10px_rgba(0,0,0,0.3)]"
          @click="addBatch"
        />
      </a-flex>
    </template>
  </a-modal>
  <!-- </div> -->
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import teamForm from './team-form.vue';
import noTeamForm from './notearm-form.vue';
import {
  dataSourcesOptions,
  dispatchUnitsOptions,
  urgencyOptions,
} from './option';
import MyTable from '@/components/base/vxeTable.vue';
// 确保路径确
const props = defineProps({
  open: Boolean,
  handleOk: Function,
  title: String,
  handleCancel: Function,
});
const tableRef = ref(null);
function formatterRetult({ cellValue }: any) {
  return cellValue ? '是' : '否';
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
  {
    title: '是否无团组',
    field: 'isNoTeam',
    formatter: formatterRetult,
    // isTip: true,
  },
]);
// 定义一个方法来调用子组件的方法
function callChildMethod(record: object) {
  if (tableRef.value) {
    tableRef.value.pushEvent(record);
  }
}
async function addBatch() {
  if (tableRef.value) {
    tableRef.value.exportEvent();
  }
}
</script>

<style scoped lang="less">
::v-deep(.ant-modal-content) {
  padding: 0;
  border-radius: 0;
  background: linear-gradient(360deg, rgba(113, 175, 252, 0.5) 0%, rgba(0, 142, 255, 0.5) 97%);

  box-sizing: border-box;
  border: 6px solid #3f89dd;
  box-shadow:
    0px 4px 10px 0px rgba(0, 0, 0, 0.3),
    inset 0px -1px 1px 0px rgba(255, 255, 255, 0.34);
}
::v-deep(.ant-modal-mask) {
  background: rgba(0, 0, 0, 0.9);
}
.delete-modal {
  // background: linear-gradient(
  //   to bottom,
  //   rgb(217, 220, 241),
  //   rgba(255, 255, 255, 0)
  // ) !important;
  border-radius: 0em;
}
::v-deep(.ant-form-item) {
  label {
    color: #fff !important;
    font-size: 16px;
  }
}
</style>
