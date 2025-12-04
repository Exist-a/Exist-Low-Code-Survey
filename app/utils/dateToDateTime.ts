/**
 * 格式化 Date 对象/时间戳为「xxxx年xx月xx日 xx:xx」格式
 * @param date 输入：Date 对象 / 时间戳（毫秒）
 * @returns 格式化后的字符串（无效输入返回空字符串）
 */
export const dateToDateTime = (date: Date | number | string): string => {
  // 处理输入：统一转为 Date 对象
  let targetDate: Date;
  if (typeof date === "number" || typeof date === "string") {
    // 时间戳（毫秒）或时间戳字符串 → 转 Date
    targetDate = new Date(Number(date));
  } else if (date instanceof Date) {
    // 直接传入 Date 对象
    targetDate = date;
  } else {
    // 无效输入 → 返回空
    console.warn("无效的日期输入，支持 Date 对象/时间戳（毫秒）");
    return "";
  }

  // 校验 Date 对象是否有效
  if (isNaN(targetDate.getTime())) {
    console.warn("日期解析失败");
    return "";
  }

  // 补零工具函数（小于 10 前面加 0）
  const padZero = (num: number): string => num.toString().padStart(2, "0");

  // 提取年、月、日、时、分
  const year = targetDate.getFullYear();
  const month = padZero(targetDate.getMonth() + 1); // 月份 0-11 → 加 1
  const day = padZero(targetDate.getDate());
  const hour = padZero(targetDate.getHours());
  const minute = padZero(targetDate.getMinutes());

  // 拼接格式：xxxx年xx月xx日 xx:xx
  return `${year}年${month}月${day}日 ${hour}:${minute}`;
};
