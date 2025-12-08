<template>
  <div class="dialog-mask" @click="showCancel ? handleCancel : () => {}"></div>
  <div class="dialog-box">
    <h3 class="dialog-title">{{ title }}</h3>
    <div class="dialog-content">{{ content }}</div>
    
    <div v-if="showInput" class="dialog-input-wrap">
      <input
        v-model="inputVal"
        :placeholder="inputPlaceholder"
        :maxlength="inputMaxlength"
        class="dialog-input"
        type="text"
        :disabled="loading" 
      >
    </div>

    <div class="dialog-btns" :class="{ 'single-btn': !showCancel }">
      <button v-if="showCancel" @click="handleCancel" class="btn cancel-btn" :disabled="loading">
        {{ cancelText }}
      </button>
      <button @click="handleConfirm" class="btn confirm-btn" :disabled="loading">
        <!-- 加载中显示loading文本/图标 -->
        <span v-if="loading">处理中...</span>
        <span v-else>{{ confirmText }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  showInput?: boolean;
  inputValue?: string;
  inputPlaceholder?: string;
  inputMaxlength?: number;
  showCancel?: boolean;
  loading?: boolean; // 新增：加载状态
}>();

const inputVal = ref(props.inputValue || '');
const loading = ref(props.loading || false); // 响应式加载状态

// 监听外部传入的loading状态
watch(() => props.loading, (val) => {
  loading.value = val || false;
}, { immediate: true });

const emit = defineEmits<{
  confirm: [value: string];
  cancel: [];
}>();

const handleConfirm = () => emit("confirm", inputVal.value);
const handleCancel = () => emit("cancel");

// 暴露loading给父级（调用层）修改
defineExpose({
  loading,
});
</script>

<style scoped lang="scss">
/* 原有样式不变，新增加载状态样式 */
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
  margin: 0 0 20px 0;
  font-size: 16px;
  color: #666;
  line-height: 1.5;
  text-align: center;
}

.dialog-input-wrap {
  margin: 0 0 30px 0;
}
.dialog-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
  &:disabled {
    background: #f9f9f9;
    color: #ccc;
    cursor: not-allowed;
  }
}

.dialog-btns {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.dialog-btns.single-btn {
  justify-content: center;
}
.dialog-btns.single-btn .confirm-btn {
  flex: none;
  width: 100%;
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

/* 新增：禁用/加载状态样式 */
.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.cancel-btn {
  background: #f5f5f5;
  color: #666;
  &:hover:not(:disabled) { background: #eee; }
}

.confirm-btn {
  background: #2563eb;
  color: #fff;
  &:hover:not(:disabled) { background: #1d4ed8; }
}
</style>