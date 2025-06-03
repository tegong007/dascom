<template>
  <div
    class="absolute top-70 box-border h-85vh w90% flex flex-col items-center gap-20 p-2em p-b-0"
  >
    <div class="relative w-full flex">
      <TeamForm ref="searchRef" :set-search-form="setSearchForm" />
      <a-space :size="20" class="absolute bottom-[20px] right-10">
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
      <TaskCard
        :items="tableData"
        :check-row="checkRow"
        :set-check-row="setCheckRow"
        :old-checked-row="oldCheckedRow"
      />
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
              :maxlength="2"
              v-model:value="pageVO.currentPage"
              @input="validateInput"
              @click="onInputFocus($event, 'num')"
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
    </main>
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
import { TaskModule } from '@/apis/proApi';
import { contextHolder, openNotify } from '@/components/base/useNotification';
// import MyTable from '@/components/base/vxeTable.vue';
import TheModal from '@/components/modal/TheModal.vue';
import { useAppStore } from '@/store/index';
import { RollbackOutlined } from '@ant-design/icons-vue';
// import { useRoute } from 'vue-router';
import { defineProps, reactive } from 'vue';
import TaskCard from './card.vue';
import TeamForm from './task-form.vue';
// import SimpleKeyboard from '@/components/base/simpleKeyboard.vue';

const props = defineProps({
  choose: Number,
  docBatchId: String,
  docTaskId: String,
  changeTaskIdOrBatchId: Function,
});
// const route = useRoute();
// const { start, stop } = useCustomTimer();
const pageVO = reactive({
  total: 20,
  currentPage: 1,
  pageSize: 5,
});
// 旧
// const checkedRow = ref();
// const oldCheckedRow = ref([]);
const checkRow = ref([]); // 选中的数据
const checkedRow = ref();
const oldCheckedRow = ref([]); // 选中的数据
const tableRef = ref(null);
const searchRef = ref(null);
const searchForm = ref({});
const open = ref<boolean>(false);
const modal = ref('');
const isReset = ref(0);
const tableData = ref([]);
// // const choose = ref<Number>(1);
// const colums = ref([
//   {
//     title: '序号',
//     field: 'seq',
//     fixed: 'left',
//     width: 60,
//   },
//   {
//     title: '任务号',
//     field: 'taskID',
//     width: 180,
//   },
//   {
//     title: '批次号',
//     field: 'batchID',
//     width: 150,
//   },
//   {
//     title: '证本数',
//     field: 'docNum',
//     width: 80,
//   },
//   {
//     title: '良本数',
//     field: 'productNum',
//     width: 80,
//   },
//   {
//     title: '废本数',
//     field: 'obsoleteNum',
//     width: 80,
//   },
//   {
//     title: '待生产数',
//     field: 'waitingNum',
//     width: 100,
//   },
//   {
//     title: '挂起数',
//     field: 'hangUpNum',
//     width: 80,
//   },
//   {
//     title: '状态',
//     field: 'status',
//     formatter: formatterStatus,
//     width: 150,
//     // isTip: true,
//   },
//   {
//     title: '接收时间',
//     field: 'receiveTime',
//     width: 200,
//   },
//   {
//     title: '开始生产时间',
//     field: 'startTime',
//     width: 200,
//   },
//   {
//     title: '完成时间',
//     field: 'finishTime',
//     width: 200,
//   },
// ]);
const isSearching = ref(false);
function setSearchForm(formValue: object) {
  // old
  // searchForm.value = formValue;
  // pageVO.currentPage = 1;
  // // 清空筛选
  // oldCheckedRow.value = [];
  // checkedRow.value = [];
  // isSearching.value = true;
  // getDataPage();
  searchForm.value = formValue;
  pageVO.currentPage = 1;
  getDataPage();
}
// 取消的时候删掉这一行
// function updateOldCheckedRow(delectArr) {
//   let toDeleteIDs;
//   // 提取要删除的 taskID 列表
//   if (Array.isArray(delectArr)) {
//     toDeleteIDs = delectArr.map((item) => item.taskID);
//   } else {
//     toDeleteIDs = [delectArr.taskID];
//     console.log('🚀 ~ updateOldCheckedRow ~ toDeleteIDs:', toDeleteIDs);
//   }

//   // 使用 filter 方法过滤掉需要删除的元素
//   oldCheckedRow.value = oldCheckedRow.value.filter(
//     (item) => !toDeleteIDs.includes(item.taskID),
//   );
//   console.log('🚀 ~ updateOldCheckedRow ~ delectArr:', oldCheckedRow.value);
// }

function rowAction(type: string, taskID: string) {
  modal.value = type;
  const newCheckRow = !taskID ? tableRef.value.getSelectEvent() : [taskID];
  if (tableRef.value && newCheckRow) {
    checkedRow.value = !taskID
      ? newCheckRow.map(item => item.taskID)
      : newCheckRow;
  }
  nextTick(() => {
    if (checkedRow.value.length === 0 && oldCheckedRow.value.length === 0) {
      openNotify('bottomRight', `您还没有选中数据`);
    }
    if (checkedRow.value.length || oldCheckedRow.value.length) {
      const oldCheckTaskID = oldCheckedRow.value.map(item => item.taskID);
      const allCheckRox = [
        ...new Set([...checkedRow.value, ...oldCheckTaskID]),
      ];
      modal.value = `可能含有不能${type === 'stop' ? '挂起' : '重新生产'}的数据，是否继续${type === 'stop' ? '挂起' : '重新生产'}${
        allCheckRox.length
      }条数据?`;
      isReset.value = type === 'stop' ? 0 : 1;
      open.value = true;
    }
  });
}
// function formatterStatus({ cellValue }: any) {
//   const item = TaskStatusOptions.find((item) => item.value === cellValue);
//   return item ? item.label : cellValue;
// }
// 分页
// function pageChange({ pageSize, currentPage }) {
function pageChange() {
  // oldCheckedRow.value = [
  //   ...oldCheckedRow.value,
  //   ...tableRef.value.getSelectEvent(),
  // ];

  // pageVO.currentPage = currentPage;
  // pageVO.pageSize = pageSize;
  // getDataPage();
  // // 选回上一页的数据
  // tableRef.value.setSelectRow(oldCheckedRow.value, true);
  oldCheckedRow.value.push(...checkRow.value); // 将 checkRow 的内容追加到 oldCheckedRow
  oldCheckedRow.value = [
    ...new Map(
      oldCheckedRow.value.map(item => [item.groupID, item]),
    ).values(),
  ];
  getDataPage();
}

function setOpen(value: boolean) {
  open.value = value;
}

async function operate() {
  try {
    const oldCheckTaskID = oldCheckedRow.value.map(item => item.taskID);
    const allCheckRox = [...new Set([...checkedRow.value, ...oldCheckTaskID])];
    await TaskModule.getTaskOperate({
      taskID: allCheckRox,
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
    const data = await TaskModule.getTaskPage(params);
    if (data.respData) {
      tableData.value = data.respData.taskInfo;
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
function setCheckRow(arr: Array<any>) {
  checkRow.value = arr;
  // info.value[0].value = checkRow.value[0]?.dispatchUnit;
  // info.value[1].value = checkRow.value[0]?.dataSource;
  // info.value[2].value = findLabelByValue(
  //   'urgencyOptions',
  //   Number(checkRow.value[0]?.urgentType),
  // );
  // let allnum = 0;
  // checkRow.value.map((item) => {
  //   allnum += Number(item.num);
  //   return allnum;
  // });
  // info.value[3].value = allnum;
}
watch(
  () => props.choose,
  (newValue) => {
    if (newValue === 1) {
      nextTick(() => {
        if (searchRef.value) {
          searchRef.value.setTaskID(
            typeof props.docTaskId === 'string' ? props.docTaskId : '',
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
