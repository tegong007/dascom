<template>
  <div class="box-border w-full">
    <div v-if="setItems.length" class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>位置调整</span>
      <a-popover>
        <template #content>
          <a-empty description="暂无提示图片" />
        </template>
        <!-- <a-button type="primary" shape="circle" :icon="h(SearchOutlined)" /> -->
        <QuestionCircleOutlined style="margin-left: 10px" />
        <!-- <a-button type="primary">Hover me</a-button> -->
      </a-popover>
    </div>
    <section class="w-full">
      <div
        v-for="(setItem, index) in setItems"
        :key="index"
        class="w-full flex flex-wrap gap-20 p-l-3em p-t-1em"
      >
        <!-- <div class="text-[18px]">{{ setItem.printerName }}：</div> -->
        <div class="w-full flex flex-wrap gap-30">
          <div
            v-for="(item, itemIndex) in setItem.positionItems"
            :key="itemIndex"
            class="flex flex-col gap-10"
          >
            <span class="ml20">{{ item.label }}：</span>
            <div
              v-for="(optionItem, optionIndex) in item.option"
              :key="optionIndex"
              class="flex items-center"
            >
              {{ optionItem.label }}:
              <a-input-number
                v-model:value="optionItem.value"
                size="large"
                :step="0.01"
                class="m-x-10 w-150px"
                addon-after="mm"
              />
            </div>
            <div class="mt10 flex justify-evenly">
              <a-button
                type="link"
                class="btn hover:text-[#89f7ff]!"
                @click="
                  getPlatformConfig(
                    setItem.deviceIndex,
                    item.platform,
                    index,
                    itemIndex,
                  )
                "
              >
                读取
              </a-button>
              <a-button
                type="link"
                class="btn hover:text-[#89f7ff]!"
                @click="
                  setPlatformConfig(
                    setItem.deviceIndex,
                    item.platform,
                    index,
                    itemIndex,
                  )
                "
              >
                设置
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <contextHolder />
  </div>
</template>

<script lang="ts" setup>
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { contextHolder, openNotify } from '@/components/base/useNotification';
import { getApiTransfer } from '@/apis/webApi';
import { useAppStore } from '@/store/index';
import { settingMoule } from '@/apis/proApi';

const props = defineProps({
  currentModel: String,
});
const setItems = ref([]);
async function getPlatformConfig(
  deviceIndex,
  platform,
  itemIndex,
  platformIndex,
) {
  const objs = [
    {
      deviceIndex,
      platform: Number(platform),
    },
  ];
  transfer('/uvpdps/get-platform-config', objs, itemIndex, platformIndex);
}
async function setPlatformConfig(
  deviceIndex,
  platform,
  itemIndex,
  platformIndex,
) {
  const objs = [
    {
      deviceIndex,
      platform: Number(platform),
      x: setItems.value[itemIndex].positionItems[platformIndex].option[0].value,
      y: setItems.value[itemIndex].positionItems[platformIndex].option[1].value,
    },
  ];
  transfer('/uvpdps/set-platform-config', objs, null);
}
async function transfer(url, objs, itemIndex, platformIndex) {
  try {
    useAppStore().setSpinning(true);
    const params = {
      transURI: url,
      paraIn: {
        objs,
      },
    };
    const data = await getApiTransfer(params);
    if (data.rslts[0].code !== 0) {
      openNotify('bottomRight', data.rslts[0].msg);
    }
    else {
      if (url === '/uvpdps/get-platform-config') {
        setItems.value[itemIndex].positionItems[platformIndex].option[0].value
          = data.rslts[0].x;
        setItems.value[itemIndex].positionItems[platformIndex].option[1].value
          = data.rslts[0].y;
      }
      openNotify('bottomRight', '操作成功', true);
    }
  }
  catch (error) {
    error;
    openNotify('bottomRight', '操作失败');
  }
  finally {
    useAppStore().setSpinning(false);
  }
}
async function getData(newValue: string) {
  try {
    useAppStore().setSpinning(true);
    const data = await settingMoule.getSettingItem({
      moduleID: Number(newValue),
    });
    if (data.respData) {
      setItems.value = data.respData.uvPrinters;
    }
    else {
      item.value = {};
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
    getData(newValue);
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
