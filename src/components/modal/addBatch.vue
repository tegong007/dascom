<template>
  <a-modal
    :get-container="false"
    :open="props.open"
    wrap-class-name="test"
    :closable="false"
    width="90%"
    centered
    force-render
    @ok="props.handleCancel"
  >
    <div class="delete-modal h-50em w-full">
      <div class="wh-full flex flex-col items-center justify-center p-2em">
        <a-form
          layout="inline"
          :model="formState"
          class="w-full rounded-[8px] bg-[#ffffff34] p-x-10 p-y-20"
          @finish="handleFinish"
          @finish-failed="handleFinishFailed"
        >
          <a-row :gutter="[0, 0]" class="w-full" justify="space-evenly">
            <a-col :span="5">
              <a-form-item label="批次号">
                <a-input
                  v-model:value="formState.batchId"
                  placeholder="请输入批次号"
                />
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item label="团组号">
                <a-input
                  v-model:value="formState.teamId"
                  placeholder="请输入团组号"
                />
              </a-form-item>
            </a-col>
            <a-col :span="5">
              <a-form-item label="证本号">
                <a-input
                  v-model:value="formState.docId"
                  placeholder="请输入证本号"
                />
              </a-form-item>
            </a-col>
            <a-col :span="5">
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

            <!-- <a-col :span="12">
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
            </a-col> -->
            <a-col :span="2" class="text-right">
              <a-button
                type="primary"
                html-type="submit"
                class="btn mr-15 hover:text-[#89f7ff]!"
              >
                新建团组
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
    </div>

    <template #footer>
      <a-flex
        justify="space-around"
        align="center"
        class="w-full rounded-none p-b-[2em]"
      >
        <TheButton
          title="返回"
          class="drop-shadow-[0_37px_10px_rgba(0,0,0,0.3)]"
          @click="props.handleCancel"
        />
      </a-flex>
      <!-- <a-button key="back" @click="props.setOpen(false)">Return</a-button> -->
      <!-- <a-button key="submit" type="primary" :loading="loading" @click="handleOk"
        >Submit</a-button
      > -->
    </template>
  </a-modal>
  <!-- </div> -->
</template>

<script lang="ts" setup>
import { defineProps, reactive } from 'vue';
import type { UnwrapRef } from 'vue';
import type { FormProps } from 'ant-design-vue';
import History from '@/pages/bigScreen/detail/history/table.vue';

const props = defineProps({
  open: Boolean,
  handleOk: Function,
  title: String,
  handleCancel: Function,
});

// type RangeValue = [Dayjs, Dayjs];
// const dateFormat = 'YYYY/MM/DD HH:mm:ss';
// function onRangeChange(dates: RangeValue, dateStrings: string[]) {
//   if (dates) {
//     // console.log('From: ', dates[0], ', to: ', dates[1]);
//     console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
//   } else {
//     console.log('Clear');
//   }
// }
// const rangePresets = ref([
//   { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
//   { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
//   { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
//   { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
// ]);
// import dayjs, { Dayjs } from 'dayjs';
// function goto(page: string) {
//   page === '-1' ? router.go(-1) : router.push({ name: page });
// }
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
  teamId: string;
  docId: string;
  docStatus: string;
  // timeRange: RangeValue;
}

const formState: UnwrapRef<FormState> = reactive({
  user: '',
  password: '',
  docId: '',
  docStatus: 'all',
  // timeRange: [dayjs().add(-7, 'd'), dayjs()],
});
const handleFinish: FormProps['onFinish'] = (values) => {
  console.log(values, formState);
  // const formattedStrings: string[] = formState.timeRange.map((day) =>
  //   day.format(dateFormat),
  // );
  // console.log(formattedStrings);
};
const handleFinishFailed: FormProps['onFinishFailed'] = (errors) => {
  console.log(errors);
};
</script>

<style scoped lang="less">
::v-deep(.ant-modal-content) {
  padding: 0;
  border-radius: 0;
  background: linear-gradient(360deg, rgba(113, 175, 252, 0.5) 0%, rgba(0, 142, 255, 0.5) 97%);
  box-sizing: border-box;
  border: 6px solid #3f89dd;
  box-shadow:
    0px 4px 10px 0px rgba(0, 0, 0, 0.3),
    inset 0px -1px 1px 0px rgba(255, 255, 255, 0.34);
}
::v-deep(.ant-modal-mask) {
  background: rgba(0, 0, 0, 0.9);
}
.delete-modal {
  // background: linear-gradient(
  //   to bottom,
  //   rgb(217, 220, 241),
  //   rgba(255, 255, 255, 0)
  // ) !important;
  border-radius: 0em;
  .btn {
    border-radius: 6px;
    opacity: 1;
    background: linear-gradient(209deg, #90ecff 2%, #006af5 69%);
    box-sizing: border-box;
    border: 2px solid #89f7ff;
    padding: 0px 15px;
    color: white;
    height: 32px;
  }
}
::v-deep(.ant-form-item) {
  label {
    color: #fff !important;
    font-size: 16px;
  }
}
</style>
