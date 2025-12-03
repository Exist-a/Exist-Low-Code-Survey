<template>
  <div
    class="text-input-container"
    :style="{
      textAlign: position ? 'center' : 'left',
    }"
  >
    <input
      :type="inputType ? inputType : 'text'"
      :min = "(inputType==='number' && min) ? min : undefined"
      :max = "(inputType==='number' && max) ? max : undefined"
      class="input"
      v-model="inputValue"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  quesNum: number;
  position: number;
  inputType?: string;
  min?:string;
  max?:string;
}>();
const inputValue = ref("");
</script>

<style scoped lang="scss">
.text-input-container {
  .input {
    margin-top: 15px;
    border: none;
    outline: none;
    font-size: 16px;
    width: 40%;
    height: 30px;
    border-bottom: 1px solid black;
  }
}
</style>
