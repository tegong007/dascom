<template>
  <a-modal
    :get-container="false"
    :open="props.open"
    wrap-class-name="test"
    :closable="false"
    centered
    force-render
    @ok="props.handleOk(num)"
  >
    <div
      class="delete-modal box-border h-[25em] p-t-50px"
      :style="{ height: `${props.height}px` }"
    >
      <div class="h-full flex flex-col items-center justify-start">
        <img
          v-if="props.warnIcon"
          src="@/assets/image/warning.png"
          class="h-[10em] w-[10em]"
          alt=""
        >
        <div class="w-80% text-center text-[30px] color-[#627384] font-bold">
          &nbsp;&nbsp; {{ props.title }}
        </div>
        <div
          v-if="props.title === '确认开始进本？'"
          class="mt50 flex items-center justify-center gap-10"
        >
          <span class="text-[30px] color-[#627384] font-bold">可进本数</span>
          <a-input
            v-model:value="num"
            placeholder="（1-2000）"
            class="w-50% text-[30px]"
            :maxlength="4"
            @input="validateInput"
            @touchstart="onInputFocus($event)"
          />
        </div>
        <div v-if="props.title === '确认开始进本？'" v-show="showKeyboard">
          <SimpleKeyboard
            ref="simpleKeyboard"
            keyboard-width="w20%"
            layout="num"
            :max-length="4"
            :input="num"
            @on-change="onChangeKeyboard"
            @closekeyboard="closekeyboard"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <a-flex justify="center" align="center" class="pb-40px">
        <div
          class="cancelBtn h-100px w-200px transition-transform duration-300 hover:scale-105"
          @click="
            () => {
              handleCancel();
              closekeyboard();
            }
          "
        />
        <div
          class="okBtn h-100px w-200px transition-transform duration-300 hover:scale-105"
          @click="handleOk(num)"
        />
      </a-flex>
    </template>
  </a-modal>
  <!-- </div> -->
</template>

<script lang="ts" setup>
import { homeModule } from '@/apis/proApi';
import SimpleKeyboard from '@/components/base/simpleKeyboard.vue';
import { defineProps } from 'vue';

const props = defineProps({
  open: Boolean,
  handleOk: Function,
  title: String,
  warnIcon: Boolean,
  handleCancel: Function,
  height: String,
});
const num = ref('1');

function validateInput(event) {
  // 获取输入框的值
  let value = event.target.value;
  // 使用正则表达式限制输入为1到99的正整数
  const regex = /^(?:[1-9]|[1-9]\d{1,2}|1\d{3}|2000)$/; // 匹配1到2000的正整数
  // 如果输入不符合正则表达式，重置为上一次有效的值
  if (!regex.test(value)) {
    // 如果输入无效，清空输入框或设置为默认值
    num.value = value = '1';
  }
  else {
    // 如果输入有效，更新绑定的值
    num.value = value;
  }

  // 更新输入框的值
  event.target.value = value;
}

const showKeyboard = ref(false); // 键盘默认隐藏
const simpleKeyboard = ref(null);
const cursorPosition = ref('');
function onInputFocus(event) {
  showKeyboard.value = true;
  cursorPosition.value = event.target;
}
// 给输入框赋值
function onChangeKeyboard(input, keyboard) {
  const caretPosition = keyboard.caretPosition;
  if (caretPosition !== null)
    setInputCaretPosition(cursorPosition.value, caretPosition);
  let Newvalue = input;
  console.log('🚀 ~ onChangeKeyboard ~ Newvalue:', Newvalue);
  // 使用正则表达式限制输入为1到99的正整数
  const regex = /^(?:[1-9]|[1-9]\d{1,2}|1\d{3}|2000)$/; // 匹配1到2000的正整数
  // 如果输入不符合正则表达式，重置为上一次有效的值
  if (!regex.test(Newvalue)) {
    // 如果输入无效，清空输入框或设置为默认值
    num.value = Newvalue = '1';
  }
  else {
    // 如果输入有效，更新绑定的值
    num.value = Newvalue;
  }
  num.value = Newvalue;
}
function setInputCaretPosition(elem, pos) {
  setTimeout(() => {
    if (elem.setSelectionRange) {
      elem.focus();
      elem.setSelectionRange(pos, pos);
    }
  });
}
function closekeyboard() {
  showKeyboard.value = false;
  // num.value = '1';
}
async function getDocNum() {
  try {
    const { respData } = await homeModule.getDocNumProduce();
    num.value = `${respData.docNum}`;
  }
  catch (error) {
    error;
  }
}
watch(
  () => props.open,
  (newInput) => {
    if (newInput && props.title === '确认开始进本？') {
      getDocNum();
    }
  },
  { deep: true, immediate: true },
);
</script>

<style scoped lang="less">
::v-deep(.ant-modal-content) {
  padding: 0;
  border-radius: 1em;
  background-image: url('@/assets/image/bigScreen/modal-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  box-sizing: border-box;
}
::v-deep(.ant-modal-mask) {
  background: rgba(0, 0, 0, 0.9);
}
::v-deep(.ant-modal-mask) {
  background: rgba(0, 0, 0, 0.8);
}
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
.cancelBtn {
  background-image: url('@/assets/image/bigScreen/btn/cancel.png');
  background-size: 100% 100%;
  background-repeat: no-repeat; /* 不重复 */
}
.okBtn {
  background-image: url('@/assets/image/bigScreen/btn/ok.png');
  background-size: 100% 100%;
  background-repeat: no-repeat; /* 不重复 */
}
</style>
