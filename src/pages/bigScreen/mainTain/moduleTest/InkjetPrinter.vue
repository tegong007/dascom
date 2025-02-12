<template>
  <div class="box-border w-full pb20">
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>喷墨机</span>
    </div>
    <div class="w-full flex flex-wrap gap-20">
      <div
        v-for="(uvPrinters, index) in props.data"
        :key="index"
        class="w-full p-l-3em p-t-1em"
      >
        <div class="text-[18px]">
          {{ uvPrinters.printerName }}：
        </div>
        <main class="w-full flex items-end justify-start gap-50">
          <!-- 位置 -->
          <section>
            <div class="mt-10 w-full flex flex-col items-end gap-10">
              <div
                v-for="(item, itemIndex) in uvPrinters.positionItems"
                :key="itemIndex"
                class="text-[18px]"
              >
                {{ item.label }}：
                <a-select
                  v-if="item.label !== '目标位置'"
                  v-model:value="item.value"
                  size="large"
                  class="m-r-10 w-150px"
                >
                  <a-select-option
                    v-for="(option, optionIndex) in item.option"
                    :key="optionIndex"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </a-select-option>
                </a-select>
                <!-- <a-input

                  v-model:value="item.value"
                  size="large"
                  placeholder=""
                  suffix="mm"
                  class="m-r-10 w-150px"
                /> -->
                <a-input-number
                  v-else
                  v-model:value="item.value"
                  size="large"
                  :step="0.01"
                  class="m-r-10 w-150px"
                  addon-after="mm"
                />
              </div>
            </div>
            <div class="mt10 flex justify-evenly">
              <a-button
                type="link"
                class="btn hover:text-[#89f7ff]!"
                @click="
                  transfer('/uvpdps/moto-reposition', [
                    { deviceIndex: uvPrinters.deviceIndex },
                  ])
                "
              >
                复位
              </a-button>
              <a-button
                type="link"
                class="btn hover:text-[#89f7ff]!"
                @click="
                  motoMove(uvPrinters.deviceIndex, uvPrinters.positionItems)
                "
              >
                移动
              </a-button>
            </div>
          </section>

          <!-- 清洗 -->
          <section>
            <div class="mt-10 w-full flex flex-col items-end gap-10">
              <div
                v-for="(item, itemIndex) in uvPrinters.cleanItems"
                :key="itemIndex"
                class="text-[18px]"
              >
                {{ item.label }}：
                <a-select
                  v-model:value="item.value"
                  size="large"
                  class="m-r-10 w-150px"
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
            </div>
            <div class="mt10 flex justify-center">
              <a-button
                type="link"
                class="btn hover:text-[#89f7ff]!"
                @click="
                  cleanHead(uvPrinters.deviceIndex, uvPrinters.cleanItems)
                "
              >
                清洗
              </a-button>
            </div>
          </section>
          <!-- 打印平台 -->
          <section>
            <div class="mt-10 w-full flex flex-col items-center gap-10">
              <div
                v-for="(item, itemIndex) in uvPrinters.printItems"
                :key="itemIndex"
                class="text-[18px]"
              >
                {{ item.label }}：
                <a-select
                  v-model:value="item.value"
                  size="large"
                  class="m-r-10 w-150px"
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
            </div>
            <a-space wrap class="mt10 flex justify-center">
              <a-button
                type="link"
                class="btn hover:text-[#89f7ff]!"
                @click="print(uvPrinters.deviceIndex, uvPrinters.printItems)"
              >
                打印测试页
              </a-button>
            </a-space>
          </section>
        </main>
      </div>
    </div>
    <contextHolder />
  </div>
</template>

<script lang="ts" setup>
import { contextHolder, openNotify } from '@/components/base/useNotification';
import { getApiTransfer } from '@/apis/webApi';
import { useAppStore } from '@/store/index';

const props = defineProps({
  data: Object,
});
async function motoMove(deviceIndex, arr) {
  const objs = [
    {
      deviceIndex,
      headID: Number(arr[0].value),
      intension: Number(arr[1].value),
    },
  ];
  transfer('/uvpdps/clean-head', objs);
}
async function cleanHead(deviceIndex, arr) {
  const objs = [
    {
      deviceIndex,
      axisType: Number(arr[0].value),
      target: Number(arr[1].value),
    },
  ];
  transfer('/uvpdps/moto-move', objs);
}
async function print(deviceIndex, arr) {
  const objs = [
    {
      deviceIndex,
      platform: Number(arr[0].value),
      isUseData: false,
    },
  ];
  transfer('/uvpdps/print', objs);
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
      openNotify('bottomRight', data.rslts[0].msg);
    }
    else {
      openNotify('bottomRight', '操作成功', true);
    }
  }
  catch (error) {
    error;
    openNotify('bottomRight', '操作失败');
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
::v-deep(.ant-input-number-group-addon) {
  background: #fff;
}
</style>
