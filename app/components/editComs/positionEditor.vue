<template>
  <div class="position-container">
    <div class="position-label">位置:</div>
    <btnGroup
      :status="props.positionSchame.status"
      :iconName="iconName"
      :current-status="props.positionSchame.currentStatus"
      @changeStatus = "changeStatus"
    ></btnGroup>
  </div>
</template>

<script setup lang="ts">
import type { positionType } from "~/types/ques/common";
const emits = defineEmits(['updateDataToStore'])
const props = defineProps<{
  positionSchame: positionType;
}>();
const iconName = ["tabler:align-justified", "tabler:align-center"];
const changeStatus = (index:number)=>{
  props.positionSchame.currentStatus = index
  //触发emits
  emits('updateDataToStore',[props.positionSchame])
}
</script>

<style scoped lang="scss">
.position-container:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.position-container {
  background-color: #fff;
  border-radius: $radius-lg;
  padding: 15px;
  margin-bottom: 10px;
  transition: box-shadow 0.2s ease;
  display: flex;
  .position-label {
    font-size: 14px;
    color: #333;
    font-weight: 500;
    line-height: 45px;
  }
}
</style>
