<template>
  <div class="box-border h-100% flex flex-col justify-center">
    <main class="w88.5%">
      <!-- 示例：“1.0.3.0.0”，主版号（两位）.项目编号（一位）.迭代号（一位）.测试号（一位）。
        目前，主版本号和项目编号固定，为 “1.0.3” 。 -->
      <div
        class="box-border w-100% flex text-center text-[18px] line-height-[60px]"
      >
        <div class="box-border w-50% text-right">
          <span class="">打印管理系统 </span>
        </div>
        ：
        <div class="flex-1 text-left">
          <span class="">1.0.3.0.4</span>
        </div>
      </div>
      <div
        v-for="(item, index) in items"
        :key="index"
        class="box-border w-100% flex text-center text-[18px] line-height-[60px]"
      >
        <div class="box-border w-50% text-right">
          <span class="">{{ item.name }} </span>
        </div>
        ：
        <div class="flex-1 text-left">
          <span class="">{{ item.version }}</span>
        </div>
      </div>
      <div class="text-center text-[18px] line-height-[60px]">
        <a-button class="btn" type="primary" @click="setcheckPwOpen(true)">
          退出系统
        </a-button>
      </div>
    </main>
    <SuceessModal
      :open="checkPwOpen"
      :handle-ok="() => setcheckPwOpen(false)"
      :handle-cancel="() => setcheckPwOpen(false)"
      title="退出系统"
    />
  </div>
</template>

<script lang="ts" setup>
import { App } from 'ant-design-vue';
import SuceessModal from './checkPwModal.vue';
import { mainTainModule } from '@/apis/proApi';

const props = defineProps({
  currentModel: String,
});
const { notification } = App.useApp();
const checkPwOpen = ref<boolean>(false);
function setcheckPwOpen(value: boolean) {
  checkPwOpen.value = value;
}
const items = ref([]);
async function getData() {
  try {
    // useAppStore().setSpinning(true);
    const data = await mainTainModule.getVersion({ type: 0 });
    if (data.respData) {
      items.value = data.respData;
    }
  }
  catch (error) {
    notification.error({
      message: `错误`,
      description: '获取版本信息接口超时',
      placement: 'bottomRight',
      class: 'notification-custom-class',
    });
    error;
  }
  finally {
    // useAppStore().setSpinning(false);
  }
}
watch(
  () => props.currentModel,
  (newValue) => {
    if (newValue === '6')
      getData();
  },
  { deep: true, immediate: true },
);
</script>

<style scoped>
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
::v-deep(.ant-select-selection-item) {
  font-size: 16px;
}
::v-deep(.ant-input-number-group-addon) {
  background: #fff;
}
</style>
