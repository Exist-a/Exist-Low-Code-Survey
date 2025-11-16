<template>
  <div class="_container">
    <HeaderMaterials :num="props.num"></HeaderMaterials>
  </div>
</template>

<script setup lang="ts">
import HeaderMaterials from "../materials/headerMaterials.vue";
const props = defineProps<{
  num: number;
}>();
</script>

<style scoped></style>
