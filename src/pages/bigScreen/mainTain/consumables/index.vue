<template>
  <div class="box-border wh-full flex flex-col p-x-20 divide-y">
    <section
      v-for="(moduleItems, moduleIndex) in itemsForAllModules"
      :key="moduleIndex"
      class="h-full flex p-y-20"
    >
      <div class="h-full flex-col flex-1">
        <span class="text-[28px] color-[#CFDEF1]">{{ moduleItems.keyCN }}油墨余量</span>
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
            moduleItems.remainingNum
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
const modulesData = ref([
  {
    key: 'mainPrint',
    keyCN: '主副页模块',
    yellow: 50, // 黄色
    magenta: 40, // 洋红
    cyan: 30, // 青色
    black: 40, // 黑色
    varnish: 100, // 光油
    Invisible_red: 30, // 隐形红
    Invisible_green: 50, // 隐形绿
    Invisible_blue: 80, // 隐形蓝
    missingMsg: '黑色缺失', // 缺失提示
    lowMsg: '洋红低于10%', // 将近提示
    remainingNum: 154186551, // 预计打印证本数
  },
  {
    key: 'additionPrint',
    keyCN: '加注页模块',
    yellow: 50,
    magenta: 40,
    cyan: 30,
    black: 40,
    varnish: 100,
    Invisible_red: 30,
    Invisible_green: 50,
    Invisible_blue: 80,
    missingMsg: '黑色缺失',
    lowMsg: '洋红低于10%',
    remainingNum: 12, // 预计打印证本数
  },
]);

// 颜色的 trailColor 和 strokeColor 映射
const colorMap = {
  yellow: '#FFFF0024',
  magenta: '#FF00FF50',
  cyan: '#00FFFF50',
  black: '#96969680',
  varnish: '#A8A8A840',
  Invisible_red: '#FF000024',
  Invisible_green: '#00FF0030',
  Invisible_blue: '#0000FF30',
};

// 将英文名称映射到中文
const colorNameMap = {
  yellow: '黄色',
  magenta: '洋红',
  cyan: '青色',
  black: '黑色',
  varnish: '光油',
  Invisible_red: '隐形红',
  Invisible_green: '隐形绿',
  Invisible_blue: '隐形蓝',
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
      key: module.key,
      keyCN: module.keyCN,
      items,
      missingMsg: module.missingMsg,
      lowMsg: module.lowMsg,
      remainingNum: module.remainingNum,
    };
  });
});
</script>

<style lang="scss" scoped>
::v-deep(.ant-progress) {
}
::v-deep(.ant-progress .ant-progress-inner),
::v-deep(.ant-progress .ant-progress-bg) {
  border-radius: 0;
}
</style>
