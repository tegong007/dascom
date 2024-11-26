<template>
  <div class="h-full flex flex-col color-[#CFDEF1] font-[siyuan]">
    <section class="flex flex-1">
      <main
        v-for="(item, index) in items"
        :key="index"
        class="flex flex-1 items-center"
      >
        <div class="h-50px w-full flex flex-col items-center justify-start">
          <div>
            {{ item.name }}
          </div>
          <div class="mt15 text-[1.3em]">
            {{ item.num }}
          </div>
        </div>
      </main>
    </section>
    <section class="flex flex flex-col flex-[1.5] items-center justify-between">
      <hr class="w70% color-[#fff]">
      <div class="w-full flex">
        <main v-for="(item, index) in current" :key="index" class="flex-1">
          <div class="h-full w-full flex flex-col items-center justify-center">
            <div>
              {{ item.name }}
            </div>
            <div class="mt15 text-[1.5em]">
              <CountTo
                :start-val="0"
                separator
                :end-val="item.num"
                :duration="Math.floor(Math.random() * 2000) + 1000"
              />
            </div>
          </div>
        </main>
      </div>
      <div class="w-full flex">
        <main v-for="(item, index) in total" :key="index" class="flex-1">
          <div class="h-full w-full flex flex-col items-center justify-center">
            <div>
              {{ item.name }}
            </div>
            <div
              class="mt15 text-[1.5em]"
              :class="
                item.status === 'error'
                  ? 'color-red'
                  : item.status === 'success'
                    ? 'color-green'
                    : ''
              "
            >
              <CountTo
                :start-val="0"
                separator
                :end-val="item.num"
                :duration="Math.floor(Math.random() * 2000) + 1000"
              />
            </div>
          </div>
        </main>
      </div>
      <hr class="w70% color-[#fff]">
    </section>
    <section class="flex flex-1">
      <!-- 1 -->
      <main v-for="(item, index) in origns" :key="index" class="flex-1">
        <div class="h-full w-full flex flex-col items-center justify-center">
          <div>
            {{ item.name }}
          </div>
          <div class="mt15 text-[1.3em]">
            {{ item.num }}
          </div>
        </div>
      </main>
      <!-- <a-divider orientation="right" orientation-margin="50px"/> -->
    </section>
  </div>
</template>

<script setup lang="ts">
const items = [
  {
    name: '批次编号',
    num: 'PC000001',
    status: 'error',
  },
  {
    name: '团组名',
    num: '泰国外交部',
    status: 'normal',
  },
  {
    name: '团组编号',
    num: 'T000001',
    status: 'warning',
  },
];
const total = [
  {
    name: '总制证数',
    num: 15,
    status: 'normal',
  },
  {
    name: '总成本数',
    num: 14,
    status: 'success',
  },
  {
    name: '总废本数',
    num: 1,
    status: 'error',
  },
];
const current = [
  {
    name: '当前制证数',
    num: 15,
    status: 'normal',
  },
];
const origns = [
  {
    name: '数据来源',
    num: '外交部',
    status: 'normal',
  },
  {
    name: '制证人',
    num: '张三',
    status: 'normal',
  },
];
</script>

<style lang="scss" scoped></style>
