<template>
  <div ref="parentRef" class="fixed z999 min-w70%" :style="transformStyle">
    <div
      ref="modalTitleRef"
      class="drag-el hg-candidate-box"
      style="width: 100%; cursor: move"
    />
    <div :class="keyboardClass" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
// import layout from 'simple-keyboard-layouts/build/layouts/chinese'; // 中文输入法

// 移动
import type { CSSProperties } from 'vue';

import { useDraggable } from '@vueuse/core';
import layout from '@/utils/chinese';

// 中文库
const props = defineProps({
  keyboardClass: {
    default: 'simple-keyboard',
    type: String,
  },
  input: {
    default: '',
  },
  maxLength: { default: '' },
});

const emit = defineEmits(['onChange', 'onKeyPress', 'closekeyboard']);

const keyboard = ref(null);

const displayDefault = ref({
  '{bksp}': 'backspace',
  '{lock}': 'caps',
  // '{enter}': 'enter',
  '{tab}': 'tab',
  '{shift}': 'shift',
  '{change}': '中文',
  '{space}': ' ',
  '{clear}': '清空',
  '{close}': '关闭',
});

function handleShift() {
  const currentLayout = keyboard.value.options.layoutName;
  const shiftToggle = currentLayout === 'default' ? 'shift' : 'default';
  keyboard.value.setOptions({
    layoutName: shiftToggle,
  });
}

onMounted(() => {
  keyboard.value = new Keyboard(props.keyboardClass, {
    onChange,
    onKeyPress,
    // onKeyReleased,
    layoutCandidates: layout.layoutCandidates,
    layout: {
      default: [
        '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
        '{tab} q w e r t y u i o p [ ] \\',
        '{lock} a s d f g h j k l : ;',
        '{shift} z x c v b n m , . / {clear}',
        '{change} {space} {close}',
      ],
      shift: [
        '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
        '{tab} Q W E R T Y U I O P { } |',
        '{lock} A S D F G H J K L : ;',
        '{shift} Z X C V B N M < > ? {clear}',
        '{change} {space} {close}',
      ],
    },
    preventMouseDownDefault: true,
    layoutCandidatesPageSize: 20,
    // theme: 'simple-keyboard hg-theme-default hg-layout-default',
    physicalKeyboardHighlight: true,
    autoUseTouchEvents: true,
    // physicalKeyboardHighlightPress: true,
    syncInstanceInputs: true,
    mergeDisplay: true,
    stopMouseUpPropagation: false, // 阻止简单键盘按钮上的指针向上事件冒泡到父元素。
    // stopMouseDownPropagation: false, //向下事件冒泡到父元素。
    // useTouchEvents: true, //仅支持触摸事件
    display: displayDefault.value,
    buttonTheme: [
      {
        class: 'hg-red close',
        buttons: '{close}',
      },
      {
        class: 'change',
        buttons: '{change}',
      },
    ],
    maxLength: props.maxLength,
  });
});
function onChange(input) {
  keyboard.value.setInput(input);
  emit('onChange', input, keyboard.value);
}

// function onKeyReleased(button) {
//   console.log('simple-keyboard button released', button);
//   // let c = document.getElementsByClassName('hg-candidate-box')[0];
//   if (document.getElementsByClassName('hg-candidate-box')[0]) {
//     isShowChinese.value = true;
//   } else {
//     isShowChinese.value = false;
//   }
// }

// function onKeyPress(button) {
function onKeyPress(button, $event) {
  if (button === '{close}') {
    emit('closekeyboard');
    return false;
  }
  else if (button === '{change}') {
    if (keyboard.value.options.layoutCandidates !== null) {
      displayDefault.value['{change}'] = '英文';
      keyboard.value.setOptions({
        layoutCandidates: null,
        display: displayDefault.value,
      });
    }
    else {
      displayDefault.value['{change}'] = '中文';
      keyboard.value.setOptions({
        layoutCandidates: layout.layoutCandidates,
        // physicalKeyboardHighlight: true,
        // physicalKeyboardHighlightPress: true,
        display: displayDefault.value,
      });
    }
  }
  else if (button === '{clear}') {
    keyboard.value.setInput('');
  }
  else {
    const value
      = $event.target.offsetParent.parentElement.children[0].children[0].value;
    if (value) {
      keyboard.value.setInput(value);
    }
    emit('onKeyPress', button);
  }
  if (button === '{shift}' || button === '{lock}')
    handleShift();
}
const modalTitleRef = ref<HTMLElement>(null);
const parentRef = ref<HTMLElement>(null);
const { x, y, isDragging } = useDraggable(modalTitleRef);

const startX = ref<number>(0);
const startY = ref<number>(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(30);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });

watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value;
    startY.value = y.value;
    const bodyRect = document.body.getBoundingClientRect();
    const titleRect = modalTitleRef.value.getBoundingClientRect();
    dragRect.value.right = bodyRect.width - titleRect.width;
    dragRect.value.bottom
      = bodyRect.height - titleRect.height - parentRef.value?.clientHeight;
    preTransformX.value = transformX.value;
    preTransformY.value = transformY.value;
  }
  startedDrag.value = true;
});
watch(isDragging, () => {
  if (!isDragging) {
    startedDrag.value = false;
  }
});

watchEffect(() => {
  if (startedDrag.value) {
    transformX.value
      = preTransformX.value
        + Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right)
        - startX.value;
    transformY.value
      = preTransformY.value
        + Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom)
        - startY.value;
  }
});
const transformStyle = computed<CSSProperties>(() => {
  return {
    transform: `translate(${transformX.value}px, ${transformY.value}px)`,
  };
});

defineExpose({
  onKeyPress,
  onChange,
});
watch(
  () => props.input,
  (newInput) => {
    keyboard.value?.setInput(newInput);
  },
);
</script>

<style lang="less">
.drag-el {
  width: 100% !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  background-color: rgba(215, 214, 214, 0.9) !important; //间隙背景颜色
  position: absolute !important;
  height: 40px !important;
  margin-left: 0px !important;
  border-radius: 5px 5px 0 0 !important;
  // top: -35px !important;
}
.hg-candidate-box {
  // position: fixed;
  // left: 0;
  width: 100%;
  color: #000;
  font-size: 28px;
  margin-top: 0px;
  margin-left: -5px;
  border-bottom: 0;
  background-color: rgba(215, 214, 214, 0); //间隙背景颜色
  border-radius: 0;
  .hg-candidate-box-list {
    .hg-candidate-box-list-item {
      padding: 0 20px;
    }
  }
}
.hg-rows {
  width: 100% !important;
  .hg-row {
    height: 40px; // 按钮行的高度
    //padding: 10px;
    .hg-button {
      // 按钮属性
      font-size: 24px; /* 调整字体大小 */
      padding: 5px; /* 调整内边距 */
      // min-width: 40px; /* 设置按钮宽度 */
      height: 40px; /* 设置按钮高度 */
    }
  }
}
.hg-theme-default {
  width: 100%;
  //height: 265px;
  // left: 415;
  // top: px;
  left: 0;
  // position: fixed;
  border-radius: 0 0 5px 5px;
  bottom: 0;
  background-color: rgba(215, 214, 214, 0.9); //间隙背景颜色
  z-index: 9999;
  .hg-button {
    &.hg-red {
      background: #db3e5d !important;
      color: white;
      &.close {
        max-width: 200px;
      }
    }
    &.change {
      max-width: 200px;
    }
  }
}
.hg-button {
  background-color: rgba(31, 36, 46, 0.95) !important;
  // background-color: rgba(27, 27, 245, 0.95) !important;
  color: antiquewhite;
}
// shift按钮大小
.hg-button-shift {
  width: 180px;
}
// 清空按钮大小
.hg-button-clear {
  width: 180px;
}
// 回车按钮大小
.hg-button-enter {
  width: 150px;
}
// 切换按钮大小
.hg-button-lock {
  width: 150px;
}
</style>
