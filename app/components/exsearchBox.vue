<template>
  <div class="container" :style="props.widthBefore">
    <exinput
      type="text"
      :width="nowWidth"
      :height="props.widthBefore"
      :modelValue="inputVal"
      class="inputBox"
      @input="inputVal = $event.target.value"
      :style="{ paddingLeft: paddingLeft }"
      @keydown.enter="emits('search', inputVal)"
    ></exinput>
    <Icon name="iconamoon:search-thin" :size="iconSize" class="icon" @click="switchFlat"></Icon>
  </div>
</template>

<script setup lang="ts">
import type { searchBoxType } from '~/types/common/exsearchBoxType'
const emits = defineEmits(['search'])
// const data = ref('')
const props = defineProps<searchBoxType>()
const nowWidth = ref(props.widthBefore)
const inputVal = ref('')
//处理icon大小
const iconSizeHandler = () => {
  const reg = /(\d+\.?\d*)([a-zA-Z]+)/
  const matches = props.widthBefore.match(reg)
  let size: number
  let ext: string = 'px'
  if (matches) {
    size = Number(matches[1]) * 0.8 // 等价于 size - size*0.2
    if (matches[2]) ext = matches[2]
  } else {
    size = 24 * 0.8
  }

  return { size, ext }
}
const size = iconSizeHandler().size
const ext = iconSizeHandler().ext
const paddingLeft = size + ext
const iconSize = size + ext
//切换展开
const switchFlat = () => {
  nowWidth.value === props.widthBefore
    ? (nowWidth.value = props.widthAfter)
    : (nowWidth.value = props.widthBefore)
}
//
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  align-items: center;

  .icon {
    position: absolute;
    left: 0.3vw;
  }
  .inputBox {
    border: $font-color-normal 3px solid;
    transition: width 0.5s ease-in-out;
    border-radius: 30px;
    // overflow: hidden;
  }
}
</style>
