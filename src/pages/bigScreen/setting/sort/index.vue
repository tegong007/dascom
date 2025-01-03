<template>
  <div class="p20">
    <a-space wrap :size="20">
      <a-button class="btn" type="primary">
        演示模式
      </a-button>
      <a-button class="btn" type="primary" @click="$goto('AddBatch')">
        添加批次
      </a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
