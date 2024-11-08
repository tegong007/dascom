// dateUtils.ts
export function formatDateTime(): string {
  const now = new Date();
  const year = now.getFullYear(); // 获取年份
  const month = now.getMonth() + 1; // 获取月份，月份从0开始，所以需要+1
  const day = now.getDate(); // 获取日
  const hours = now.getHours(); // 获取小时
  const minutes = now.getMinutes(); // 获取分钟
  const seconds = now.getSeconds(); // 获取秒

  // 使用padStart方法确保月份和日期始终是两位数
  const formattedMonth = month.toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  // 拼接成指定格式
  const formattedDateTime = `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  return formattedDateTime;
}
