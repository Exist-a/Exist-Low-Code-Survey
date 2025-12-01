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
    >
       <div v-for="item,index in optionsStatus.status">
        {{ item }}
       </div>
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

const singleState = ref<number>(-1);




</script>

<style scoped lang="scss">
.options-container {
  width: 100%;
  margin-top: 20px;
  // display: flex;
  // justify-content: space-evenly;

  .option-item {
    transition: all 0.2s;
    display: inline-block;
    margin: 2px;
    background-color: $bg-color;
    width: 30px;
    height: 40px;
    border-radius: $radius-base;
    font-size: 14px;
    color: $font-color-normal;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
  .active {
    background-color: $font-color-normal;
    color: $bg-color;
  }
}
</style>
