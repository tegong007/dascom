<template>
  <a-modal
    :get-container="false"
    :open="props.open"
    wrap-class-name="test"
    :closable="false"
    centered
    destroy-on-close
    force-render
    @ok="props.handleOk"
  >
    <div class="delete-modal box-border h-[25em] p-t-50px">
      <div class="h-full flex flex-col items-center justify-start">
        <img
          v-if="props.warnIcon"
          src="@/assets/image/warning.png"
          class="mb-[1em] h-[10em] w-[10em]"
          alt=""
        >
        <span class="text-[30px] color-[#627384] font-bold">
          &nbsp;&nbsp; {{ props.title }}</span>
        <div class="scoll-bar mt20px h-full w-80% overflow-y-auto bg-white">
          <a-form
            ref="formRef"
            layout="vertical"
            :model="formState"
            :rules="rules"
            class="w-full rounded-[8px] bg-[#ffffff34] p-x-10 p-y-20"
          >
            <a-row :gutter="[20, 0]" class="w-full" justify="space-evenly">
              <a-col :span="24">
                <a-form-item label="是否团组" name="isTeam">
                  <a-select
                    v-model:value="formState.isTeam"
                    placeholder="请选择是否团组"
                    :disabled="props.title !== '新增团组'"
                    @change="teamChange"
                  >
                    <a-select-option
                      v-for="option in teamOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="组团人数" name="num">
                  <a-input
                    v-model:value="formState.num"
                    placeholder="请输入数字（1-99）"
                    class="w-full"
                    :maxlength="2"
                    @input="validateInput"
                    @blur="validateInput"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="派遣单位" name="dispatchUnit">
                  <a-select
                    v-model:value="formState.dispatchUnit"
                    placeholder="请选择派遣单位"
                    :disabled="formState.dispatchUnit === '-------'"
                  >
                    <a-select-option
                      v-for="option in dispatchUnitOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="数据来源" name="dataSource">
                  <a-select
                    v-model:value="formState.dataSource"
                    placeholder="请选择数据来源"
                    :disabled="formState.dispatchUnit === '-------'"
                  >
                    <a-select-option
                      v-for="option in dataSourceOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="加急类型" name="urgentType">
                  <a-select
                    v-model:value="formState.urgentType"
                    placeholder="请选择加急类型"
                    :disabled="formState.dispatchUnit === '-------'"
                  >
                    <a-select-option
                      v-for="option in urgencyOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </div>
    </div>
    <template #footer>
      <a-flex justify="center" align="center" class="pb-40px">
        <div
          class="cancelBtn h-110px w-220px transition-transform duration-300 hover:scale-105"
          @click="handleCancel"
        />
        <div
          class="okBtn h-110px w-220px transition-transform duration-300 hover:scale-105"
          @click="onSubmit"
        />
      </a-flex>
    </template>
  </a-modal>
  <!-- </div> -->
</template>

<script lang="ts" setup>
import { defineExpose, defineProps } from 'vue';
import type { UnwrapRef } from 'vue';
import {
  dataSourceOptions,
  dispatchUnitOptions,
  teamOptions,
  urgencyOptions,
} from '../../option.js';

const props = defineProps({
  open: Boolean,
  handleOk: Function,
  title: String,
  warnIcon: Boolean,
  handleCancel: Function,
  handleUpdate: Function,
});
const formRef = ref();
interface FormState {
  num: number;
  dispatchUnit: string;
  dataSource: string;
  isTeam: string;
  urgentType: string;
  // timeRange: RangeValue;
}
const rules = {
  num: [
    { required: true, message: '请输入组团人数', trigger: ['blur', 'change'] },
    {
      pattern: /^[1-9]\d?$/,
      message: '请输入1到99的正整数',
      trigger: ['blur', 'change'],
    },
  ],
};
const formState: UnwrapRef<FormState> = reactive({
  isTeam: 1,
  num: 1,
  dispatchUnit: 1,
  dataSource: 1,
  urgentType: 0,
});
function teamChange(value) {
  if (!value) {
    formState.dispatchUnit = '-------';
    formState.dataSource = '-------';
    formState.urgentType = '-------';
  }
  else {
    formState.dispatchUnit = 1;
    formState.dataSource = 1;
    formState.urgentType = 0;
  }
}
function validateInput(event) {
  // 获取输入框的值
  let value = event.target.value;
  // 使用正则表达式限制输入为1到99的正整数
  const regex = /^[1-9]\d?$/; // 匹配1到99的正整数
  // 如果输入不符合正则表达式，重置为上一次有效的值
  if (!regex.test(value)) {
    // 如果输入无效，清空输入框或设置为默认值
    formState.num = value = '';
  }
  else {
    // 如果输入有效，更新绑定的值
    formState.num = Number(value);
  }

  // 更新输入框的值
  event.target.value = Number(value);
}
function handleCancel() {
  formRef.value.resetFields();
  props.handleCancel();
}
// 验证通过，告诉爸爸
function onSubmit() {
  formRef.value
    .validate()
    .then(() => {
      props.handleUpdate(
        toRaw(formState),
        props.title === '新增团组' ? 'add' : 'edit',
      );
      formRef.value.resetFields();
    })
    .catch((error) => {
      console.log('error', error);
    })
    .finally(() => {
      // formRef.value.resetFields();
    });
}
// 弹窗表单收到要修改的值
function updateForm(row: object) {
  formState.num = row.num;
  formState.dispatchUnit = row.dispatchUnit;
  formState.dataSource = row.dataSource;
  formState.urgentType = row.urgentType;
  formState.isTeam = row.isTeam;
}
defineExpose({
  updateForm,
});
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
::v-deep(.ant-form-item) {
  label {
    color: #000 !important;
    font-size: 16px;
  }
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  // border-left: 3px solid #7ff3fd;
}
::-webkit-scrollbar-thumb {
  // background-color: #ffffff38;
  background-color: #1110100e;
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
