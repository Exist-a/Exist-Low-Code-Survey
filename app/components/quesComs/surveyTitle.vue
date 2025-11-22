<template>
  <div class="_container">
    <headerMaterials
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
  </div>
</template>

<script setup lang="ts">
import type titleSchameType from '~/types/ques/titleSchemaType';

const props = defineProps<{
    titleSchema:titleSchameType
}>()
const state = props.titleSchema.state
</script>

<style scoped></style>
