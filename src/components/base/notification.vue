<template>
  <contextHolder />
</template>

<script setup lang="ts">
import { notification } from 'ant-design-vue';
import type { NotificationPlacement } from 'ant-design-vue';
import { defineExpose } from 'vue';

const [api, contextHolder] = notification.useNotification();
function openNotify(
  placement: NotificationPlacement,
  msg: any,
  success?: string,
) {
  return openNotification(placement, msg, success);
}
function openNotification(
  placement: NotificationPlacement,
  msg: any,
  success?: string,
) {
  success
    ? api.success({
      message: '成功',
      description: ` ${msg}`,
      placement,
    })
    : api.error({
      message: '错误信息',
      description: ` ${msg}`,
      placement,
    });
}
defineExpose({ openNotify });
</script>

<style lang="scss" scoped></style>
