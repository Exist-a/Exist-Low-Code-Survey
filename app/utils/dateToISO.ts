/**
 * 将 Date 对象转换为 `YYYY-MM-DDTHH:mm` 格式的字符串
 * @param date 目标时间（默认当前时间）
 * @param useUTC 是否使用 UTC 时间（默认 false → 本地时间）
 * @returns 格式如：2017-06-01T08:30
 */
export default function dateToISO(
  dateInput?: string | Date,
  useUTC: boolean = false
): string {
  // 1. 解析输入为有效的 Date 对象（处理不传/字符串/Date 三种情况）
  let targetDate: Date;
  if (!dateInput) {
    // 不传参数 → 使用当前时间
    targetDate = new Date();
  } else if (typeof dateInput === 'string') {
    // 传入 ISO 字符串 → 转换为 Date 对象
    targetDate = new Date(dateInput);
  } else {
    // 传入 Date 对象 → 直接使用
    targetDate = dateInput;
  }

  // 2. 容错：检查 Date 对象是否有效（避免 Invalid Date）
  if (isNaN(targetDate.getTime())) {
    console.warn('[formatToShortISO] 无效的时间输入，返回空字符串', dateInput);
    return '';
  }

  // 3. 补零函数：确保单数字转为两位（如 9 → 09）
  const pad = (num: number): string => num.toString().padStart(2, '0');

  // 4. 按需获取 年/月/日/时/分（区分本地/UTC 时间）
  const year = useUTC ? targetDate.getUTCFullYear() : targetDate.getFullYear();
  const month = pad((useUTC ? targetDate.getUTCMonth() : targetDate.getMonth()) + 1); // 月份从 0 开始，+1
  const day = pad(useUTC ? targetDate.getUTCDate() : targetDate.getDate());
  const hours = pad(useUTC ? targetDate.getUTCHours() : targetDate.getHours());
  const minutes = pad(useUTC ? targetDate.getUTCMinutes() : targetDate.getMinutes());

  // 5. 拼接成目标格式
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}