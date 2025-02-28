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
import useCustomTimer from '@/utils/useCustomTimer';
import { documentModule } from '@/apis/proApi';
import { useAppStore } from '@/store/index';

const { start, stop } = useCustomTimer();

const items = ref([
  {
    item: '证本总',
    value: '215348',
  },
  {
    item: '成功',
    value: '215348',
  },
  {
    item: '废本',
    value: '215348',
  },
  {
    item: '待生产',
    value: '215348',
  },
  {
    item: '挂起',
    value: '215348',
  },
]);

onActivated(async () => {
  useAppStore().setSpinning(true);
  await getDataPage();
  useAppStore().setSpinning(false);
});
onDeactivated(() => {
  stop();
});
async function getDataPage() {
  try {
    const data = await documentModule.getDocStatistics({ isAll: 1 });
    if (data.respData) {
      items.value[0].value = data.respData.docNum;
      items.value[1].value = data.respData.productNum;
      items.value[2].value = data.respData.obsoleteNum;
      items.value[4].value = data.respData.waitingNum;
      items.value[5].value = data.respData.hangUpNum;
    }
    startGetDataPage();
  }
  catch (error) {
    error;
    // stop();
  }
}

async function startGetDataPage() {
  start(async () => {
    await getDataPage();
  }, 2);
}
</script>

<style lang="scss" scoped></style>
