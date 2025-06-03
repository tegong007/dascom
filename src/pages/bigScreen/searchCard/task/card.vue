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
      :key="item"
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
        {{ `${item.batchID}` }}
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
  oldCheckedRow: Array,
});

const items = ref([]);

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
watch(
  () => props.items,
  () => {
    console.log('🚀 ~  props.items:', props.items);
    items.value = props.items;
  },
  { deep: true, immediate: true },
);
watch(
  items,
  (newItems) => {
    // 加上翻页数据的新选中数据
    // 创建一个 Map，以 groupID 为键，存储 oldCheckedRow 中的项
    const oldCheckedMap = new Map(
      props.oldCheckedRow.map(item => [item.groupID, item]),
    );

    // 遍历 newItems，处理重复项和新增项
    const resultArray = [];
    newItems.forEach((item) => {
      if (item.checked === false) {
        // 如果 newItems 中的 checked 为 false，删除 oldCheckedMap 中对应的条目
        oldCheckedMap.delete(item.groupID);
      }
      else if (item.checked === true) {
        // 如果 newItems 中的 checked 为 true，保留该条目
        oldCheckedMap.set(item.groupID, item); // 更新或添加到 Map 中
      }
    });

    // 将 Map 中剩余的项（未被删除的）加入结果数组
    oldCheckedMap.forEach((item) => {
      if (item.checked) {
        // 确保只添加 checked 为 true 的条目
        resultArray.push(item);
      }
    });

    // 重新打钩
    newItems.forEach((sourceItem, index) => {
      const targetItem = resultArray.find(
        item => item.groupID === sourceItem.groupID,
      );
      if (targetItem) {
        newItems[index] = targetItem; // 直接替换
      }
    });
    // 当页勾选的数据=页数，即全选
    isAllCheck.value
      = newItems.length && newItems.every(item => item.checked);
    props.setCheckRow(resultArray);
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
