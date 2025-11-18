<template>
  <div class="editor-container">
    <titleEditor></titleEditor>
    <descEditor></descEditor>
    <optionsEditor></optionsEditor>
    <positionEditor></positionEditor>
    <sizeEditor></sizeEditor>
    <sizeEditor></sizeEditor>
    <italicEditor></italicEditor>
    <italicEditor></italicEditor>
    <weightEditor></weightEditor>
    <weightEditor></weightEditor>
    <colorEditor></colorEditor>
    <colorEditor></colorEditor>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.editor-container {
  margin: 20px 0;
  padding: 10px;
  border-radius: $radius-lg;
  // height: 100%;
  width: 20%;
  background-color: $bg-color;
}
</style>
