<template>
  <div
    :style="{
      textAlign: position ? 'center' : 'left',
    }"
    class="options-container"
  >
    <select name="" id="" class="select">
      <option value="">请选择你的选项</option>
      <option :value="item" v-for="(item, index) in props.optionsStatus.status">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type optionsType from "~/types/ques/common/optionsType";
const props = defineProps<{
  optionsStatus: optionsType;
  isSingleSelect: boolean;
  quesNum: number;
  position: number;
}>();
</script>

<style scoped lang="scss">
._container {
  .select {
    margin-top: 10px;
    padding: 10px;
    outline: none;
    cursor: pointer;
    height: 40px;
    width: 200px;
    border-radius: $radius-lg;
  }
}
</style>
