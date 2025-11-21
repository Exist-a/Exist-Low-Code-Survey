<template>
  <div class="btn-group-container" ref="btnGroup">
    <div
      :class="{ active: props.currentStatus === index }"
      v-for="(item, index) in props.iconName"
      :key="index"
      @click="changeStatus(index, $event)"
      :style="{
        width: props.width ? props.width : '45px',
        height: props.height ? props.height : '45px',
      }"
    >
      <Icon
        :name="item"
        size="30"
        class="icon"
        :style="{
          top: props.height
            ? (parseInt(props.height.slice(0, -1)) - 30) / 2 + 'px'
            : '7.5px',
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  status: string[];
  iconName: string[];
  currentStatus: number;
  width?: string;
  height?: string;
}>();
const emits = defineEmits(["changeStatus"]);
console.log(props.width);
const btnGroup = ref<HTMLElement | null>(null);
const changeStatus = (index: number, e: MouseEvent) => {
  changeActive(e);
  //触发emits
  emits("changeStatus", index);
};
const changeActive = (e: MouseEvent) => {
  if (btnGroup.value) {
    const children = btnGroup.value.children;
    Array.from(children).forEach((ele) => {
      if (ele.classList.contains("active")) {
        ele.classList.remove("active");
      }
    });
  }
  const target = e.currentTarget as HTMLElement;
  if (target && !target.classList.contains("active")) {
    target.classList.add("active");
  }
};
</script>

<style scoped lang="scss">
.btn-group-container {
  display: flex;
  margin: auto;
  border-radius: $radius-base;

  .icon {
    display: block;
    margin: auto;
    position: relative;
    top: 7.5px;
  }
  > div {
    height: 45px;
    width: 45px;

    color: $font-color-normal;
    background-color: $bg-color;
    line-height: 45px;
    position: relative;
    transition: all 0.2s;
  }
  .active {
    background-color: #1f2937e3;
    color: #fff;
  }
  > div:hover {
    background-color: #1f2937e3;
    color: #fff;
  }
  // 第一个子元素（替代原 btn-left）
  > div:first-child {
    border-radius: 4px 0 0 4px;
    border-right: 1px solid white;
  }

  // 最后一个子元素（替代原 btn-right）
  > div:last-child {
    border-radius: 0 4px 4px 0;
    // 去掉右侧边框（和原 btn-right 一致）
    border-right: none;
  }

  // 中间子元素（适配 3 个及以上按钮的场景）
  > div:not(:first-child):not(:last-child) {
    border-radius: 0; // 无圆角
    border-right: 1px solid white; // 保持分隔线
  }
}
</style>
