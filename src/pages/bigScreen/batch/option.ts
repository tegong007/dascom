export interface OptionType {
  value: string | number | null;
  label: string;
}
// 定义派遣单位的数组
export const dispatchUnitsOptions: OptionType[] = [
  {
    value: 0,
    label: '无',
  },
  {
    value: 1,
    label: '中国电力公司',
  },
  {
    value: 2,
    label: '教育局',
  },
  {
    value: 3,
    label: '中国交通公司',
  },
];
export const dataSourcesOptions: OptionType[] = [
  {
    value: 0,
    label: '无',
  },
  {
    value: 1,
    label: '外交部',
  },
  {
    value: 2,
    label: '移民局',
  },
];
// 定义加急类型的数组
export const urgencyOptions: OptionType[] = [
  {
    value: 0,
    label: '普通',
  },
  {
    value: 1,
    label: '加急',
  },
];
// 定义批次状态类型
export const BatchStatusOptions: OptionType[] = [
  {
    value: null,
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
// 实现一个方法，根据给定的 value 输出对应的 label
export function findLabelByValue(
  options: (OptionType | BatchOptionType)[],
  value: string | number | null,
): string | undefined {
  const option = options.find(item => item.value === value);
  return option ? option.label : undefined;
}
