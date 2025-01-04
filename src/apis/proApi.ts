import request from '@/plugins/request';
// 后端服务
const v1 = window.serverAddress ?? 'http://localhost:6101/';
// 首页---任务管理服务HTTP接口
export function getHomeList() {
  const api = `${v1}/tss/produce-status`;
  return request.post(api);
}
// 工位状态---工位状态查询
export function getPositionCard(data: any) {
  const api = `${v1}/tss/position-status`;
  return request.post(api, data);
}
// 批次--- 获取批次列表
export function getBatchPage(data: any) {
  const api = `${v1}/tss/get-batch`;
  return request.post(api, data);
}
// 批次--- 批次操作
export function getBatchOperate(data: any) {
  const api = `${v1}/tss/batch-operate`;
  return request.post(api, data);
}
// 批次---团组信息查询
export function getGroupPage(data: any) {
  const api = `${v1}/tss/get-group`;
  return request.post(api, data);
}
