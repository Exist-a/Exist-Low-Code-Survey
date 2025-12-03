<template>
  <h2
    class="title"
    :style="{
      fontWeight: titleWeight ? 'normal' : 'bold',
      fontSize: titleSize + 'px',
      fontStyle: titleItalic ? 'normal' : 'italic',
      textAlign: position ? 'center' : 'left',
      color: titleColor,
      display: isShowTitle ? 'block' : 'none',
    }"
  >
    <span class="num" v-if="props.num">{{ num + ". " }}</span>
    <span class="title-words">{{ title }}</span>
  </h2>
  <div
    class="desc"
    :style="{
      fontSize: descSize + 'px',
      fontWeight: descWeight ? 'normal' : 'bold',
      color: descColor,
      fontStyle: descItalic ? 'normal' : 'italic',
      textAlign: position ? 'center' : 'left',
      display: isShowDesc ? 'block' : 'none',
    }"
  >
    {{ desc }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  num: {
    type: Number,
    // required: true,
  },
  isShowTitle: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "默认题目",
  },
  titleSize: {
    type: String,
    default: "22",
  },
  titleItalic: {
    type: Number,
    default: 1,
  },
  titleColor: {
    type: String,
    default: "#000",
  },
  titleWeight: {
    type: Number,
    default: 1,
  },
  isShowDesc: {
    type: Boolean,
    default: true,
  },
  desc: {
    type: String,
    default: "请输入题目说明（选填）",
  },
  descSize: {
    type: String,
    default: "16",
  },
  descWeight: {
    type: Number,
    default: 1,
  },
  descItalic: {
    type: Number,
    default: 0,
  },
  descColor: {
    type: String,
    default: "#666",
  },
  position: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped lang="scss">
.title {
  font-size: 22px;
  margin-bottom: 15px;
}
.desc {
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
