<template>
  <div class="bg h-100vh flex flex-col items-center text-[18px] text-white">
    <bigScreenHeader title="批次详情" />
    <div
      class="absolute top-70 box-border h-85vh w90% flex flex-col items-center gap-20 p-2em p-b-0"
    >
      <span>批次号：{{ statisticsData.batchID }}， 生产总数：{{
        statisticsData.docNum
      }}，良本数：{{ statisticsData.productNum }}，废本数：{{
        statisticsData.obsoleteNum
      }}，待生产数：{{ statisticsData.waitingNum }}，状态：
        {{ formatterStatus(statisticsData.status) }}，接收时间：{{
          statisticsData.receiveTime
        }}，生产时间：{{ statisticsData.startTime }}，完成时间：{{
          statisticsData.finishTime
        }}</span>
      <TeamForm :set-search-form="setSearchForm" />
      <main class="box-border h78% w-full flex">
        <div class="card-box box-border h-full w-250px p-l-10 p-t-10">
          团组列表
          <TeamCard
            :items="items"
            :check-row="checkRow"
            :set-check-row="setCheckRow"
            :old-checked-row="oldCheckedRow"
          />
          <vxe-pager
            v-model:current-page="pageVO.currentPage"
            v-model:page-size="pageVO.pageSize"
            class="z99"
            :total="pageVO.total"
            :layouts="['PrevPage', 'Jump', 'PageCount', 'NextPage']"
            @page-change="pageChangeEvent"
          />
        </div>
        <div class="doc-box box-border h-full flex-1 overflow-hidden">
          <Doc :check-row="checkRow" :batch-i-d="statisticsData.batchID" />
        </div>
        <div
          class="info-box box-border h-full w-250px flex flex-col items-center p-y-20 text-[24px] color-[#CFDEF1]"
        >
          团组信息
          <div class="w-full flex flex-col flex-1 justify-around">
            <div
              v-for="item in info"
              :key="item.label"
              class="w-full flex flex-col items-center"
            >
              <span class="text-18px">{{ item.label }}</span>
              <span class="mt15">{{
                checkRow.length > 1 ? `多${item.label}` : item.value
              }}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div
      class="groupBtn absolute bottom-0 h8em w-full flex items-center justify-center gap-20"
    >
      <div class="flex gap-20">
        <TheButton title="返回首页" @click="$goto('BigScreen')" />
        <TheButton title="返回" @click="$goto('-1')" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { reactive } from 'vue';
import { BatchStatusOptions, findLabelByValue } from '../option';
import TeamForm from './team/team-form.vue';
import TeamCard from './team/team-card.vue';
import Doc from './team/doc/index.vue';
import TheButton from '@/components/base/TheButton.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import { batchModule } from '@/apis/proApi';
import useCustomTimer from '@/utils/useCustomTimer';

const { start, stop } = useCustomTimer();
const route = useRoute();
const batchId = ref<string>('');
const checkRow = ref([]); // 选中的数据
const oldCheckedRow = ref([]); // 选中的数据
const items = ref([]);
const searchForm = ref({});
const statisticsData = ref({
  batchID: '468468465465465',
  status: '',
  docNum: 15646546512654156,
  batchNum: 0,
  hangUpNum: 0,
  obsoleteNum: 0,
  productNum: 0,
  waitingNum: 0,
  receiveTime: '',
  startTime: '',
  finishTime: '',
});
function formatterStatus(cellValue: any) {
  const item = BatchStatusOptions.find(item => item.value === cellValue);
  return item ? item.label : cellValue;
}
const info = ref([
  {
    label: '派遣单位',
  },
  {
    label: '数据来源',
  },
  {
    label: '加急类型',
  },
  {
    label: '团组人数',
  },
]);

function setCheckRow(arr: Array<any>) {
  checkRow.value = arr;
  info.value[0].value = checkRow.value[0]?.dispatchUnit;
  info.value[1].value = checkRow.value[0]?.dataSource;
  info.value[2].value = findLabelByValue(
    'urgencyOptions',
    Number(checkRow.value[0]?.urgentType),
  );
  let allnum = 0;
  checkRow.value.map((item) => {
    allnum += Number(item.num);
    return allnum;
  });
  info.value[3].value = allnum;
}
const pageVO = reactive({
  currentPage: 1,
  pageSize: 12,
  total: 0,
});
async function pageChangeEvent() {
  console.log(
    `分页事件：第 ${pageVO.currentPage} 页，每页  ${pageVO.pageSize} 条`,
  );
  oldCheckedRow.value.push(...checkRow.value); // 将 checkRow 的内容追加到 oldCheckedRow
  oldCheckedRow.value = [
    ...new Map(
      oldCheckedRow.value.map(item => [item.groupID, item]),
    ).values(),
  ];
  await getGroupData();
}

async function getGroupData() {
  const params = {
    ...searchForm.value,
    batchID: batchId.value,
    page: pageVO.currentPage,
    rowPerPage: pageVO.pageSize,
  };
  try {
    const data = await batchModule.getGroupPage(params);
    if (data.respData) {
      items.value = data.respData.groupInfo;
      pageVO.currentPage = data.respData.page;
      pageVO.total = data.respData.totalRows;
      pageVO.pageSize = data.respData.rowPerPage;
    }
  }
  catch (error) {
    error;
  }
}
function setSearchForm(formValue: object) {
  searchForm.value = formValue;
  pageVO.currentPage = 1;
  getGroupData();
}

onActivated(async () => {
  const query = route.query;
  batchId.value = query.BatchId;
  await getGroupData();
  await getBatchStatisticsInfo();
});
onDeactivated(() => {
  stop();
  checkRow.value = [];
  oldCheckedRow.value = [];
});
async function getBatchStatisticsInfo() {
  try {
    const data = await batchModule.getBatchStatistics({
      batchID: batchId.value,
    });
    if (data.respData) {
      statisticsData.value = { ...data.respData };
    }
    startGetDataPage();
  }
  catch (error) {
    error;
    // stop();
  }
}

async function startGetDataPage() {
  start(async () => {
    await getBatchStatisticsInfo();
  }, 2);
}
</script>

<style scoped lang="less">
.bg {
  background-image: url('@/assets/image/bigScreen/bg-none.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
  .btn {
    border-radius: 6px;
    opacity: 1;
    background: linear-gradient(209deg, #90ecff 2%, #006af5 69%);
    box-sizing: border-box;
    border: 2px solid #89f7ff;
    padding: 0px 7px;
    color: white;
    height: 32px;
  }
  .card-box,
  .info-box {
    background: linear-gradient(187deg, rgba(144, 236, 255, 0.65) -22%, rgba(66, 134, 224, 0.459) 90%);
    box-sizing: border-box;
    border: 3px solid;
    border-image: linear-gradient(180deg, #89f7ff 0%, rgba(0, 237, 255, 0.46) 100%) 3;
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
  .doc-box {
    background: linear-gradient(359deg, rgba(113, 175, 252, 0.5) 1%, rgba(0, 142, 255, 0.5) 96%);
    box-sizing: border-box;
    border: 4px solid #3f89dd;
    box-shadow:
      0px 4px 10px 0px rgba(0, 0, 0, 0.3),
      inset 0px -1px 1px 0px rgba(255, 255, 255, 0.34);
    border-left: 0px;
    border-right: 0px;
  }
}
</style>
