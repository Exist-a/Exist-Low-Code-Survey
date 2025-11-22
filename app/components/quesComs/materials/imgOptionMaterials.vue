<template>
  <div
    :style="{
      justifyContent: position ? 'center' : 'flex-start',
    }"
    class="options-container"
  >
    <label
      :key="`img-option-${props.quesNum}-${index}`"
      class="option-container"
      v-for="(item, index) in state"
      :for="'option' + props.quesNum + index"
    >
      <img :src="item.imgPath ? item.imgPath : nullImg" alt="" class="option-img" />
      <div class="option-title">{{ item.value }}</div>
      <div class="option-desc">{{ item.imgDesc }}</div>
      <input
        :id="'option' + props.quesNum + index"
        :type="props.isSingleSelect ? 'radio' : 'checkbox'"
        :name="'selectOption' + props.quesNum"
        class="option-btn"
        :value="index"
        v-model="selectedValue"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import type { imgOptionsStatus } from '~/types/ques/common/optionsType'
import type optionsType from '~/types/ques/common/optionsType'
import nullImg from '~/assets/imgs/img.png'
const props = defineProps<{
  optionsStatus: optionsType
  isSingleSelect: boolean
  quesNum: number
  position: number
}>()
// const state = ref<imgOptionsStatus[]>([])

const state = ref(props.optionsStatus.status as imgOptionsStatus[])

// 单选：存储选中的索引（-1 表示未选中）
const singleState = ref<number>(-1)
// 复选：存储选中的索引集合（数组）
const multiState = ref<number[]>([])
// 计算属性：根据模式切换 v-model 绑定的目标
const selectedValue = computed({
  get() {
    return props.isSingleSelect ? singleState.value : multiState.value
  },
  set(val) {
    console.log(val, multiState.value,selectedValue)
    if (props.isSingleSelect) {
      singleState.value = val as number
    } else {
      multiState.value = val as number[]
    }
  }
})

onMounted(() => {
  const initial = props.optionsStatus.currentStatus
  console.log(initial)
  if (props.isSingleSelect) {
    // 单选初始化：假设 initial 是单一下标（number）
    singleState.value = initial as number
  } else {
    // 复选初始化：假设 initial 是选中的索引数组（number[]）
    multiState.value = initial as number[]
  }
})
</script>

<style scoped lang="scss">
.options-container {
  display: flex;
  .option-container:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  .option-container {
    transition: all 0.2s ease;
    border-radius: $radius-lg;
    // height: 170px;
    width: 120px;
    background-color: $bg-color;
    margin-right: 10px;
    .option-img {
      width: 120px;
      height: 120px;
      object-fit: cover;
      border-radius: $radius-lg;
      // background-color: ;
      //   outline: 1px solid black;
    }
    .option-title {
      border-top: black;
      font-size: 14px;
      text-align: center;
    }
    .option-desc {
      font-size: 12px;
      text-align: center;
      color: #909399;
    }
    .option-btn {
      width: 100%;
    }
  }
}
</style>
