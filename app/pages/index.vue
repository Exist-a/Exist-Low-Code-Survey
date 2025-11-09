<template>
  <div class="container">
    <Header></Header>
    <ProjectTitle></ProjectTitle>
    <p class="anno">一个轻量级免费的问卷搭建平台</p>
    <div class="main">
      <div class="start-btn" @click="manageCilckHandler">
        <Icon name="tabler:arrow-big-right-line-filled" size="50" class="start-btn-icon"></Icon>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout:'blank'
})
import { navigateTo } from 'nuxt/app'
//处理点击事件
const manageCilckHandler = () => {
  //判断是否登录
  if (isLogin()) {
    //已经登陆
    navigateTo('/dashboard/manage')
  }else{
    //进入登录页
    navigateTo('/login')
  }
}
onMounted(() => {})
</script>

<style lang="scss" scoped>
.container{
  background-color: $bg-color;
  height: 100vh;
.anno {
  transform: translateY(-50px);
  font-family: 'Source Han Serif CN', '方正楷体', serif;

  font-size: 20px;
  text-align: center;
}
.main {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  height: 30vh;
  .start-btn {
    cursor: pointer;
    display: flex;
    text-align: center;
    align-items: center;
    background-color: #14b8a6;
    width: 90px;
    height: 90px;
    margin: auto;
    border-radius: $radius-circle;
    transition: all 0.5s ease-in-out;

    &-icon {
      margin: auto;
      align-items: center;
    }
  }
  .start-btn:hover{
    transform: scale(1.05);
    width: 50%;
    border-radius: 40px;
    box-shadow: 4px 3px 4px gray;
  }
}
}
</style>
