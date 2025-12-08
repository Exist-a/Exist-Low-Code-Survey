<template>
  <!-- 开关容器：绑定点击事件，根据状态/禁用控制样式 -->
  <div
    class="my-switch"
    :class="[
      { 'my-switch--active': modelValue },
      { 'my-switch--disabled': disabled },
      `my-switch--${size}`
    ]"
    @click="handleClick"
    :style="customStyle"
  >
    <!-- 开关滑块 -->
    <div class="my-switch__core"></div>
    <!-- 可选文本（激活/未激活） -->
    <span v-if="activeText && modelValue" class="my-switch__label my-switch__label--active">
      {{ activeText }}
    </span>
    <span v-if="inactiveText && !modelValue" class="my-switch__label my-switch__label--inactive">
      {{ inactiveText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'


const props = defineProps({
  // 双向绑定值（v-model）
  modelValue: {
    type: Boolean,
    required: true
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 尺寸：default/small/large
  size: {
    type: String,
    default: 'default',
    validator: (val: string) => ['default', 'small', 'large'].includes(val)
  },
  // 激活状态文本
  activeText: {
    type: String,
    default: ''
  },
  // 未激活状态文本
  inactiveText: {
    type: String,
    default: ''
  },
  // 自定义激活色（可选，你可扩展更多样式属性）
  activeColor: {
    type: String,
    default: '#409EFF'
  }
})

// 抛出update事件：实现v-model双向绑定
const emit = defineEmits(['update:modelValue'])

// 自定义样式：激活色绑定
const customStyle = computed(() => {
  return {
    '--active-color': props.activeColor,
    cursor: props.disabled ? 'not-allowed' : 'pointer'
  } as const
})

// 点击切换逻辑：禁用时不触发
const handleClick = () => {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
}
</script>

<style scoped>
/* 基础样式：核心布局 */
.my-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  background: #e4e7ed;
  border-radius: 16px;
  transition: background-color 0.3s;
  box-sizing: border-box;
}

/* 激活状态背景 */
.my-switch--active {
  background: var(--active-color);
}

/* 禁用状态遮罩 */
.my-switch--disabled {
  opacity: 0.6;
  user-select: none;
}

/* 尺寸控制：不同大小的宽/高/滑块尺寸 */
.my-switch--default {
  width: 40px;
  height: 20px;
  padding: 0 4px;
}
.my-switch--small {
  width: 30px;
  height: 16px;
  padding: 0 3px;
}
.my-switch--large {
  width: 50px;
  height: 24px;
  padding: 0 5px;
}

/* 滑块样式：核心动效 */
.my-switch__core {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  transition: left 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 激活状态：滑块右移 */
.my-switch--active .my-switch__core {
  left: calc(100% - 18px);
}

/* 尺寸适配滑块 */
.my-switch--small .my-switch__core {
  width: 12px;
  height: 12px;
}
.my-switch--large .my-switch__core {
  width: 20px;
  height: 20px;
}

/* 文本样式：可选，你可扩展 */
.my-switch__label {
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1;
}
.my-switch__label--active {
  margin-left: 8px;
}
.my-switch__label--inactive {
  margin-right: 8px;
}
</style>