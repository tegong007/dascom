<template>
  <div
    class="absolute top-70 box-border h-85vh w90% flex flex-col items-center gap-20 p-2em p-b-0"
  >
    <div class="relative w-full">
      <!-- <a-select
            v-model:value="choose"
            style="width: 120px"
            @change="handleChange"
          >
            <a-select-option :value="1">批次</a-select-option>
            <a-select-option :value="2">团组</a-select-option>
            <a-select-option :value="3">证本</a-select-option>
          </a-select> -->
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
        :change-batch-id-o-rteam-id="props.changeBatchIdORteamId"
        :update-old-checked-row="updateOldCheckedRow"
        key-field="batchID"
        page-name="BatchList"
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
          <!-- <span
            >跳到
            <a-input
              class="w-50 m-l-3"
              size="small"
              v-model:value="pageVO.jumpPage"
              @click="onInputFocus($event, 'jumpPage')"
              @blur="validatePageNumber(pageVO.jumpPage)"
            ></a-input>

            页，
          </span> -->
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

  <contextHolder />
</template>

<script lang="ts" setup>
import { RollbackOutlined } from '@ant-design/icons-vue';
// import { useRoute } from 'vue-router';
import { defineProps, reactive } from 'vue';
import TeamForm from './batch-form.vue';
import { BatchStatusOptions } from '@/pages/bigScreen/batch/option.ts';
import MyTable from '@/components/base/vxeTable.vue';
import TheModal from '@/components/modal/TheModal.vue';
import { contextHolder, openNotify } from '@/components/base/useNotification';
import { batchModule } from '@/apis/proApi';
import { useAppStore } from '@/store/index';

const props = defineProps({
  choose: Number,
  docBatchId: String,
  changeBatchIdORteamId: Function,
});
// const route = useRoute();
// const { start, stop } = useCustomTimer();
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
const modal = ref('');
const isReset = ref(0);
const tableData = ref([]);
// const choose = ref<Number>(1);
const colums = ref([
  {
    title: '序号',
    field: 'seq',
    fixed: 'left',
  },
  {
    title: '批次号',
    field: 'batchID',
    width: 150,
  },
  {
    title: '证本数',
    field: 'docNum',
  },
  {
    title: '良本数',
    field: 'productNum',
  },
  {
    title: '废本数',
    field: 'obsoleteNum',
  },
  {
    title: '待生产数',
    field: 'waitingNum',
  },
  {
    title: '挂起数',
    field: 'hangUpNum',
  },
  {
    title: '状态',
    field: 'status',
    formatter: formatterStatus,
    width: 150,
    // isTip: true,
  },
  {
    title: '接收时间',
    field: 'receiveTime',
    width: 200,
  },
  {
    title: '开始生产时间',
    field: 'startTime',
    width: 200,
  },
  {
    title: '完成时间',
    field: 'finishTime',
    width: 200,
  },
]);
const isSearching = ref(false);
function setSearchForm(formValue: object) {
  searchForm.value = formValue;
  pageVO.currentPage = 1;
  // 清空筛选
  oldCheckedRow.value = [];
  checkedRow.value = [];
  isSearching.value = true;
  getDataPage();
}
// 取消的时候删掉这一行
function updateOldCheckedRow(delectArr) {
  let toDeleteIDs;
  // 提取要删除的 batchID 列表
  if (Array.isArray(delectArr)) {
    toDeleteIDs = delectArr.map(item => item.batchID);
  }
  else {
    toDeleteIDs = [delectArr.batchID];
    console.log('🚀 ~ updateOldCheckedRow ~ toDeleteIDs:', toDeleteIDs);
  }

  // 使用 filter 方法过滤掉需要删除的元素
  oldCheckedRow.value = oldCheckedRow.value.filter(
    item => !toDeleteIDs.includes(item.batchID),
  );
  console.log('🚀 ~ updateOldCheckedRow ~ delectArr:', oldCheckedRow.value);
}

function rowAction(type: string, batchID: string) {
  modal.value = type;
  const newCheckRow = !batchID ? tableRef.value.getSelectEvent() : [batchID];
  if (tableRef.value && newCheckRow) {
    checkedRow.value = !batchID
      ? newCheckRow.map(item => item.batchID)
      : newCheckRow;
  }
  nextTick(() => {
    if (checkedRow.value.length === 0 && oldCheckedRow.value.length === 0) {
      openNotify('bottomRight', `您还没有选中数据`);
    }
    if (checkedRow.value.length || oldCheckedRow.value.length) {
      const oldCheckBatchID = oldCheckedRow.value.map(item => item.batchID);
      const allCheckRox = [
        ...new Set([...checkedRow.value, ...oldCheckBatchID]),
      ];
      modal.value = `可能含有不能${type === 'stop' ? '挂起' : '重新生产'}的数据，是否继续${type === 'stop' ? '挂起' : '重新生产'}${
        allCheckRox.length
      }条数据?`;
      isReset.value = type === 'stop' ? 0 : 1;
      open.value = true;
    }
  });
}
function formatterStatus({ cellValue }: any) {
  const item = BatchStatusOptions.find(item => item.value === cellValue);
  return item ? item.label : cellValue;
}
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

async function operate() {
  try {
    const oldCheckBatchID = oldCheckedRow.value.map(item => item.batchID);
    const allCheckRox = [...new Set([...checkedRow.value, ...oldCheckBatchID])];
    await batchModule.getBatchOperate({
      batchID: allCheckRox,
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

onDeactivated(() => {
  // 清空筛选
  oldCheckedRow.value = [];
  checkedRow.value = [];
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
    const data = await batchModule.getBatchPage(params);
    if (data.respData) {
      tableData.value = data.respData.batchInfo;
      pageVO.currentPage = data.respData.page;
      pageVO.total = data.respData.totalRows;
      pageVO.pageSize = data.respData.rowPerPage;
    }
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
// const validatePageNumber = (value) => {
//   // 确保 pageVO.currentPage 是一个有效的数字
//   if (isNaN(value) || value === null) {
//     pageVO.currentPage = 1; // 默认值为 1
//   } else {
//     pageVO.currentPage = Math.ceil(
//       Math.max(1, Math.min(Math.ceil(pageVO.total / pageVO.pageSize), value)),
//     );
//   }
//   pageVO.jumpPage = pageVO.currentPage;
//   getDataPage();
// };

watch(
  () => props.choose,
  (newValue) => {
    // console.log('🚀 ~ newValue:', newValue);
    if (newValue === 1) {
      nextTick(() => {
        if (searchRef.value) {
          searchRef.value.setBatchID(
            typeof props.docBatchId === 'string' ? props.docBatchId : '',
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
    // background: #fff !important;
    box-shadow: 0 0 0.25em 0 #7ff3fd !important;
  }
}
</style>
