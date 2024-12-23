import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
// import RouterReplaceComp from "./routerReplaceSelf";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/bigScreen',
  },
  {
    path: '/bigScreen', // 首页
    name: 'BigScreen',
    component: () => import('../pages/bigScreen/newIndex.vue'),
  },
  {
    path: '/setPage', // 设置
    name: 'SetPage',
    component: () => import('../pages/bigScreen/setting/index.vue'),
  },
  {
    path: '/mainTain', // 维护
    name: 'MainTain',
    component: () => import('../pages/bigScreen/mainTain.vue'),
  },
  {
    path: '/workstationStatus', // 工位状态
    name: 'WorkstationStatus',
    component: () => import('@/pages/bigScreen/workstationStatus/index.vue'),
  },
  {
    path: '/addBatch', // 添加批次
    name: 'AddBatch',
    component: () => import('@/pages/bigScreen/batch/addBatch/index.vue'),
  },
  {
    path: '/batchList', // 批次列表
    name: 'BatchList',
    component: () => import('@/pages/bigScreen/batch/list/index.vue'),
  },

  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/pages/bigScreen/detail/index.vue'),
  },
  {
    path: '/detail-history',
    name: 'detailHistory',
    component: () => import('@/pages/bigScreen/detail/history/index.vue'),
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
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: () => import('@/pages/test.vue'),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
