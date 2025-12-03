import { createVNode, render } from "vue";
import toast from "~/components/toast.client.vue";

// Toast 配置类型
export interface ToastOptions {
  title?: string;
  desc?: string;
  type?: "success" | "error" | "info" | "warning";
  duration?: number; // 自动关闭时间（ms），默认5000
}

// 存储当前活跃的 Toast 实例（用于位置避让）
let activeToasts: {
  vnode: ReturnType<typeof createVNode>;
  container: HTMLElement;
  top: number;
}[] = [];

// 基础距离顶部的间距
const BASE_TOP = 20;
// 两个 Toast 之间的间距
const TOAST_GAP = 16;

/**
 * 显示右上角滑入提示框
 * @param options Toast 配置
 */
export const useToast = (options: ToastOptions): void => {
  // Nuxt 客户端判定
  if (!import.meta.client) return;

  // 默认配置
  const config: Required<ToastOptions> = {
    title: "",
    desc: "",
    type: "info",
    duration: 5000,
    ...options,
  };

  // 计算当前 Toast 的顶部位置（避免重叠）
  const currentTop =
    BASE_TOP + activeToasts.reduce((sum) => sum + 80 + TOAST_GAP, 0); // 80是Toast高度

  // 1. 创建临时 DOM 容器
  const container = document.createElement("div");
  document.body.appendChild(container);

  // 2. 动态创建 Toast 组件实例
  const vnode = createVNode(toast, {
    ...config,
    top: currentTop,
    onClose: () => {
      // 移除当前 Toast 实例
      const index = activeToasts.findIndex((item) => item.vnode === vnode);
      if (index !== -1) activeToasts.splice(index, 1);
      // 销毁组件
      destroy();
      // 重新计算剩余 Toast 的位置
      updateActiveToastsPosition();
    },
  });

  // 3. 挂载组件
  render(vnode, container);

  // 4. 存储当前活跃的 Toast
  activeToasts.push({ vnode, container, top: currentTop });

  // 5. 销毁组件（清理 DOM）
  const destroy = () => {
    render(null, container);
    document.body.removeChild(container);
    vnode.el = null;
  };
};

/**
 * 更新活跃 Toast 的位置（当有 Toast 关闭时）
 */
const updateActiveToastsPosition = () => {
  activeToasts.forEach((toast, index) => {
    // 重新计算每个 Toast 的顶部位置
    const newTop = BASE_TOP + index * (80 + TOAST_GAP);
    toast.top = newTop;
    // 更新组件的 top  props
    if (toast.vnode.component) toast.vnode.component.props.top = newTop;
  });
};

// 快捷方法（可选，简化常用场景调用）
export const showSuccessToast = (options: Omit<ToastOptions, "type">) => {
  useToast({ ...options, type: "success" });
};

export const showErrorToast = (options: Omit<ToastOptions, "type">) => {
  useToast({ ...options, type: "error" });
};

export const showWarningToast = (options: Omit<ToastOptions, "type">) => {
  useToast({ ...options, type: "warning" });
};

export const showInfoToast = (options: Omit<ToastOptions, "type">) => {
  useToast({ ...options, type: "info" });
};
