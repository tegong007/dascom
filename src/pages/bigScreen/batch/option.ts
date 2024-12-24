export interface OptionType {
  value: string;
  label: string;
}
export interface BatchOptionType {
  value: number;
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
// 定义批次状态类型
export const BatchStatusOptions: BatchOptionType[] = [
  {
    value: Number.NaN,
    label: '全部', // 已经在流水线上进行生产
  },
  {
    value: 0,
    label: '生产中', // 已经在流水线上进行生产
  },
  {
    value: 1,
    label: '暂停', // 暂停的生产中的批次
  },
  {
    value: 2,
    label: '待生产', // 已添加到生产队列正在排队中
  },
  {
    value: 3,
    label: '挂起', // 不在生产队列中
  },
  {
    value: 4,
    label: '生产成功', // 所有证本都生产成功
  },
  {
    value: 5,
    label: '生产结束', // 批次已进行生产，但是有证本生产失败或者挂起，批次从生产队列中移除
  },
];
