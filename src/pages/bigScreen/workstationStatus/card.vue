<template>
  <div class="scoll-bar mt10 box-border h-75% w-90% flex flex-col p-x-100">
    <main
      v-for="(item, index) in items"
      :key="index"
      class="m-t-15 box-border flex flex-col flex-1 p-y-10 pl20 color-[#CFDEF1]"
      :class="props.light === index + 1 && 'chooseItem'"
    >
      <a-flex justify="space-between" align="center" class="w-250px">
        <span class="text-[16.72px]">{{ item.moduleName }}</span>
        <div
          class="cursor-pointer border-2 border-[#89f7ff] p-x-15 p-y-5 text-[16.72px] color-[#89f7ff] hover:bg-[#89f7ff38]"
          @click="refresh(index)"
        >
          刷新状态
        </div>
      </a-flex>
      <a-flex
        align="center"
        class="m-y-10 box-border h-full w-full gap-20"
        wrap="wrap"
      >
        <div
          v-for="(data, dataIndex) in item.items"
          :key="dataIndex"
          class="box-border h-150px w-350px border-2 p-5 line-height-normal"
          :class="getBoxClass(data.status)"
        >
          <div class="mb5 text-[16px]">
            {{ data.item }}
          </div>
          <a-row v-if="data.item === '发本工位'">
            <a-col :span="12" class="text-[14px]">
              本批次发本数：{{ data.number }}
            </a-col>
            <a-col :span="12" class="text-[14px]">
              历史发本数：{{ data.historyNum }}
            </a-col>
          </a-row>
          <a-row v-else-if="data.item === '废本仓工位'">
            <a-col :span="12" class="text-[14px]">
              本批次失败数：{{ data.failNum }}
            </a-col>
            <a-col :span="12" class="text-[14px]">
              历史失败总数：{{ data.historyFailNum }}
            </a-col>
          </a-row>
          <a-row v-else-if="data.item === '良本仓工位'">
            <a-col :span="12" class="text-[14px]">
              本批次成功数：{{ data.successNum }}
            </a-col>
            <a-col :span="12" class="text-[14px]">
              历史成功总数：{{ data.historySuccessNum }}
            </a-col>
          </a-row>
          <div v-else>
            <a-row>
              <a-col :span="12" class="text-[14px]">
                本批次失败数：{{ data.failNum }}
              </a-col>
              <a-col :span="12" class="text-[14px]">
                本批次成功数：{{ data.successNum }}
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12" class="text-[14px]">
                历史失败总数：{{ data.historyFailNum }}
              </a-col>
              <a-col :span="12" class="text-[14px]">
                历史成功总数：{{ data.historySuccessNum }}
              </a-col>
            </a-row>
          </div>

          <div class="mt5 text-[14px]" :class="getTextClass(data.status)">
            状态：{{ data.msg }}
          </div>
        </div>
      </a-flex>
    </main>
  </div>
</template>

<script setup lang="ts">
import { positionModule } from '@/apis/proApi';
import useCustomTimer from '@/utils/useCustomTimer';
import { useAppStore } from '@/store/index';

const props = defineProps({
  light: Number,
});
const { start, stop } = useCustomTimer();
const items = ref([]);
onActivated(async () => {
  useAppStore().setSpinning(true);
  await getDataPage();
  if (items.value) {
    scrollToBox();
  }
  // nextTick(() => {
  startGetDataPage();
  useAppStore().setSpinning(false);
  // });
});

onDeactivated(() => {
  stop();
});
function scrollToBox() {
  const elements = document.getElementsByClassName('chooseItem');
  // 检查是否有目标元素
  if (elements.length > 0) {
    // 获取第一个目标元素（假设只有一个元素匹配）
    const element = elements[0];

    // 调用 scrollIntoView 方法
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  else {
    console.log('🚀 ~ scrollToBox ~ \'没有找到目标元素\':');
  }
}
async function getDataPage() {
  try {
    const data = await positionModule.getPositionCard({ moduleID: 0 });
    if (data.respData) {
      items.value = data.respData;
    }
  }
  catch (error) {
    console.log('🚀 ~ file: newIndex.vue:182 ~ getDataPage ~ error:', error);
    // stop();
  }
  // finally {
  //   useAppStore().setSpinning(false);
  // }
}

async function startGetDataPage() {
  start(async () => {
    await getDataPage();
  }, 2);
}

async function refresh(index: number) {
  const data = await getPositionCard({ moduleID: index + 1 });
  if (data.respData) {
    items.value[index] = data.respData;
  }
}

function getBoxClass(status: string) {
  let boxClass = '';
  const borderColor = {
    3: 'border-[#C7080B]',
    1: 'border-[#89f7ff]',
    0: 'border-[#CBCBCB]',
    2: 'border-[#FFB55B]',
  };
  const bgColor = {
    3: 'bg-[#FF0000]/[0.27]',
    1: 'bg-[#FFFFFF]/[0.09]',
    0: 'bg-[#CBCBCB]/[0.2]',
    2: 'bg-[#FF920D]/[0.37]',
  };
  boxClass = `${borderColor[status]} ${bgColor[status]}`;
  return boxClass;
}
function getTextClass(status: string) {
  let textClass = '';
  const textColor = {
    3: 'color-[#FF0000]',
    1: 'color-[#CFDEF1]',
    0: 'color-[#DDDDDD]',
    2: 'color-[#FFB55B]',
  };
  textClass = textColor[status];
  return textClass;
}
</script>

<style lang="less" scoped>
::v-deep.scoll-bar {
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  // border-left: 3px solid #7ff3fd;
}
::-webkit-scrollbar-thumb {
  // background-color: #ffffff38;
  background-color: #ffffff69;
  border-radius: 5px;
}
.chooseItem {
  background-image: url('../../assets/image/bigScreen/bg.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
}
// ::-webkit-scrollbar-track {
//   background-image: linear-gradient(
//     to bottom,
//     rgba(0, 140, 255, 0.329) 0%,
//     rgba(255, 255, 255, 0.205) 100%
//   );
// }
</style>
