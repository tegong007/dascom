export interface OptionType {
  value: string;
  label: string;
}
// 定义派遣单位的数组
export const dispatchUnitsOptions: OptionType[] = [
  {
    value: '1',
    label: '派遣单位1',
  },
  {
    value: '2',
    label: '派遣单位2',
  },
];
export const dataSourcesOptions: OptionType[] = [
  {
    value: '1',
    label: '数据来源1',
  },
  {
    value: '2',
    label: '数据来源2',
  },
];
// 定义加急类型的数组
export const urgencyOptions: OptionType[] = [
  {
    value: 'none',
    label: '无加急',
  },
  {
    value: 'low',
    label: '低优先级',
  },
  {
    value: 'medium',
    label: '中等优先级',
  },
  {
    value: 'high',
    label: '高优先级',
  },
];
