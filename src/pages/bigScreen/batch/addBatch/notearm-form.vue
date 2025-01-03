<template>
  <a-form
    ref="formRef"
    layout="inline"
    :model="formState"
    :rules="rules"
    class="w-full rounded-[8px] bg-[#ffffff34] p-x-10 p-y-20"
  >
    <a-row :gutter="[0, 0]" class="w-full" justify="space-evenly">
      <a-col :span="5">
        <a-form-item label="无组团人数" name="num">
          <a-input-number
            id="inputNumber"
            v-model:value="formState.num"
            class="w-full"
            :min="1"
            :max="20"
          />
        </a-form-item>
      </a-col>
      <a-col :span="18" class="text-right">
        <a-button
          type="primary"
          class="btn flex items-center hover:text-[#89f7ff]!"
          @click="onSubmit"
        >
          <SettingFilled />
          设置
        </a-button>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { defineProps, reactive } from 'vue';
import type { UnwrapRef } from 'vue';
import { SettingFilled } from '@ant-design/icons-vue';

const props = defineProps({
  addTeam: Function, // 表头
  updateNoTeamNum: Function,
});
const isFirstClick = ref<boolean>(true);
const formRef = ref();
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
interface FormState {
  num: number;
}

const formState: UnwrapRef<FormState> = reactive({
  num: 1,
});

function onSubmit() {
  formRef.value
    .validate()
    .then(() => {
      if (isFirstClick.value) {
        props.addTeam({
          ...toRaw(formState),
          dispatchUnit: '-------',
          dataSource: '-------',
          urgentType: '--------',
        });
        isFirstClick.value = false;
      }
      else {
        props.updateNoTeamNum(formState.num);
      }
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
