<template>
  <div class="w-full">
    <a-form
      ref="formRef"
      layout="inline"
      :model="formState"
      class="w-full rounded-[8px] bg-[#ffffff34] p-x-10 p-y-20"
    >
      <a-row :gutter="[0, 0]" class="w-full">
        <a-col :span="5">
          <a-form-item label="批次号" name="batchID">
            <a-input
              v-model:value="formState.batchID"
              placeholder="请输入批次号"
              :maxlength="30"
            />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="5">
          <a-form-item label="证本号" name="docID">
            <a-input
              v-model:value="formState.docID"
              placeholder="请输入证本号"
              :maxlength="30"
            />
          </a-form-item>
        </a-col> -->
        <a-col :span="5">
          <a-form-item label="状态" name="status">
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

const props = defineProps({
  setSearchForm: Function,
});
const formRef = ref();
interface FormState {
  batchID: string;
  docID: string;
  status: number;
  // timeRange: RangeValue;
}
const formState: UnwrapRef<FormState> = reactive({
  batchID: '',
  docID: '',
  status: null,
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
