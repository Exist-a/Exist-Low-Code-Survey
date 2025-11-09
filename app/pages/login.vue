<template>
  <div class="container">
    <div class="silde-container">
      <div class="board" :class="isInLogin ? 'board-login' : 'board-register'">
        <div class="cricle-rt"></div>
        <div class="cricle-lb"></div>
        <h2 class="board-title" :class="isInLogin ? 'active' : ''">Welcome back !</h2>
        <h2 class="board-title" :class="!isInLogin ? 'active' : ''">Hello, my friend</h2>
        <p class="board-text" :class="isInLogin ? 'active' : ''">
          没有账号？立即注册和我成为朋友吧~
        </p>
        <p class="board-text" :class="!isInLogin ? 'active' : ''">
          已经有账号了吗？立即登录使用吧~
        </p>
        <div class="board-btn" @click="switchLogin" :class="isInLogin ? 'active' : ''">去注册</div>
        <div class="board-btn" @click="switchLogin" :class="!isInLogin ? 'active' : ''">去登录</div>
      </div>
      <div class="form" :class="isInLogin ? 'form-login' : 'form-register'">
        <h3 class="form-title" :class="isInLogin ? 'active' : ''">登录账号</h3>
        <h3 class="form-title" :class="!isInLogin ? 'active' : ''">注册账号</h3>
        <div class="input-group-login" :class="isInLogin ? 'active' : ''">
          <exinput
            type="text"
            width="80%"
            height="10%"
            place-holder="请输入账号"
            class="form-input"
            v-model="loginData.account"
          ></exinput>
          <exinput
            type="password"
            width="80%"
            height="10%"
            place-holder="请输入密码"
            class="form-input"
            v-model="loginData.password"
          ></exinput>
        </div>
        <div class="input-group-register" :class="!isInLogin ? 'active' : ''">
          <exinput
            type="text"
            width="80%"
            height="9%"
            place-holder="请输入账号"
            class="form-input"
            v-model="registerData.account"
          ></exinput>
          <exinput
            type="password"
            width="80%"
            height="9%"
            place-holder="请输入密码"
            class="form-input"
            v-model="registerData.password"
          ></exinput>
          <exinput
            type="password"
            width="80%"
            height="9%"
            place-holder="请再次输入密码"
            class="form-input"
            v-model="registerData.passwordAgain"
          ></exinput>
        </div>
        <exbutton
          text="登录"
          backgroundColor="#3b82f6"
          class="form-login-button"
          :class="isInLogin ? 'active' : ''"
          @click="loginHandler"
        />
        <exbutton
          text="注册"
          backgroundColor="#3b82f6"
          class="form-register-button"
          :class="!isInLogin ? 'active' : ''"
          @click="registerHandler"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout:'blank'
})
type loginDataType = {
  account: string | null
  password: string | null
}
type registerDataType = {
  account: string | null
  password: string | null
  passwordAgain: string | null
}
//切换状态逻辑
const isInLogin = ref(true)
const switchLogin = () => {
  isInLogin.value = !isInLogin.value
}
//获取登录账户密码
const loginData: loginDataType = { account: null, password: null }
const registerData: registerDataType = { account: null, password: null, passwordAgain: null }

const loginHandler = () => {
  console.log("login")
}
const registerHandler = () => {
  console.log("register")

}
</script>

<style lang="scss" scoped>
$bg-color: #f0f2f5;

.container {
  background-color: $bg-color;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  .silde-container {
    border-radius: $radius-lg;

    margin: auto;
    box-shadow:
      -3px -3px 3px 3px white,
      3px 3px 3px 3px rgba(0, 0, 0, 0.08);
    align-items: center;
    display: flex;
    width: 50vw;
    height: 60vh;
    .form-login {
      transform: translateX(0);
    }
    .form-register {
      transform: translateX(-20vw);
    }
    .form {
      transition: all 0.6s ease-in-out;

      padding: 30px;
      height: 60vh;
      width: 100%;
      background-color: $bg-color;
      position: relative;
      border-radius: $radius-lg;
      .active {
        visibility: visible !important;
        opacity: 1 !important;
      }
      &-title {
        transition: all 0.6s ease-in-out;
        visibility: hidden;
        opacity: 0;

        position: absolute;
        left: 10vw;
        margin: 35px 0;
        font-size: 2.7vw;
        text-align: center;
        height: 10vh;
        font-family: 'Source Han Serif CN', '方正楷体', serif;
        line-height: 10vh;
      }
      .input-group-login {
        transition: all 0.6s ease-in-out;

        visibility: hidden;
        opacity: 0;

        position: absolute;
        height: 100%;
        width: 100%;
        left: -0.3vw;
        top: 20vh;
        z-index: 0;
        .active {
          visibility: visible;
          opacity: 1;

          z-index: 1;
        }
        .form-input {
          display: block;
          margin: 20px auto;
        }
      }
      .input-group-register {
        transition: all 0.6s ease-in-out;

        opacity: 0;
        visibility: hidden;
        position: absolute;
        height: 100%;
        width: 100%;
        left: -0.3vw;
        top: 18vh;
        .active {
          opacity: 1;
          visibility: visible;
        }
        .form-input {
          display: block;
          margin: 20px auto;
        }
      }
      &-login-button {
        transition: all 0.6s ease-in-out;
        cursor: pointer;

        visibility: hidden;
        opacity: 0;

        top: 36vh;
        left: 10vw;
        position: absolute;
      }
      &-register-button {
        transition: all 0.6s ease-in-out;
        opacity: 0;
        visibility: hidden;
        cursor: pointer;
        top: 38vh;
        left: 10vw;
        position: absolute;
      }
    }
    .board-login {
      transform: translateX(0);
      border-radius: $radius-lg 0 0 $radius-lg;
    }
    .board-register {
      transform: translateX(30vw);
      border-radius: 0 $radius-lg $radius-lg 0;
      box-shadow:
        4px 4px 10px #d1d9e6,
        -4px 4px 10px #d1d9e6 !important;
    }
    .board {
      z-index: 1;
      box-shadow: 4px 4px 10px #d1d9e6;
      align-items: center;
      overflow: hidden;
      background-color: $bg-color;
      position: relative;

      transition: all 0.6s ease-in-out;
      height: 60vh;
      // border-radius: $radius-lg 0 0 $radius-lg;
      width: 70%;
      overflow: hidden;
      .active {
        visibility: visible;
        opacity: 1;
      }
      .cricle-rt {
        position: absolute;
        top: -22vh;
        left: 11vw;
        border-radius: 50%;
        height: 35vh;
        width: 35vh;
        background-color: $bg-color;
        box-shadow:
          inset 8px 8px 12px #a5aab1,
          inset -8px -8px 12px #f3f3f3;
      }
      .cricle-lb {
        position: absolute;
        bottom: -26vh;
        left: -11vw;
        border-radius: 50%;
        height: 40vh;
        width: 40vh;
        background-color: $bg-color;
        box-shadow:
          inset 8px 8px 12px #a3a8af,
          inset -8px -8px 12px #fff;
      }
      &-title {
        transition: all 0.6s ease-in-out;
        text-shadow: 3px 3px 4px rgba(141, 141, 141, 0.479);

        position: absolute;
        left: calc(50% - 8vw);
        margin-top: 40%;
        font-family: A-Nice-Day-2;
        font-size: 2.5vw;
        text-align: center;
        height: 12vh;
        line-height: 12vh;
        visibility: hidden;
        opacity: 0;
      }
      &-text {
        transition: all 0.6s ease-in-out;

        visibility: hidden;
        opacity: 0;

        position: absolute;
        left: calc(50% - 6.5vw);
        top: 44%;
        text-align: center;
        font-size: 0.8vw;
        color: $font-color-light;
        font-family: 'Source Han Serif CN', '方正楷体', serif;
      }
      &-btn {
        transition: all 0.6s ease-in-out;
        cursor: pointer;
        position: absolute;
        left: calc(50% - 5vw);
        top: 48%;
        visibility: hidden;
        opacity: 0;

        box-shadow: 3px 3px 3px rgb(160, 159, 159);
        line-height: 5vh;
        text-align: center;
        color: white;
        font-size: 16px;
        height: 5vh;
        width: 10vw;
        border-radius: 3vw;
        margin: 7vh auto;
        background-color: $info;
      }
    }
  }
}
</style>
