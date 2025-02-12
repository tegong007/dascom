<template>
  <div class="box-border w-full">
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>位置调整</span>
    </div>
    <section class="flex flex-wrap gap-20">
      <div
        v-for="(positon, index) in setItem"
        :key="index"
        class="max-w300px p-l-3em p-t-1em"
      >
        <div class="text-[18px]">
          {{ positon.name }}：
          <div
            v-for="(item, itemIndex) in positon.printItems"
            :key="itemIndex"
            class="mt-10"
          >
            {{ item.label }}：
            <a-select
              v-model:value="item.value"
              size="large"
              class="ml w-100px"
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
          <div class="mt10 w-full flex flex-col items-end gap-10">
            <div
              v-for="(item, itemIndex) in positon.positionItems"
              :key="itemIndex"
              class="text-[18px]"
            >
              {{ item.label }}：
              <a-input-number
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
                getPlatformConfig(positon.deviceIndex, positon.printItems)
              "
            >
              读取
            </a-button>
            <a-button
              type="link"
              class="btn hover:text-[#89f7ff]!"
              @click="
                setPlatformConfig(
                  positon.deviceIndex,
                  positon.printItems,
                  positon.positionItems,
                )
              "
            >
              设置
            </a-button>
          </div>
        </div>
      </div>
    </section>
    <contextHolder />
  </div>
</template>

<script lang="ts" setup>
import { contextHolder, openNotify } from '@/components/base/useNotification';
import { getApiTransfer } from '@/apis/webApi';
import { useAppStore } from '@/store/index';

const props = defineProps({
  currentModel: String,
});
const setItem = ref([
  {
    name: '喷墨打印平台1',
    deviceIndex: 'M2-UV-1',
    printItems: [
      {
        label: '打印平台',
        option: [
          {
            value: '1',
            label: '1',
          },
          {
            value: '2',
            label: '2',
          },
        ],
        value: '1',
      },
    ],
    positionItems: [
      {
        label: 'x轴',
        value: '',
      },
      {
        label: 'y轴',
        value: '',
      },
    ],
  },
  {
    name: '喷墨打印平台2',
    deviceIndex: 'M3-Reader-1',
    printItems: [
      {
        label: '打印平台',
        option: [
          {
            value: '1',
            label: '1',
          },
          {
            value: '2',
            label: '2',
          },
        ],
        value: '1',
      },
    ],
    positionItems: [
      {
        label: 'x轴',
        value: '',
      },
      {
        label: 'y轴',
        value: '',
      },
    ],
  },
]);

async function getPlatformConfig(deviceIndex, arr, index) {
  const objs = [
    {
      deviceIndex,
      platform: Number(arr[0].value),
    },
  ];
  transfer('/uvpdps/get-platform-config', objs, index);
}
async function setPlatformConfig(deviceIndex, arr, positionItems) {
  const objs = [
    {
      deviceIndex,
      platform: Number(arr[0].value),
      x: positionItems[0].value,
      y: positionItems[1].value,
    },
  ];
  transfer('/uvpdps/set-platform-config', objs, null);
}
async function transfer(url, objs, index) {
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
      if (url === '/uvpdps/get-platform-config') {
        setItem.value[index].positionItems[0].value = data.rslts[0].x;
        setItem.value[index].positionItems[1].value = data.rslts[0].y;
      }
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
// async function getData(newValue: string) {
//   const data = await mainTainModule.getDevice({ moduleID: Number(newValue) });
//   if (data.respData) {
//     item.value = data.respData;
//   } else {
//     item.value = {};
//   }
// }
watch(
  () => props.currentModel,
  (newValue) => {
    console.log('🚀 ~ newValue:', newValue);
    // getData(newValue);
  },
  { deep: true, immediate: true },
);
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
