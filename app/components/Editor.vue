<template>
  <div class="editor-container">
    <div v-if="props.quesSchame !== null">
      <titleEditor :titleSchame="props.quesSchame.state.title"  />
      <descEditor />
      <optionsEditor
        :optionsSchame="props.quesSchame.state.options"
        :isStringOption="props.isStringOptions"
      />
      <positionEditor />
      <sizeEditor />
      <sizeEditor />
      <italicEditor />
      <italicEditor />
      <weightEditor />
      <weightEditor />
      <colorEditor />
      <colorEditor />
    </div>
  </div>
</template>

<script setup lang="ts">
import type quesSchameType from "~/types/ques/quesSchameType";

const props = defineProps<{
  quesSchame: quesSchameType | null;
  isStringOptions: boolean;
}>();
</script>

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
