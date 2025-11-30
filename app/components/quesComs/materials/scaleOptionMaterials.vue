<template>
  <div
    :style="{
      textAlign: position ? 'center' : 'left',
    }"
    class="options-container"
  >
    <div
      v-for="item in 10"
      class="option-item"
      @click="clickOption($event, item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type optionsType from "~/types/ques/common/optionsType";
const props = defineProps<{
  optionsStatus: optionsType;
  position: number;
}>();

const singleState = ref<number>(-1);
const clickOption = (e: MouseEvent, value: number) => {
    //处理active逻辑
  if (e.currentTarget) {
    const target = e.currentTarget as HTMLElement;
    const divs = target.parentElement?.children;
    if (divs) {
      for(let div of divs){
        if(div.classList.contains("active")){
            div.classList.remove("active")
            break;
        }
      }
    }
    target.classList.add("active");
  }
  //处理切换选项后值
  singleState.value = value
};



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
