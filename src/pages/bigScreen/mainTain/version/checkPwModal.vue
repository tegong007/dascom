<template>
  <a-modal
    v-if="props.open"
    :get-container="false"
    :open="props.open"
    wrap-class-name="test"
    :closable="false"
    centered
    force-render
    destroy-on-close
    @ok="props.handleOk"
  >
    <div class="delete-modal box-border h-[30.5em] p-t-50px">
      <div class="h-full flex flex-col items-center justify-start">
        <span class="text-[30px] color-[#627384] font-bold">
          &nbsp;&nbsp; {{ props.title }}</span>
        <div
          class="scoll-bar w-60% flex flex-col overflow-y-auto rounded-[8px] text-[24px] color-[#627384] font-bold"
        >
          <a-form
            ref="formRef"
            class="mt15 h65px"
            :model="formState"
            :rules="rules"
          >
            <a-form-item
              name="password"
              :rules="[{ validator: validateUsername }]"
            >
              <a-input-password
                v-model:value="password"
                placeholder="请输入六位数字密码"
                :visibility-toggle="false"
                size="large"
                class="border-1px border-blue"
                readonly
                :maxlength="6"
                @input="handleInput"
              />
            </a-form-item>
          </a-form>
          <main class="pw-bg w-full flex flex-1 flex-wrap p-7">
            <!-- <div
              v-for="(item, index) in [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                'clear',
                0,
                'delect',
              ]"
              :key="index"
              class="w33.3% cursor-pointer hover:brightness-105"
              :style="getBackgroundStyle(item)"
              @click="handleButtonClick(item)"
            /> -->
            <div
              v-for="(item, index) in imgStatus"
              :key="index"
              class="box-border w33.3% cursor-pointer hover:brightness-105"
              @click="handleButtonClick(item)"
            >
              <img :src="item" class="imgbtn h-full w-full">
            </div>
          </main>
        </div>
      </div>
    </div>
    <template #footer>
      <a-flex justify="center" align="center" class="pb-40px">
        <div
          class="cancelBtn h-110px w-220px transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
          @click="handleCancel"
        />
        <div
          class="okBtn h-110px w-220px transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
          @click="onSubmit"
        />
      </a-flex>
    </template>
  </a-modal>
  <!-- </div> -->
</template>

<script lang="ts" setup>
import { defineProps, reactive } from 'vue';
import { App } from 'ant-design-vue';
import { Md5 } from 'ts-md5';
import { mainTainModule } from '@/apis/proApi';
import { useAppStore } from '@/store/index';

import btn1 from '@/assets/image/bigScreen/btn/1.png';
import btn2 from '@/assets/image/bigScreen/btn/2.png';
import btn3 from '@/assets/image/bigScreen/btn/3.png';
import btn4 from '@/assets/image/bigScreen/btn/4.png';
import btn5 from '@/assets/image/bigScreen/btn/5.png';
import btn6 from '@/assets/image/bigScreen/btn/6.png';
import btn7 from '@/assets/image/bigScreen/btn/7.png';
import btn8 from '@/assets/image/bigScreen/btn/8.png';
import btn9 from '@/assets/image/bigScreen/btn/9.png';
import btnClear from '@/assets/image/bigScreen/btn/clear.png';
import btn0 from '@/assets/image/bigScreen/btn/0.png';
import btnDelect from '@/assets/image/bigScreen/btn/delect.png';

const props = defineProps({
  open: Boolean,
  handleOk: Function,
  title: String,
  warnIcon: Boolean,
  successIcon: Boolean,
  handleCancel: Function,
  data: Object,
});
const imgStatus = [
  btn1,
  btn2,
  btn3,
  btn4,
  btn5,
  btn6,
  btn7,
  btn8,
  btn9,
  btnClear,
  btn0,
  btnDelect,
];
const password = ref<string>('');
const formRef = ref();
const { notification } = App.useApp();
interface FormState {
  password: string;
}

const formState = reactive<FormState>({
  password: '',
});
// 自定义校验规则：必须是6位数字
function validateUsername() {
  if (password.value.length !== 6) {
    return Promise.reject(new Error('请输入六位数字'));
  }
  return Promise.resolve();
}

const rules = {
  password: [{ validator: validateUsername }],
};

async function checkPassWord() {
  try {
    useAppStore().setSpinning(true);
    const params = {
      type: 0,
      curPassword: new Md5().appendStr(password.value).end(),
    };
    const data = await mainTainModule.getPassWord(params);
    if (data.code === 0) {
      useAppStore().setSpinning(false);
      window.electron.send('quit-app');
    }
    else {
      notification.error({
        message: `错误`,
        description: data.msg,
        placement: 'bottomRight',
      });
      formRef.value.resetFields();
      props.handleCancel();
    }
  }
  catch (error) {
    notification.error({
      message: `错误`,
      description: error,
      placement: 'bottomRight',
    });
  }
  finally {
    useAppStore().setSpinning(false);
  }
}
function onSubmit() {
  formRef.value
    .validate()
    .then(async () => {
      await checkPassWord();
    })
    .catch((error) => {
      console.log('error', error);
      // formRef.value.resetFields();
      // props.handleCancel();
    })
    .finally(() => {
      // formRef.value.resetFields();
    });
}
function handleCancel() {
  password.value = '';
  formRef.value.resetFields();
  props.handleCancel();
}

// 处理输入框的输入事件
function handleInput(event: Event) {
  const input = event.target as HTMLInputElement;
  password.value = input.value.replace(/\D/g, ''); // 限制只能输入数字
  console.log('🚀 ~ handleInput ~  password.value:', password.value);
}

// 处理键盘按下事件
function handleKeydown(event: KeyboardEvent) {
  // 检查按键是否是数字（0-9）
  console.log('🚀 ~ handleKeydown ~ password.value:', password.value);
  if (/^\d$/.test(event.key) && password.value.length < 6) {
    console.log('🚀 ~ handleKeydown ~ event.key:', event.key);
    password.value += event.key; // 添加数字到密码
    // 允许数字输入
  }
  else if (event.key === 'Backspace') {
    // 允许 Backspace 和左右箭头键
    password.value = password.value.slice(0, -1); // 删除最后一个字符
    if (!password.value) {
      formRef.value.resetFields();
    }
  }
  else if (event.key === 'Enter') {
    onSubmit();
  }
  else {
    // 阻止其他非数字按键的输入
    event.preventDefault();
  }
}
const buttonMapping = {
  [btn1]: 1,
  [btn2]: 2,
  [btn3]: 3,
  [btn4]: 4,
  [btn5]: 5,
  [btn6]: 6,
  [btn7]: 7,
  [btn8]: 8,
  [btn9]: 9,
  [btnClear]: 'clear',
  [btn0]: 0,
  [btnDelect]: 'delect',
};
// 处理数字键盘按钮的点击事件
function handleButtonClick(item: any) {
  // 通过映射关系获取逻辑值
  const value = buttonMapping[item];
  if (value === 'clear') {
    password.value = ''; // 清空密码
    formRef.value.resetFields();
  }
  else if (value === 'delect') {
    password.value = password.value.slice(0, -1); // 删除最后一个字符
    if (!password.value) {
      formRef.value.resetFields();
    }
  }
  else if (password.value.length < 6) {
    password.value += value; // 添加数字到密码
  }
}
watch(
  () => props.open,
  async (newValue) => {
    if (newValue) {
      window.addEventListener('keydown', handleKeydown);
    }
    else {
      window.removeEventListener('keydown', handleKeydown);
    }
  },
  { deep: true, immediate: true },
);
</script>

<style scoped lang="less">
::v-deep(.ant-modal-content) {
  padding: 0;
  border-radius: 1em;
  background-image: url('@/assets/image/bigScreen/modal-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  box-sizing: border-box;
}
::v-deep(.ant-modal-mask) {
  background: rgba(0, 0, 0, 0.9);
}
::v-deep(.ant-modal-mask) {
  background: rgba(0, 0, 0, 0.8);
}
::v-deep.scoll-bar {
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  // border-left: 3px solid #7ff3fd;
}
::-webkit-scrollbar-thumb {
  // background-color: #ffffff38;
  background-color: #ffffff69;
  border-radius: 5px;
}
.cancelBtn {
  background-image: url('@/assets/image/bigScreen/btn/cancel.png');
  background-size: 100% 100%;
  background-repeat: no-repeat; /* 不重复 */
}
.okBtn {
  background-image: url('@/assets/image/bigScreen/btn/ok.png');
  background-size: 100% 100%;
  background-repeat: no-repeat; /* 不重复 */
}

.pw-bg {
  background-image: url('@/assets/image/bigScreen/pwBG.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;

  // overflow: hidden;
}
.imgbtn {
}
</style>
