<template>
  <div class="relative box-border wh-full flex flex-col p-x-20 p-t-20">
    <DocForm :set-search-form="setSearchForm" />
    <a-space :size="20" class="absolute right-20 top-[20px]">
      <a-button
        type="primary"
        class="btn flex items-center"
        @click="getDataPage()"
      >
        <img src="@/assets/image/bigScreen/btn/huifu.svg" class="mr7 w12px">
        刷新
      </a-button>
      <a-button
        type="primary"
        class="btn flex items-center"
        @click="rowAction('reset')"
      >
        <RollbackOutlined />
        重新生产
      </a-button>
      <a-button
        type="primary"
        class="btn flex items-center"
        @click="rowAction('stop')"
      >
        <img src="@/assets/image/bigScreen/btn/guaqi.svg" class="m-r-7 w12px">
        挂起
      </a-button>
    </a-space>
    <main class="box-border h83% w-full">
      <MyTable
        ref="tableRef"
        :seq="true"
        :colums="colums"
        :checkbox="true"
        :data="tableData"
        page-name="docList"
        :rowfun="rowAction"
      />
    </main>
    <div class="z-99 flex items-center justify-between">
      <span>生产总数：{{ statisticsData.docNum }}，良本数：{{
        statisticsData.productNum
      }}，废本数：{{ statisticsData.obsoleteNum }}，待生产数：{{
        statisticsData.waitingNum
      }}，挂起数：{{ statisticsData.hangUpNum }}</span>
      <vxe-pager
        v-model:current-page="pageVO.currentPage"
        v-model:page-size="pageVO.pageSize"
        :total="pageVO.total"
        @page-change="pageChange"
      />
    </div>

    <TheModal
      :open="open"
      :handle-ok="() => operate()"
      :warn-icon="true"
      :handle-cancel="() => setOpen(false)"
      :title="modal"
    />
    <Notification ref="notifyRef" />
  </div>
</template>

<script setup lang="ts">
import { RollbackOutlined } from '@ant-design/icons-vue';
import DocForm from './doc-form.vue';
import { findLabelByValue } from '@/pages/bigScreen/batch/option.ts';
import MyTable from '@/components/base/vxeTable.vue';
import TheModal from '@/components/modal/TheModal.vue';
import Notification from '@/components/base/notification.vue';
import { getWorkstationName } from '@/utils/workstationDefinitions';
import { documentModule } from '@/apis/proApi';

const props = defineProps({
  checkRow: Array,
});

const pageVO = reactive({
  total: 20,
  currentPage: 1,
  pageSize: 10,
});
const searchForm = ref({});
const checkedRow = ref([]);
const notifyRef = ref(null);
const groupID = ref([]);
const tableData = ref([]);
const statisticsData = ref({
  docNum: 0,
  hangUpNum: 0,
  obsoleteNum: 0,
  productNum: 0,
  waitingNum: 0,
});
const tableRef = ref(null);
const isReset = ref(0);
const open = ref<boolean>(false);
const modal = ref('');
const imgShow = {
  name: 'VxeImage',
  props: {
    width: 80,
    height: 80,
    maskClosable: true,
  },
};
function formatterValue({ cellValue, column }: any) {
  switch (column.field) {
    case 'position':
      return getWorkstationName(cellValue);
    case 'type':
      return findLabelByValue('docTypesOptions', cellValue);
    case 'docStatus':
      return findLabelByValue('docStatusOptions', cellValue);
    case 'cnObsvType':
      return findLabelByValue('cnObsvTypeOptions', cellValue);
    default:
      break;
  }
}

const colums = ref([
  {
    title: '批次号',
    field: 'batchID',
    width: 120,
  },
  {
    title: '证本号',
    field: 'docID',
    width: 120,
  },
  {
    title: '当前工位',
    field: 'position',
    formatter: formatterValue,
    width: 150,
  },
  {
    title: '状态',
    field: 'docStatus',
    formatter: formatterValue,
    width: 100,
  },
  {
    title: '证本类型',
    field: 'type',
    formatter: formatterValue,
    width: 120,
  },
  {
    title: '姓(中)',
    field: 'cnSurname',
    width: 70,
  },
  {
    title: '名(中)',
    field: 'cnGivenName',
    width: 70,
  },
  {
    title: '人像',
    field: 'photo',
    width: 100,
    imgUrlCellRender: imgShow,
  },
  {
    title: '加注类型',
    field: 'cnObsvType',
    formatter: formatterValue,
    width: 150,
  },
  {
    title: '机读码1',
    field: 'mrz1',
    width: 200,
  },
  {
    title: '机读码2',
    field: 'mrz2',
    width: 200,
  },
  {
    title: '空白本照片',
    field: 'blankDocPic',
    width: 120,
    imgUrlCellRender: imgShow,
  },
  {
    title: '激光前定位照片',
    field: 'laserPicLocation',
    width: 140,
    imgUrlCellRender: imgShow,
  },
  {
    title: '激光后质检照片',
    field: 'laserPicCheck',
    width: 140,
    imgUrlCellRender: imgShow,
  },
  {
    title: '喷墨前定位照片(主)',
    field: 'mainUVPicLocation',
    width: 160,
    imgUrlCellRender: imgShow,
  },
  {
    title: '喷墨后质检照片(主)',
    field: 'mainUVPicCheck',
    width: 160,
    imgUrlCellRender: imgShow,
  },
  {
    title: '喷墨前定位照片(加)',
    field: 'additionUVPicLocation',
    width: 160,
    imgUrlCellRender: imgShow,
  },
  {
    title: '喷墨前定位照片(加)',
    field: 'additionUVPicCheck',
    width: 160,
    imgUrlCellRender: imgShow,
  },
  {
    title: '废本原因',
    field: 'obsoleteReason',
    width: 120,
  },
  {
    title: '开始时间',
    field: 'startTime',
    width: 200,
  },
  {
    title: '结束时间',
    field: 'endTime',
    width: 200,
  },
]);
function setSearchForm(formValue: object) {
  searchForm.value = formValue;
  getDataPage();
}
async function operate() {
  try {
    await documentModule.getDocOperate({
      docID: checkedRow.value,
      operate: isReset.value,
    });
    notifyRef.value?.openNotify(
      'bottomRight',
      `${isReset.value ? '重新生产' : '挂起'}操作成功`,
      true,
    );
    getDataPage();
  }
  catch (error) {
    error;
    notifyRef.value?.openNotify(
      'bottomRight',
      `${isReset.value ? '重新生产' : '挂起'}操作失败`,
    );
  }
  finally {
    setOpen(false);
  }
}

async function getDataPage() {
  try {
    const params = {
      ...searchForm.value,
      groupID: groupID.value,
      page: pageVO.currentPage,
      rowPerPage: pageVO.pageSize,
    };
    const data = await documentModule.getDocDetailPage(params);
    const statistics = await documentModule.getDocStatistics({
      groupID: groupID.value,
    });
    if (data.respData) {
      tableData.value = data.respData.docInfo;
      pageVO.currentPage = data.respData.page;
      pageVO.total = data.respData.totalRows;
      pageVO.pageSize = data.respData.rowPerPage;
    }
    if (statistics.respData) {
      statisticsData.value = {
        ...statistics.respData,
      };
    }
    // startGetDataPage();
  }
  catch (error) {
    console.log('🚀 ~ file: index.vue:206 ~ getDataPage ~ error:', error);
    // stop();
  }
}
function rowAction(type: string, docID: string) {
  modal.value = type;
  const newCheckRow = !docID ? tableRef.value.getSelectEvent() : [docID];
  if (tableRef.value && newCheckRow) {
    checkedRow.value = !docID
      ? newCheckRow.map(item => item.docID)
      : newCheckRow;
  }
  nextTick(() => {
    if (checkedRow.value.length) {
      modal.value = `是否${type === 'stop' ? '挂起' : '重新生产'}${
        checkedRow.value.length
      }条数据?`;
      isReset.value = type === 'stop' ? 0 : 1;
      open.value = true;
    }
  });
}
// 分页
function pageChange({ pageSize, currentPage }) {
  if (tableRef.value && tableRef.value.checkedRow) {
    console.log('🚀 ~选中的数据', tableRef.value.checkedRow);
    if (checkedRow.value) {
      checkedRow.value.push(tableRef.value.checkedRow);
    }
    else {
      checkedRow.value = tableRef.value.checkedRow;
    }
  }
  pageVO.currentPage = currentPage;
  pageVO.pageSize = pageSize;
  getDataPage();
}

function setOpen(value: boolean) {
  open.value = value;
}
watch(
  () => props.checkRow,
  () => {
    if (props.checkRow?.length) {
      groupID.value = props.checkRow.map(item => item.groupID);
      getDataPage();
    }
  },
  { deep: true, immediate: true },
);
onDeactivated(() => {
  tableData.value = [];
});
</script>

<style lang="scss" scoped>
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
}
</style>
