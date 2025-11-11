<template>
  <div class="container">
    <palette @addQues="addQues"></palette>
    <div class="survey"><singleSelect></singleSelect></div>

    <editor class="editor"></editor>
  </div>
</template>

<script setup lang="ts">
// import { onMounted, onUnmounted } from 'vue'
import { paletteItemsEn } from "~/types/schame/paletteSchame";
import type { labelType } from "~/types/schame/paletteSchame";
import singleSelect from "~/components/quesComs/singleSelect.vue";
onMounted(() => {
  console.log("create：挂载成功");
});
definePageMeta({
  layout: "default",
});
//点击添加题目
const addQues = (paletteName: labelType, quesName: number) => {
  // console.log(quesName,paletteName)
  //拿到目前要增加的题目
  console.log(paletteItemsEn[paletteName][quesName]);
};
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
