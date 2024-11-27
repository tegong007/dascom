<template>
  <div class="bg h-100vh w-full">
    <bigScreenHeader />
    <div class="content wh-full flex flex-col text-white">
      <div
        class="bg-color m-x-4em m-t-7em box-border h-83% flex flex-col gap-2.5em border-[4px] border-[#3F89DD] p-3em"
      >
        <a-form
          layout="inline"
          :model="formState"
          size="large"
          @finish="handleFinish"
          @finish-failed="handleFinishFailed"
        >
          <a-form-item label="批次号">
            <a-input v-model:value="formState.user" placeholder="Username" />
          </a-form-item>
          <a-form-item label="团组号">
            <a-input
              v-model:value="formState.password"
              type="password"
              placeholder="Password"
            />
          </a-form-item>
          <a-form-item label="证本号">
            <a-input
              v-model:value="formState.password"
              type="password"
              placeholder="Password"
            />
          </a-form-item>
          <a-form-item label="时间">
            <a-range-picker v-model:value="value2" show-time />
          </a-form-item>
          <a-form-item>
            <a-button type="link" class="btn hover:text-[#89f7ff]!">
              查询
            </a-button>
          </a-form-item>
        </a-form>
        <main class="h95%">
          <History />
        </main>
      </div>
      <!-- <main class="w-90% h-100%"><History /></main> -->
    </div>

    <div class="absolute bottom-0 h6em w-full flex items-center justify-center">
      <div
        class="returnBtn h-8em w-13em transition-transform duration-300 hover:scale-115"
        @click="goto('BigScreen')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { UnwrapRef } from 'vue';
import type { FormProps } from 'ant-design-vue';
import type { Dayjs } from 'dayjs';
import History from './table.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import router from '@/router/index.ts';

function goto(page: string) {
  router.push({ name: page });
}

type RangeValue = [Dayjs, Dayjs];
const value2 = ref<RangeValue>();
interface FormState {
  user: string;
  password: string;
}
const formState: UnwrapRef<FormState> = reactive({
  user: '',
  password: '',
});
const handleFinish: FormProps['onFinish'] = (values) => {
  console.log(values, formState);
};
const handleFinishFailed: FormProps['onFinishFailed'] = (errors) => {
  console.log(errors);
};
</script>

<style scoped lang="less">
.content {
  height: calc(100vh - 66px);
  .btn {
    border-radius: 6px;
    opacity: 1;
    background: linear-gradient(209deg, #90ecff 2%, #006af5 69%);
    box-sizing: border-box;
    border: 2px solid #89f7ff;
    padding: 6px 20px;
    color: white;
    height: 40px;
  }
}
.bg {
  background-image: url('@/assets/image/bigScreen/bg-none.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
  .bg-color {
    background: linear-gradient(
      359deg,
      rgba(255, 255, 255, 0.1885) 0%,
      rgba(255, 255, 255, 0.29) 33%,
      rgba(0, 142, 255, 0.29) 98%
    );
  }
}
.returnBtn {
  background-image: url('@/assets/image/bigScreen/returnBtn.png');
  background-size: 100% 100%;
  background-repeat: 'no-repeat';
}
::v-deep(.ant-form-item) {
  label {
    color: #fff !important;
    font-size: 18px;
  }
}
</style>
