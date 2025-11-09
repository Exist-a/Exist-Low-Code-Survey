<template>
  <div class="container">
    <div class="nav">
      <img src="../assets/imgs/default.jpg" alt="" class="nav-avator" />

      <div class="nav-other">
        <NuxtLink to="/dashboard/manage" class="nav-link" activeClass="active"
          ><Icon
            class="nav-icon"
            name="material-symbols-light:manage-search"
            size="3.3vw"
            style="color: #f0f2f5"
        /></NuxtLink>
        <NuxtLink to="/dashboard/create" class="nav-link" activeClass="active"
          ><Icon
            class="nav-icon"
            name="material-symbols-light:list-alt-outline"
            size="3.3vw"
            style="color: #f0f2f5"
        /></NuxtLink>
        <NuxtLink to="/dashboard/feedback" class="nav-link" activeClass="active"
          ><Icon
            class="nav-icon"
            name="material-symbols-light:feedback-outline"
            size="3.3vw"
            style="color: #f0f2f5"
        /></NuxtLink>
        <NuxtLink to="/dashboard/user" class="nav-link" activeClass="active"
          ><Icon class="nav-icon" name="hugeicons:user" size="3.3vw" style="color: #f0f2f5"
        /></NuxtLink>
        <div class="nav-select" :style="{ top: selectedTop }"> </div>
        <div class="nav-selected" :style="{ top: selectedTop }"></div>
      </div>
    </div>
    <div class="main">
      <NuxtPage></NuxtPage>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from '#app'
const route = useRoute()

const getActiveIndex = () => {
  const path = route.path
  if (path.includes('/manage')) return 0
  if (path.includes('/create')) return 1
  if (path.includes('/feedback')) return 2
  if (path.includes('/user')) return 3
  return 0
}
const selectedTop = computed(() => {
  const index = getActiveIndex()
  return `${22.3 + index * 18.45}vh`
})
</script>

<style scoped lang="scss">
// 定义变量：初始left值和每次递增的距离（根据你的布局计算）
$start-top: 22.3vh; // 第一个导航项对应的left值
$increment: 18.45vh; // 每个导航项之间的left差值（110-30=80，190-110=80）
$item-count: 4; // 导航项数量

.container {
  height: 100vh;
  display: flex;
  .nav {
    box-shadow: 2px 2px 5px gray;
    background-color: #1f2937;
    width: 5vw;
    border-radius: $radius-lg;
    display: flex;
    flex-direction: column;
    padding: 30px 0;
    &-avator {
      border-radius: $radius-circle;
      border: 2px solid $info;
      width: 4vw;
      margin: 10px 0.5vw;
    }

    &-other {
      margin-top: -20px;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-evenly;

      // 4. hover时移动方块：通过循环生成每个导航项的样式
      @for $i from 1 through $item-count {
        .nav-link:nth-child(#{$i}):hover ~ .nav-select {
          top: $start-top + ($i - 1) * $increment !important;
        }
      }

      .nav-select {
        pointer-events: none; // 新增
        width: 250px;
        height: 250px;
        border-radius: 50%; /* 强制圆形 */

        /* 2. 径向渐变：模拟“中心亮、边缘暗”的光衰减 */
        background: radial-gradient(
          circle at center,
          /* 从中心向外扩散 */ rgba(255, 255, 252, 0.9) 0%,
          /* 中心最亮（暖白光） */ rgba(252, 252, 227, 0.6) 30%,
          /* 中间亮度降低 */ rgba(255, 255, 211, 0.2) 70%,
          /* 边缘明显变暗 */ transparent 100% /* 最外层完全透明（融入背景） */
        );

        /* 3. 模糊+外阴影：增强光的扩散感 */
        filter: blur(6px); /* 柔化边缘，避免生硬的圆形轮廓 */
        box-shadow: 0 0 60px 30px rgba(255, 255, 200, 0.15); /* 外围淡光晕，模拟光的扩散 */
        position: absolute;
        height: 3.9vw;
        width: 4.2vw;
        z-index: 1;
        left: 0.4vw;
        // top: 22.3vh;

        transition: top 0.5s ease-in-out ;
      }
      .nav-selected {
        transition: all 0.5s ease-in-out;
        background-color: $bg-color;
        box-shadow:
          inset 3px 3px 5px rgba(0, 0, 0, 0.461),
          inset -3px -3px 5px rgba(255, 255, 255, 0.553);
        border-radius: $radius-lg;
        position: absolute;
        height: 3.9vw;
        width: 4.2vw;
        z-index: 1;
        left: 0.4vw;

        // 为每个可能的位置定义样式
        // @for $i from 0 through $item-count - 1 {
        //   &.active-#{$i} {
        //     top: $start-top + $i * $increment;
        //   }
        // }
      }
      .nav-link:hover .nav-icon {
        color: rgb(34, 34, 34) !important;
      }
      .nav-link.active .nav-icon {
        color: #1f2937 !important;
      }

      .nav-link {
        width: 100%;
        display: flex;
        justify-content: center;
        text-decoration: none;
        align-items: center;
        position: relative; // 新增
        z-index: 2; // 新增
        height: 3.9vw; // 新增
        .nav-icon {
          transition: color 0.4s ease-in-out;
          z-index: 2;
        }
      }
    }
  }
  .main {
    padding:20px;
    flex: 1;
  }
}
</style>
