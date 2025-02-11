<template>
  <div class="w-full pb20px">
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>摄像头</span>
    </div>
    <section class="flex flex-wrap gap-20">
      <div
        v-for="(camera, index) in props.data"
        :key="index"
        class="max-w250px p-l-3em p-t-1em"
      >
        <div class="text-[18px]">
          {{ camera.cameraName }}：
          <a-button
            type="link"
            class="btn hover:text-[#89f7ff]!"
            @click="() => setVisible(true)"
          >
            拍照
          </a-button>
          <a-image
            class="hidden"
            :preview="{
              visible,
              onVisibleChange: setVisible,
            }"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
      </div>
    </section>
    <!-- <contextHolder /> -->
  </div>
</template>

<script lang="ts" setup>
// import { openNotify, contextHolder } from '@/components/base/useNotification';
const props = defineProps({
  data: Object,
});
const visible = ref<boolean>(false);
function setVisible(value): void {
  visible.value = value;
}
// 定义按钮点击事件
// const showSuccessNotification = () => {
//   openNotify('topRight', '这是一条成功通知', true);
// };
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
