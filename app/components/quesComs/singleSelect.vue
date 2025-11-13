<template>
    <div class="container" >
        <!-- 单选题组件 -->
         <headerMaterials
         :num="1"
         >
        </headerMaterials>
         <optionMaterials></optionMaterials>
    </div>
</template>

<script setup lang="ts">
import headerMaterials from './materials/headerMaterials.vue';
import optionMaterials from './materials/optionMaterials.vue';
//通过props传递配置
// const props = defineProps<{
    
// }>()

</script>

<style scoped lang="scss">

</style>