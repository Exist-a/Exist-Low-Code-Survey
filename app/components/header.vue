<template>
  <div>
    <nav class="nav">
      <div class="logout">退出登录</div>

      <img src="../assets/imgs/default.jpg" class="avator" />
    </nav>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.nav {
  padding: 5px 20px;
  border-bottom: 1px dotted black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logout {
    font-family: 'Source Han Serif CN', '方正楷体', serif;

    text-align: center;
    height: 35px;
    width: 60px;
    border-radius: 3px;
    line-height: 35px;
    font-size: 12px;
    background-color: #f87171;
  }
  .avator {
    border-radius: 50%;
    border: 3px solid #e5e7eb;
    overflow: hidden;
    height: 60px;
    width: 60px;
    object-fit: cover;
    transition: all 0.5s ease-out;
  }
  .avator:hover {
    transform: scale(1.05);
  }
}
</style>
