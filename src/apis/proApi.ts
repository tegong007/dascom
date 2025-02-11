import request from '@/plugins/request';
// 后端服务
const v1 = window.serverAddress ?? 'http://localhost:6101/';
const homeModule = {
  getHomeList: () => request.post(`${v1}/tss/produce-status`),
  setControlMachine: (data: any) =>
    request.post(`${v1}/tss/machine-control`, data),
};
// 工位状态模块
const positionModule = {
  getPositionCard: (data: any) =>
    request.post(`${v1}/tss/position-status`, data),
};

// 批次模块
const batchModule = {
  getBatchPage: (data: any) => request.post(`${v1}/tss/get-batch`, data),
  getBatchOperate: (data: any) => request.post(`${v1}/tss/batch-operate`, data),
  getGroupPage: (data: any) => request.post(`${v1}/tss/get-group`, data),
  getBatchStatistics: (data: any) =>
    request.post(`${v1}/tss/batch-statistics`, data),
};

// 证本模块
const documentModule = {
  getDocDetailPage: (data: any) => request.post(`${v1}/tss/doc-detail`, data),
  getDocStatistics: (data: any) =>
    request.post(`${v1}/tss/doc-statistics`, data),
  getDocOperate: (data: any) => request.post(`${v1}/tss/doc-operate`, data),
};

// 维护页面
const mainTainModule = {
  getDevice: (data: any) => request.post(`${v1}/tss/get-device`, data),
  consumables: {
    getLnkRemainder: () => request.post(`${v1}/tss/get-ink-remainder`),
  },

  readers: {
    readTestData: (data: any) =>
      request.post(`${v1}/ips-r/read-test-data`, data),
    readCardUid: (data: any) => request.post(`${v1}/ips-r/read-card-uid`, data),
    writeTestData: (data: any) =>
      request.post(`${v1}/ips-r/write-test-data`, data),
  },
  cameras: {
    cameraWork: (data: any) => request.post(`${v1}/ips-c/camera-work`, data),
  },
  lasers: {
    previewLaser: (data: any) => request.post(`${v1}/lpdps/preview`, data),
    printLaser: (data: any) => request.post(`${v1}/lpdps/print`, data),
    redLight: (data: any) => request.post(`${v1}/lpdps/red-light`, data),
    emergencyStop: (data: any) =>
      request.post(`${v1}/lpdps/emergency-stop`, data),
  },
  uvPrinters: {
    motoReposition: (data: any) =>
      request.post(`${v1}/uvpdps/moto-reposition`, data),
    motoMove: (data: any) => request.post(`${v1}/uvpdps/moto-move`, data),
    cleanHead: (data: any) => request.post(`${v1}/uvpdps/clean-head`, data),
    printTest: (data: any) => request.post(`${v1}/lpdps/print`, data),
  },
};

export {
  homeModule,
  positionModule,
  batchModule,
  documentModule,
  mainTainModule,
};
