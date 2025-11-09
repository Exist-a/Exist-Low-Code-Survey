<template>
  <div class="_container">
    <exsearchBox width-after="40vw" width-before="3vw" class="search-box" @search="searchHandler" />

    <div class="survey-list">
        <surveyListItem></surveyListItem>
        <surveyListItem></surveyListItem>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
//组件内部按下enter时触发搜索函数
const searchHandler = (searchWord) => {
  console.log('搜索', searchWord)
}
const data = [
  {
    name: '01',
    createData: '2025.9.10'
  }
]
</script>

<style lang="scss" scoped>
._container {
  .survey-list {
    margin: auto;
  }

}
</style>
