<template>
  <div class="weight-container">
    <div class="weight-label">
      {{ props.changeType === "title" ? "标题" : "描述" }}粗细:

    </div>
    <btnGroup
      :status="props.weightSchame.status"
      :iconName="iconName"
      :current-status="props.weightSchame.currentStatus"
      @changeStatus="changeStatus"
    />
  </div>
</template>

<script setup lang="ts">
import type { weightType } from "~/types/ques/common";

const emits = defineEmits(["updateDataToStore"]);
const props = defineProps<{
  weightSchame: weightType;
  changeType: "title" | "desc";
  
}>();
const iconName = ["material-symbols:format-bold", "material-symbols-light:format-bold"];
const changeStatus = (index:number)=>{
  props.weightSchame.currentStatus = index
  //触发emits
  emits('updateDataToStore',[props.weightSchame])
}
</script>

<style scoped lang="scss">
.weight-container:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.weight-container {
  background-color: #fff;
  border-radius: $radius-lg;
  padding: 15px;
  margin-bottom: 10px;
  transition: box-shadow 0.2s ease;
  display: flex;
  .weight-label {
    font-size: 14px;
    color: #333;
    font-weight: 500;
    line-height: 45px;
  }
}
</style>
