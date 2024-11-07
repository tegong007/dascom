<template>
  <!-- 定义一个大容器，此容器可以滚动 -->
  <div ref="viewRef" class="view" @scroll="handleScroll">
    <!-- 定义一个可以撑满整个data的容器，主要是让父元素滚动起来 -->
    <div class="phantom" :style="{ height: `${itemSize * data.length}px` }" />
    <!-- 显示元素列表   因为list也是绝对定位，当父元素进行滚动时，父元素需要平移来表示滚动(实际是看到的是没有滚动) -->
    <div class="list" :style="{ transform: `translateY(${translateLen}px)` }">
      <!-- 显示每条数据 -->
      <div v-for="(item, index) in visibleList" :key="index" :style="{ height: `${itemSize}px` }">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';

// 模拟请求回来的数据
const data = reactive(
  (() => {
    const arr = [];
    for (let i = 0; i < 1000000; i++) arr[i] = i;
    return arr;
  })(),
);
// 每条数据占据的高度像素值
const itemSize = 40;
// 移动的距离
const translateLen = ref(0);
// 绑定的元素
const viewRef = ref(null);
// 从那条数据开始取值
const start = ref(0);
// 可视区显示的条数
const visibleCount = computed(() => Math.ceil(viewRef.value?.clientHeight / itemSize));
// 可视区显示的数据内容(即需要渲染的所有数据内容)
const visibleList = computed(() => data.slice(start.value, start.value + visibleCount.value));
// 滚动起来后需要处理的显示的开始位置和要移动的距离
function handleScroll() {
  const scrollTop = viewRef.value.scrollTop;
  start.value = Math.floor(scrollTop / itemSize);
  console.log('scrollTop==>', scrollTop);
  translateLen.value = scrollTop;
  console.log('translateLen.value==>', translateLen.value);
}
</script>

<style scoped>
.view {
  position: relative;
  height: 400px;
  width: 400px;
  overflow: auto;
}

.phantom {
  /* 必须要绝对定位 */
  position: absolute;
  width: 100%;
  background-color: pink;
}

.list {
  /* 必须要绝对定位 */
  position: absolute;
}
</style>
