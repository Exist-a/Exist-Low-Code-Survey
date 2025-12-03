<template>
  <!-- 遮罩层 -->
  <div class="dialog-mask" @click="handleCancel"></div>
  <!-- 弹窗容器 -->
  <div class="dialog-box">
    <!-- 标题 -->
    <h3 class="dialog-title">{{ title }}</h3>
    <!-- 内容 -->
    <div class="dialog-content">{{ content }}</div>
    <!-- 双按钮区域 -->
    <div class="dialog-btns">
      <button @click="handleCancel" class="btn cancel-btn">{{ cancelText }}</button>
      <button @click="handleConfirm" class="btn confirm-btn">{{ confirmText }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// 仅保留核心 props
const props = defineProps<{
  title: string; // 弹窗标题（必传）
  content: string; // 弹窗内容（必传）
  confirmText?: string; // 确认按钮文本（默认"确认"）
  cancelText?: string; // 取消按钮文本（默认"取消"）
}>();

// 仅暴露确认/取消事件
const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

// 按钮点击逻辑
const handleConfirm = () => emit("confirm");
const handleCancel = () => emit("cancel");
</script>

<style scoped lang="scss">
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.dialog-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  width: 350px;
  max-width: 90vw;
  z-index: 10000;
}

.dialog-title {
  margin: 0 0 25px 0;
  font-size: 20px;
  color: #333;
  text-align: center;
}

.dialog-content {
  margin: 0 0 30px 0;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  text-align: center;
}

.dialog-btns {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.btn {
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.cancel-btn {
  background: #f5f5f5;
  color: #666;
  &:hover { background: #eee; }
}

.confirm-btn {
  background: #2563eb;
  color: #fff;
  &:hover { background: #1d4ed8; }
}
</style>