<template>
  <div class="container">
    <div>
      <div class="title">{{ props.num ? num + "." : "" }}{{ props.title }}</div>
      <div class="desc">{{ props.desc }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  num?: number;
  title: string;
  desc?: string;
}>();
</script>

<style scoped lang="scss">
.container:hover {
  box-shadow: $shadow-lg;
}
.container {
  width: 100%;
  cursor: pointer;
  background-color: white;
//   padding: 10px;
  border-radius: $radius-lg;
  margin-bottom: 10px;
  transition: all 0.5s;
  > div {
    padding: 10px;
    .title {
      // display: inline-block;
      max-width: 100%;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .desc {
      font-size: 12px;
      color: $font-color-light;
      font-style: italic;
    }
  }
}
</style>
