<template>
  <div class="question-desc-editor">
    <span class="desc-label">描述:</span>
    <editorInput
      v-model:model-value="props.descSchame.status"
      type="text"
      class="desc-input"
      placeholder="请输入题目描述"
    />
  </div>
</template>

<script setup lang="ts">
import type { descType } from "~/types/ques/common";
const props = defineProps<{
  descSchame: descType;
}>();
const emits = defineEmits(["updateDataToStore"]);
watch(
  () => props.descSchame.status,
  () => {
    emits("updateDataToStore", {
      quesStateSchame: props.descSchame,
      changeType: "desc",
    });
  }
);
</script>

<style scoped lang="scss">
.question-desc-editor {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
}

.question-desc-editor:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.desc-label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.desc-input {
  flex: 1;
  min-height: 40px;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  color: #111;
  background-color: #fafafa;
  transition: all 0.2s ease;
}

/* 输入框聚焦状态 */
// .desc-input:focus {
//   outline: none;
//   border-color: $font-color-normal;
//   background-color: #fff;
//   box-shadow: 0 0 0 3px rgba(35, 91, 158, 0.388);
// }

/* 输入框占位符样式 */
.desc-input::placeholder {
  color: #9ca3af;
  font-size: 13px;
}
</style>
