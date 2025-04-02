<template>
  <div class="w-full">
    <a-form
      ref="formRef"
      layout="inline"
      :model="formState"
      class="w-full rounded-[8px] bg-[#ffffff34] p-x-10 p-y-20 pl210px"
    >
      <a-form-item label="证本号" name="docID">
        <a-input
          v-model:value="formState.docID"
          placeholder="请输入证本号"
          class="w150px"
          :maxlength="30"
          allow-clear
          @touchstart="onInputFocus($event, 'docID')"
        />
      </a-form-item>
      <a-form-item label="所属批次号" name="batchID">
        <a-input
          v-model:value="formState.batchID"
          placeholder="请输入批次号"
          :maxlength="30"
          class="w150px"
          allow-clear
          @touchstart="onInputFocus($event, 'batchID')"
        />
      </a-form-item>
      <a-form-item label="所属团组号" name="groupID">
        <a-input
          v-model:value="formState.groupID"
          placeholder="请输入团组号"
          :maxlength="30"
          class="w150px"
          allow-clear
          @touchstart="onInputFocus($event, 'groupID')"
        />
      </a-form-item>

      <a-form-item label="状态" name="docStatus" class="w-180px">
        <a-select v-model:value="formState.docStatus">
          <a-select-option
            v-for="option in docStatusOptions"
            :key="option.value"
            class="w-120px"
            :value="option.value"
          >
            {{ option.label }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-button
        type="primary"
        class="btn flex items-center hover:text-[#89f7ff]!"
        @click="onSubmit"
      >
        <SearchOutlined />
        查询
      </a-button>
      <a-button
        type="primary"
        class="btn ml10 w80px hover:text-[#89f7ff]!"
        @click="clearAll"
      >
        清空
      </a-button>
    </a-form>
    <div v-show="showKeyboard">
      <SimpleKeyboard
        ref="simpleKeyboard"
        :input="formState[changeIpt]"
        @on-change="onChangeKeyboard"
        @closekeyboard="closekeyboard"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineExpose, defineProps, reactive } from 'vue';
import type { UnwrapRef } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import SimpleKeyboard from '@/components/base/simpleKeyboard.vue';
import { docStatusOptions } from '@/pages/bigScreen/batch/option.ts';

const props = defineProps({
  setSearchForm: Function,
});
const formRef = ref();
interface FormState {
  batchID: string;
  docID: string;
  groupID?: string;
  docStatus: number;
  // timeRange: RangeValue;
}
const formState: UnwrapRef<FormState> = reactive({
  batchID: '',
  docID: '',
  groupID: '',
  docStatus: null,
});

function setBatchIDandGroupId(value1: string, value2: string) {
  formState.batchID = value1;
  formState.groupID = value2;
  const filteredForm = Object.fromEntries(
    Object.entries(toRaw(formState)).filter(
      ([_key, value]) => value !== null && value !== undefined && value !== '',
    ),
  );
  props.setSearchForm(filteredForm);
}
function onSubmit() {
  formRef.value
    .validate()
    .then(() => {
      const filteredForm = Object.fromEntries(
        Object.entries(toRaw(formState)).filter(
          ([_key, value]) =>
            value !== null && value !== undefined && value !== '',
        ),
      );
      props.setSearchForm(filteredForm);
      closekeyboard();
    })
    .catch((error) => {
      console.log('error', error);
    });
}
function clearAll() {
  formRef.value.resetFields();
  props.setSearchForm();
  closekeyboard();
}
const showKeyboard = ref(false); // 键盘默认隐藏
const changeIpt = ref(''); // 选择了哪个输入框
const simpleKeyboard = ref(null);
const cursorPosition = ref('');
function onInputFocus(event, res) {
  showKeyboard.value = true;
  changeIpt.value = res;
  cursorPosition.value = event.target;
}
// 给输入框赋值
function onChangeKeyboard(input, keyboard) {
  const caretPosition = keyboard.caretPosition;
  if (caretPosition !== null)
    setInputCaretPosition(cursorPosition.value, caretPosition);

  formState[changeIpt.value] = input;
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
}
defineExpose({
  setBatchIDandGroupId,
});
</script>

<style lang="scss" scoped>
.btn {
  border-radius: 6px;
  opacity: 1;
  background: linear-gradient(209deg, #90ecff 2%, #006af5 69%);
  box-sizing: border-box;
  border: 2px solid #89f7ff;
  padding: 0px 7px;
  color: white;
  height: 32px;
}
::v-deep(.ant-form-item) {
  label {
    color: #fff !important;
    font-size: 16px;
  }
}
</style>
