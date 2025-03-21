<template>
  <div :class="keyboardClass" />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';
// import layout from 'simple-keyboard-layouts/build/layouts/chinese'; // 中文输入法
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
function onKeyPress(button, $event) {
  console.log(button);
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
.hg-candidate-box {
  position: fixed;
  // left: 0;
  width: 100%;
  color: #000;
  font-size: 28px;
  margin-top: 0px;
  margin-left: -5px;
  border-bottom: 0;
  background-color: rgba(215, 214, 214, 0.9); //间隙背景颜色
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
      //width: 40px;     /* 设置按钮宽度 */
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
  position: fixed;
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
