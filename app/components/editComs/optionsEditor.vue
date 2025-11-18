<template>
  <div class="string-options" v-if="isStringOption" >
    <!-- 是字符串类型的选项 -->
    <div class="option" v-for="item,index in props.optionsSchame.status">
      <editorInput
      type="text" 
      :modelValue="props.optionsSchame.status[index] as string"
      />
      <div class="reduce-btn">-</div>
    </div>
  </div>
  <div class="img-options" v-else>

  </div>
</template>

<script setup lang="ts">
import type optionsType from '~/types/ques/common/optionsType';

const props =  defineProps<{
  optionsSchame:optionsType
  isStringOption:boolean
}>()
</script>

<style scoped></style>
