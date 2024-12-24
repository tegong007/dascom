<template>
  <div class="h-72px w-full flex justify-center rounded-[8px] bg-[#ffffff34]">
    <div class="w-80% flex justify-evenly text-center color-[#CFDEF1]">
      <a-flex
        v-for="item in items"
        :key="item.item"
        align="center"
        class="text-[18px]"
      >
        <div class="h-full flex flex-col justify-evenly">
          <span>{{ item.item }}数</span>
          <span>{{ item.value }}</span>
        </div>
      </a-flex>
    </div>
  </div>
</template>

<script setup lang="ts">
const items = ref([
  {
    item: '批次',
    value: '215348',
  },
  {
    item: '总证本',
    value: '215348',
  },
  {
    item: '总良本',
    value: '215348',
  },
  {
    item: '总废本',
    value: '215348',
  },
  {
    item: '总待生产',
    value: '215348',
  },
  {
    item: '总挂起',
    value: '215348',
  },
]);
</script>

<style lang="scss" scoped></style>
