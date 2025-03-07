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
              {{ optionItem.label }}：
              <!-- {{ optionItem.label }}:
              <a-input-number
                v-model:value="optionItem.value"
                size="large"
                :step="0.01"
                class="m-x-10 w-150px"
                addon-after="mm"
              /> -->
              <a-input
                v-model:value="optionItem.value"
                placeholder="0-1200"
                class="m-r-10 w-150px"
                size="large"
                addon-after="mm"
                @input="validateInput($event, index, itemIndex, optionIndex)"
                @blur="validateInput($event, index, itemIndex, optionIndex)"
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
import { App } from 'ant-design-vue';
import { contextHolder } from '@/components/base/useNotification';
import { getApiTransfer } from '@/apis/webApi';
import { useAppStore } from '@/store/index';
import { settingMoule } from '@/apis/proApi';

const props = defineProps({
  currentModel: String,
});
const { notification } = App.useApp();
const setItems = ref([]);
function validateInput(event, index, platformIndex, optionIndex) {
  // 获取输入框的值
  let value = event.target.value;
  // 步骤1：移除非法字符（只允许数字和一个小数点）
  value = value.replace(/[^0-9.]/g, '');
  // 步骤2：确保只有一个有效的小数点
  value = value.replace(/\.{2,}/g, '.'); // 替换多个小数点为一个
  value = value.replace(/^\./, '0.'); // 如果以小数点开头，自动补0
  // 步骤3：清除前导零（但保留小数部分）
  value = value.replace(/^0+(\d)/, '$1'); // 移除前导零，但保留小数部分
  // 步骤4：保留两位小数
  value = value.replace(/(\.\d{2})\d+/, '$1'); // 保留两位小数
  if (value > 1200.0) {
    value = 1200.0;
  }
  if (value === '') {
    value = 0;
  }
  event.target.value = value;
  setItems.value[index].positionItems[platformIndex].option[optionIndex].value
    = value;
}
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
      x: Number.parseFloat(
        Number.parseFloat(
          setItems.value[itemIndex].positionItems[platformIndex].option[0]
            .value,
        ).toFixed(2),
      ),
      y: Number.parseFloat(
        Number.parseFloat(
          setItems.value[itemIndex].positionItems[platformIndex].option[1]
            .value,
        ).toFixed(2),
      ),
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
      notification.error({
        message: `错误`,
        description: data.rslts[0].msg,
        placement: 'bottomRight',
      });
    }
    else {
      if (url === '/uvpdps/get-platform-config') {
        setItems.value[itemIndex].positionItems[platformIndex].option[0].value
          = data.rslts[0].x;
        setItems.value[itemIndex].positionItems[platformIndex].option[1].value
          = data.rslts[0].y;
      }
      notification.success({
        message: `成功`,
        description: '成功',
        placement: 'bottomRight',
      });
    }
  }
  catch (error) {
    error;
    notification.error({
      message: `错误`,
      description: '操作失败',
      placement: 'bottomRight',
    });
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
      notification.error({
        message: `错误`,
        description: '读取设置页面失败',
        placement: 'bottomRight',
      });
    }
  }
  catch (error) {
    error;
    notification.error({
      message: `错误`,
      description: '读取设置页面失败',
      placement: 'bottomRight',
    });
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
::v-deep(.ant-input-group-addon) {
  background: #fff;
}
</style>
