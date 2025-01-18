<template>
  <div class="wh-full">
    <!-- 初始阶段 -->
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>初始阶段</span>
    </div>
    <section class="p-l-3em p-t-1em">
      <div class="text-[18px]">
        手动送本：
      </div>
      <br>
      <a-button
        type="link"
        class="btn hover:text-[#89f7ff]!"
        @click="sendDocLine"
      >
        手动进本
      </a-button>
      <a-button
        type="link"
        class="btn ml10 hover:text-[#89f7ff]!"
        @click="init"
      >
        初始化
      </a-button>
    </section>
    <section class="p-l-3em p-t-1em">
      <div class="text-[18px]">
        传输速度
      </div>
      <br>

      <a-input
        v-model:value="value"
        size="large"
        placeholder="Basic usage"
        class="m-r-10 w-150px"
      />
      <a-button type="link" class="btn hover:text-[#89f7ff]!">
        保存
      </a-button>
    </section>
    <!-- 执行任务 -->
    <div class="m-t-1.5em bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>执行任务</span>
    </div>
    <section class="p-l-3em p-t-1em">
      <div class="text-[18px]">
        任务执行：
      </div>
      <br>

      <a-select
        v-model:value="value1"
        size="large"
        class="m-r-10 w-150px"
        @change="handleChange"
      >
        <a-select-option :value="0">
          完整
        </a-select-option>
        <a-select-option :value="1">
          只走本
        </a-select-option>
      </a-select>
      <a-button
        type="link"
        class="btn"
        :class="
          !isStop
            ? 'isStop  pointer-events-none hover:text-[#fff]!'
            : 'hover:text-[#89f7ff]!'
        "
        @click="openTask"
      >
        启动任务
      </a-button>
      <a-button
        type="link"
        class="btn m-l-10"
        :class="
          isStop
            ? 'isStop   hover:text-[#fff]! pointer-events-none'
            : 'hover:text-[#89f7ff]!'
        "
        @click="stopTask"
      >
        停止
      </a-button>
    </section>
    <!-- 卡槽操作 -->
    <div class="m-t-1.5em bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>卡槽操作</span>
    </div>
    <section class="p-l-3em p-t-1em">
      <div class="text-[18px]">
        卡槽1：
      </div>
      <br>
      <a-button
        type="link"
        class="btn hover:text-[#89f7ff]!"
        @click="grooveOperate(0, 1)"
      >
        夹紧
      </a-button>
      <a-button
        type="link"
        class="btn ml10 hover:text-[#89f7ff]!"
        @click="grooveOperate(0, 0)"
      >
        松开
      </a-button>
    </section>
    <section class="p-l-3em p-t-1em">
      <div class="text-[18px]">
        卡槽2：
      </div>
      <br>
      <a-button
        type="link"
        class="btn hover:text-[#89f7ff]!"
        @click="grooveOperate(1, 1)"
      >
        夹紧
      </a-button>
      <a-button
        type="link"
        class="btn ml10 hover:text-[#89f7ff]!"
        @click="grooveOperate(1, 0)"
      >
        松开
      </a-button>
    </section>
    <contextHolder />
  </div>
</template>

<script lang="ts" setup>
import type { NotificationPlacement } from 'ant-design-vue';
import { notification } from 'ant-design-vue';
import {
  getApiTransfer,
  initMachine,
  startOrStopPrintTask,
} from '@/apis/webApi';
import { useAppStore } from '@/store/index';

const appStore = useAppStore();
const [api, contextHolder] = notification.useNotification();
function openNotify(
  placement: NotificationPlacement,
  msg: any,
  success?: string,
) {
  return openNotification(placement, msg, success);
}
function openNotification(
  placement: NotificationPlacement,
  msg: any,
  success?: string,
) {
  success
    ? api.success({
      message: '成功',
      description: ` ${msg}`,
      placement,
    })
    : api.error({
      message: '错误信息',
      description: ` ${msg}`,
      placement,
    });
}
const value = ref<string>('10');
const isStop = ref<boolean>(true);
const value1 = ref(1);
function handleChange(value: number) {
  value1.value = value;
}
// 初始化
async function init() {
  try {
    appStore.setSpinning(true);
    await initMachine({ module: 'm0' });
    openNotify('bottomRight', '初始化接口调用成功', 'success');
  }
  catch (error) {
    error;
    openNotify('bottomRight', '初始化接口调用失败');
  }
  finally {
    appStore.setSpinning(false);
  }
}
async function sendDocLine() {
  try {
    // await sendDoc();
    const params = {
      transURI: `/doc-machine/module-send-doc`,
      paraIn: {},
    };
    await getApiTransfer(params);
    openNotify('bottomRight', '手动送本成功', 'success');
  }
  catch (error) {
    error;
    openNotify('bottomRight', '手动送本失败');
  }
}
async function openTask() {
  isStop.value = !isStop.value;
  try {
    appStore.setSpinning(true);
    // await startOrStopPrintTask({ operate: 1 });
    await startOrStopPrintTask({
      operate: 0,
      taskData: {
        docCount: window.docCount,
        testPara: { module: 'm2', type: value1.value },
      },
    });
    openNotify('bottomRight', '开启任务成功', 'success');
  }
  catch (error) {
    error;
    openNotify('bottomRight', '开启任务失败');
    isStop.value = !isStop.value;
  }
  finally {
    appStore.setSpinning(false);
  }
}
async function stopTask() {
  isStop.value = !isStop.value;
  appStore.setSpinning(true);
  try {
    await startOrStopPrintTask({ operate: 1 });
  }
  catch (error) {
    error;
    openNotify('bottomRight', '任务停止失败');
    isStop.value = !isStop.value;
  }
  finally {
    appStore.setSpinning(false);
  }
}
async function grooveOperate(grooveID: number, operate: number) {
  try {
    // await sendDoc();
    const params = {
      transURI: `/doc-machine/groove-operate`,
      paraIn: { grooveID, operate },
    };
    await getApiTransfer(params);
    openNotify('bottomRight', '操作成功', 'success');
  }
  catch (error) {
    error;
    openNotify('bottomRight', '操作失败');
  }
}
</script>

<style scoped>
.btn {
  border-radius: 6px;
  opacity: 1;
  background: linear-gradient(209deg, #90ecff 2%, #006af5 69%);
  box-sizing: border-box;
  border: 2px solid #89f7ff;
  padding: 6px 20px;
  color: white;
  height: 40px;
}
.isStop {
  background: rgba(255, 255, 255, 0.29);
  box-sizing: border-box;
  border: 2px solid #87f6ff;
  /* cursor:; */
}
::v-deep(.ant-select-selection-item) {
  font-size: 16px;
}
</style>
