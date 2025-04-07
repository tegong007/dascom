<template>
  <div class="w-full">
    <a-form
      ref="formRef"
      layout="inline"
      :model="formState"
      class="w-full rounded-[8px] bg-[#ffffff34] p-x-10 p-y-20 pl210px"
    >
      <a-form-item label="团组号" name="groupID">
        <a-input
          v-model:value="formState.groupID"
          placeholder="请输入团组号"
          :maxlength="30"
          class="w155px"
          allow-clear
          @touchstart="onInputFocus($event, 'groupID')"
        />
      </a-form-item>
      <a-form-item label="所属批次" name="batchID">
        <a-input
          v-model:value="formState.batchID"
          placeholder="请输入所属批次号"
          :maxlength="30"
          allow-clear
          class="w155px"
          @touchstart="onInputFocus($event, 'batchID')"
        />
      </a-form-item>
      <a-form-item label="派遣单位" name="dispatchUnit">
        <a-input
          v-model:value="formState.dispatchUnit"
          placeholder="请输入派遣单位"
          :maxlength="30"
          allow-clear
          class="w155px"
          @touchstart="onInputFocus($event, 'dispatchUnit')"
        />
      </a-form-item>
      <a-form-item label="数据来源" name="dataSource">
        <a-input
          v-model:value="formState.dataSource"
          placeholder="请输入数据来源"
          :maxlength="30"
          allow-clear
          class="w155px"
          @touchstart="onInputFocus($event, 'dataSource')"
        />
      </a-form-item>
      <a-form-item label="加急类型" name="urgentType">
        <a-select
          v-model:value="formState.urgentType"
          placeholder="请选择加急类型"
          :maxlength="30"
          class="w155px"
          @touchstart="onInputFocus($event, 'urgentType')"
        >
          <a-select-option :value="null">
            全部
          </a-select-option>
          <a-select-option
            v-for="option in urgencyOptions"
            :key="option.value"
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
        :transform="[0, 30]"
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
import { urgencyOptions } from '@/pages/bigScreen/batch/option.ts';

const props = defineProps({
  setSearchForm: Function,
});
const formRef = ref();
// const groupID = ref('');

interface FormState {
  batchID: string;
  groupID: string;
  dispatchUnit: string;
  dataSource: string;
  urgentType: number;
  // timeRange: RangeValue;
}
const formState: UnwrapRef<FormState> = reactive({
  batchID: '',
  groupID: '',
  dispatchUnit: '',
  dataSource: '',
  urgentType: null,
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

onDeactivated(() => {
  formRef.value.resetFields();
});

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

  // 获取组件的位置信息
  // const rect = event.target.getBoundingClientRect();
  // console.log('🚀 ~ onInputFocus ~ rect:', rect);

  // // 获取距离上方和左方的位置
  // const top = rect.bottom + rect.height + window.scrollY; // 距离页面顶部的位置
  // const left = rect.left + window.scrollX; // 距离页面左侧的位置

  // console.log('距离页面顶部的位置:', top);
  // console.log('距离页面左侧的位置:', left);
}
// 给输入框赋值
function onChangeKeyboard(input, keyboard) {
  console.log('🚀 ~ onChangeKeyboard ~ input:', input);
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
