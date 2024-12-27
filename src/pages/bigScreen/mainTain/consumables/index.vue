<template>
  <div class="box-border wh-full flex flex-col p-x-20 divide-y">
    <section class="h-full flex p-y-20">
      <div class="h-full flex-col flex-1">
        <span class="text-[28px] color-[#CFDEF1]">主副页模块油墨余量</span>
        <div class="flex">
          <div
            v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"
            :key="item"
            class="h240px flex flex-col flex-1 items-center justify-around"
          >
            <img class="w25px" src="@/assets/image/bigScreen/btn/warning.svg">
            <a-progress
              class="relative left-4 w80% rotate-270"
              trail-color="#FFFF0024"
              stroke-color="#FFFF00"
              :percent="50"
              :size="[40, 60]"
              :show-info="false"
            />
            <span>黄色吗</span>
          </div>
        </div>
      </div>
      <div
        class="box-border h-full w-300px border from-[#ffffff38] bg-gradient-to-b"
      />
    </section>
    <section class="h-full flex p-y-20">
      <div class="h-full flex-1">
        <span class="text-[28px] color-[#CFDEF1]">主副页模块油墨余量</span>
      </div>
      <div
        class="box-border h-full w-300px border from-[#ffffff38] bg-gradient-to-b"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
// const items = ref([
//   {
//     trailColor: '#FFFF0024',
//     strokeColor: '#FFFF00',
//     name: '黄色',
//     value: 50,
//   },
// ]);
// const mainPrintData = ref({
//   yellow: 50, //百分比 黄色
//   magenta: 40, //洋红
//   cyan: 30, //青色
//   black: 40, //黑色
//   vararnish: 100, //光油
//   Invisible_red: 30, //隐形红
//   Invisible_green: 50, //隐形绿
//   Invisible_blue: 80, //隐形蓝
// });
// const setMainPrintData=()=>{
//     items.value[0].value=mainPrintData.yellow
//     items.value[1].value=mainPrintData.magenta
//     items.value[2].value=mainPrintData.cyan
//     items.value[3].value=mainPrintData.black
//     items.value[4].value=mainPrintData.vararnish
//     items.value[5].value=mainPrintData.Invisible_red
//     items.value[6].value=mainPrintData.Invisible_green
//     items.value[7].value=mainPrintData.Invisible_blue
// }
</script>

<style lang="scss" scoped>
::v-deep(.ant-progress) {
}
::v-deep(.ant-progress .ant-progress-inner),
::v-deep(.ant-progress .ant-progress-bg) {
  border-radius: 0;
}
</style>
