import request from '@/plugins/request';
// 后端服务
const v1 = window.serverAddress ?? 'http://localhost:6101/';

// 添加批次
export function addTask(data: any) {
  const api = `${v1}/tss/demo/add-task`;
  return request.post(api, data);
}
