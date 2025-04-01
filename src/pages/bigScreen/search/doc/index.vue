<template>
  <div
    class="absolute top-70 box-border h-85vh w90% flex flex-col items-center gap-20 p-2em p-b-0"
  >
    <!-- <DocInfo /> -->
    <div class="relative w-full">
      <docForm ref="searchRef" :set-search-form="setSearchForm" />
      <a-space :size="20" class="absolute right-10 top-[20px]">
        <a-button
          type="primary"
          class="btn flex items-center"
          @click="getDataPage"
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
          <img
            src="@/assets/image/bigScreen/btn/guaqi.svg"
            class="m-r-7 w12px"
          >
          挂起
        </a-button>
      </a-space>
    </div>

    <main class="box-border h80% w-full">
      <MyTable
        ref="tableRef"
        :colums="colums"
        :checkbox="true"
        :data="tableData"
        :rowfun="rowAction"
        :update-old-checked-row="updateOldCheckedRow"
        :change-batch-id-o-rteam-id="props.changeBatchIdORteamId"
        :set-detai="setDetai"
        key-field="recID"
        page-name="docList"
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
  <!-- 下边按钮 -->
  <TheModal
    :open="open"
    :handle-ok="() => operate()"
    :warn-icon="true"
    :handle-cancel="() => setOpen(false)"
    :title="modal"
  />
  <DetailModal
    :open="detailOpen"
    :current-row="currentRow"
    :handle-ok="() => setDetailOpen(false)"
    :handle-cancel="() => setDetailOpen(false)"
    title="详情"
  />

  <contextHolder />
</template>

<script lang="ts" setup>
import { RollbackOutlined } from '@ant-design/icons-vue';
import docForm from './doc-form.vue';
import DetailModal from './detailModal.vue';
import MyTable from '@/components/base/vxeTable.vue';
import TheModal from '@/components/modal/TheModal.vue';
import { contextHolder, openNotify } from '@/components/base/useNotification';
import { getWorkstationName } from '@/utils/workstationDefinitions';
import { findLabelByValue } from '@/pages/bigScreen/batch/option.ts';
import { documentModule } from '@/apis/proApi';
import { useAppStore } from '@/store/index';

const props = defineProps({
  choose: Number,
  changeBatchIdORteamId: Function,
  docBatchId: String || Object,
  docTeamId: String || Object,
});
const pageVO = reactive({
  total: 20,
  currentPage: 1,
  pageSize: 20,
});
const checkedRow = ref();
const oldCheckedRow = ref([]);
const tableRef = ref(null);
const searchRef = ref(null);
const searchForm = ref({});
const open = ref<boolean>(false);
const detailOpen = ref<boolean>(false);
const modal = ref('');
const isReset = ref(0);
const tableData = ref([]);
// const imgShow = {
//   name: 'VxeImage',
//   props: {
//     width: 80,
//     height: 80,
//     maskClosable: true,
//   },
// };
const colums = ref([
  {
    title: '序号',
    field: 'seq',
    fixed: 'left',
    width: 80,
    overflow: 'title',
  },
  {
    title: '证本号',
    field: 'docID',
    width: 120,
    overflow: 'title',
  },
  {
    title: '所属批次号',
    field: 'batchID',
    type: 'html',
    width: 120,
    overflow: 'ellipsis',
  },
  {
    title: '所属团组号',
    field: 'groupID',
    type: 'html',
    width: 120,
    overflow: 'title',
  },

  {
    title: '识别号',
    field: 'recID',
    width: 120,
    overflow: 'title',
  },
  // {
  //   title: '派遣单位',
  //   field: 'dispatchUnit',
  //   formatter: formatterValue,
  //   width: 130,
  //   overflow: 'title',
  // },
  // {
  //   title: '数据来源',
  //   field: 'dataSource',
  //   formatter: formatterValue,
  //   width: 130,
  //   overflow: 'title',
  // },

  {
    title: '加急程度',
    field: 'urgentType',
    formatter: formatterValue,
    width: 100,
    overflow: 'title',
  },

  {
    title: '当前工位',
    field: 'position',
    formatter: formatterValue,
    overflow: 'title',
  },
  {
    title: '状态',
    field: 'docStatus',
    formatter: formatterValue,
    width: 100,
    overflow: 'title',
  },
  {
    title: '证本类型',
    field: 'type',
    formatter: formatterValue,
    width: 120,
    overflow: 'title',
  },
  // {
  //   title: '姓(中)',
  //   field: 'cnSurname',
  //   width: 70,
  //   overflow: 'title',
  // },
  // {
  //   title: '名(中)',
  //   field: 'cnGivenName',
  //   width: 70,
  //   overflow: 'title',
  // },
  // {
  //   title: '人像',
  //   field: 'photo',
  //   width: 100,
  //   overflow: 'title',
  //   imgUrlCellRender: imgShow,
  // },
  // {
  //   title: '加注类型',
  //   field: 'cnObsvType',
  //   formatter: formatterValue,
  //   width: 150,
  //   overflow: 'title',
  // },
  // {
  //   title: '机读码1',
  //   field: 'mrz1',
  //   width: 200,
  //   overflow: 'title',
  // },
  // {
  //   title: '机读码2',
  //   field: 'mrz2',
  //   width: 200,
  //   overflow: 'title',
  // },
  // {
  //   title: '空白本照片',
  //   field: 'blankDocPic',
  //   width: 120,
  //   overflow: 'title',
  //   imgUrlCellRender: imgShow,
  // },
  // {
  //   title: '激光前定位照片',
  //   field: 'laserPicLocation',
  //   width: 140,
  //   overflow: 'title',
  //   imgUrlCellRender: imgShow,
  // },
  // {
  //   title: '激光后质检照片',
  //   field: 'laserPicCheck',
  //   width: 140,
  //   overflow: 'title',
  //   imgUrlCellRender: imgShow,
  // },
  // {
  //   title: '喷墨前定位照片(主)',
  //   field: 'mainUVPicLocation',
  //   width: 160,
  //   overflow: 'title',
  //   imgUrlCellRender: imgShow,
  // },
  // {
  //   title: '喷墨后质检照片(主)',
  //   field: 'mainUVPicCheck',
  //   width: 160,
  //   overflow: 'title',
  //   imgUrlCellRender: imgShow,
  // },
  // {
  //   title: '喷墨前定位照片(加)',
  //   field: 'additionUVPicLocation',
  //   width: 160,
  //   overflow: 'title',
  //   imgUrlCellRender: imgShow,
  // },
  // {
  //   title: '喷墨前定位照片(加)',
  //   field: 'additionUVPicCheck',
  //   width: 160,
  //   overflow: 'title',
  //   imgUrlCellRender: imgShow,
  // },
  // {
  //   title: '废本原因',
  //   field: 'obsoleteReason',
  //   width: 120,
  //   overflow: 'title',
  // },
  {
    title: '开始时间',
    field: 'startTime',
    width: 200,
    overflow: 'title',
  },
  {
    title: '更新时间',
    field: 'endTime',
    width: 200,
    overflow: 'title',
  },
]);
function formatterValue({ cellValue, column }: any) {
  switch (column.field) {
    case 'position':
      return getWorkstationName(cellValue);
    case 'type':
      return findLabelByValue('docTypesOptions', cellValue);
    case 'docStatus':
      return findLabelByValue('docStatusOptions', cellValue);
    case 'cnObsvType':
      return findLabelByValue('cnObsvTypeOptions', Number(cellValue));
    case 'dispatchUnit':
      return findLabelByValue('dispatchUnitOptions', cellValue);
    case 'isTeam':
      return findLabelByValue('teamOptions', cellValue);
    case 'dataSource':
      return findLabelByValue('dataSourceOptions', cellValue);
    case 'urgentType':
      return findLabelByValue('urgencyOptions', cellValue);
    default:
      break;
  }
}

function setSearchForm(formValue: object) {
  searchForm.value = formValue;
  pageVO.currentPage = 1;
  // 清空筛选
  oldCheckedRow.value = [];
  checkedRow.value = [];
  getDataPage();
}
async function operate() {
  try {
    const oldCheckrecID = oldCheckedRow.value.map(item => item.recID);
    const allCheckRox = [...new Set([...checkedRow.value, ...oldCheckrecID])];
    await documentModule.getDocOperate({
      recID: allCheckRox,
      operate: isReset.value,
    });
    openNotify(
      'bottomRight',
      `${isReset.value ? '重新生产' : '挂起'}操作成功`,
      true,
    );
    getDataPage();
  }
  catch (error) {
    error;
    openNotify('bottomRight', `${isReset.value ? '重新生产' : '挂起'}操作失败`);
  }
  finally {
    setOpen(false);
  }
}

// 取消的时候删掉这一行
function updateOldCheckedRow(delectArr) {
  let toDeleteIDs;
  // 提取要删除的 batchID 列表
  if (Array.isArray(delectArr)) {
    toDeleteIDs = delectArr.map(item => item.recID);
  }
  else {
    toDeleteIDs = [delectArr.recID];
  }

  // 使用 filter 方法过滤掉需要删除的元素
  oldCheckedRow.value = oldCheckedRow.value.filter(
    item => !toDeleteIDs.includes(item.recID),
  );
}

function rowAction(type: string, recID: string) {
  modal.value = type;
  const newCheckRow = !recID ? tableRef.value.getSelectEvent() : [recID];
  if (tableRef.value && newCheckRow) {
    checkedRow.value = !recID
      ? newCheckRow.map(item => item.recID)
      : newCheckRow;
  }
  nextTick(() => {
    if (checkedRow.value.length === 0 && oldCheckedRow.value.length === 0) {
      openNotify('bottomRight', `您还没有选中数据`);
    }

    if (checkedRow.value.length || oldCheckedRow.value.length) {
      const oldCheckrecID = oldCheckedRow.value.map(item => item.recID);
      const allCheckRox = [...new Set([...checkedRow.value, ...oldCheckrecID])];
      modal.value = `可能含有不能${type === 'stop' ? '挂起' : '重新生产'}的数据，是否继续${type === 'stop' ? '挂起' : '重新生产'}${
        allCheckRox.length
      }条数据?`;
      isReset.value = type === 'stop' ? 0 : 1;
      open.value = true;
    }
  });
}
// function formatterStatus({ cellValue }: any) {
//   const item = BatchStatusOptions.find((item) => item.value === cellValue);
//   return item ? item.label : cellValue;
// }
// 分页
function pageChange({ pageSize, currentPage }) {
  oldCheckedRow.value = [
    ...oldCheckedRow.value,
    ...tableRef.value.getSelectEvent(),
  ];

  pageVO.currentPage = currentPage;
  pageVO.pageSize = pageSize;
  getDataPage();
  // 选回上一页的数据
  tableRef.value.setSelectRow(oldCheckedRow.value, true);
}

function setOpen(value: boolean) {
  open.value = value;
}

function setDetailOpen(value: boolean) {
  detailOpen.value = value;
}
const currentRow = ref({});
// 查看详情
function setDetai(row: any) {
  detailOpen.value = true;
  currentRow.value = row;
}

onActivated(() => {
  getDataPage();
});
onDeactivated(() => {
  // 清空筛选
  oldCheckedRow.value = [];
  checkedRow.value = [];
  tableData.value = [];
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
    const data = await documentModule.getDocDetailGeneral(params);
    if (data.respData) {
      tableData.value = data.respData.docInfo;
      pageVO.currentPage = data.respData.page;
      pageVO.total = data.respData.totalRows;
      pageVO.pageSize = data.respData.rowPerPage;
    }
    // startGetDataPage();
  }
  catch (error) {
    error;
    openNotify('bottomRight', `接口超时`);
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
    if (newValue === 3) {
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
