<template>
  <div
    :style="{
      textAlign: position ? 'center' : 'left',
    }"
    class="options-container"
  >
    <div v-for="(item, index) in props.optionsStatus.status" class="option-item">
      <input
        :type="props.isSingleSelect ? 'radio' : 'checkbox'"
        :name="'selectOption' + props.quesNum"
        v-model="selectedValue"
        :id="'option' + props.quesNum + index"
        :value="index"
        class="select-btn"
      />
      <label :for="'option' + props.quesNum + index">{{ item }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type optionsType from "~/types/ques/common/optionsType";
const props = defineProps<{
  optionsStatus: optionsType;
  isSingleSelect: boolean;
  quesNum: number;
  position: number;
}>();

// 单选：存储选中的索引（-1 表示未选中）
const singleState = ref<number>(-1);
// 复选：存储选中的索引集合（数组）
const multiState = ref<number[]>([]);

// 计算属性：根据模式切换 v-model 绑定的目标
const selectedValue = computed({
  get() {
    return props.isSingleSelect ? singleState.value : multiState.value;
  },
  set(val) {
    console.log(val, multiState.value)
    if (props.isSingleSelect) {
      singleState.value = val as number;
    } else {
      multiState.value = val as number[];
    }
  },
});

onMounted(() => {
  const initial = props.optionsStatus.currentStatus;
  if (props.isSingleSelect) {
    // 单选初始化：假设 initial 是单一下标（number）
    singleState.value = initial as number;
  } else {
    // 复选初始化：假设 initial 是选中的索引数组（number[]）
    multiState.value = initial as number[];
  }
});
</script>

<style scoped lang="scss">
.options-container{
  width: 100%;
  // display: flex;
  // justify-content: space-evenly;
  .option-item{
    display: inline-block;
    margin: 10px;
    .select-btn{
      margin-right: 10px;
    }
  }
}
</style>
