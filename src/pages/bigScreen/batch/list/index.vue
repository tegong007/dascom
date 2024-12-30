<template>
  <div class="bg h-100vh flex flex-col items-center text-[18px] text-white">
    <bigScreenHeader title="批次列表" />
    <div
      class="absolute top-70 box-border h-85vh w90% flex flex-col items-center gap-20 p-2em p-b-0"
    >
      <BatchInfo />
      <div class="relative w-full">
        <TeamForm />
        <a-space :size="20" class="absolute right-10 top-[20px]">
          <a-button type="primary" class="btn flex items-center">
            <img
              src="@/assets/image/bigScreen/btn/huifu.svg"
              class="mr5 w12px"
            >
            重新生产
          </a-button>
          <a-button
            type="primary"
            class="btn flex items-center"
            @click="rowAction('stop')"
          >
            <img
              src="@/assets/image/bigScreen/btn/guaqi.svg"
              class="mr5 w12px"
            >
            挂起
          </a-button>
        </a-space>
      </div>

      <main class="box-border h70% w-full">
        <MyTable
          ref="tableRef"
          :seq="true"
          :colums="colums"
          :checkbox="true"
          :data="mockData"
          page-name="BatchList"
        />
      </main>
      <vxe-pager
        v-model:current-page="pageVO.currentPage"
        v-model:page-size="pageVO.pageSize"
        class="z-99 w-full"
        :total="pageVO.total"
        @page-change="pageChange"
      />
    </div>
    <!-- 下边按钮 -->
    <TheModal
      :open="open"
      :handle-ok="() => setOpen(false)"
      :warn-icon="true"
      :handle-cancel="() => setOpen(false)"
      :title="modal"
    />
    <div
      class="groupBtn absolute bottom-0 h8em w-full flex items-center justify-center gap-20"
    >
      <!-- <div class="flex">
          <TheButton title="批次查询" />
        </div> -->
      <!-- <span class="h-50% w-2px bg-[#8BB2FF]" /> -->
      <div class="flex gap-20">
        <TheButton title="返回首页" @click="$goto('BigScreen')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TeamForm from './team-form.vue';
import BatchInfo from './batchInfo.vue';
import { BatchStatusOptions } from '@/pages/bigScreen/batch/option.ts';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import TheButton from '@/components/base/TheButton.vue';
import MyTable from '@/components/base/vxeTable.vue';
import TheModal from '@/components/modal/TheModal.vue';

const pageVO = reactive({
  total: 20,
  currentPage: 1,
  pageSize: 10,
});
const checkedRow = ref([]);
const tableRef = ref(null);
const open = ref<boolean>(false);
const modal = ref('');
function formatterStatus({ cellValue }: any) {
  const item = BatchStatusOptions.find(item => item.value === cellValue);
  return item ? item.label : cellValue;
}
const colums = ref([
  {
    title: '批次号',
    field: 'batchId',
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
    field: 'hangUpNum',
  },
  {
    title: '挂起数',
    field: 'waitingNum',
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getMockData() {
  const data = [];
  for (let i = 0; i < 20; i++) {
    // 假设我们需要10条数据
    data.push({
      batchId: `BATCH-${getRandomInt(1000, 9999)}`,
      docNum: getRandomInt(1, 1000),
      productNum: getRandomInt(1, 1000),
      obsoleteNum: getRandomInt(0, 100),
      hangUpNum: getRandomInt(0, 100),
      waitingNum: getRandomInt(0, 100),
      status: getRandomInt(0, 5), // 状态字段生成0到5的随机数
      receiveTime: `2024-01-${getRandomInt(1, 28)} ${getRandomInt(0, 23)}:${getRandomInt(0, 59)}`,
    });
  }
  return data;
}
const mockData = ref(getMockData());
function rowAction(type: string) {
  if (tableRef.value && tableRef.value.checkedRow) {
    if (checkedRow.value) {
      checkedRow.value.push(tableRef.value.checkedRow);
    }
    else {
      checkedRow.value = tableRef.value.checkedRow;
    }
  }
  nextTick(() => {
    if (checkedRow.value.length) {
      modal.value
        = `是否${type}` === 'stop'
          ? '挂起'
          : `重新生产${checkedRow.value.length}条数据?`;
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
  // handlePageData();
}

// 前端分页
// const handlePageData = () => {
//   setTimeout(() => {
//     const { pageSize, currentPage } = pageVO;
//     mockData.value = mockData.value.slice(
//       (currentPage - 1) * pageSize,
//       currentPage * pageSize,
//     );
//   }, 100);
// };
function setOpen(value: boolean) {
  open.value = value;
}
</script>

<style scoped lang="less">
.bg {
  background-image: url('@/assets/image/bigScreen/bg-none.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';

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
}
</style>
