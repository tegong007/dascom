export interface OptionType {
  value: string | number | null;
  label: string;
}
// 团组类型
export const teamOptions: OptionType[] = [
  {
    value: 0,
    label: '否',
  },
  {
    value: 1,
    label: '是',
  },
];
// 派遣单位
export const dispatchUnitOptions: OptionType[] = [
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
// 数据来源
export const dataSourceOptions: OptionType[] = [
  {
    value: 1,
    label: '外交部',
  },
  {
    value: 2,
    label: '移民局',
  },
];
// 加急类型
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
// 批次状态类型
export const TaskStatusOptions: OptionType[] = [
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
export const docStatusOptions: OptionType[] = [
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
    label: '待生产', // 证本还未开始生产'
  },
  {
    value: 2,
    label: '挂起', // 不在生产队列中'
  },
  {
    value: 3,
    label: '生产成功',
  },
  {
    value: 4,
    label: '生产失败', // 生产后发现不符合要求'
  },
];
// 证本类型
export const docTypesOptions: OptionType[] = [
  {
    value: 'S',
    label: '公务护照',
  },
  {
    value: 'P',
    label: '普通护照',
  },
  {
    value: 'D',
    label: '外交护照',
  },
  {
    value: 'G',
    label: '因公普通护照',
  },
  {
    value: 'C',
    label: '领事护照',
  },
];
// 证件类型
export const idTypesOptions: OptionType[] = [
  {
    value: 0,
    label: '其他',
  },
  {
    value: 1,
    label: '身份证',
  },
  {
    value: 2,
    label: '军官证',
  },
];
// 加注类型
export const cnObsvTypeOptions: OptionType[] = [
  {
    value: 0,
    label: '对外身份加注',
  },
  {
    value: 1,
    label: '补发加注',
  },
  {
    value: 2,
    label: '换发加注',
  },
  {
    value: 3,
    label: '姓名加注',
  },
  {
    value: 4,
    label: '曾用名加注',
  },
  {
    value: 5,
    label: '任命加注',
  },
  {
    value: 6,
    label: '个案护照加注',
  },
  {
    value: 7,
    label: '曾持护照加注',
  },
];
// 一个函数，通过名称获取数组
export function getOptionsByName(
  name: keyof typeof options,
): OptionType[] | undefined {
  const options = {
    dispatchUnitOptions,
    dataSourceOptions,
    urgencyOptions,
    teamOptions,
    TaskStatusOptions,
    docStatusOptions,
    docTypesOptions,
    idTypesOptions,
    cnObsvTypeOptions,
  };
  return options[name];
}

// 实现一个方法，根据给定的 value 输出对应的 label
export function findLabelByValue(
  name: keyof typeof options,
  value: string | number | null,
): string | undefined {
  const optionsArray = getOptionsByName(name);
  if (!optionsArray)
    return undefined;
  const option = optionsArray.find(item => item.value === value);
  return option ? option.label : undefined;
}
