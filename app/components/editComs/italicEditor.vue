<template>
  <div class="italic-container">
    <div class="italic-label">
      {{ props.changeType === "title" ? "标题" : "描述" }}字体:
    </div>
    <btnGroup
      :status="props.italicSchame.status"
      :iconName="iconName"
      :current-status="props.italicSchame.currentStatus"
      @changeStatus="changeStatus"
    ></btnGroup>
  </div>
</template>

<script setup lang="ts">
import type { italicType } from "~/types/ques/common";

const emits = defineEmits(["updateDataToStore"]);
const props = defineProps<{
  italicSchame: italicType;
  changeType: "title" | "desc";
}>();
const iconName = ["clarity:italic-line", "mynaui:letter-i"];
const changeStatus = (index: number) => {
  props.italicSchame.currentStatus = index;
  //触发emits
  emits("updateDataToStore", [props.italicSchame]);
};
</script>

<style scoped lang="scss">
.italic-container:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.italic-container {
  background-color: #fff;
  border-radius: $radius-lg;
  padding: 15px;
  margin-bottom: 10px;
  transition: box-shadow 0.2s ease;
  display: flex;
  .italic-label {
    font-size: 14px;
    color: #333;
    font-weight: 500;
    line-height: 45px;
  }
}
</style>
