<template>
  <div class="w-full">
    <a-form ref="formRef" :model="formState" class="w-full">
      <a-row :gutter="[10, 0]">
        <a-col :span="6">
          <a-form-item label="证本号" name="docID">
            <a-input
              v-model:value="formState.docID"
              placeholder="请输入证本号"
            />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="证本名" name="docName">
            <a-input
              v-model:value="formState.docName"
              placeholder="请输入证本名"
            />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item label="证本状态" name="status">
            <a-select v-model:value="formState.status">
              <a-select-option
                v-for="option in BatchStatusOptions"
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
            <SearchOutlined />
            查询
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, reactive } from 'vue';
import type { UnwrapRef } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';

import { BatchStatusOptions } from '@/pages/bigScreen/batch/option.ts';
// 确保路径确
const props = defineProps({
  addTeam: Function, // 表头
});
const formRef = ref();
interface FormState {
  docName: string;
  docID: string;
  status: number;
  // timeRange: RangeValue;
}
const formState: UnwrapRef<FormState> = reactive({
  docName: '',
  docID: '',
  status: null,
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
::v-deep(.ant-form-item) {
  label {
    color: #fff !important;
    font-size: 16px;
  }
}
</style>
