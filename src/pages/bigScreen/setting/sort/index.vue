<template>
  <div class="">
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>演示模式</span>
    </div>
    <section class="p-l-2em p-t-1em">
      <a-button class="btn" type="primary" @click="$goto('AddBatch')">
        添加批次
      </a-button>
    </section>
    <div class="mt1em bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>密码设置</span>
    </div>
    <section class="p-l-2em p-t-1em">
      <a-button class="btn" type="primary" @click="setSuccessOpen(true)">
        密码设置
      </a-button>
    </section>
  </div>
  <SuceessModal
    :open="successOpen"
    :handle-ok="() => setSuccessOpen(false)"
    :handle-cancel="() => setSuccessOpen(false)"
    title="设置密码"
  />
</template>

<script setup lang="ts">
import SuceessModal from './setPwModal.vue';

const successOpen = ref<boolean>(false);
function setSuccessOpen(value: boolean) {
  successOpen.value = value;
}
</script>

<style lang="scss" scoped></style>
