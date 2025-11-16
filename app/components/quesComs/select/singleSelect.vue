<template>
  <div class="_container">
    <!-- 单选题组件 -->
    <headerMaterials :num="props.num"> </headerMaterials>
    <optionMaterials></optionMaterials>
  </div>
</template>

<script setup lang="ts">
import headerMaterials from "../materials/headerMaterials.vue";
import optionMaterials from "../materials/optionMaterials.vue";
//通过props传递配置

const props = defineProps<{
  num: number;
}>();
</script>

<style scoped lang="scss"></style>
