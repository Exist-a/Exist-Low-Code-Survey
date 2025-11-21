<template>
  <div class="size-container">
    <div class="size-label">
      {{ props.changeType === "title" ? "标题" : "描述" }}大小:
    </div>
    <btnGroup
      :icon-name="iconName"
      :status="props.sizeSchame.status"
      :current-status="props.sizeSchame.currentStatus"
      width="40px"
      height="40px"
      class="size-btns"
      @change-status="changeStatus"
    />
  </div>
</template>

<script setup lang="ts">
import type { sizeType } from "~/types/ques/common";
const iconName = ["mdi:size-l", "mdi:size-m", "mdi:size-s"];
const props = defineProps<{
  sizeSchame: sizeType;
  changeType: "title" | "desc";
}>();
const emits = defineEmits(['updateDataToStore'])
const changeStatus=(index:number)=>{
  props.sizeSchame.currentStatus = index
  //触发emits
  emits('updateDataToStore',[props.sizeSchame])
}
</script>

<style scoped lang="scss">
.size-container:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.size-container {
  background-color: #fff;
  border-radius: $radius-lg;
  padding: 15px;
  margin-bottom: 10px;
  transition: box-shadow 0.2s ease;
  display: flex;
  .size-label {
    font-size: 14px;
    color: #333;
    font-weight: 500;
    line-height: 45px;
  }
  .size-btns{
    // height: 40px;
  }
}
</style>
