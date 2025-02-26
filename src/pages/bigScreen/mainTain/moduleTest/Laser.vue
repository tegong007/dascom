<template>
  <div class="box-border w-full">
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>激光器</span>
    </div>
    <section class="flex flex-wrap gap-20">
      <div
        v-for="(laser, index) in props.data"
        :key="index"
        class="max-w300px p-l-3em p-t-1em"
      >
        <div class="text-[18px]">
          {{ laser.laserName }}：
        </div>

        <div class="mt10 flex flex-wrap justify-between gap-10">
          <div v-for="(item, itemIndex) in laser.printItems" :key="itemIndex">
            <span class="ml20">{{ item.label }}：</span>
            <a-select
              v-model:value="item.value"
              size="large"
              class="ml25 w-100px"
            >
              <a-select-option
                v-for="(option, optionIndex) in item.option"
                :key="optionIndex"
                :value="option.value"
              >
                {{ option.label }}
              </a-select-option>
            </a-select>
          </div>
          <a-button
            type="link"
            class="btn hover:text-[#89f7ff]!"
            @click="previewPhoto(laser.deviceIndex, laser.printItems)"
          >
            预览标刻
          </a-button>
          <a-button
            type="link"
            class="btn hover:text-[#89f7ff]!"
            @click="redLight(laser.deviceIndex, laser.printItems)"
          >
            红光
          </a-button>
          <a-button
            type="link"
            class="btn hover:text-[#89f7ff]!"
            @click="printLaser(laser.deviceIndex, laser.printItems)"
          >
            标刻测试页
          </a-button>
          <a-button
            type="link"
            class="btn hover:text-[#89f7ff]!"
            @click="
              transfer('/lpdps/emergency-stop', [
                { deviceIndex: laser.deviceIndex },
              ])
            "
          >
            急停
          </a-button>
        </div>
      </div>
    </section>
    <a-image
      class="hidden"
      :preview="{
        visible,
        onVisibleChange: setVisible,
      }"
      :src="`data:image/png;base64,${path}`"
    />
    <!-- <contextHolder /> -->
  </div>
</template>

<script lang="ts" setup>
import { App } from 'ant-design-vue';
import { getApiTransfer } from '@/apis/webApi';
import { useAppStore } from '@/store/index';

const props = defineProps({
  data: Object,
});
const { notification } = App.useApp();
const visible = ref<boolean>(false);
const path = ref('');
function setVisible(value): void {
  visible.value = value;
}
async function previewPhoto(deviceIndex, arr) {
  const objs = [
    {
      deviceIndex,
      platform: Number(arr[0].value),
      isUseData: false,
    },
  ];
  transfer('/lpdps/preview', objs);
}
async function redLight(deviceIndex, arr) {
  const objs = [
    {
      deviceIndex,
      platform: Number(arr[0].value),
    },
  ];
  transfer('/lpdps/red-light', objs);
}
async function printLaser(deviceIndex, arr) {
  const objs = [
    {
      deviceIndex,
      platform: Number(arr[0].value),
      isUseData: false,
    },
  ];
  transfer('/lpdps/print', objs);
}
async function transfer(url, objs) {
  try {
    useAppStore().setSpinning(true);
    const params = {
      transURI: url,
      paraIn: {
        objs,
      },
    };
    const data = await getApiTransfer(params);
    if (data.rslts[0].code !== 0) {
      notification.error({
        message: `错误`,
        description: data.rslts[0].msg,
        placement: 'bottomRight',
      });
    }
    else {
      if (url === '/lpdps/preview') {
        path.value = data.rslts[0].imgData;
        setVisible(true);
      }
    }
  }
  catch (error) {
    error;
    notification.error({
      message: `错误`,
      description: '操作失败',
      placement: 'bottomRight',
    });
  }
  finally {
    useAppStore().setSpinning(false);
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
::v-deep(.ant-select-selection-item) {
  font-size: 16px;
}
</style>
