<template>
  <div class="color-container">
    <div class="color-label">
      {{ props.changeType === "title" ? "标题" : "描述" }}颜色:
    </div>
    <input type="color" v-model="props.colorSchame.status" class="color-input"/>
  </div>
</template>

<script setup lang="ts">
import type { colorType } from '~/types/ques/common';

const emits = defineEmits(["updateDataToStore"]);
const props = defineProps<{
  colorSchame: colorType;
  changeType: "title" | "desc";
  
}>();
watch(
  () => props.colorSchame.status,
  () => {
    //提交数据
    emits('updateDataToStore',{quesStateSchame:props.colorSchame,changeType:"title"})
  }
);
</script>

<style scoped lang="scss">

.color-container:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.color-container {
  background-color: #fff;
  border-radius: $radius-lg;
  padding: 15px;
  margin-bottom: 10px;
  transition: box-shadow 0.2s ease;
  display: flex;
  .color-label {
    font-size: 14px;
    color: #333;
    font-weight: 500;
    line-height: 45px;
  }
  .color-input{
    margin: auto;
  }
}</style>
