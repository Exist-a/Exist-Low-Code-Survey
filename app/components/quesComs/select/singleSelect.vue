<template>
  <div class="_container" v-bind="$attrs">
    <!-- 单选题组件 -->
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
    <optionMaterials
      :optionsStatus="props.quesSchame.state.options"
      :isSingleSelect="true"
      :quesNum="props.num"
      :position="state.position.currentStatus"
    />
  </div>
</template>

<script setup lang="ts">
import type quesSchameType from "~/types/ques/quesSchameType";
import headerMaterials from "../materials/headerMaterials.vue";
import optionMaterials from "../materials/optionMaterials.vue";
//通过props传递配置

const props = defineProps<{
  num: number;
  quesSchame: quesSchameType;
}>();
const state = props.quesSchame.state;
</script>

<style scoped lang="scss">
// ._container {
//   padding: 20px 10px 10px 10px;
//   transition: all 0.5s ease;
// }
// ._container:hover{
//   transform: translateY(-5px);
//   box-shadow: $shadow-lg;

// }
</style>
