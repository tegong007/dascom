// 定义接口来描述对象的结构
interface IWorkstationDefinitions {
  [key: string]: string;
}

// 定义对象
const workstationDefinitions: IWorkstationDefinitions = {
  'M1-Warehouse': '模组一卡仓位',
  'M1-Ready-1': '模组一发证位1',
  'M1-Ready-2': '模组一发证位2',
  'M1-Camera-1': '模组一摄像位',
  'M1-Reader-1': '模组一读写位1',
  'M1-Reader-2': '模组一读写位2',
  'M1-Reader-3': '模组一读写位3',
  'M1-Obsolete-1': '模组一废本槽1',
  'M2-Laser-1': '模组二激光位1',
  'M2-Laser-2': '模组二激光位2',
  'M2-Laser-3': '模组二激光位3',
  'M2-Camera-1': '模组二摄像位',
  'M2-Reader-1': '模组二读写位1',
  'M2-Reader-2': '模组二读写位2',
  'M2-Reader-3': '模组二读写位3',
  'M2-Laser-4': '模组二激光位4',
  'M2-Laser-5': '模组二激光位5',
  'M2-Laser-6': '模组二激光位6',
  'M2-UV-1': '模组二喷墨位1',
  'M2-UV-2': '模组二喷墨位2',
  'M2-UV-3': '模组二喷墨位3',
  'M2-Camera-2': '模组二摄像位',
  'M3-Turn-1': '模组三翻页器1',
  'M3-Reader-1': '模组三读写位1',
  'M3-Reader-2': '模组三读写位2',
  'M3-Reader-3': '模组三读写位3',
  'M3-UV-1': '模组三喷墨位1',
  'M3-UV-2': '模组三喷墨位2',
  'M3-UV-3': '模组三喷墨位3',
  'M3-Camera-1': '模组三摄像位',
  'M4-Reader-1': '模组四读写器1',
  'M4-Product-1': '模组四成品仓1',
  'M4-Product-2': '模组四成品仓2',
  'M4-Obsolete-1': '模组四废品仓1',
};

// 定义函数来根据键获取值
function getWorkstationName(key: string): string | undefined {
  return workstationDefinitions[key];
}

// 导出函数
export { getWorkstationName };
