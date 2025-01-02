import request from '@/plugins/request';
// 后端服务
const v1 = window.serverAddress ?? 'http://localhost:6101/';

// 任务管理服务HTTP接口
export function getHomeList() {
  const api = `${v1}/tss/produce-status`;
  return request.post(api);
}
// 获取批次列表
export function getBatchPage(data: any) {
  const api = `${v1}/tss/get-batch`;
  return request.post(api, data);
}
