<template>
  <a-modal
    :get-container="false"
    :open="props.open"
    wrap-class-name="test"
    :closable="false"
    centered
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
              <a-col :span="12">
                <a-form-item label="组团人数" name="num">
                  <a-input-number
                    v-model:value="formState.num"
                    placeholder="请输入1-20组团人数"
                    class="w-full"
                    :min="1"
                    :max="20"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="派遣单位" name="dispatchUnits">
                  <a-select
                    v-model:value="formState.dispatchUnits"
                    placeholder="请选择派遣单位"
                    :disabled="formState.dispatchUnits === '-------'"
                  >
                    <a-select-option
                      v-for="option in dispatchUnitsOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="数据来源" name="dataSources">
                  <a-select
                    v-model:value="formState.dataSources"
                    placeholder="请选择数据来源"
                    :disabled="formState.dispatchUnits === '-------'"
                  >
                    <a-select-option
                      v-for="option in dataSourcesOptions"
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
                    :disabled="formState.dispatchUnits === '-------'"
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
          class="cancelBtn h-110px w-220px transition-transform duration-300 hover:scale-115"
          @click="handleCancel"
        />
        <div
          class="okBtn h-110px w-220px transition-transform duration-300 hover:scale-115"
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
  dataSourcesOptions,
  dispatchUnitsOptions,
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
  dispatchUnits: string;
  dataSources: string;
  urgentType: string;
  // timeRange: RangeValue;
}
const rules = {
  num: [
    {
      required: true,
      message: '请输入1-20组团人数',
      trigger: 'change',
      type: 'number',
    },
    {
      validator: (rule, value): Promise<void> => {
        return new Promise((resolve, reject) => {
          if (value !== undefined && !Number.isInteger(value)) {
            reject(new Error('请输入正整数'));
          }
          else {
            resolve();
          }
        });
      },
      trigger: 'blur',
    },
  ],
};
const formState: UnwrapRef<FormState> = reactive({
  num: 1,
  dispatchUnits: '1',
  dataSources: '1',
  urgentType: 'none',
});
function handleCancel() {
  formRef.value.resetFields();
  props.handleCancel();
}
// 验证通过，告诉爸爸
function onSubmit() {
  formRef.value
    .validate()
    .then(() => {
      props.handleUpdate(toRaw(formState));
    })
    .catch((error) => {
      console.log('error', error);
    });
}
// 弹窗表单收到要修改的值
function updateForm(row: object) {
  formState.num = row.num;
  formState.dispatchUnits = row.dispatchUnits;
  formState.dataSources = row.dataSources;
  formState.urgentType = row.urgentType;
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
