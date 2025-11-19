<template>
  <div class="question-title-editor">
    <span class="title-label">标题:</span>
    <editorInput
      v-model:model-value="props.titleSchame.status"
      type="text"
      class="title-input"
      placeholder="请输入题目标题"
    />
  </div>
</template>

<script setup lang="ts">
import type titleType from "~/types/ques/common/titleType";
const surveyStore = useSurveyStore();
const props = defineProps<{
  titleSchame: titleType;
}>();
const emits = defineEmits(['updateDataToStore'])
watch(
  () => props.titleSchame.status,
  () => {
    //提交数据
    console.log("update")
    emits('updateDataToStore',{quesStateSchame:props.titleSchame,changeType:"title"})
  }
);
// const titleValue = ref('');
</script>

<style scoped lang="scss">
.question-title-editor {
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

.question-title-editor:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.title-label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
  white-space: nowrap; /* 防止标题文字换行 */
}

.title-input {
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
.title-input:focus {
  outline: none;
  border-color: $font-color-normal;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(35, 91, 158, 0.388);
}

/* 输入框占位符样式 */
.title-input::placeholder {
  color: #9ca3af;
  font-size: 13px;
}
</style>
