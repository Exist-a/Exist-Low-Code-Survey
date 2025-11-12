<template>
  <div class="container">
    <palette @addQues="addQues"></palette>
    <div class="survey"><singleSelect></singleSelect></div>

    <editor class="editor"></editor>
  </div>
</template>

<script setup lang="ts">
// import { onMounted, onUnmounted } from 'vue'
import { paletteItemsEn } from '~/configs/paletteSchame'
import type { labelType } from '~/configs/paletteSchame'
import type { quesType } from '~/types/ques/QuesType'
import singleSelect from '~/components/quesComs/singleSelect.vue'
onMounted(() => {
  console.log('create：挂载成功')
})
definePageMeta({
  layout: 'default'
})
const surveyStore = useSurveyStore();
//点击添加题目
const addQues = (paletteName: quesType, quesName: number) => {
  // console.log(paletteItemsEn[paletteName][quesName])
  //拿到目前要增加的题目
  console.log(paletteItemsEn[paletteName][quesName])
  if(!paletteItemsEn[paletteName][quesName]) return;

  surveyStore.addQues(paletteName,paletteItemsEn[paletteName][quesName]);
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  height: 100%;
  .survey {
    flex: 1;
    background-color: #073738;
  }
}
</style>
