export function isArrayOfType<T>(
  candidate: unknown,
  typeChecker: (item: unknown) => item is T
): candidate is T[] {
  // 第一步：先校验是否为数组（非数组直接返回 false）
  if (!Array.isArray(candidate)) {
    return false;
  }

  // 第二步：遍历所有元素，用传入的类型校验器逐一判断
  // every 会在第一个不匹配项时终止遍历，兼顾性能
  return candidate.every((item) => typeChecker(item));
}