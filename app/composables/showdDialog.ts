import { createVNode, render } from "vue";
import dialog from "~/components/dialog.client.vue";

// 扩展配置类型：新增回调函数字段（可选）
export interface dialogOptions {
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void; // 确认回调（可选）
  onCancel?: () => void;  // 取消回调（可选）
}

/**
 * 双按钮弹窗（支持 Promise + 回调函数）
 * @returns Promise：resolve=确认，reject=取消
 */
export const showDialog = (options: dialogOptions): Promise<void> => {
  // Nuxt SSR 判定：仅客户端执行
  if (!import.meta.client) return Promise.reject("仅客户端支持弹窗");

  // 默认配置（补充回调函数默认值为 undefined）
  const config = {
    confirmText: "确认",
    cancelText: "取消",
    onConfirm: undefined,
    onCancel: undefined,
    ...options,
  };

  // 1. 创建临时 DOM 容器
  const container = document.createElement("div");
  document.body.appendChild(container);

  // 2. 动态创建组件实例
  const vnode = createVNode(dialog, {
    ...config,
    // 确认事件：先执行回调 → resolve Promise → 销毁组件
    onConfirm: () => {
      config.onConfirm?.(); // 执行用户传入的确认回调（可选）
      resolve(); // Promise 成功
      destroy(); // 销毁组件
    },
    // 取消事件：先执行回调 → reject Promise → 销毁组件
    onCancel: () => {
      config.onCancel?.(); // 执行用户传入的取消回调（可选）
      reject(); // Promise 失败
      destroy(); // 销毁组件
    },
  });

  // 3. 挂载组件
  render(vnode, container);

  // 4. Promise 回调（保持原有用法不变）
  let resolve: () => void;
  let reject: () => void;
  const promise = new Promise<void>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  // 5. 销毁组件（清理 DOM）
  const destroy = () => {
    render(null, container);
    document.body.removeChild(container);
    vnode.el = null;
  };

  return promise;
};