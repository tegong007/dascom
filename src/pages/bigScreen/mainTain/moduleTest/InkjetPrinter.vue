<template>
  <div class="box-border w-full pb20">
    <div class="bg-[#fff]/[0.4] p-y-5px p-l-0.5em">
      <span>喷墨机</span>
    </div>
    <div class="w-full flex flex-wrap gap-20">
      <div
        v-for="(uvPrinters, index) in props.data"
        :key="index"
        class="w-full p-l-3em p-t-1em"
      >
        <div class="text-[18px]">
          {{ uvPrinters.printerName }}：
        </div>
        <main class="w-full flex items-end justify-start gap-50">
          <!-- 位置 -->
          <section>
            <div class="mt-10 w-full flex flex-col items-end gap-10">
              <div
                v-for="(item, itemIndex) in uvPrinters.positionItems"
                :key="itemIndex"
                class="text-[18px]"
              >
                {{ item.label }}：
                <a-select
                  v-if="!item.label.includes('mm')"
                  v-model:value="item.value"
                  size="large"
                  class="m-r-10 w-150px"
                >
                  <a-select-option
                    v-for="(option, optionIndex) in item.option"
                    :key="optionIndex"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </a-select-option>
                </a-select>
                <a-input
                  v-if="item.label.includes('mm')"
                  v-model:value="item.value"
                  placeholder="(0-1200)"
                  class="m-r-10 w-150px"
                  size="large"
                  :maxlength="4"
                  @input="validateInput($event, index)"
                  @touchstart="onInputFocus($event, index)"
                />

                <a-popover v-if="item.label.includes('mm')">
                  <template #content>
                    {{ getTips(index) }}
                  </template>
                  <QuestionCircleOutlined />
                  <!-- <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span> -->
                </a-popover>
                <span v-else class="select-none">&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </div>
            </div>
            <div class="mt10 flex justify-evenly">
              <a-button
                type="link"
                class="btn hover:text-[#89f7ff]!"
                @click="
                  transfer('/uvpdps/moto-reposition', [
                    { deviceIndex: uvPrinters.deviceIndex },
                  ])
                "
              >
                复位
              </a-button>
              <a-button
                type="link"
                class="btn hover:text-[#89f7ff]!"
                @click="
                  motoMove(uvPrinters.deviceIndex, uvPrinters.positionItems)
                "
              >
                移动
              </a-button>
            </div>
          </section>

          <!-- 清洗 -->
          <section>
            <div class="mt-10 w-full flex flex-col items-end gap-10">
              <div
                v-for="(item, itemIndex) in uvPrinters.cleanItems"
                :key="itemIndex"
                class="text-[18px]"
              >
                {{ item.label }}：
                <a-select
                  v-model:value="item.value"
                  size="large"
                  class="m-r-10 w-150px"
                >
                  <a-select-option
                    v-for="(option, optionIndex) in item.option"
                    :key="optionIndex"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </a-select-option>
                </a-select>
              </div>
            </div>
            <div class="mt10 flex justify-center">
              <a-button
                type="link"
                class="btn hover:text-[#89f7ff]!"
                @click="
                  cleanHead(uvPrinters.deviceIndex, uvPrinters.cleanItems)
                "
              >
                清洗
              </a-button>
            </div>
          </section>
          <!-- 打印平台 -->
          <section>
            <div class="mt-10 w-full flex flex-col items-center gap-10">
              <div
                v-for="(item, itemIndex) in uvPrinters.printItems"
                :key="itemIndex"
                class="text-[18px]"
              >
                {{ item.label }}：
                <a-select
                  v-model:value="item.value"
                  size="large"
                  class="m-r-10 w-150px"
                >
                  <a-select-option
                    v-for="(option, optionIndex) in item.option"
                    :key="optionIndex"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </a-select-option>
                </a-select>
              </div>
            </div>
            <div class="mt10 flex justify-center">
              <a-button
                type="link"
                class="btn hover:text-[#89f7ff]!"
                @click="print(uvPrinters.deviceIndex, uvPrinters.printItems)"
              >
                打印测试页
              </a-button>
            </div>
          </section>
        </main>
        <div
          v-if="props.currentPage === 'InkjetPrinter'"
          v-show="props.showKeyboard"
        >
          <SimpleKeyboard
            ref="simpleKeyboard"
            :transform="transformValue"
            :input="cursorPosition?.target.value"
            keyboard-width="w20%"
            layout="num"
            :max-length="4"
            @on-change="onChangeKeyboard"
            @closekeyboard="props.setShowKeyboard(false, 'InkjetPrinter')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { App } from 'ant-design-vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { getApiTransfer } from '@/apis/webApi';
import { useAppStore } from '@/store/index';
import SimpleKeyboard from '@/components/base/simpleKeyboard.vue';

const props = defineProps({
  data: Object,
  updateItem: Function,
  showKeyboard: Boolean,
  setShowKeyboard: Function,
  currentPage: String,
});
const { notification } = App.useApp();
async function motoMove(deviceIndex, arr) {
  const objs = [
    {
      deviceIndex,
      axisType: Number(arr[0].value),
      target: arr[1].value,
    },
  ];
  transfer('/uvpdps/moto-move', objs);
}
async function cleanHead(deviceIndex, arr) {
  const objs = [
    {
      deviceIndex,
      headID: Number(arr[0].value),
      intension: Number(arr[1].value),
    },
  ];
  transfer('/uvpdps/clean-head', objs);
}
async function print(deviceIndex, arr) {
  const objs = [
    {
      deviceIndex,
      platform: Number(arr[0].value),
      isUseData: false,
    },
  ];
  transfer('/uvpdps/print', objs);
}
async function transfer(url, objs) {
  try {
    useAppStore().setSpinning(true);
    const params = {
      transURI: url,
      paraIn: {
        objs,
      },
    };
    const data = await getApiTransfer(params);
    if (data.rslts[0].code === 0) {
      notification.success({
        message: `成功`,
        description: '操作成功',
        placement: 'bottomRight',
        class: 'notification-custom-class',
      });
    }
    else {
      notification.error({
        message: `错误`,
        description: data.rslts[0].msg || '未知错误',
        placement: 'bottomRight',
        class: 'notification-custom-class',
      });
    }
  }
  catch (error) {
    notification.error({
      message: `错误`,
      description: error,
      placement: 'bottomRight',
      class: 'notification-custom-class',
    });
  }
  finally {
    useAppStore().setSpinning(false);
  }
}
function getTips(index) {
  const tips
    = props.data[index].positionItems[0].option[
      props.data[index].positionItems[0].value
    ].tips;
  return tips;
}

function validateInput(event, index) {
  console.log('🚀 ~ validateInput ~ event:', event);
  // 获取输入框的值
  let value = event.target.value;
  // 使用正则表达式限制输入为 0 到 1200 的正整数
  value = value.replace(/\D/g, ''); // 移除所有非数字字符
  event.target.value = value;
  if (value === '') {
    props.updateItem('uvPrinters', index, '0'); // 更新绑定值为空
    event.target.value = 0;
    return;
  }
  // 将输入值转换为整数
  value = Number.parseInt(value, 10);

  // 如果输入值大于1200，设置为1200
  if (value > 1200) {
    value = 1200;
  }
  props.updateItem('uvPrinters', index, value); // 更新绑定值
  // event.target.value = value; // 更新输入框显示
}

const changeIpt = ref(''); // 选择了哪个输入框
const simpleKeyboard = ref(null);
const transformValue = ref([300, -400]);
const cursorPosition = ref(null);
function onInputFocus(event, res) {
  props.setShowKeyboard(true, 'InkjetPrinter');
  changeIpt.value = res;
  cursorPosition.value = event;
  // 获取组件的位置信息;
  const rect = event.target.getBoundingClientRect();
  console.log('🚀 ~ onInputFocus ~ rect:', rect);

  // 获取距离上方和左方的位置
  const top = rect.bottom + rect.height + window.scrollY; // 距离页面顶部的位置
  const left = rect.left + window.scrollX; // 距离页面左侧的位置
  transformValue.value = [300, -(top - 450)];
  console.log('距离页面顶部的位置:', top);
  console.log('距离页面左侧的位置:', left);
}
// 给输入框赋值
function onChangeKeyboard(input, keyboard) {
  const caretPosition = keyboard.caretPosition;
  if (caretPosition !== null)
    setInputCaretPosition(cursorPosition.value.target, caretPosition);
  console.log('🚀 ~ onChangeKeyboard ~ input:', input);

  let Newvalue = input;
  // 使用正则表达式限制输入为 0 到 1200 的正整数
  Newvalue = Newvalue.replace(/\D/g, ''); // 移除所有非数字字符
  if (Newvalue === '') {
    props.updateItem('uvPrinters', changeIpt.value, '0'); // 更新绑定值为空
    cursorPosition.value.target.value = 0;
    return;
  }
  // 将输入值转换为整数
  Newvalue = Number.parseInt(Newvalue, 10);

  // 如果输入值大于1200，设置为1200
  if (Newvalue > 1200) {
    Newvalue = 1200;
  }
  console.log('🚀 ~ onChangeKeyboard ~ Newvalue:', Newvalue);
  cursorPosition.value.target.value = Newvalue;
  props.updateItem('uvPrinters', changeIpt.value, Newvalue);
  // props.updateItem('uvPrinters', changeIpt.value, input);
}
function setInputCaretPosition(elem, pos) {
  setTimeout(() => {
    if (elem.setSelectionRange) {
      elem.focus();
      elem.setSelectionRange(pos, pos);
    }
  });
}
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
.is-invalid {
  border-color: red; /* 输入框标红 */
}
.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 4px;
}
</style>
