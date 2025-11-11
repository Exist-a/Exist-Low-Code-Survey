<template>
    <div class="container" >
        <!-- 单选题组件 -->
         <headerMaterials
         :num="1"
         >
        </headerMaterials>
         <div class="options">

         </div>
    </div>
</template>

<script setup lang="ts">
import headerMaterials from './materials/headerMaterials.vue';
//通过props传递配置
// const props = defineProps<{
    
// }>()

</script>

<style scoped lang="scss">

</style>