<template>
  <div class="container">
    <div class="user-info">
      <img :src="userInfo.userAvatorPath" alt="" class="user-avator" />
      <div class="name-id">
        <p class="user-name">{{ userInfo.username }}</p>
        <p class="user-id">ID：{{ userInfo.userId }}</p>
      </div>
    </div>
    <div class="survey-data"></div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
const userStore = useUserStore();
const userInfo = userStore.getUserInfo();
</script>

<style scoped lang="scss">
.container{
  padding: 20px 0;
  .user-info{
    display: flex;
    align-items:flex-start;

    .user-avator{
      height: 25vh;
      border-radius: 50%;
      object-fit: contain;
      border: 2px solid $font-color-normal;
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.341);
    }
    .name-id{
      transform: translateY(50%);
      // padding: 20px;
      margin-left: 50px;
      align-items: center;
      vertical-align: middle;
      .user-name{
        font-size: 40px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
