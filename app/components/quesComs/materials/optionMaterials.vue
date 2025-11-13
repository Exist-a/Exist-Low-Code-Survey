<template>
    <div>
        <input type="radio" v-model="state" name="option">
        <label for="option">单选题选项</label>
    </div>
</template>

<script setup lang="ts">
const state = ref(false)
</script>

<style scoped>

</style>