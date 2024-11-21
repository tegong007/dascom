<template>
  <div class="bg h-100vh w-full">
    <bigScreenHeader />
    <div class="content wh-full flex flex-col text-white">
      <main
        class="bg-color m-x-4em m-t-7em box-border h-83% flex gap-1em border-[4px] border-[#3F89DD] p-3em"
      >
        <section class="scrollable-box left flex-1 overflow-auto">
          <TeamCard />
        </section>
        <section class="flex flex-[3]">
          <div class="right-1-box flex-[3] p-x-20">
            <a-flex justify="end" aglin="center">
              <a-button type="link" class="btn m-y-10 hover:text-[#89f7ff]!">
                查看历史记录
              </a-button>
            </a-flex>
            <CertificateTable />
          </div>
          <div class="right-2-box flex-[2]">
            <Info />
          </div>
        </section>
        <!-- <div class="flex-1">
          <DetailTable :handle-click="getChooseId" />
        </div>
        <div
        v-if="chooseId"
        class="scrollable-box box-border flex-1 overflow-auto p-r-10"
        >
          <ReaderTable />
        </div> -->
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
import bigScreenHeader from '@/components/bigScreen/header.vue';
// import DetailTable from "@/pages/bigScreen/detail/table.vue";
// import CamerTable from "@/pages/bigScreen/detail/camerTable.vue";
import CertificateTable from '@/pages/bigScreen/detail/certificateTable.vue';
import Info from '@/pages/bigScreen/detail/info.vue';
// import ReaderTable from "@/pages/bigScreen/detail/readerTable.vue";

// const chooseId = ref("");
definePage({
  name: 'MainTain',
  meta: {
    title: '维护页',
  },
});

function goto(page: string) {
  router.push({ name: page });
}
// function getChooseId(id: string) {
//   console.log("🚀 ~ file: index.vue:55 ~ getChooseId ~ id:", id);
//   chooseId.value = id ?? "";
// }
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
