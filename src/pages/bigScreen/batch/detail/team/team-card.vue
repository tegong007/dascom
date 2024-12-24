<template>
  <!-- <div v-for="(item, index) in props.items" :key="item.teamId" class="flex">
    1
  </div> -->
  <div />
</template>

<script setup lang="ts">
// const props = defineProps({
//   items: Array,
// });
</script>

<style lang="scss" scoped>
.container {
  width: 200px;
  margin: 20px;
  border: 1px solid #ccc;
  padding: 10px;
}
.checkbox {
  width: 38px;
  opacity: 1;
  background: rgba(255, 255, 255, 0.12);
  box-sizing: border-box;
  border: 3px solid;
  padding: 8px;
  height: 38px;
  color: #cfdef1;
  position: relative;
  font-family: siyuan;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-image: linear-gradient(180deg, #89f7ff 0%, rgba(0, 237, 255, 0.46) 100%) 2.96;
}
.item {
  opacity: 1;
  background: rgba(255, 255, 255, 0.12);
  box-sizing: border-box;
  border: 3px solid;
  padding: 8px;
  flex: 1;
  color: #cfdef1;
  height: 38px;
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
