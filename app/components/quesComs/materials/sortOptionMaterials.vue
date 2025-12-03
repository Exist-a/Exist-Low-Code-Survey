<template>
  <div
    :style="{
      textAlign: position ? 'center' : 'left',
    }"
    class="options-container"
  >
    <draggableComponent
      :item-key="optionsStatus.id"
      v-model="optionsStatus.status"
      class="draggable-container"
    >
      <template #item="{ element }">
        <div class="option-item">{{ element }}</div>
      </template>
    </draggableComponent>
  </div>
</template>

<script setup lang="ts">
import type optionsType from "~/types/ques/common/optionsType";
import draggableComponent from "vue3-draggable-next";
const props = defineProps<{
  optionsStatus: optionsType;
  position: number;
}>();

const state = ref<string[]>(props.optionsStatus.status as string[]);
</script>

<style scoped lang="scss">
.options-container {
  width: 100%;
  margin-top: 20px;
  // display: flex;
  // justify-content: space-evenly;
  .draggable-container {
    display: inline-block;
    .option-item {
      width: 220px;
      height: 40px;
      background-color: #a65252;
      margin-bottom: 10px;
      cursor: pointer;
      line-height: 30px;
      padding: 5px 10px;
      font-size: 14px;
      overflow-y: scroll;
      border-radius: $radius-base;
      color: rgba(255, 255, 255, 0.891);
      background-color: $font-color-normal;
    }
  }
}
</style>
