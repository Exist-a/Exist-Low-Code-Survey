<template>
    <div class="btn-group-container">
        <div v-for="item in props.status">
            {{ item }}
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    status:string[]
}>()
</script>

<style scoped lang="scss"> 

</style>