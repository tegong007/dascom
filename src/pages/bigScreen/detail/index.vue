<template>
  <div class="bg h-100vh w-full">
    <bigScreenHeader />
    <div class="content wh-full flex flex-col text-white">
      <main
        class="bg-color m-x-4em m-t-7em box-border h-83% flex gap-1em border-[4px] border-[#3F89DD] p-3em"
      >
        <section class="scrollable-box left box-border w200px overflow-auto">
          <TeamCard :handle-click="getChooseId" :items="items" />
        </section>
        <section class="box-border flex flex-1 overflow-hidden">
          <div class="right-1-box box-border flex-[3] overflow-hidden p-x-20">
            <a-flex justify="end" aglin="center">
              <a-button
                type="link"
                class="btn m-y-10 hover:text-[#89f7ff]!"
                @click="goto('detailHistory')"
              >
                查看证本历史记录
              </a-button>
            </a-flex>
            <div class="h92%">
              <!-- <HistoryTable /> -->
              <Test :colums="leftColums" :data="data" key-field="docId" />
            </div>
          </div>
          <div class="right-2-box box-border flex-[1]">
            <TeamInfo />
          </div>
        </section>
      </main>
    </div>
    <div class="absolute top-2em h6em w-full flex items-center justify-center">
      <span class="ml-10 text-[1.8em] color-[#CFDEF1]">当前批次</span>
    </div>
    <div class="absolute bottom-0 h6em w-full flex items-center justify-center">
      <div
        class="returnBtn h-8em w-13em transition-transform duration-300 hover:scale-115"
        @click="goto('BigScreen')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TeamCard from './team-card.vue';
import router from '@/router/index.ts';
import Test from '@/components/base/vxeTable.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';
// import DetailTable from "@/pages/bigScreen/detail/table.vue";
// import CamerTable from "@/pages/bigScreen/detail/camerTable.vue";
// import CertificateTable from '@/pages/bigScreen/detail/certificateTable.vue';
// import HistoryTable from '@/pages/bigScreen/detail/history/table.vue';
import TeamInfo from '@/pages/bigScreen/detail/team-info.vue';
// import ReaderTable from "@/pages/bigScreen/detail/readerTable.vue";

const resultList = [
  { label: '成本', value: 0 },
  { label: '制作中', value: 1 },
  { label: '废本', value: 2 },
];

const formatterRetult: VxeColumnPropTypes.Formatter<RowVO> = ({
  cellValue,
}: any) => {
  const item = resultList.find(item => item.value === cellValue);
  return item ? item.label : cellValue;
};
const leftColums = ref([
  {
    title: '批次号',
    field: 'batchId',
    width: 150,
  },
  {
    title: '团组号',
    field: 'groupID',
    width: 150,
  },
  {
    title: '证本号',
    field: 'docId',
    width: 150,
  },
  {
    title: '工位',
    field: 'position',
    width: 150,
  },
  {
    title: '图片',
    field: 'image',
    width: 150,
  },
  {
    title: '状态',
    field: 'result',
    formatter: formatterRetult,
    width: 150,
  },
  {
    title: '废本原因',
    field: 'resultMsg',
    width: 250,
    // isTip: true,
  },
  {
    title: '开始时间',
    field: 'startTime',
    width: 250,
  },
  {
    title: '结束时间',
    field: 'endTime',
    width: 250,
  },
]);

const data = [
  {
    docId: 123234,
    result: 2,
    resultMsg: '我是个废本，为什么我是个废本呢 因为...',
    isCheck: true,
  },
  { docId: 45 },
  {
    docId: 12356234,
    result: 1,
  },
  { docId: 3245653456 },
  {
    docId: 123234,
    result: 1,
  },
  { docId: 325643456 },
  { docId: 12378234, resultMsg: '我是个废本，为什么我是个废本呢 因为...' },
  { docId: 32953456 },
  { docId: 127893234, resultMsg: '我是个废本，为什么我是个废本呢 因为...' },
  { docId: 325643456 },
  { docId: 12 },
  { docId: 13 },
  { docId: 2 },
];

const items = ref([
  {
    id: '01',
    teamName: '13112206029',
    groupID: '118',
    currentCertificate: '123',
    tStartTime: '2024.11.20',
  },
  {
    id: '02',
    teamName: '13112206029',
    groupID: '119',
    currentCertificate: '123',
    tStartTime: '2024.11.20',
  },
  {
    id: '03',
    teamName: '13112206029',
    groupID: '120',
    currentCertificate: '123',
    tStartTime: '2024.11.20',
  },
  {
    id: '04',
    teamName: '13112206029',
    groupID: '121',
    currentCertificate: '123',
    tStartTime: '2024.11.20',
  },
  {
    id: '05',
    teamName: '13112206029',
    groupID: '122',
    currentCertificate: '123',
    tStartTime: '2024.11.20',
  },
]);

const choosegroupID = ref('');

function goto(page: string) {
  router.push({ name: page });
}
function getChooseId(id: string) {
  console.log('🚀 ~ file: index.vue:55 ~ getChooseId ~ id:', id);
  choosegroupID.value = id ?? '';
}
async function getData() {
  // console.log('🚀 ~ file: team-card.vue:70 ~ selectedIndex:', selectedIndex);
}
getData();
// selectedIndex: 0 // 默认选中第一项
</script>

<style scoped lang="less">
.content {
  height: calc(100vh - 66px);
  .btn {
    border-radius: 6px;
    opacity: 1;
    background: linear-gradient(209deg, #90ecff 2%, #006af5 69%);
    box-sizing: border-box;
    border: 2px solid #89f7ff;
    // padding: 5px 5px;
    color: white;
    // height: 30px;
    /* height: unset; */
    /* border-image: linear-gradient(180deg, #89f7ff -3%, rgba(0, 237, 255, 0.46) 100%) 3; */
  }
  .left {
    background: linear-gradient(189deg, rgba(144, 236, 255, 0.65) -21%, rgba(0, 106, 245, 0.06) 96%);
    box-sizing: border-box;
    border: 3px solid;
    border-image: linear-gradient(180deg, #89f7ff -3%, rgba(0, 237, 255, 0.46) 100%) 2.96;
  }
  .right-1-box {
    opacity: 1;
    background: linear-gradient(200deg, rgba(144, 236, 255, 0.65) -15%, rgba(0, 106, 245, 0.06) 85%);
    box-sizing: border-box;
    border: 3px solid;
    border-image: linear-gradient(180deg, #89f7ff -3%, rgba(0, 237, 255, 0.46) 100%) 2.96;
  }
  .right-2-box {
    opacity: 1;
    background: linear-gradient(195deg, rgba(144, 236, 255, 0.65) -18%, rgba(0, 106, 245, 0.06) 90%);
    box-sizing: border-box;
    border: 3px solid;
    border-left: none;
    border-image: linear-gradient(180deg, #89f7ff -3%, rgba(0, 237, 255, 0.46) 100%) 2.96;
  }
}
.bg {
  background-image: url('@/assets/image/bigScreen/bg-none.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
  box-sizing: border-box;
  .bg-color {
    background: linear-gradient(
      359deg,
      rgba(255, 255, 255, 0.1885) 0%,
      rgba(255, 255, 255, 0.29) 33%,
      rgba(0, 142, 255, 0.29) 98%
    );
  }
}
.returnBtn {
  background-image: url('@/assets/image/bigScreen/returnBtn.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
}

/* 自定义滚动条样式 */
.scrollable-box::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

.scrollable-box::-webkit-scrollbar-thumb {
  background-color: #ffffff38;
  border-radius: 6px;
}

.scrollable-box::-webkit-scrollbar-track {
  /* background-color: #f1f1f1; */
  background-image: linear-gradient(to bottom, rgba(0, 140, 255, 0.329) 0%, rgba(255, 255, 255, 0.205) 100%);
  /* border-radius: 6px; */
}

.scrollable-box::-webkit-scrollbar-button {
  display: none;
}
</style>
