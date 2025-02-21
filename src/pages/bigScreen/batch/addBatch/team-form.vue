<template>
  <div class="w-full">
    <a-form
      ref="formRef"
      layout="inline"
      :model="formState"
      :rules="rules"
      class="w-full rounded-[8px] bg-[#ffffff34] p-x-10 p-y-20"
    >
      <a-row :gutter="[0, 0]" class="w-full" justify="space-evenly">
        <a-col :span="5">
          <a-form-item label="组团人数" name="num">
            <a-input-number
              v-model:value="formState.num"
              placeholder="请输入组团人数"
              class="w-full"
              :min="1"
            />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item label="派遣单位" name="dispatchUnit">
            <a-select
              v-model:value="formState.dispatchUnit"
              placeholder="请选择派遣单位"
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
        <a-col :span="5">
          <a-form-item label="数据来源" name="dataSource">
            <a-select
              v-model:value="formState.dataSource"
              placeholder="请选择数据来源"
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
        <a-col :span="5">
          <a-form-item label="加急类型" name="urgentType">
            <a-select
              v-model:value="formState.urgentType"
              placeholder="请选择加急类型"
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
        <a-col :span="2" class="text-right">
          <a-button
            type="primary"
            class="btn flex items-center hover:text-[#89f7ff]!"
            @click="onSubmit"
          >
            <PlusCircleFilled />
            添加团组
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive } from 'vue';
import type { UnwrapRef } from 'vue';
import { PlusCircleFilled } from '@ant-design/icons-vue';

import {
  dataSourceOptions,
  dispatchUnitOptions,
  urgencyOptions,
} from '../option';
// 确保路径确
const props = defineProps({
  addTeam: Function, // 表头
});
const formRef = ref();
const rules = {
  num: [
    {
      required: true,
      message: '请输入组团人数',
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
interface FormState {
  num: number;
  dispatchUnit: string;
  dataSource: string;
  urgentType: string;
  // timeRange: RangeValue;
}
const formState: UnwrapRef<FormState> = reactive({
  num: 1,
  dispatchUnit: 1,
  dataSource: 1,
  urgentType: 0,
});

function onSubmit() {
  formRef.value
    .validate()
    .then(() => {
      // console.log('values', formState, toRaw(formState));
      props.addTeam(toRaw(formState));
    })
    .catch((error) => {
      console.log('error', error);
    });
}
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
