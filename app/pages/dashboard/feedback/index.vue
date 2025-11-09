<template>
  <div>
    
   
      >feedback
      
    
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  console.log('feedback：挂载成功')
})
onUnmounted(() => {
  console.log('feedback：被销毁了')
})
definePageMeta({
  layout: 'default'
})
</script>

<style lang="scss" scoped></style>
