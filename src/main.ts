import '@/styles/output.css';
import '@/styles/global.scss';
import 'uno.css';

import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import { CountTo } from 'vue3-count-to';
import VxeUI from 'vxe-pc-ui';
import VxeUITable from 'vxe-table';
import { setupStore } from './store';
import { setupNaiveDiscreteApi } from './utils';
import i18n from './i18n';
// import { setupRouter } from './router';
import router from '@/router';
import 'tailwindcss/tailwind.css';
import 'ant-design-vue/dist/reset.css';
import '@/assets/font/fonts.css';
import 'vxe-pc-ui/lib/style.css';
import 'vxe-table/lib/style.css';

async function bootstrap() {
  const { default: App } = await import('./App.vue');
  const app = createApp(App);
  setupStore(app);
  app.use(i18n);
  app.use(Antd);
  app.use(router);
  app.use(VxeUI).use(VxeUITable);
  app.component('CountTo', CountTo);
  // 页面跳转
  app.config.globalProperties.$goto = function (page: string, query?: any) {
    page === '-1' ? router.go(-1) : router.push({ name: page, query });
  };
  // await setupRouter(app);
  app.mount('#app').$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*');
  });
  setupNaiveDiscreteApi();
}

bootstrap();
