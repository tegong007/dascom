<template>
  <div class="w-full">
    <a-form
      ref="formRef"
      layout="inline"
      :model="formState"
      class="w-full rounded-[8px] bg-[#ffffff34] p-x-10 p-y-20 pl210px"
    >
      <a-form-item label="批次号" name="batchID">
        <a-input
          v-model:value="formState.batchID"
          placeholder="请输入批次号"
          :maxlength="30"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="状态" name="status" class="w-200px">
        <a-select v-model:value="formState.status" class="w-200px">
          <a-select-option
            v-for="option in BatchStatusOptions"
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
import { defineProps, reactive } from 'vue';
import type { UnwrapRef } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';

import { useRoute } from 'vue-router';
import { BatchStatusOptions } from '@/pages/bigScreen/batch/option.ts';

const props = defineProps({
  setSearchForm: Function,
});
const route = useRoute();
const formRef = ref();

interface FormState {
  batchID: string;
  docID: string;
  status: number;
  // timeRange: RangeValue;
}
const batchID = ref('');
const formState: UnwrapRef<FormState> = reactive({
  batchID: batchID.value || '',
  docID: '',
  status: null,
});
onActivated(() => {
  nextTick(() => {
    const query = route.query;
    batchID.value = query.batchID;
    formState.batchID = query.batchID;
  });
});
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
