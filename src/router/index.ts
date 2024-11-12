import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
// import RouterReplaceComp from "./routerReplaceSelf";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/bigScreen',
  },
  {
    path: '/bigScreen',
    name: 'BigScreen',
    component: () => import('../pages/bigScreen/index.vue'),
  },
  {
    path: '/setPage', // 子路由的路径，相对于父路由的路径
    name: 'SetPage',
    component: () => import('../pages/bigScreen/setting/index.vue'),
  },
  {
    path: '/mainTain', // 另一个子路由的路径
    name: 'MainTain',
    component: () => import('../pages/bigScreen/mainTain.vue'),
  },
  // 单本
  {
    path: '/testModal',
    name: 'TestModal',
    component: () => import('@/pages/Module/indexPage.vue'),
  },
  {
    path: '/singleLine',
    name: 'singleLine',
    component: () => import('@/pages/Module/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
