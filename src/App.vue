<script setup lang="ts">
import { h, watchEffect } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { useAppStore } from './store';
// import enUS from "ant-design-vue/es/locale/en_US";
const appStore = useAppStore();
const { t } = useI18n();
watchEffect(() => {
  appStore.setThemeColor(appStore.primaryColor, appStore.isDark);
});
const locale = ref(zhCN.locale);
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '200px',
  },
  spin: true,
});
</script>

<template>
  <a-config-provider
    :locale="locale === 'en' ? enUS : zhCN"
    :theme="{
      token: {
        fontSize: 16, //会击穿button的样式
      },
    }"
  >
    <a-spin
      :spinning="appStore.spinning"
      :indicator="indicator"
      :tip="t('modal.loading')"
    >
      <router-view v-slot="{ Component, route: curRoute }">
        <KeepAlive>
          <component :is="Component" :key="curRoute.fullPath" />
        </KeepAlive>
      </router-view>
    </a-spin>
  </a-config-provider>
</template>

<style scoped lang="less">
::v-deep(.ant-spin-spinning) {
  position: absolute !important;
  top: calc(50% - 300px) !important;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-spin-dot {
    margin-top: -70px !important;
    margin-left: -100px !important;
  }
}
::v-deep(.ant-spin-blur::after) {
  background-color: rgba(0, 0, 0, 1);
}
</style>
