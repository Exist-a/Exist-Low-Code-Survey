<template>
    <div class="_container">
<headerMaterials
      :num="props.num"
      :title="state.title.status"
      :titleSize="state.titleSize.status[state.titleSize.currentStatus]"
      :titleItalic="state.titleItalic.currentStatus"
      :titleColor="state.titleColor.status"
      :titleWeight="state.titleWeight.currentStatus"
      :desc="state.desc.status"
      :descSize="state.descSize.status[state.descSize.currentStatus]"
      :descWeight="state.descWeight.currentStatus"
      :descItalic="state.descItalic.currentStatus"
      :descColor="state.descColor.status"
      :position="state.position.currentStatus"
    />
    <dropdownOptionMaterials
      :optionsStatus="props.quesSchame.state.options"
      :isSingleSelect="false"
      :quesNum="props.num"
      :position="state.position.currentStatus"
    />
    </div>
</template>

<script setup lang="ts">
import type quesSchameType from '~/types/ques/quesSchameType';

const props = defineProps<{
  num: number;
  quesSchame:quesSchameType
}>();
const state = props.quesSchame.state;
</script>

<style scoped>

</style>