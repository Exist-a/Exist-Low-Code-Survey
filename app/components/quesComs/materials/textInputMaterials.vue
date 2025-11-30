<template>
  <div
    class="text-input-container"
    :style="{
      textAlign: position ? 'center' : 'left',
    }"
  >
    <input type="text" class="input" v-model="inputValue"/>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  quesNum: number;
  position: number;
}>();
const inputValue = ref('')
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
