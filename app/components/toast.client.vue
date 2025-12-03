<template>
  <div 
    class="toast-container"
    :class="['toast--' + type, { 'toast--enter': isEnter, 'toast--exit': isExit }]"
    :style="{ top: `${top}px` }"
  >
    <!-- 关闭按钮 -->
    <button class="toast-close" @click="handleClose">×</button>
    
    <!-- 图标（根据类型显示） -->
    <div class="toast-icon">
      <span v-if="type === 'success'">✓</span>
      <span v-else-if="type === 'error'">✗</span>
      <span v-else-if="type === 'warning'">⚠</span>
      <span v-else>ℹ</span>
    </div>
    
    <!-- 提示内容 -->
    <div class="toast-content">
      <h4 class="toast-title" v-if="title">{{ title }}</h4>
      <p class="toast-desc" v-if="desc">{{ desc }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// 接收 props
const props = defineProps<{
  title?: string; // 标题（可选）
  desc?: string; // 描述（可选）
  type?: "success" | "error" | "info" | "warning"; // 提示类型
  duration?: number; // 自动关闭时间（默认5000ms）
  top?: number; // 距离顶部的距离（避免多个Toast重叠）
}>();

// 发射关闭事件
const emit = defineEmits<{
  close: [];
}>();

// 动画状态
const isEnter = ref(false);
const isExit = ref(false);
let timer: NodeJS.Timeout;

// 组件挂载后触发进入动画
onMounted(() => {
  // 延迟触发动画（确保DOM已渲染）
  setTimeout(() => {
    isEnter.value = true;
  }, 10);

  // 自动关闭定时器
  const autoCloseDuration = props.duration || 5000;
  timer = setTimeout(() => {
    handleClose();
  }, autoCloseDuration);
});

// 清理定时器
onUnmounted(() => {
  clearTimeout(timer);
});

// 关闭逻辑（触发退出动画后通知父函数销毁）
const handleClose = () => {
  isExit.value = true;
  // 退出动画结束后发射关闭事件
  setTimeout(() => {
    emit("close");
  }, 300);
};
</script>

<style scoped lang="scss">
// 核心容器：右上角定位 + 动画
.toast-container {
  position: fixed;
  right: -350px; // 初始位置：右侧外部
  top: 20px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 300px;
  max-width: calc(100vw - 40px);
  z-index: 9999;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); // 缓动动画
  overflow: hidden;

  // 进入动画：从右侧滑入
  &.toast--enter {
    right: 20px;
    opacity: 1;
  }

  // 退出动画：滑回右侧
  &.toast--exit {
    right: -350px;
    opacity: 0;
  }

  // 不同类型的左侧边框颜色
  &.toast--success {
    border-left: 4px solid #10b981;
  }
  &.toast--error {
    border-left: 4px solid #ef4444;
  }
  &.toast--warning {
    border-left: 4px solid #f59e0b;
  }
  &.toast--info {
    border-left: 4px solid #3b82f6;
  }
}

// 关闭按钮
.toast-close {
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  font-size: 16px;
  color: #999;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
}

// 图标
.toast-icon {
  font-size: 20px;
  font-weight: bold;
  margin-top: 2px;

  span {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
  }

  // 不同类型图标颜色
  .toast--success & span {
    background: #10b981;
  }
  .toast--error & span {
    background: #ef4444;
  }
  .toast--warning & span {
    background: #f59e0b;
  }
  .toast--info & span {
    background: #3b82f6;
  }
}

// 内容区域
.toast-content {
  flex: 1;
  overflow: hidden; // 防止内容溢出

  .toast-title {
    margin: 0 0 4px 0;
    font-size: 16px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .toast-desc {
    margin: 0;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    display: -webkit-box;
    // -webkit-line-clamp: 2; // 最多显示2行
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>