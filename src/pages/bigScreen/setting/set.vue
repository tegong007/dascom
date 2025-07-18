<template>
  <div class="box-border h-83vh w-full flex flex-col gap-10">
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>喷墨打印位置调整</span>
    </div>
    <div class="box-border flex flex-col">
      <div v-show="showKeyboard">
        <SimpleKeyboard
          ref="simpleKeyboard"
          :input="cursorPosition?.target.value"
          keyboard-width="w32%"
          :layout="layout"
          :max-length="layout === 'num' ? 5 : 6"
          @on-change="onChangeKeyboard"
          @closekeyboard="closekeyboard"
        />
      </div>
      <section class="position-box w-full flex">
        <div class="w50% flex flex-col flex-1 pl-20">
          <div>主副页（平台1）</div>
          <table>
            <tbody>
              <tr>
                <td class="text-right">
                  X轴：
                </td>
                <td>
                  <a-input
                    v-model:value="PostionData.uvMainPlatform0.x"
                    placeholder="0-1200"
                    class="m-r-10 w-150px"
                    size="large"
                    :maxlength="6"
                    @touchstart="
                      onInputFocus($event, 'PostionData.uvMainPlatform0.x')
                    "
                  /><span class="text-gray">mm</span>
                </td>
              </tr>
              <tr>
                <td class="text-right">
                  Y轴：
                </td>
                <td>
                  <a-input
                    v-model:value="PostionData.uvMainPlatform0.y"
                    placeholder="0-1200"
                    class="m-r-10 w-150px"
                    size="large"
                    :maxlength="6"
                    @touchstart="
                      onInputFocus($event, 'PostionData.uvMainPlatform0.y')
                    "
                  /><span class="text-gray">mm</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="w50% flex flex-col flex-1 pl-20">
          <div>主副页（平台2）</div>
          <table>
            <tbody>
              <tr>
                <td class="text-right">
                  X轴：
                </td>
                <td>
                  <a-input
                    v-model:value="PostionData.uvMainPlatform1.x"
                    placeholder="0-1200"
                    class="m-r-10 w-150px"
                    size="large"
                    @touchstart="
                      onInputFocus($event, 'PostionData.uvMainPlatform1.x')
                    "
                  /><span class="text-gray">mm</span>
                </td>
              </tr>
              <tr>
                <td class="text-right">
                  Y轴：
                </td>
                <td>
                  <a-input
                    v-model:value="PostionData.uvMainPlatform1.y"
                    placeholder="0-1200"
                    class="m-r-10 w-150px"
                    size="large"
                    @touchstart="
                      onInputFocus($event, 'PostionData.uvMainPlatform1.y')
                    "
                  /><span class="text-gray">mm</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="position-box w-full flex p-t-0">
        <div class="w50% flex flex-col flex-1 pl-20">
          <div>加注页（平台1）</div>
          <table>
            <tbody>
              <tr>
                <td class="text-right">
                  X轴：
                </td>
                <td>
                  <a-input
                    v-model:value="PostionData.uvObsvPlatform0.x"
                    placeholder="0-1200"
                    class="m-r-10 w-150px"
                    size="large"
                    :maxlength="6"
                    @touchstart="
                      onInputFocus($event, 'PostionData.uvObsvPlatform0.x')
                    "
                  /><span class="text-gray">mm</span>
                </td>
              </tr>
              <tr>
                <td class="text-right">
                  Y轴：
                </td>
                <td>
                  <a-input
                    v-model:value="PostionData.uvObsvPlatform0.y"
                    placeholder="0-1200"
                    class="m-r-10 w-150px"
                    size="large"
                    :maxlength="6"
                    @touchstart="
                      onInputFocus($event, 'PostionData.uvObsvPlatform0.y')
                    "
                  /><span class="text-gray">mm</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="w50% flex flex-col flex-1 pl-20">
          <div>加注页（平台2）</div>
          <table>
            <tbody>
              <tr>
                <td class="text-right">
                  X轴：
                </td>
                <td>
                  <a-input
                    v-model:value="PostionData.uvObsvPlatform1.x"
                    placeholder="0-1200"
                    class="m-r-10 w-150px"
                    size="large"
                    @touchstart="
                      onInputFocus($event, 'PostionData.uvObsvPlatform1.x')
                    "
                  /><span class="text-gray">mm</span>
                </td>
              </tr>
              <tr>
                <td class="text-right">
                  Y轴：
                </td>
                <td>
                  <a-input
                    v-model:value="PostionData.uvObsvPlatform1.y"
                    placeholder="0-1200"
                    class="m-r-10 w-150px"
                    size="large"
                    @touchstart="
                      onInputFocus($event, 'PostionData.uvObsvPlatform1.y')
                    "
                  /><span class="text-gray">mm</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <div class="h50px w-full flex items-center justify-center">
        <a-button class="btn" type="primary" @click="BtnClick('打印位置重读')">
          重读
        </a-button>
        <a-button
          class="btn ml20"
          type="primary"
          @click="BtnClick('打印位置保存')"
        >
          保存
        </a-button>
      </div>
    </div>
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>喷墨定位基准</span>
      <!-- <a-popover>
        <template #content>
          <a-empty description="暂无提示图片" />
        </template>
        <QuestionCircleOutlined style="margin-left: 10px" />
      </a-popover> -->
    </div>
    <div>
      <section class="localtion-box w-full flex flex-col">
        <div class="flex flex-col flex-1 pl-20 pt20">
          <div class="w-full p-r-50 text-center color-blue font-bold">
            平台1
          </div>
          <div class="w-full flex flex-wrap">
            <table
              v-for="(item, index) in LocaltionData.platform0"
              :key="index"
            >
              <tbody>
                <tr>
                  {{
                    item.position
                  }}
                </tr>
                <tr>
                  <td class="text-right">
                    X轴：
                  </td>
                  <td>
                    <a-input
                      v-model:value="item.x"
                      placeholder="0-30000"
                      class="m-r-10 w-150px"
                      size="large"
                      :maxlength="5"
                      @touchstart="onInputFocus($event, `platform0.${index}.x`)"
                    /><span class="text-gray">0.001mm</span>
                  </td>
                </tr>
                <tr>
                  <td class="text-right">
                    Y轴：
                  </td>
                  <td>
                    <a-input
                      v-model:value="item.y"
                      placeholder="0-30000"
                      class="m-r-10 w-150px"
                      :maxlength="5"
                      size="large"
                      @touchstart="onInputFocus($event, `platform0.${index}.y`)"
                    /><span class="text-gray">0.001mm</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section class="localtion-box w-full flex flex-col">
        <div class="flex flex-col flex-1 pl-20 pt20">
          <div class="w-full p-r-50 text-center color-blue font-bold">
            平台2
          </div>
          <div class="w-full flex flex-wrap">
            <table
              v-for="(item, index) in LocaltionData.platform1"
              :key="index"
            >
              <tbody>
                <tr>
                  {{
                    item.position
                  }}
                </tr>
                <tr>
                  <td class="text-right">
                    X轴：
                  </td>
                  <td>
                    <a-input
                      v-model:value="item.x"
                      placeholder="0-1200"
                      :maxlength="5"
                      class="m-r-10 w-150px"
                      size="large"
                      @touchstart="onInputFocus($event, `platform1.${index}.x`)"
                    /><span class="text-gray">0.001mm</span>
                  </td>
                </tr>
                <tr>
                  <td class="text-right">
                    Y轴：
                  </td>
                  <td>
                    <a-input
                      v-model:value="item.y"
                      placeholder="0-1200"
                      :maxlength="5"
                      class="m-r-10 w-150px"
                      size="large"
                      @touchstart="onInputFocus($event, `platform1.${index}.y`)"
                    /><span class="text-gray">0.001mm</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <div class="w-full flex items-center justify-center">
        <a-button class="btn" type="primary" @click="BtnClick('定位基准重读')">
          重读
        </a-button>
        <a-button
          class="btn ml20"
          type="primary"
          @click="BtnClick('定位基准保存')"
        >
          保存
        </a-button>
      </div>
    </div>
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>进本槽设置</span>
    </div>

    <section class="position-box w-full flex">
      <div class="flex flex-col flex-1 pl-20">
        <div class="mt10">
          进本槽1
        </div>
        <div class="m-y-10 text-center">
          是否启用：
          <a-switch
            v-model:checked="LoadSlotData.no1"
            @change="switchChange($event, 'LoadSlotData.no1')"
          />
        </div>
      </div>
      <div class="flex flex-col flex-1 pl-20">
        <div class="mt10">
          进本槽2
        </div>
        <div class="m-y-10 text-center">
          是否启用：
          <a-switch
            v-model:checked="LoadSlotData.no2"
            @change="switchChange($event, 'LoadSlotData.no2')"
          />
        </div>
      </div>
      <div class="flex flex-col flex-1 pl-20">
        <div class="mt10">
          进本槽3
        </div>
        <div class="m-y-10 text-center">
          是否启用：
          <a-switch
            v-model:checked="LoadSlotData.no3"
            @change="switchChange($event, 'LoadSlotData.no3')"
          />
        </div>
      </div>
      <div class="flex flex-col flex-1 pl-20">
        <div class="mt10">
          进本槽4
        </div>
        <div class="m-y-10 text-center">
          是否启用：
          <a-switch
            v-model:checked="LoadSlotData.no4"
            @change="switchChange($event, 'LoadSlotData.no4')"
          />
        </div>
      </div>
    </section>
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>收本槽设置</span>
    </div>

    <section class="position-box w-full flex">
      <div class="flex flex-col flex-1 pl-20">
        <div class="mt10">
          收本槽1
        </div>
        <div class="m-y-10 text-center">
          是否启用：
          <a-switch
            v-model:checked="CollectionSlot.no1"
            @change="switchChange($event, 'CollectionSlot.no1')"
          />
        </div>
      </div>
      <div class="flex flex-col flex-1 pl-20">
        <div class="mt10">
          收本槽2
        </div>
        <div class="m-y-10 text-center">
          是否启用：
          <a-switch
            v-model:checked="CollectionSlot.no2"
            @change="switchChange($event, 'CollectionSlot.no2')"
          />
        </div>
      </div>
      <div class="flex flex-col flex-1 pl-20">
        <div class="mt10">
          收本槽3
        </div>
        <div class="m-y-10 text-center">
          是否启用：
          <a-switch
            v-model:checked="CollectionSlot.no3"
            @change="switchChange($event, 'CollectionSlot.no3')"
          />
        </div>
      </div>
      <div class="flex flex-col flex-1 pl-20">
        <div class="mt10">
          收本槽4
        </div>
        <div class="m-y-10 text-center">
          是否启用：
          <a-switch
            v-model:checked="CollectionSlot.no4"
            @change="switchChange($event, 'CollectionSlot.no4')"
          />
        </div>
      </div>
      <div class="flex flex-col flex-1 pl-20">
        <div class="mt10">
          收本槽5
        </div>
        <div class="m-y-10 text-center">
          是否启用：
          <a-switch
            v-model:checked="CollectionSlot.no5"
            @change="switchChange($event, 'CollectionSlot.no5')"
          />
        </div>
      </div>
    </section>
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>演示模式</span>
    </div>
    <section class="p-l-2em p-t-1em">
      <a-button class="btn" type="primary" @click="$goto('AddTask')">
        添加任务
      </a-button>
    </section>
    <div class="mt1em bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>密码设置</span>
    </div>
    <section class="p-b-1em p-l-2em p-t-1em">
      <a-button class="btn" type="primary" @click="setSuccessOpen(true)">
        密码设置
      </a-button>
    </section>
    <SuceessModal
      :open="successOpen"
      :handle-ok="() => setSuccessOpen(false)"
      :handle-cancel="() => setSuccessOpen(false)"
      title="设置密码"
    />

    <contextHolder />
  </div>
</template>

<script lang="ts" setup>
import { settingMoule } from '@/apis/proApi';
import SimpleKeyboard from '@/components/base/simpleKeyboard.vue';
import { contextHolder } from '@/components/base/useNotification';
import { useAppStore } from '@/store/index';
import { App } from 'ant-design-vue';
import SuceessModal from './sort/setPwModal.vue';

const props = defineProps({
  currentModel: String,
});
const successOpen = ref<boolean>(false);
function setSuccessOpen(value: boolean) {
  successOpen.value = value;
}
const { notification } = App.useApp();
const layout = ref('num');
const PostionData = ref({
  uvMainPlatform0: {
    x: 0,
    y: 0,
  },
  uvMainPlatform1: {
    x: 0,
    y: 0,
  },
  uvObsvPlatform0: {
    x: 0,
    y: 0,
  },
  uvObsvPlatform1: {
    x: 0,
    y: 0,
  },
});
const LocaltionData = ref({
  platform0: [
    {
      position: 'M2-UV-1',
      x: 0,
      y: 0,
    },
    {
      position: 'M2-UV-2',
      x: 0,
      y: 0,
    },
    {
      position: 'M2-UV-3',
      x: 0,
      y: 0,
    },
    {
      position: 'M2-UV-4',
      x: 0,
      y: 0,
    },
  ],
  platform1: [
    {
      position: 'M2-UV-1',
      x: 0,
      y: 0,
    },
    {
      position: 'M2-UV-2',
      x: 0,
      y: 0,
    },
    {
      position: 'M2-UV-3',
      x: 0,
      y: 0,
    },
    {
      position: 'M2-UV-4',
      x: 0,
      y: 0,
    },
  ],
});
const LoadSlotData = ref({
  no1: 1,
  no2: 1,
  no3: 1,
  no4: 1,
});
const CollectionSlot = ref({
  no1: 1,
  no2: 1,
  no3: 1,
  no4: 1,
});
async function getData() {
  try {
    useAppStore().setSpinning(true);
    const postionData = await settingMoule.getUvPlatformConfig();
    const localtionData = await settingMoule.getUvLocationg();
    const loadSlotData = await settingMoule.getLoadSlot();
    const collectionSlot = await settingMoule.getCollectionSlot();
    if (
      postionData.respData
      && localtionData.respData
      && loadSlotData.respData
      && collectionSlot.respData
    ) {
      PostionData.value = postionData.respData;
      LocaltionData.value = localtionData.respData;
      for (const key in loadSlotData.respData) {
        LoadSlotData.value[key] = loadSlotData.respData[key] === 1;
      }
      for (const key in collectionSlot.respData) {
        CollectionSlot.value[key] = collectionSlot.respData[key] === 1;
      }
    }
    else {
      notification.error({
        message: `错误`,
        description: '读取设置页面失败',
        class: 'notification-custom-class',
        placement: 'bottomRight',
      });
    }
  }
  catch (error) {
    notification.error({
      message: `错误`,
      class: 'notification-custom-class',
      description: error,
      placement: 'bottomRight',
    });
  }
  finally {
    useAppStore().setSpinning(false);
  }
}

// 获取分类名称的函数
function getCategoryName(category) {
  switch (category) {
    case 'uvMainPlatform0':
      return '主副页（平台1）';
    case 'uvMainPlatform1':
      return '主副页（平台2）';
    case 'uvObsvPlatform0':
      return '加注页（平台1）';
    case 'uvObsvPlatform1':
      return '加注页（平台2）';
    default:
      return category;
  }
}
async function switchChange(e, item) {
  const isLoadSlot = splitStringByDot(item).firstPart === 'LoadSlotData';
  const targetData = isLoadSlot ? LoadSlotData.value : CollectionSlot.value;
  const apiMethod = isLoadSlot
    ? settingMoule.setLoadSlot
    : settingMoule.setCollectionSlot;

  const slotData = Object.fromEntries(
    Object.keys(targetData).map(key => [
      key,
      Number(targetData[key] === true),
    ]),
  );

  try {
    useAppStore().setSpinning(true);
    await apiMethod(slotData);
  }
  catch (error) {
    notification.error({
      message: '错误',
      description: error,
      class: 'notification-custom-class',
      placement: 'bottomRight',
    });
    targetData[splitStringByDot(item).secondPart]
      = !targetData[splitStringByDot(item).secondPart];
  }
  finally {
    useAppStore().setSpinning(false);
  }
}
// 按钮事件
async function BtnClick(key: string) {
  useAppStore().setSpinning(true);
  switch (key) {
    case '打印位置重读':
      try {
        const data = await settingMoule.getUvPlatformConfig();
        if (data.respData) {
          PostionData.value = data.respData;
        }
      }
      catch (error) {
        notification.error({
          message: `错误`,
          description: error,
          class: 'notification-custom-class',
          placement: 'bottomRight',
        });
      }
      finally {
        useAppStore().setSpinning(false);
      }

      break;
    case '打印位置保存':
      try {
        Object.keys(PostionData.value).forEach((key) => {
          const xStr = PostionData.value[key].x;
          const yStr = PostionData.value[key].y;
          // 校验 x
          const xNum = Number.parseFloat(xStr);
          const yNum = Number.parseFloat(yStr);

          // 校验 x 是否为数字且在 0 到 1200 的范围内
          if (Number.isNaN(xNum) || xNum < 0 || xNum > 1200) {
            throw new Error(
              `喷墨打印位置调整:${getCategoryName(key)}X轴范围是（0-1200）`,
            );
          }

          // 校验 y 是否为数字且在 0 到 1200 的范围内
          if (Number.isNaN(yNum) || yNum < 0 || yNum > 1200) {
            throw new Error(
              `喷墨打印位置调整:'+${getCategoryName(key)}+'Y轴范围是（0-1200）`,
            );
          }

          PostionData.value[key].x = Number.parseFloat(xNum.toFixed(2));
          PostionData.value[key].y = Number.parseFloat(yNum.toFixed(2));
        });
        await settingMoule.setUvPlatformConfig(PostionData.value);
        await BtnClick('打印位置重读');
        notification.success({
          message: `成功`,
          description: '保存喷墨平台配置成功',
          class: 'notification-custom-class',
          placement: 'bottomRight',
        });
      }
      catch (error) {
        notification.error({
          message: `错误`,
          description: error,
          class: 'notification-custom-class',
          placement: 'bottomRight',
        });
      }
      finally {
        useAppStore().setSpinning(false);
      }

      break;
    case '定位基准重读':
      try {
        const data = await settingMoule.getUvLocationg();
        if (data.respData) {
          LocaltionData.value = data.respData;
        }
      }
      catch (error) {
        notification.error({
          message: `错误`,
          description: error,
          class: 'notification-custom-class',
          placement: 'bottomRight',
        });
      }
      finally {
        useAppStore().setSpinning(false);
      }
      break;
    case '定位基准保存':
      try {
        Object.keys(LocaltionData.value).forEach((platformKey) => {
          LocaltionData.value[platformKey].forEach((item) => {
            const xStr = item.x;
            const yStr = item.y;

            // 校验 x
            const xNum = Number.parseFloat(xStr);
            if (Number.isNaN(xNum) || xNum < 0 || xNum > 30000) {
              throw new Error(
                `喷墨定位基准:${item.position} X轴范围是（0-30000）`,
              );
            }

            // 校验 y
            const yNum = Number.parseFloat(yStr);
            if (Number.isNaN(yNum) || yNum < 0 || yNum > 30000) {
              throw new Error(
                `喷墨定位基准:${item.position} Y轴范围是（0-30000）`,
              );
            }

            // 保留两位小数
            item.x = Number.parseFloat(xNum.toFixed(2));
            item.y = Number.parseFloat(yNum.toFixed(2));
          });
        });

        await settingMoule.setUvLocationg(LocaltionData.value);
        await BtnClick('定位基准重读');
        notification.success({
          message: `成功`,
          description: '保存喷墨定位基准成功',
          class: 'notification-custom-class',
          placement: 'bottomRight',
        });
      }
      catch (error) {
        notification.error({
          message: `错误`,
          description: error,
          class: 'notification-custom-class',
          placement: 'bottomRight',
        });
      }
      finally {
        useAppStore().setSpinning(false);
      }

      break;
  }
}

// function validateInput(event, item) {
//   // 获取输入框的值
//   let value = event.target.value;
//   if (layout.value == 'floatNum') {
//     value = value.replace(/[^0-9.]/g, '');

//     // 分割字符串为两部分：第一个小数点之前的部分和之后的部分
//     const parts = value.split('.');
//     if (parts.length > 2) {
//       // 如果有多个小数点，只保留第一个小数点及其之后的内容
//       value = `${parts[0]}.${parts.slice(1).join('')}`;
//     } else if (parts.length === 2) {
//       // 如果只有一个小数点，保持原样
//       value = parts.join('.');
//     } else {
//       // 如果没有小数点，保持原样
//       value = parts[0];
//     }

//     value = value.replace(/^\./, '0.'); // 如果以小数点开头，自动补0
//     // 步骤3：清除前导零（但保留小数部分）
//     value = value.replace(/^0+(\d)/, '$1'); // 移除前导零，但保留小数部分
//     // 步骤4：保留两位小数
//     value = value.replace(/(\.\d{2})\d+/, '$1'); // 保留两位小数
//     if (value > 1200) {
//       value = 1200;
//     }
//     if (value === '') {
//       value = 0;
//     }
//   } else {
//   }

//   event.target.value = value;
//   if (splitStringByDot(item).firstPart == 'PostionData') {
//     PostionData.value[splitStringByDot(item).secondPart][
//       splitStringByDot(item).thirdPart
//     ] = value;
//   }
// }

function splitStringByDot(str) {
  // 使用 split 方法按 '.' 分割字符串
  const parts = str.split('.');

  // 获取第一个点之前的字符串
  const firstPart = parts[0] || ''; // 如果没有点，整个字符串作为第一部分

  // 获取第一个点和第二个点之间的字符串
  const secondPart = parts.length > 1 ? parts[1] || '' : ''; // 如果没有第二个点，第二部分为空

  // 获取第二个点之后的字符串
  const thirdPart = parts.length > 2 ? parts.slice(2).join('.') : ''; // 如果没有第二个点，第三部分为空

  return { firstPart, secondPart, thirdPart };
}

const changeIpt = ref([0, 0, 0]);
const showKeyboard = ref(false);
const simpleKeyboard = ref(null);
const cursorPosition = ref(null);
function onInputFocus(event, item) {
  showKeyboard.value = false;
  if (splitStringByDot(item).firstPart === 'PostionData') {
    layout.value = 'floatNum';
  }
  else {
    layout.value = 'num';
  }
  showKeyboard.value = true;
  changeIpt.value = item;
  cursorPosition.value = event;
}
// 给输入框赋值;
function onChangeKeyboard(input, keyboard) {
  const caretPosition = keyboard.caretPosition;
  if (caretPosition !== null)
    setInputCaretPosition(cursorPosition.value.target, caretPosition);
  cursorPosition.value.target.value = input;
  if (splitStringByDot(changeIpt.value).firstPart === 'PostionData') {
    PostionData.value[splitStringByDot(changeIpt.value).secondPart][
      splitStringByDot(changeIpt.value).thirdPart
    ] = input;
  }
  else {
    LocaltionData.value[splitStringByDot(changeIpt.value).firstPart][
      splitStringByDot(changeIpt.value).secondPart
    ][splitStringByDot(changeIpt.value).thirdPart] = input;
  }
}
function setInputCaretPosition(elem, pos) {
  setTimeout(() => {
    if (elem.setSelectionRange) {
      elem.focus();
      elem.setSelectionRange(pos, pos);
    }
  });
}
function closekeyboard() {
  showKeyboard.value = false;
}
watch(
  () => props.currentModel,
  () => {
    console.log('🚀 ~  props.currentModel:', props.currentModel);
    showKeyboard.value = false;
    getData();
  },
  { deep: true, immediate: true },
);
onDeactivated(() => {
  showKeyboard.value = false;
});
</script>

<style scoped lang="scss">
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
.position-box {
  table {
    border-collapse: separate;
    border-spacing: 10px;
  }
  td,
  th {
    padding: 5px;
  }
}
.localtion-box {
  table {
    border-collapse: separate;
    border-spacing: 10px;
    width: 50%;
  }
  td,
  th {
    padding: 5px;
  }
}
// .ant-switch-inner {
//   border: 2px solid #87f6ff;
// }
// .ant-switch-checked {
//   background: #6ad356 !important;
//   .ant-switch-inner {
//     border: 0;
//   }
// }
</style>
