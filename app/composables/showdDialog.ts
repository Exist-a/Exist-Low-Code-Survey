import { createVNode, render } from "vue";
import dialog from "~/components/dialog.client.vue";

// 扩展配置类型：onConfirm 支持异步验证（返回Promise<boolean>）
export interface dialogOptions {
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  showInput?: boolean;
  inputValue?: string;
  inputPlaceholder?: string;
  inputMaxlength?: number;
  showCancel?: boolean;
  // 确认回调：返回Promise<boolean>，true=验证通过（关闭弹窗），false=验证失败（不关闭）
  onConfirm?: (value: string) => Promise<boolean> | boolean;
  onCancel?: () => void;
}

/**
 * 双按钮弹窗（支持异步验证、可选输入框/取消按钮）
 * @returns Promise：resolve=输入值（验证通过），reject=取消
 */
export const showDialog = (options: dialogOptions): Promise<string> => {
  if (!import.meta.client) return Promise.reject("仅客户端支持弹窗");

  const config = {
    confirmText: "确认",
    cancelText: "取消",
    showInput: false,
    inputValue: "",
    inputPlaceholder: "请输入内容",
    inputMaxlength: 200,
    showCancel: true,
    onConfirm: undefined,
    onCancel: undefined,
    ...options,
  };

  const container = document.createElement("div");
  document.body.appendChild(container);

  // 新增：存储组件实例，用于控制加载状态（可选）
  let instance: any = null;
  const vnode = createVNode(dialog, {
    ...config,
    // 透传加载状态（用于按钮禁用，避免重复点击）
    loading: false,
    // 确认事件：异步执行验证
    async onConfirm(value: string) {
      try {
        // 1. 标记加载中（禁用确认按钮，避免重复点击）
        if (instance) instance.loading = true;
        
        // 2. 执行用户的异步验证逻辑
        const validateResult = await config.onConfirm?.(value);
        
        // 3. 验证通过 → 关闭弹窗 + resolve Promise
        if (validateResult !== false) { // 无返回值/返回true都算通过
          resolve(value);
          destroy();
        }
      } catch (err) {
        // 验证抛出异常 → 视为失败（不关闭弹窗）
        console.error("验证失败：", err);
      } finally {
        // 4. 结束加载（恢复按钮可点击）
        if (instance) instance.loading = false;
      }
    },
    onCancel: () => {
      if (config.showCancel) {
        config.onCancel?.();
        reject();
        destroy();
      }
    },
    // 传递组件实例到外部
    ref: (el: any) => {
      instance = el;
    },
  });

  render(vnode, container);

  let resolve: (value: string) => void;
  let reject: () => void;
  const promise = new Promise<string>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  const destroy = () => {
    render(null, container);
    document.body.removeChild(container);
    vnode.el = null;
  };

  return promise;
};