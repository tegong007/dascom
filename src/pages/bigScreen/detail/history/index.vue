<template>
  <div class="bg h-100vh w-full">
    <bigScreenHeader />
    <div class="content wh-full flex flex-col text-white">
      <div
        class="bg-color relative m-x-4em m-t-7em box-border h-83% flex flex-col gap-2.5em overflow-hidden border-[4px] border-[#3F89DD] p-3em p-b-0"
      >
        <!-- <a-button type="primary" @click="showDrawer">Open</a-button>
        <a-drawer
          title="Basic Drawer"
          placement="top"
          :closable="false"
          :open="open"
          :get-container="false"
          :style="{ position: 'absolute' }"
          @close="onClose"
        >
          <p>Some cont555ents...</p>
        </a-drawer> -->
        <a-form
          layout="inline"
          :model="formState"
          size="large"
          class="w-full"
          @finish="handleFinish"
          @finish-failed="handleFinishFailed"
        >
          <a-row :gutter="[16, 24]" class="w-full" justify="space-between">
            <a-col :span="6">
              <a-form-item label="批次号">
                <a-input
                  v-model:value="formState.batchId"
                  placeholder="请输入批次号"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="团组号">
                <a-input
                  v-model:value="formState.groupID"
                  placeholder="请输入团组号"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="证本号">
                <a-input
                  v-model:value="formState.docId"
                  placeholder="请输入证本号"
                />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="状态">
                <a-select v-model:value="formState.docStatus">
                  <a-select-option value="all">
                    全部
                  </a-select-option>
                  <a-select-option value="0">
                    成本
                  </a-select-option>
                  <a-select-option value="1">
                    废本
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item label="时间">
                <a-range-picker
                  v-model:value="formState.timeRange"
                  :placeholder="['请选择开始时间', '请选择结束时间']"
                  show-time
                  :format="dateFormat"
                  :presets="rangePresets"
                  @change="onRangeChange"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12" class="text-right">
              <a-button
                type="primary"
                html-type="submit"
                class="btn mr-15 hover:text-[#89f7ff]!"
              >
                查询
              </a-button>
            </a-col>
          </a-row>
          <!-- <a-row :gutter="[16, 24]" class="w-full">
            <a-col :span="24" style="text-align: right">
              <a-button
                type="primary"
                html-type="submit"
                class="btn hover:text-[#89f7ff]!"
              >
                查询
              </a-button>
            </a-col>
          </a-row> -->
          <!-- <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              class="btn hover:text-[#89f7ff]!"
            >
              查询
            </a-button>
          </a-form-item> -->
        </a-form>

        <main class="h-100%">
          <History />
        </main>
      </div>
      <!-- <main class="w-90% h-100%"><History /></main> -->
    </div>

    <div class="absolute bottom-0 h6em w-full flex items-center justify-center">
      <div
        class="returnBtn h-8em w-13em transition-transform duration-300 hover:scale-105"
        @click="goto('-1')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { UnwrapRef } from 'vue';
import type { FormProps } from 'ant-design-vue';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import History from './table.vue';
import bigScreenHeader from '@/components/bigScreen/header.vue';
import router from '@/router/index.ts';

type RangeValue = [Dayjs, Dayjs];
const dateFormat = 'YYYY/MM/DD HH:mm:ss';
function onRangeChange(dates: RangeValue, dateStrings: string[]) {
  if (dates) {
    // console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }
  else {
    console.log('Clear');
  }
}
const rangePresets = ref([
  { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
]);
// import dayjs, { Dayjs } from 'dayjs';
function goto(page: string) {
  page === '-1' ? router.go(-1) : router.push({ name: page });
}
// const open = ref(false);

// const showDrawer = () => {
//   open.value = true;
// };

// const onClose = () => {
//   open.value = false;
// };
// const timeRange = ref<RangeValue>();
interface FormState {
  batchId: string;
  groupID: string;
  docId: string;
  docStatus: string;
  timeRange: RangeValue;
}

const formState: UnwrapRef<FormState> = reactive({
  user: '',
  password: '',
  docId: '',
  docStatus: 'all',
  timeRange: [dayjs().add(-7, 'd'), dayjs()],
});
const handleFinish: FormProps['onFinish'] = (values) => {
  console.log(values, formState);
  const formattedStrings: string[] = formState.timeRange.map(day =>
    day.format(dateFormat),
  );
  console.log(formattedStrings);
  // dayjs( formState.timeRange[0], dateFormat),
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
