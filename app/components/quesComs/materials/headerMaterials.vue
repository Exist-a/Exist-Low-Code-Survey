<template>
  <h2 class="title" :style="{ fontSize: titleSize + 'px' }">
    <span
      class="num"
      :style="{
        fontWeight: titleWeight ? 'normal' : 'bold',
        fontStyle: titleItalic ? 'italic' : 'normal'
      }"
      >{{ num }}</span
    >
    <span class="title-words">{{ title }}</span>
  </h2>
  <div class="desc"></div>
</template>

<script setup lang="ts">
defineProps<{
  num: {
    type: number
    required: true
  }
  title: {
    type: String
    default: ''
  }
  titleSize: {
    type: String
    default: '18'
  }
  titleWeight: {
    type: Number
    default: 0
  }
  titleItalic: {
    type: Number
    default: 0
  }
  titleColor: {
    type: String
    default: '#000'
  }
  desc: {
    type: String
    default: '请输入题目说明（选填）'
  }
  descSize: {
    type: String
    default: '14'
  }
  descWeight: {
    type: Number
    default: 0
  }
  descItalic: {
    type: Number
    default: 0
  }
  descColor: {
    type: String
    default: '#666'
  }
}>()
</script>

<style scoped></style>
