<template>
  <div class="box-border h-100% flex flex-col items-center justify-center">
    <main>
      <!-- 示例：“1.0.3.0.0”，主版号（两位）.项目编号（一位）.迭代号（一位）.测试号（一位）。
        目前，主版本号和项目编号固定，为 “1.0.3” 。 -->
      <div class="text-center text-[18px] line-height-[60px]">
        打印管理系统 ：1.0.3.0.1
      </div>
      <div
        v-for="(item, index) in items"
        :key="index"
        class="text-center text-[18px] line-height-[60px]"
      >
        <div>{{ item.name }}：{{ item.version }}</div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store/index';
import { mainTainModule } from '@/apis/proApi';

const props = defineProps({
  currentModel: String,
});

const items = ref([]);
async function getData() {
  try {
    useAppStore().setSpinning(true);
    const data = await mainTainModule.getVersion({ type: 0 });
    if (data.respData) {
      items.value = data.respData;
    }
  }
  catch (error) {
    error;
  }
  finally {
    useAppStore().setSpinning(false);
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
