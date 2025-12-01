<template>
  <div
    :style="{
      textAlign: position ? 'center' : 'left',
    }"
    class="options-container"
  >
    <div
      v-for="(item, index) in props.optionsStatus.status"
      class="option-item"
      @click="clickOption($event, item as string, index)"
      ref="options"
    >
      <Icon name="tabler:mood-smile-beam" size="30px" class="icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type optionsType from "~/types/ques/common/optionsType";
const props = defineProps<{
  optionsStatus: optionsType;
  position: number;
}>();
const options = ref<HTMLElement[]>();
const singleState = ref<number>(+props.optionsStatus.currentStatus);
const clickOption = (e: MouseEvent, value: string, index: number) => {
  //处理active逻辑
  if (e.currentTarget) {
    const target = e.currentTarget as HTMLElement;
    const divs = target.parentElement?.children;

    if (divs) {
      for (let i = 0; i < props.optionsStatus.status.length; i++) {
        if (divs[i]) {
          if (i <= index && !divs[i]?.classList.contains("active")) {
            divs[i]?.classList.add("active");
          } else if (i > index && divs[i]?.classList.contains("active")) {
            divs[i]?.classList.remove("active");
          }
        }
      }
    }
  }
  //处理切换选项后值
  singleState.value = +value;
};
onMounted(() => {
  console.log(options.value);
  if (options.value) {
    for (let i = 0; i <= +props.optionsStatus.currentStatus; i++) {
      options.value[i]?.classList.add("active")
    }
  }
});
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
    // background-color: $bg-color;
    width: 30px;
    height: 30px;
    border-radius: $radius-base;
    font-size: 14px;
    color: $font-color-normal;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
  }
  .active {
    // background-color: $font-color-normal;
    // color: $bg-color;
    color: #4cd964;
  }
}
</style>
