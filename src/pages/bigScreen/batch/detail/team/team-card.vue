<template>
  <div class="scoll-bar box-border h-87% w-full p-r-10">
    <section class="mt10 box-border h-30px flex items-center gap-10">
      <div
        class="box-border inline-block h-full w30px flex items-center justify-center border-2 border-[#89F7FF] bg-[#ffffff17]"
        @click="changeAllCheck"
      >
        <img
          src="@/assets/image/bigScreen/btn/checkbox.svg"
          class="h70% w80% bg-[#89F7FF]"
          :class="isAllCheck ? '' : 'hidden'"
        >
      </div>
      <div class="h-full flex flex-1 items-center justify-between p-l-5">
        <span>全选</span><span>已选中：{{ checkRow.length }}个</span>
      </div>
    </section>
    <section
      v-for="item in items"
      :key="item.teamId"
      class="mt10 box-border h-30px flex items-center gap-10 text-[16px]"
    >
      <div
        class="box-border inline-block h-full w30px flex items-center justify-center border-2 border-[#89F7FF] bg-[#ffffff17]"
        @click="changeItemCheck(item, item.checked)"
      >
        <img
          src="@/assets/image/bigScreen/btn/checkbox.svg"
          class="h70% w80% bg-[#89F7FF]"
          :class="item.checked ? '' : 'hidden'"
        >
      </div>
      <div
        class="box-border h-full flex flex-1 items-center border-2 border-[#89F7FF] p-l-5"
      >
        {{ `${item.seq}---${item.teamId}` }}
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps({
  items: Array,
  checkRow: Array,
  setCheckRow: Function,
});
const items = ref(props.items);
const isAllCheck = ref<boolean>(false);

function changeAllCheck() {
  isAllCheck.value = !isAllCheck.value;
  items.value?.map((item) => {
    item.checked = isAllCheck.value;
    return item;
  });
}
function changeItemCheck(item: object) {
  item.checked = !item.checked;
}

// 使用 watch 函数来观察 items 数组的变化
watch(
  items,
  (newItems) => {
    // 遍历 newItems 数组，获取所有 checked 属性为 true 的对象
    const checkRow = newItems.filter(item => item.checked);
    if (checkRow.length === 0) {
      isAllCheck.value = false;
    }
    props.setCheckRow(checkRow);
  },
  { deep: true },
); // 使用 deep 选项来深度监听数组内部的变化
</script>

<style lang="scss" scoped>
::v-deep.scoll-bar {
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  // border-left: 3px solid #7ff3fd;
}
::-webkit-scrollbar-thumb {
  // background-color: #ffffff38;
  background-color: #ffffff69;
  border-radius: 5px;
}
</style>
