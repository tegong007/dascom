<template>
  <div class="bg h-100vh w-full">
    <div class="content wh-full flex flex-col text-white">
      <div
        class="bg-color m-x-4em m-t-7em box-border h-83% flex gap-2.5em border-[4px] border-[#3F89DD] p-3em"
      >
        <div class="contain-1 relative box-border flex flex-col flex-1 items-center p-2em">
          <span class="text-[2em] color-[#CFDEF1]">证本统计</span>
          <div class="sum absolute top-[9em] w-90% flex">
            <div v-for="(item, index) in items" :key="index" class="flex-1">
              <div class="h-full w-full flex flex-col items-center justify-between">
                <div class="mt-5 text-[2em] color-[#CFDEF1]">
                  {{ item.name }}
                </div>
                <div class="good-num text-[5em]">
                  {{ item.num }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="contain-2 relative box-border flex flex-col flex-1 items-center p-2em">
          <span class="text-[2em] color-[#CFDEF1]">耗材统计</span>
          <div class="sum absolute top-[9em] w-90% flex">
            <div v-for="(item, index) in haocai" :key="index" class="flex-1">
              <div class="h-full w-full flex flex-col items-center justify-between">
                <div class="mt-5 text-[2em] color-[#CFDEF1]">
                  {{ item.name }}
                </div>
                <div class="good-num text-[5em]">
                  {{ item.num }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute top-2em h6em w-full flex items-center justify-center">
      <span class="ml-10 text-[2.5em] color-[#CFDEF1]">维护</span>
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
import router from '@/router/index.ts';

definePage({
  name: 'MainTain',
  meta: {
    title: '维护页',
  },
});

function goto(page: string) {
  router.push({ name: page });
}

const items = [
  {
    name: '成本证本',
    num: '13',
    status: 'error',
  },
  {
    name: '原始废本',
    num: '14',
    status: 'normal',
  },
  {
    name: '打印废本',
    num: '26',
    status: 'warning',
  },
];
const haocai = [
  {
    name: '油量',
    num: '13',
    status: 'error',
  },
];
</script>

<style scoped lang="less">
.content {
  height: calc(100vh - 66px);
}
.bg {
  background-image: url('../../assets/image/bigScreen/bg-none.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
  .bg-color {
    background: linear-gradient(
      359deg,
      rgba(255, 255, 255, 0.1885) 0%,
      rgba(255, 255, 255, 0.29) 33%,
      rgba(0, 142, 255, 0.29) 98%
    );
    .sum {
      // height: calc(100% - 3.5em);
      height: 10em;
      .good-num {
        font-family: 'youshe';
      }
    }
  }
  .contain-1 {
    background-image: url('../../assets/image/bigScreen/main1.png');
    background-size: 100% 100%;
    background-repeat: 'no-repeat';
  }
  .contain-2 {
    background-image: url('../../assets/image/bigScreen/main2.png');
    background-size: 100% 100%;
    background-repeat: 'no-repeat';
  }
}
.returnBtn {
  background-image: url('../../assets/image/bigScreen/returnBtn.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
}
.ant-radio-button-wrapper:first-child {
  border-inline-start: 0px solid #d9d9d9;
  border-start-start-radius: 0px;
  border-end-start-radius: 0px;
}
.ant-radio-button-wrapper:last-child {
  border-inline-start: 0px solid #d9d9d9;
  border-start-start-radius: 0px;
  border-end-start-radius: 0px;
}

.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
  z-index: 1;
  color: #ffffff;
  background: #ffffff2c;
}
</style>
