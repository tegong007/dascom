<template>
  <div
    v-for="(item, index) in props.items"
    :key="index"
    :class="{ item }"
    @click="selectItem(item, index)"
  >
    <img
      src="@/assets/image/bigScreen/choose-right.png"
      class="absolute right-0 top-0 w-50px"
      :class="`w-50px absolute right-0 top-0 ${selectedIndex === index ? 'opacity-100' : 'opacity-0'}`"
      alt=""
    >
    <span> 序号：{{ item.id }} </span>
    <span> 团组名：{{ item.teamName }} </span>
    <span>团组编号：{{ item.teamId }}</span>
    <span>制证数：{{ item.currentCertificate }}</span>
    <span> 开始制证时间：{{ item.tStartTime }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  handleClick: {
    type: Function,
  },
  items: Array,
});
const selectedIndex = ref(0); // 默认选中第一项

function selectItem(item: any, index: number) {
  selectedIndex.value = index;
  props.handleClick(item.teamId);
}
</script>

<style lang="scss" scoped>
.container {
  width: 200px;
  margin: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}
.item {
  opacity: 1;
  background: rgba(255, 255, 255, 0.12);
  box-sizing: border-box;
  border: 3px solid;
  margin: 12px;
  height: 130px;
  padding: 10px;
  color: #cfdef1;
  position: relative;
  font-family: siyuan;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-image: linear-gradient(180deg, #89f7ff 0%, rgba(0, 237, 255, 0.46) 100%) 2.96;
}
.selected {
  //   background-color: #add8e6;
}
</style>
