<template>
  <div class="wh-full">
    <Reader :data="item.readers" />
    <Camera :data="item.cameras" />
    <Laser :data="item.lasers" />
    <!-- <Laser :data="item.lasers" /> -->
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import Reader from './Reader.vue';
import Camera from './Camera.vue';
import Laser from './Laser.vue';

const props = defineProps({
  currentModel: String,
});
const item = {
  readers: [
    {
      readerName: '读卡器1',
      valueModel: '',
    },
    {
      readerName: '读卡器2',
      valueModel: '',
    },
  ],
  cameras: [
    {
      cameraName: '摄像头1',
    },
    {
      cameraName: '摄像头2',
    },
  ],
  lasers: [
    {
      laserName: '激光器1',
    },
    {
      laserName: '激光器2',
    },
  ],
};

watch(
  () => props.currentModel,
  (newValue) => {
    console.log('🚀 ~ file: index.vue:177 ~ newValue:', newValue);
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
