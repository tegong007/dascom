<template>
  <div class="w-full">
    <a-form ref="formRef" :model="formState" class="w-full">
      <a-row :gutter="[10, 0]">
        <a-col :span="6">
          <a-form-item label="证本号" name="docID">
            <a-input
              v-model:value="formState.docID"
              placeholder="请输入证本号"
              :maxlength="30"
              allow-clear
            />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item label="证本状态" name="docStatus">
            <a-select v-model:value="formState.docStatus">
              <a-select-option
                v-for="option in docStatusOptions"
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

import { docStatusOptions } from '@/pages/bigScreen/batch/option.ts';

const props = defineProps({
  setSearchForm: Function,
});
const formRef = ref();
interface FormState {
  docName: string;
  docID: string;
  docStatus: number;
  // timeRange: RangeValue;
}
const formState: UnwrapRef<FormState> = reactive({
  docName: '',
  docID: '',
  docStatus: null,
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
</script>

<style lang="scss" scoped>
::v-deep(.ant-form-item) {
  label {
    color: #fff !important;
    font-size: 16px;
  }
}
</style>
