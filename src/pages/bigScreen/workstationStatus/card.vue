<template>
  <div class="scoll-bar mt10 box-border h-75% w-90% flex flex-col p-x-100">
    <main
      v-for="(item, index) in items"
      :key="index"
      class="m-t-15 box-border flex flex-col flex-1 color-[#CFDEF1]"
    >
      <a-flex justify="space-between" align="center" class="w-250px">
        <span class="text-[16.72px]">{{ item.title }}模块</span>
        <span
          class="border-2 border-[#89f7ff] p-x-15 p-y-5 text-[16.72px] color-[#89f7ff]"
        >刷新状态</span>
      </a-flex>
      <a-flex
        align="center"
        class="m-y-10 box-border h-full w-full gap-20"
        wrap="wrap"
      >
        <div
          v-for="(data, index) in item.data"
          :key="index"
          class="box-border h-150px w-350px border-2 p-5 line-height-normal"
          :class="getBoxClass(data.status)"
        >
          <div class="mb5 text-[16px]">
            {{ data.title }}工位
          </div>
          <a-row>
            <a-col :span="12" class="text-[14px]">
              本批次发本数：{{ data.num }}
            </a-col>
            <a-col :span="12" class="text-[14px]">
              历史发本总数：{{ data.historyNum }}
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12" class="text-[14px]">
              历史成功总数：{{ data.num }}
            </a-col>
            <a-col :span="12" class="text-[14px]">
              历史失败总数：{{ data.historyNum }}
            </a-col>
          </a-row>
          <div class="mt5 text-[14px]" :class="getTextClass(data.status)">
            状态：{{
              data.status === 'normal' ? '正常' : `异常` + `，${data.msg}`
            }}
          </div>
        </div>
      </a-flex>
    </main>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    title: '空白本检测',
    data: [
      {
        title: '发本',
        num: 111, // 发本数
        success: 100, // 本次成功
        fail: 11, // 本次失败
        historyNum: 222, // 历史发本
        historySuccess: 200, // 历史成功
        historyFail: 22, // 历史失败
        // 还有 良本，废本
        status: 'normal',
        msg: '',
      },
      {
        title: '空白本OCR',
        num: 111, // 发本数
        success: 100, // 本次成功
        fail: 11, // 本次失败
        historyNum: 222, // 历史发本
        historySuccess: 200, // 历史成功
        historyFail: 22, // 历史 失败
        status: 'error',
        msg: '失败原因',
      },
      {
        title: '空白本OCR',
        num: 111, // 发本数
        success: 100, // 本次成功
        fail: 11, // 本次失败
        historyNum: 222, // 历史发本
        historySuccess: 200, // 历史成功
        historyFail: 22, // 历史 失败
        status: 'error',
        msg: '失败原因',
      },

      {
        title: '空白本OCR',
        num: 111, // 发本数
        success: 100, // 本次成功
        fail: 11, // 本次失败
        historyNum: 222, // 历史发本
        historySuccess: 200, // 历史成功
        historyFail: 22, // 历史 失败
        status: 'standby',
        msg: '失败原因',
      },
      // --还有两个状态，以此类推
    ],
  },
  {
    title: '主副页打印',
    data: [
      {
        title: '发本',
        num: 111, // 发本数
        success: 100, // 本次成功
        fail: 11, // 本次失败
        historyNum: 222, // 历史发本
        historySuccess: 200, // 历史成功
        historyFail: 22, // 历史失败
        status: 'normal',
        msg: '',
      },
      {
        title: '空白本OCR',
        num: 111, // 发本数
        success: 100, // 本次成功
        fail: 11, // 本次失败
        historyNum: 222, // 历史发本
        historySuccess: 200, // 历史成功
        historyFail: 22, // 历史 失败
        status: 'error',
        msg: '失败原因',
      },
      {
        title: '空白本OCR',
        num: 111, // 发本数
        success: 100, // 本次成功
        fail: 11, // 本次失败
        historyNum: 222, // 历史发本
        historySuccess: 200, // 历史成功
        historyFail: 22, // 历史 失败
        status: 'error',
        msg: '失败原因',
      },
      {
        title: '空白本OCR',
        num: 111, // 发本数
        success: 100, // 本次成功
        fail: 11, // 本次失败
        historyNum: 222, // 历史发本
        historySuccess: 200, // 历史成功
        historyFail: 22, // 历史 失败
        status: 'error',
        msg: '失败原因',
      },
      // --还有两个状态，以此类推
    ],
  },
  {
    title: '加注页打印',
    data: [
      {
        title: '发本',
        num: 111, // 发本数
        success: 100, // 本次成功
        fail: 11, // 本次失败
        historyNum: 222, // 历史发本
        historySuccess: 200, // 历史成功
        historyFail: 22, // 历史失败
        status: 'normal',
        msg: '',
      },
      {
        title: '成品收集',
        num: 111, // 发本数
        success: 100, // 本次成功
        fail: 11, // 本次失败
        historyNum: 222, // 历史发本
        historySuccess: 200, // 历史成功
        historyFail: 22, // 历史 失败
        status: 'error',
        msg: '失败原因',
      },
      // --还有两个状态，以此类推
    ],
  },
  {
    title: '成品收集',
    data: [
      {
        title: '发本',
        num: 111, // 发本数
        success: 100, // 本次成功
        fail: 11, // 本次失败
        historyNum: 222, // 历史发本
        historySuccess: 200, // 历史成功
        historyFail: 22, // 历史失败
        status: 'normal',
        msg: '',
      },
      {
        title: '空白本OCR',
        num: 111, // 发本数
        success: 100, // 本次成功
        fail: 11, // 本次失败
        historyNum: 222, // 历史发本
        historySuccess: 200, // 历史成功
        historyFail: 22, // 历史 失败
        status: 'error',
        msg: '失败原因',
      },
      // --还有两个工位状态，以此类推
    ],
  },
];
function getBoxClass(status: string) {
  let boxClass = '';
  const borderColor = {
    error: 'border-[#C7080B]',
    normal: 'border-[#89f7ff]',
    standby: 'border-[#CBCBCB]',
    warning: 'border-[#FFB55B]',
  };
  const bgColor = {
    error: 'bg-[#FF0000]/[0.27]',
    normal: 'bg-[#FFFFFF]/[0.09]',
    standby: 'bg-[#CBCBCB]/[0.2]',
    warning: 'bg-[#FF920D]/[0.37]',
  };
  boxClass = `${borderColor[status]} ${bgColor[status]}`;
  return boxClass;
}
function getTextClass(status: string) {
  let textClass = '';
  const textColor = {
    error: 'color-[#FF0000]',
    normal: 'color-[#CFDEF1]',
    standby: 'color-[#DDDDDD]',
    warning: 'color-[#FFB55B]',
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
// ::-webkit-scrollbar-track {
//   background-image: linear-gradient(
//     to bottom,
//     rgba(0, 140, 255, 0.329) 0%,
//     rgba(255, 255, 255, 0.205) 100%
//   );
// }
</style>
