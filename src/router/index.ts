import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import RouterReplaceComp from './routerReplaceSelf';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/bigScreen',
  },
  {
    path: '/bigScreen',
    name: 'BigScreen',
    component: RouterReplaceComp(() => import('../pages/bigScreen/index.vue')),
    children: [
      {
        path: 'setPage', // 子路由的路径，相对于父路由的路径
        name: 'SetPage',
        component: RouterReplaceComp(() => import('../pages/bigScreen/setPage.vue')),
      },
      {
        path: 'mainTain', // 另一个子路由的路径
        name: 'MainTain',
        component: RouterReplaceComp(() => import('../pages/bigScreen/mainTain.vue')),
      },
      // 可以继续添加更多的子路由
    ],
  },
  {
    path: '/testModal',
    name: 'TestModal',
    component: () => import('@/pages/Module/indexPage.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
