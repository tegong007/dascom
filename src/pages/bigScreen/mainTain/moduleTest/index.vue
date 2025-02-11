<template>
  <div class="wh-full">
    <Reader
      v-if="item.readers"
      :data="item.readers"
      :update-item="handleUpdateItem"
    />
    <Camera
      v-if="item.cameras"
      :data="item.cameras"
      @update-item="handleUpdateItem"
    />
    <Laser
      v-if="item.lasers"
      :data="item.lasers"
      @update-item="handleUpdateItem"
    />
    <InkjetPrinter
      v-if="item.uvPrinters"
      :data="item.uvPrinters"
      @update-item="handleUpdateItem"
    />
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import Reader from './Reader.vue';
import Camera from './Camera.vue';
import Laser from './Laser.vue';
import InkjetPrinter from './InkjetPrinter.vue';
import { mainTainModule } from '@/apis/proApi';

const props = defineProps({
  currentModel: String,
});
const item = ref({
  readers: [
    {
      readerName: '读卡器1',
      deviceIndex: 'M3-Reader-1',
      value: '',
    },
    {
      readerName: '读卡器2',
      deviceIndex: 'M3-Reader-1',
      value: '',
    },
  ],
  cameras: [
    {
      cameraName: '摄像头1',
      deviceIndex: 'M3-Reader-1',
    },
    {
      cameraName: '摄像头1',
      deviceIndex: 'M3-Reader-1',
    },
  ],
  lasers: [
    {
      laserName: '激光器1',
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
    },
    {
      laserName: '激光器2',
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
          value: '2',
        },
      ],
    },
  ],
  uvPrinters: [
    {
      printerName: '喷墨机1',
      deviceIndex: 'M3-Reader-1',
      positionItems: [
        {
          label: '轴选择',
          option: [
            {
              value: 'x',
              label: 'x轴',
            },
            {
              value: 'y',
              label: 'y轴',
            },
          ],
          value: 'x',
        },
        {
          label: '目标位置',
          option: null,
          value: '',
        },
      ],
      cleanItems: [
        {
          label: '清洗组合',
          option: [
            {
              value: 'H1H2H3H4',
              label: '四头-全部',
            },
            {
              value: 'H1H2',
              label: '四头-H1H2',
            },

            {
              value: 'H3H4',
              label: '四头-H3H4',
            },
          ],
          value: 'H1H2H3H4',
        },
        {
          label: '清洗强度',
          option: [
            {
              value: '0',
              label: '清洗_弱',
            },
            {
              value: '1',
              label: '清洗_中',
            },

            {
              value: '2',
              label: '清洗_强',
            },
          ],
          value: '2',
        },
      ],
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
    },
  ],
});
function handleUpdateItem(arrayName, index, value) {
  if (item.value[arrayName] && item.value[arrayName][index]) {
    item.value[arrayName][index].value = value;
  }
}
async function getData(newValue: string) {
  const data = await mainTainModule.getDevice({ moduleID: Number(newValue) });
  if (data.respData) {
    item.value = data.respData;
    // Object.assign(item, data.respData);
  }
  // console.log('🚀 ~ data:', item);
}

watch(
  () => props.currentModel,
  (newValue) => {
    console.log('🚀 ~ newValue:', newValue);
    getData(newValue);
    // if (newValue === 'haocai') {
    // //   getDataPage();
    // } else {
    //   stop();
    // }
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
</style>
