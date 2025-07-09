<template>
  <div
    ref="parentRef"
    class="fixed z999"
    :class="`${props.keyboardWidth} `"
    :style="transformStyle"
  >
    <div
      ref="modalTitleRef"
      class="drag-el hg-candidate-box"
      style="width: 100%; cursor: move"
      @touchstart="startDrag"
    />
    <div :class="keyboardClass" />
  </div>
</template>

<script setup lang="ts">
// 移动
import type { CSSProperties } from 'vue';
import layout from '@/utils/chinese';
import { useDraggable } from '@vueuse/core';
// import layout from 'simple-keyboard-layouts/build/layouts/chinese'; // 中文输入法

import Keyboard from 'simple-keyboard';

import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import 'simple-keyboard/build/css/index.css';

// 中文库
const props = defineProps({
  keyboardClass: {
    default: 'simple-keyboard',
    type: String,
  },
  input: {
    default: '',
  },
  layout: {
    default: 'default',
  },
  keyboardWidth: {
    default: 'w70%',
  },
  transform: {
    default: () => [0, 0], // 使用函数返回默认值
    type: Array,
  },
  maxLength: { default: '' },
});

const emit = defineEmits(['onChange', 'onKeyPress', 'closekeyboard']);

const keyboard = ref(null);

const displayDefault = ref({
  '{bksp}': '删除',
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

function startDrag(event: MouseEvent | TouchEvent) {
  event.preventDefault();
}
const keyValue = ref('');
onMounted(() => {
  keyboard.value = new Keyboard(props.keyboardClass, {
    onChange,
    onKeyPress,
    onKeyReleased: (button) => {
      console.log('simple-keyboard button released', button);
      if (keyValue.value !== props.input) {
        if (
          keyValue.value.length > props.input.length
          && keyboard.value.caretPosition >= keyValue.value.length
        ) {
          keyboard.value.setCaretPosition(props.input.length);
        }
        keyboard.value?.setInput(props.input);
      }
    },

    // onKeyReleased,
    layoutCandidates: layout.layoutCandidates,
    layoutName: props.layout,
    theme: `hg-theme-${props.layout}`,
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
      num: ['1 2 3', '4 5 6', '7 8 9', '{bksp} 0 {close}'],
      floatNum: ['1 2 3', '4 5 6', '7 8 9', '{bksp} . 0 {close}'],
    },
    autoUseTouchEvents: false,
    debug: false,
    useMouseEvents: true,
    stopMouseUpPropagation: true,
    stopMouseDownPropagation: true,

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
  const newInput = input;
  keyValue.value = newInput;
  emit('onChange', newInput, keyboard.value);
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
const transformX = ref(props.transform[0]);
const transformY = ref(props.transform[1]);
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
    console.log('🚀 ~ newI传入值put:', newInput);
    keyboard.value?.setInput(newInput);
  },
  { deep: true, immediate: true },
);
// watch(
//   () => keyValue.value,
//   (newInput) => {
//     console.log('🚀 ~ keyValue:', newInput);
//   },
//   { deep: true, immediate: true },
// );
// 键盘值与变化值保持一致
// watch(
//   () => keyValue.value,
//   (newInput) => {
//     if (newInput !== props.input) {
//       console.log('🚀 ~ keyValue.value不一样:', newInput, props.input);
//       keyboard.value?.setInput(props.input);
//       keyValue.value = props.input;
//       console.log('🚀 ~ keyValue.valub变成e:', keyValue.value);
//     } else {
//       console.log('🚀 ~ keyyi一样lue:');
//     }
//   },
//   { deep: true, immediate: true },
// );
watch(
  () => props.layout,
  (newInput) => {
    keyboard.value.setOptions({
      layoutName: newInput,
    });

    // keyboard.value?.setOptions({ layout: newInput });
  },
);
watch(
  () => props.transform,
  (newInput) => {
    transformX.value = newInput[0];
    transformY.value = newInput[1];
    // keyboard.value?.setOptions({ layout: newInput });
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

.hg-theme-num,
.hg-theme-floatNum {
  background-color: #ececec;
  border-radius: 5px;
  box-sizing: border-box;
  font-family:
    HelveticaNeue-Light,
    Helvetica Neue Light,
    Helvetica Neue,
    Helvetica,
    Arial,
    Lucida Grande,
    sans-serif;
  overflow: hidden;
  padding: 5px;
  touch-action: manipulation;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  width: 100%;
  background-color: rgba(215, 214, 214, 0.9); //间隙背景颜色
  border-radius: 0 0 5px 5px;
  button {
    &.hg-button {
      border-width: 0;
      font-size: inherit;
      outline: 0;
    }
  }
  .hg-button {
    display: inline-block;
    flex-grow: 1;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #b5b5b5;
    border-radius: 5px;
    box-shadow: 0 0 3px -1px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 40px;
    justify-content: center;
    padding: 5px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    &.hg-red {
      background: #db3e5d !important;
      color: white;
      &.close {
        max-width: 200px;
      }
    }
    &.hg-standardBtn {
      width: 20px;
      &.hg-button-at {
        max-width: 45px;
      }
    }
    &.hg-activeButton {
      background: #efefef;
    }
    &.hg-button-numpad0 {
      width: 105px;
    }
    &.hg-button-com {
      max-width: 85px;
    }
    &.hg-selectedButton {
      background: rgba(5, 25, 70, 0.53);
      color: #fff;
    }
  }
  .hg-row {
    display: flex;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
    & > div {
      &:last-child {
        margin-right: 0;
      }
    }
    .hg-button-container {
      display: flex;
    }
  }
  &.hg-layout-numeric {
    .hg-button {
      align-items: center;
      display: flex;
      height: 60px;
      justify-content: center;
      width: 33.3%;
    }
  }
}
.hg-theme-num .hg-button span,
.hg-theme-floatNum .hg-button span,
.hg-theme-num .hg-button span svg,
.hg-theme-floatNum .hg-button span svg {
  pointer-events: none;
}
.hg-theme-num .hg-row .hg-button-container,
.hg-theme-num .hg-row .hg-button:not(:last-child),
.hg-theme-floatNum .hg-row .hg-button-container,
.hg-theme-floatNum .hg-row .hg-button:not(:last-child) {
  margin-right: 5px;
}
.hg-theme-num .hg-button.hg-button-numpadadd,
.hg-theme-num .hg-button.hg-button-numpadenter,
.hg-theme-floatNum .hg-button.hg-button-numpadadd,
.hg-theme-floatNum .hg-button.hg-button-numpadenter {
  height: 85px;
}
</style>
