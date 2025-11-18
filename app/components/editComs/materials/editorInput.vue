<template>
  <!--封装input-->

  <input
    class="input"
    :type="props.type"
    :placeholder="props.placeHolder"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
import type { exinput } from "~/types/common/exinputTypes";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps<exinput>();
const handleInput = (e: InputEvent) => {
  if (e.target) {
    const inputTarget = e.target as HTMLInputElement;
    emit("update:modelValue", inputTarget.value);
  }
};
</script>

<style scoped lang="scss">
.input {
  padding-left: 10px;
  //   box-shadow: 3px 3px 3px inset rgb(184, 184, 184);
  outline: 1px solid black;
  border-radius: $radius-sm;
  border: none;
    width: 100%;
  font-size: 16px;
}
</style>
