interface imgCheckResult {
  valid: boolean;
  msg?: string;
}
export function isImg(file: unknown, maxSizeMB: number = 5): imgCheckResult {
  // 1. 基础类型校验：确保传入的是 File 对象
  if (!(file instanceof File)) {
    return {
      valid: false,
      msg: "传入的不是文件，请选择正确的文件",
    };
  }

  // 2. 图片类型校验：通过 MIME 类型判断（覆盖主流图片格式）
  const isImageType = file.type.startsWith("image/");
  if (!isImageType) {
    return {
      valid: false,
      msg: `文件类型错误：当前文件类型为 ${file.type}，仅支持 jpg/png/gif/webp/svg 等图片格式`,
    };
  }

  // 3. 文件大小校验：转换单位（1MB = 1024KB = 1024*1024Bytes）
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      msg: `文件大小超出限制：当前大小 ${(file.size / 1024 / 1024).toFixed(2)}MB，最大允许 ${maxSizeMB}MB`,
    };
  }

  // 4. 所有校验通过
  return {
    valid: true,
    msg: "图片校验通过",
  };
}
