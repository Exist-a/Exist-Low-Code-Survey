<template>
  <div
    :style="{
      textAlign: position ? 'center' : 'left',
    }"
    class="options-container"
  >
    <input
      :type="hasTime ? 'datetime-local' : 'date'"
      v-model="datetime"
      class="input"
    />
  </div>
</template>

<script setup lang="ts">
import type optionsType from "~/types/ques/common/optionsType";
const props = defineProps<{
  optionsStatus: optionsType;
  position: number;
  hasTime: boolean;
}>();
const datetime = ref<string>(
  dateToISO(props.optionsStatus.currentStatus as string)
);
// const clickOption = (e: MouseEvent, value: string, index: number) => {
//   //处理active逻辑
//   if (e.currentTarget) {
//     const target = e.currentTarget as HTMLElement;
//     const divs = target.parentElement?.children;

//     if (divs) {
//       for (let i = 0; i < props.optionsStatus.status.length; i++) {
//         if (divs[i]) {
//           if (i <= index && !divs[i]?.classList.contains("active")) {
//             divs[i]?.classList.add("active");
//           } else if (i > index && divs[i]?.classList.contains("active")) {
//             divs[i]?.classList.remove("active");
//           }
//         }
//       }
//     }
//   }
//   //处理切换选项后值
//   singleState.value = +value;
// };
</script>

<style scoped lang="scss">
.options-container {
  width: 100%;
  margin-top: 20px;

  .input {
    height: 40px;
    padding: 0 10px;
  }
}
</style>
