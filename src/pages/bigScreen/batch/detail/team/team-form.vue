<template>
  <div class="w-full">
    <a-form
      ref="formRef"
      layout="inline"
      :model="formState"
      class="w-full rounded-[8px] bg-[#ffffff34] p-x-10 p-y-20"
    >
      <a-row :gutter="[0, 0]" class="w-full" justify="space-evenly">
        <a-col :span="5">
          <a-form-item label="团组号" name="teamId">
            <a-input
              v-model:value="formState.teamId"
              placeholder="请输入团组号"
            />
          </a-form-item>
        </a-col>
        <a-col :span="5">
          <a-form-item label="派遣单位" name="dispatchUnits">
            <a-select
              v-model:value="formState.dispatchUnits"
              placeholder="请选择派遣单位"
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
        <a-col :span="5">
          <a-form-item label="数据来源" name="dataSources">
            <a-select
              v-model:value="formState.dataSources"
              placeholder="请选择数据来源"
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
import {
  dataSourcesOptions,
  dispatchUnitsOptions,
  urgencyOptions,
} from '../../option';
// 确保路径确
const props = defineProps({
  addTeam: Function, // 表头
});
const formRef = ref();
interface FormState {
  teamId: string;
  dispatchUnits: string;
  dataSources: string;
  urgentType: string;
  // timeRange: RangeValue;
}
const formState: UnwrapRef<FormState> = reactive({
  teamId: '',
  dispatchUnits: 1,
  dataSources: 1,
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
