<template>
  <div class="_container">
    <!-- 单选题组件 -->
    <headerMaterials :num="props.num"> </headerMaterials>
    <optionMaterials
      :optionsStatus="props.quesSchame.state.options"
      :isSingleSelect="true"
      :quesNum="props.num"
    ></optionMaterials>
  </div>
</template>

<script setup lang="ts">
import type quesSchameType from "~/types/ques/quesSchameType";
import headerMaterials from "../materials/headerMaterials.vue";
import optionMaterials from "../materials/optionMaterials.vue";
//通过props传递配置

const props = defineProps<{
  num: number;
  quesSchame: quesSchameType;
}>();
</script>

<style scoped lang="scss"></style>
