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
      <!-- <div v-if="props.choose === 1" v-show="showKeyboard">
        <SimpleKeyboard
          ref="simpleKeyboard"
          keyboard-width="w20%"
          :transform="[1050, 590]"
          layout="num"
          :max-length="2"
          :input="pageVO.currentPage"
          @on-change="onChangeKeyboard"
          @closekeyboard="closekeyboard"
        />
      </div> -->
      <TeamForm ref="searchRef" :set-search-form="setSearchForm" />
      <!-- <TeamForm
        ref="searchRef"
        :set-search-form="setSearchForm"
        @closekeyboard="closekeyboard"
      /> -->

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
        :change-task-id-or-batch-id="props.changeTaskIdOrBatchId"
        :update-old-checked-row="updateOldCheckedRow"
        key-field="taskID"
        page-name="TaskList"
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
import MyTable from '@/components/base/vxeTable.vue';
import TheModal from '@/components/modal/TheModal.vue';
import { TaskStatusOptions } from '@/pages/bigScreen/batch/option.ts';
import { useAppStore } from '@/store/index';
import { RollbackOutlined } from '@ant-design/icons-vue';
// import { useRoute } from 'vue-router';
import { defineProps, reactive } from 'vue';
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
    width: 60,
  },
  {
    title: '任务号',
    field: 'taskID',
    width: 180,
  },
  {
    title: '批次号',
    field: 'batchID',
    width: 150,
  },
  {
    title: '证本数',
    field: 'docNum',
    width: 80,
  },
  {
    title: '良本数',
    field: 'productNum',
    width: 80,
  },
  {
    title: '废本数',
    field: 'obsoleteNum',
    width: 80,
  },
  {
    title: '待生产数',
    field: 'waitingNum',
    width: 100,
  },
  {
    title: '挂起数',
    field: 'hangUpNum',
    width: 80,
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
  // 提取要删除的 taskID 列表
  if (Array.isArray(delectArr)) {
    toDeleteIDs = delectArr.map(item => item.taskID);
  }
  else {
    toDeleteIDs = [delectArr.taskID];
    console.log('🚀 ~ updateOldCheckedRow ~ toDeleteIDs:', toDeleteIDs);
  }

  // 使用 filter 方法过滤掉需要删除的元素
  oldCheckedRow.value = oldCheckedRow.value.filter(
    item => !toDeleteIDs.includes(item.taskID),
  );
  console.log('🚀 ~ updateOldCheckedRow ~ delectArr:', oldCheckedRow.value);
}

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
function formatterStatus({ cellValue }: any) {
  const item = TaskStatusOptions.find(item => item.value === cellValue);
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

// const showKeyboard = ref(false); // 键盘默认隐藏
// const changeIpt = ref(''); // 选择了哪个输入框
// const simpleKeyboard = ref(null);
// const cursorPosition = ref('');
// function onInputFocus(event, res) {
//   if (searchRef.value) {
//     searchRef.value.setChildrenShow(false);
//   }
//   showKeyboard.value = true;
//   changeIpt.value = res;
//   cursorPosition.value = event.target;
// }
// // 给输入框赋值
// function onChangeKeyboard(input, keyboard) {
//   console.log('🚀 ~ onChangeKeyboard ~ input:', input);
//   const caretPosition = keyboard.caretPosition;
//   if (caretPosition !== null)
//     setInputCaretPosition(cursorPosition.value, caretPosition);
//   let Newvalue = input;
//   // 使用正则表达式限制输入为1到99的正整数
//   const regex = /^[1-9]\d?$/; // 匹配1到99的正整数
//   // 如果输入不符合正则表达式，重置为上一次有效的值
//   if (!regex.test(Newvalue)) {
//     // 如果输入无效，清空输入框或设置为默认值
//     pageVO.currentPage = '';
//   } else {
//     // 如果输入有效更新绑定的值
//     if (Newvalue > Math.ceil(pageVO.total / pageVO.pageSize)) {
//       Newvalue = Math.ceil(pageVO.total / pageVO.pageSize);
//       pageVO.currentPage = Number(Newvalue);
//     } else {
//       pageVO.currentPage = Number(Newvalue);
//     }
//     getDataPage();
//   }
// }
// function setInputCaretPosition(elem, pos) {
//   setTimeout(() => {
//     if (elem.setSelectionRange) {
//       elem.focus();
//       elem.setSelectionRange(pos, pos);
//     }
//   });
// }
// function closekeyboard() {
//   showKeyboard.value = false;
// }
// function validateInput(event) {
//   // 获取输入框的值
//   let value = event.target.value;
//   // 使用正则表达式限制输入为1到99的正整数
//   const regex = /^[1-9]\d?$/; // 匹配1到99的正整数
//   // 如果输入不符合正则表达式，重置为上一次有效的值
//   if (!regex.test(value)) {
//     // 如果输入无效，清空输入框或设置为默认值
//     pageVO.currentPage = value = '';
//   } else {
//     // 如果输入有效，更新绑定的值
//     if (value > Math.ceil(pageVO.total / pageVO.pageSize)) {
//       value = Math.ceil(pageVO.total / pageVO.pageSize);
//       pageVO.currentPage = Number(value);
//     } else {
//       pageVO.currentPage = Number(value);
//     }
//     getDataPage();
//   }
//   // 更新输入框的值
//   event.target.value = Number(value);
// }
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
