<template>
  <div
    class="h-3.7em w-8.6em flex items-center justify-center transition-transform duration-300 hover:scale-115"
  >
    <span>{{ props.title }}</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String, // 表头
});
</script>

<style scoped lang="less">
div {
  background-image: url('@/assets/image/bigScreen/btn/btnBG.png');
  span {
    font-family: youshe;
    font-size: 30px;
    font-weight: normal;
    background: linear-gradient(180deg, #3388ff -3%, #ffffff 54%, #3388ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
}
</style>
