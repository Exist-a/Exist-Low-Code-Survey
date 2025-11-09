<template>
  <div
    class="button"
    :style="{ backgroundColor: props.backgroundColor, color: props.color }"
    @click="handleClick"
  >
    {{ props.text }}
  </div>
</template>

<script setup lang="ts">
import type { exbutton } from '~/types/common/exbuttonType'

const props = defineProps<exbutton>()
const emit = defineEmits(['click'])
const handleClick = (e: MouseEvent) => {
  if (e) {
    emit('click', e)
  } else {
    emit('click')
  }
}
</script>

<style lang="scss" scoped>
.button {
  box-shadow: 3px 3px 3px rgb(160, 159, 159);
  line-height: 5vh;
  text-align: center;
  color: white;
  font-size: 16px;
  height: 5vh;
  width: 10vw;
  border-radius: 3vw;
  margin: 7vh auto;
  background-color: $info;
}
</style>
