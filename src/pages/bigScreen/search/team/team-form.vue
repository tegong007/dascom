<template>
  <div class="w-full">
    <a-form
      ref="formRef"
      layout="inline"
      :model="formState"
      class="w-full rounded-[8px] bg-[#ffffff34] p-x-10 p-y-20 pl210px"
    >
      <a-form-item label="所属批次" name="batchID">
        <a-input
          v-model:value="formState.batchID"
          placeholder="请输入所属批次号"
          :maxlength="30"
          class="w155px"
        />
      </a-form-item>
      <a-form-item label="团组号" name="groupID">
        <a-input
          v-model:value="formState.groupID"
          placeholder="请输入团组号"
          :maxlength="30"
          class="w155px"
        />
      </a-form-item>
      <a-form-item label="派遣单位" name="dispatchUnit">
        <a-input
          v-model:value="formState.dispatchUnit"
          placeholder="请输入派遣单位"
          :maxlength="30"
          class="w155px"
        />
      </a-form-item>
      <a-form-item label="数据来源" name="dataSource">
        <a-input
          v-model:value="formState.dataSource"
          placeholder="请输入数据来源"
          :maxlength="30"
          class="w155px"
        />
      </a-form-item>
      <a-form-item label="加急类型" name="urgentType">
        <a-select
          v-model:value="formState.urgentType"
          placeholder="请选择加急类型"
          :maxlength="30"
          class="w155px"
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
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { defineExpose, defineProps, reactive } from 'vue';
import type { UnwrapRef } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';

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
  console.log('🚀 ~ setBatchIDorGroupId ~ value2:', value2);
  console.log('🚀 ~ setBatchIDorGroupId ~ value1:', value1);
  formState.batchID = value1;
  formState.groupID = value2;
  const filteredForm = Object.fromEntries(
    Object.entries(toRaw(formState)).filter(
      ([_key, value]) => value !== null && value !== undefined && value !== '',
    ),
  );
  props.setSearchForm(filteredForm);
}
// onActivated(() => {
//   nextTick(() => {
//     const query = route.query;
//     groupID.value = query.groupID;
//     formState.groupID = query.groupID;
//   });
// });
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
    })
    .catch((error) => {
      console.log('error', error);
    });
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
