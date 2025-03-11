<template>
  <a-modal
    v-if="props.open"
    :get-container="false"
    :open="props.open"
    wrap-class-name="test"
    :closable="false"
    centered
    destroy-on-close
    force-render
    @ok="props.handleOk"
  >
    <div class="delete-modal box-border h-[20em] p-t-50px">
      <div class="h-full flex flex-col items-center justify-start">
        <span class="text-[30px] color-[#627384] font-bold">
          &nbsp;&nbsp; {{ props.title }}</span>
        <div
          class="scoll-bar mt20px h-full w-60% flex flex-col overflow-y-auto rounded-[8px] text-[24px] color-[#627384] font-bold"
        >
          <a-form ref="setPwRef" :model="formState" :rules="rules">
            <!-- 旧密码 -->
            <a-form-item
              name="oldPassword"
              :rules="[{ validator: validateOldPassword }]"
            >
              <a-input-password
                v-model:value="formState.oldPassword"
                placeholder="请输入旧密码"
                size="large"
                :maxlength="6"
                @input="handleInput('oldPassword', $event)"
              />
            </a-form-item>
            <!-- 新密码 -->
            <a-form-item
              name="newPassword"
              :rules="[{ validator: validateNewPassword }]"
            >
              <a-input-password
                v-model:value="formState.newPassword"
                placeholder="请输入新密码（6位数字）"
                size="large"
                :maxlength="6"
                @input="handleInput('newPassword', $event)"
              />
            </a-form-item>
            <!-- 确认新密码 -->
            <a-form-item
              name="confirmPassword"
              :rules="[{ validator: validateConfirmPassword }]"
            >
              <a-input-password
                v-model:value="formState.confirmPassword"
                placeholder="请再次输入新密码"
                size="large"
                :maxlength="6"
                @input="handleInput('confirmPassword', $event)"
              />
            </a-form-item>
          </a-form>
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
</template>

<script lang="ts" setup>
import { defineProps, reactive, ref } from 'vue';
import { App } from 'ant-design-vue';
import { Md5 } from 'ts-md5';
import { mainTainModule } from '@/apis/proApi';
import { useAppStore } from '@/store/index';

const props = defineProps({
  open: Boolean,
  handleOk: Function,
  title: String,
  handleCancel: Function,
});
const { notification } = App.useApp();
const setPwRef = ref();

interface FormState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const formState = reactive<FormState>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

// 校验新密码：必须是6位数字
function validateOldPassword(rule: any, value: string) {
  if (!value) {
    return Promise.reject(new Error('请输入旧密码'));
  }
  if (value.length !== 6) {
    return Promise.reject(new Error('旧密码必须是6位数字'));
  }
  return Promise.resolve();
}

// 校验新密码：必须是6位数字
function validateNewPassword(rule: any, value: string) {
  if (!value) {
    return Promise.reject(new Error('请输入新密码'));
  }
  if (value.length !== 6) {
    return Promise.reject(new Error('新密码必须是6位数字'));
  }
  return Promise.resolve();
}

// 校验确认密码：必须与新密码一致
function validateConfirmPassword(rule: any, value: string) {
  if (!value) {
    return Promise.reject(new Error('请再次输入新密码'));
  }
  if (value !== formState.newPassword) {
    return Promise.reject(new Error('两次输入的新密码不一致'));
  }
  return Promise.resolve();
}

const rules = {
  oldPassword: [{ validator: validateOldPassword, trigger: 'blur' }],
  newPassword: [{ validator: validateNewPassword, trigger: 'blur' }],
  confirmPassword: [{ validator: validateConfirmPassword, trigger: 'blur' }],
};

// 提交表单
function onSubmit() {
  setPwRef.value
    .validate()
    .then(async () => {
      await setPassWord();
      props.handleCancel();
    })
    .catch((error) => {
      console.error('Form validation error:', error);
    });
}

async function setPassWord() {
  try {
    useAppStore().setSpinning(true);
    const params = {
      type: 1,
      curPassword: new Md5().appendStr(formState.oldPassword).end(),
      newPassword: new Md5().appendStr(formState.confirmPassword).end(),
    };
    const data = await mainTainModule.getPassWord(params);
    if (data.code === 0) {
      useAppStore().setSpinning(false);
      notification.success({
        message: `成功`,
        description: '修改成功',
        placement: 'bottomRight',
      });
      setPwRef.value.resetFields();
      props.handleCancel();
    }
    else {
      notification.error({
        message: `错误`,
        description: data.msg,
        class: 'notification-custom-class',
        placement: 'bottomRight',
      });
      // setPwRef.value.resetFields();
      // props.handleCancel();
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
}

// 取消操作
function handleCancel() {
  formState.oldPassword = '';
  formState.newPassword = '';
  formState.confirmPassword = '';
  setPwRef.value.resetFields();
  props.handleCancel();
}

// 输入事件处理
function handleInput(field: string, event: Event) {
  const input = event.target as HTMLInputElement;
  const value = input.value.replace(/\D/g, ''); // 限制只能输入数字
  formState[field] = value;
  event.target.value = value;
}
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
::v-deep.scoll-bar {
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #ffffff69;
  border-radius: 5px;
}
.cancelBtn {
  background-image: url('@/assets/image/bigScreen/btn/cancel.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.okBtn {
  background-image: url('@/assets/image/bigScreen/btn/ok.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
