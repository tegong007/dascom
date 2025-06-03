<template>
  <div
    class="absolute top-70 box-border h-85vh w90% flex flex-col items-center gap-20 p-2em p-b-0"
  >
    <div class="relative w-full">
      <TeamForm ref="searchRef" :set-search-form="setSearchForm" />

      <a-space :size="20" class="absolute right-10 top-[20px]">
        <a-button
          type="primary"
          class="btn flex items-center"
          @click="getDataPage"
        >
          <img src="@/assets/image/bigScreen/btn/huifu.svg" class="mr7 w12px">
          刷新
        </a-button>
      </a-space>
    </div>

    <main class="box-border h80% w-full">
      <MyTable
        ref="tableRef"
        :colums="colums"
        :data="tableData"
        :change-batch-id-o-rteam-id="props.changeBatchIdORteamId"
        key-field="groupID"
        page-name="teamList"
      />
    </main>
    <vxe-pager
      v-model:current-page="pageVO.currentPage"
      v-model:page-size="pageVO.pageSize"
      class="z-99 w-full flex items-center justify-center"
      :total="pageVO.total"
      :layouts="['Home', 'PrevPage', 'Number', 'NextPage', 'End']"
      @page-change="pageChange"
    >
      <template #right>
        <div class="relative top-1">
          <span>共{{ Math.ceil(pageVO.total / pageVO.pageSize) }}页，{{
            pageVO.total
          }}条记录
          </span>
        </div>
      </template>
    </vxe-pager>
  </div>

  <contextHolder />
</template>

<script lang="ts" setup>
import { batchModule } from '@/apis/proApi';
import { contextHolder, openNotify } from '@/components/base/useNotification';
import MyTable from '@/components/base/vxeTable.vue';

import { findLabelByValue } from '@/pages/bigScreen/batch/option.ts';
import { useAppStore } from '@/store/index';
// import { useRoute } from 'vue-router';
import { defineProps } from 'vue';
import TeamForm from './team-form.vue';

const props = defineProps({
  choose: Number,
  changeBatchIdORteamId: Function,
  docBatchId: String || Object,
  docTeamId: String || Object,
});
// const route = useRoute();
// const { start, stop } = useCustomTimer();
const pageVO = reactive({
  total: 20,
  currentPage: 1,
  pageSize: 20,
});

const tableRef = ref(null);
const searchRef = ref(null);
const searchForm = ref({});
const tableData = ref([]);
// const batchID = ref<string>('');
// const teamID = ref<string>('');
// const choose = ref<Number>(1);
const colums = ref([
  {
    title: '序号',
    field: 'seq',
    fixed: 'left',
    width: 150,
  },
  {
    title: '团组号',
    field: 'groupID',
    width: 150,
  },
  {
    title: '所属批次号',
    field: 'batchID',
    type: 'html',
    width: 150,
  },

  {
    title: '派遣单位',
    field: 'dispatchUnit',
    // width: 200,
  },
  {
    title: '数据来源',
    field: 'dataSource',
    // width: 200,
  },
  {
    title: '团组人数',
    field: 'num',
    width: 150,
  },
  {
    title: '加急类型',
    field: 'urgentType',
    formatter: formatterValue,
    width: 150,
  },
]);
function formatterValue({ cellValue, column }: any) {
  switch (column.field) {
    case 'urgentType':
      return findLabelByValue('urgencyOptions', Number(cellValue));
  }
}
const isSearching = ref(false);
function setSearchForm(formValue: object) {
  searchForm.value = formValue;
  pageVO.currentPage = 1;
  // 清空筛选
  isSearching.value = true;
  getDataPage();
}

// 分页
function pageChange({ pageSize, currentPage }) {
  pageVO.currentPage = currentPage;
  pageVO.pageSize = pageSize;
  getDataPage();
}

onDeactivated(() => {
  // 清空筛选
  tableData.value = [];
  isSearching.value = false;
  // pageVO.total = 20;
  pageVO.currentPage = 1;
  pageVO.pageSize = 20;

  // stop();
});

async function getDataPage() {
  try {
    useAppStore().setSpinning(true);
    const params = {
      ...searchForm.value,
      page: pageVO.currentPage,
      rowPerPage: pageVO.pageSize,
    };
    // console.log('🚀 ~ getDataPage ~ params:', params);
    const data = await batchModule.getGroupPage(params);
    if (data.respData) {
      tableData.value = data.respData.groupInfo;
      pageVO.currentPage = data.respData.page;
      pageVO.total = data.respData.totalRows;
      pageVO.pageSize = data.respData.rowPerPage;
    }
  }
  catch (error) {
    openNotify('bottomRight', error);
    // stop();
  }
  finally {
    useAppStore().setSpinning(false);
  }
}

watch(
  () => props.choose,
  (newValue) => {
    // console.log('🚀 ~ newValue:', newValue);
    if (newValue === 2) {
      nextTick(() => {
        if (searchRef.value) {
          searchRef.value.setBatchIDandGroupId(
            typeof props.docBatchId === 'string' ? props.docBatchId : '',
            typeof props.docTeamId === 'string' ? props.docTeamId : '',
          );
        }
      });
    }
  },
  { deep: true, immediate: true },
);
// async function startGetDataPage() {
//   start(async () => {
//     await getDataPage();
//   }, 1);
// }
</script>

<style scoped lang="less">
//分页
::v-deep(.vxe-pager) {
  background-color: unset;
  color: #fff;
  .vxe-pager--jump-next,
  .vxe-pager--jump-prev,
  .vxe-pager--next-btn,
  .vxe-pager--num-btn,
  .vxe-pager--prev-btn {
    background-color: unset;
  }
  .is--active {
    box-shadow: 0 0 0.25em 0 #7ff3fd !important;
  }
}
</style>
