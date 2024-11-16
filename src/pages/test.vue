<template>
  <!-- <div class="flex wh-full items-center justify-center bg-black relative"> -->
  <div class="item">
    <div>
      ththtrzhaoji
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
// scss
.item div {
  position: relative;
  border: 1px solid #03a9f3;
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    transition: 0.3s ease-in-out;
  }
  &::before {
    top: -5px;
    left: -5px;
    border-top: 1px solid var(--borderColor);
    border-left: 1px solid var(--borderColor);
  }
  &::after {
    right: -5px;
    bottom: -5px;
    border-bottom: 1px solid var(--borderColor);
    border-right: 1px solid var(--borderColor);
  }
  &:hover::before,
  &:hover::after {
    width: calc(100% + 9px);
    height: calc(100% + 9px);
  }
}
</style>
