<template>
  <div class="box-border wh-full flex flex-col p-x-20 divide-y">
    <section
      v-for="(moduleItems, moduleIndex) in itemsForAllModules"
      :key="moduleIndex"
      class="h-full flex p-y-20"
    >
      <div class="h-full flex-col flex-1">
        <span class="text-[28px] color-[#CFDEF1]">{{ moduleItems.moduleName }}油墨余量</span>
        <div class="flex">
          <div
            v-for="(item, index) in moduleItems.items"
            :key="index"
            class="h240px flex flex-col flex-1 items-center justify-around"
          >
            <div class="h25px w25px">
              <img
                v-if="item.value <= 30"
                src="@/assets/image/bigScreen/btn/warning.svg"
              >
            </div>

            <a-progress
              class="relative left-4 w80% rotate-270"
              :trail-color="item.trailColor"
              :stroke-color="item.strokeColor"
              :percent="item.value"
              :size="[40, 60]"
              :show-info="false"
            />
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div
          class="flex flex-col flex-1 justify-around text-[24px] color-[#CFDEF1]"
        >
          <span> 预计打印证本数</span>
          <span class="text-[26px] color-white font-[youshe]">{{
            moduleItems.remainDocNum
          }}</span>
        </div>
      </div>
      <div
        class="box-border h-full w-300px flex flex-col border from-[#ffffff38] bg-gradient-to-b p-10 color-[#CFDEF1]"
      >
        <div class="flex-1">
          【墨水缺失】<br>
          <span class="ml35">{{ moduleItems.missingMsg }}</span>
        </div>
        <div class="flex-1">
          【墨水将近】 <br><span class="ml35">{{ moduleItems.lowMsg }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { mainTainModule } from '@/apis/proApi';
import useCustomTimer from '@/utils/useCustomTimer';

const props = defineProps({
  currentModel: String,
});
const { start, stop } = useCustomTimer();
const modulesData = ref([
  {
    moduleID: 1,
    moduleName: '主副页模块',
    yellow: 50, // 黄色
    magenta: 40, // 洋红
    cyan: 30, // 青色
    black: 40, // 黑色
    varnish: 100, // 光油
    invisibleRed: 30, // 隐形红
    invisibleGreen: 50, // 隐形绿
    invisibleBlue: 80, // 隐形蓝
    missingMsg: '黑色缺失', // 缺失提示
    lowMsg: '洋红低于10%', // 将近提示
    remainDocNum: 154186551, // 预计打印证本数
  },
  {
    moduleID: 2,
    moduleName: '加注页模块',
    yellow: 50,
    magenta: 40,
    cyan: 30,
    black: 40,
    varnish: 100,
    invisibleRed: 30,
    invisibleGreen: 50,
    invisibleBlue: 80,
    missingMsg: '黑色缺失',
    lowMsg: '洋红低于10%',
    remainDocNum: 12, // 预计打印证本数
  },
]);

// 颜色的 trailColor 和 strokeColor 映射
const colorMap = {
  yellow: '#FFFF0024',
  magenta: '#FF00FF50',
  cyan: '#00FFFF50',
  black: '#00000030',
  varnish: '#A8A8A840',
  invisibleRed: '#FF000024',
  invisibleGreen: '#00FF0030',
  invisibleBlue: '#0000FF20',
};

// 将英文名称映射到中文
const colorNameMap = {
  yellow: '黄色',
  magenta: '洋红',
  cyan: '青色',
  black: '黑色',
  varnish: '光油',
  invisibleRed: '隐形红',
  invisibleGreen: '隐形绿',
  invisibleBlue: '隐形蓝',
};

// 计算属性，用于生成所有模块的 items 数组
const itemsForAllModules = computed(() => {
  return modulesData.value.map((module) => {
    const items = Object.keys(colorMap).map((key) => {
      const englishKey = key;
      return {
        name: colorNameMap[englishKey], // 显示英文名称
        trailColor: colorMap[englishKey],
        strokeColor: colorMap[englishKey].slice(0, -2),
        value: module[englishKey],
      };
    });
    // 返回一个包含模块信息和颜色项数组的对象
    return {
      moduleID: module.moduleID,
      moduleName: module.moduleName,
      items,
      missingMsg: module.missingMsg,
      lowMsg: module.lowMsg,
      remainDocNum: module.remainDocNum,
    };
  });
});

async function getDataPage() {
  try {
    const data = await mainTainModule.consumables.getLnkRemainder();

    if (data.respData) {
      modulesData.value = data.respData;
    }

    startGetDataPage();
  }
  catch (error) {
    error;
    stop();
  }
}
onDeactivated(() => {
  stop();
});
async function startGetDataPage() {
  start(async () => {
    await getDataPage();
  }, 2);
}

// watch(props.currentModel, (newValue) => {
//   console.log('🚀 ~ file: index.vue:85 ~ watch ~ newValue:', newValue);
// });
watch(
  () => props.currentModel,
  (newValue) => {
    if (newValue === '5') {
      getDataPage();
    }
    else {
      stop();
    }
  },
  { deep: true, immediate: true },
);
</script>

<style lang="scss" scoped>
::v-deep(.ant-progress) {
}
::v-deep(.ant-progress .ant-progress-inner),
::v-deep(.ant-progress .ant-progress-bg) {
  border-radius: 0;
}
</style>
