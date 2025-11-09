<template>
  <div class="container">
    <palette @addQues="addQues"></palette>
  </div>
</template>

<script setup lang="ts">
// import { onMounted, onUnmounted } from 'vue'
import { paletteItemsEn } from '~/types/schame/paletteSchame'
import type { labelType } from '~/types/schame/paletteSchame'

onMounted(() => {
  console.log('create：挂载成功')
})
definePageMeta({
  layout: 'default'
})
//暂时string
const addQues = (paletteName: labelType, quesName: number) => {
  // console.log(quesName,paletteName)
  //拿到目前要增加的题目
  console.log(paletteItemsEn[paletteName][quesName])
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
}
</style>
