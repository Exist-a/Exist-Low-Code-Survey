<template>
  <div class="container">
    <h3>问卷1</h3>
    <div class="main-info">
      <div class="time-info">
        <div class="create-time">创建时间:</div>
        <div class="update-time">更新时间:</div>
      </div>
      <div class="answer-info">
        <div class="answer-num">参与人数:</div>
        <div class="btn check" @click="handleCheck">查看数据</div>
      </div>
      <div class="btns">
        <div class="editor btn" @click="handleEdit">编辑</div>
        <div class="share btn" @click="handleShare">分享</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleEdit = () => {
  console.log('编辑')
}
const handleShare = () => {
  console.log('分享')
}
const handleCheck = ()=>{
  console.log("查看数据")
}
</script>

<style scoped lang="scss">
.container {
  margin-top: 30px;
  padding: 10px 30px;
  box-shadow:
    2px 3px 3px inset grey,
    -4px -4px 3px inset white;
  border: 2px solid $font-color-normal;
  border-radius: $radius-lg;
  background-color: $bg-color;
  width: 100%;
  height: 13vh;

  .main-info {
    display: flex;
    justify-content: space-between;
    align-items: center; // 垂直居中按钮
    margin-top: 10px;
    .answer-info {
      .answer-num {
        font-size: 14px;
        margin-bottom: 5px;
        margin-top: 5px;
        color: $font-color-normal;
        text-align: center;
      }
      .check {
        color: $warning;
        font-size: 12px;
      }
      .btn {
        padding: 5px 10px;
        border-radius: $radius-lg;
        cursor: pointer;
        text-align: center;
        // 突起阴影：外层下右暗阴影，内层上左亮阴影
        box-shadow:
          2px 2px 4px rgba(0, 0, 0, 0.2),
          -2px -2px 4px rgba(255, 255, 255, 0.8);
        transition: all 0.2s ease; // 平滑过渡
      }
      .btn:hover {
        box-shadow:
          -2px -2px 4px rgba(0, 0, 0, 0.1),
          2px 2px 4px rgba(255, 255, 255, 0.5),
          inset 1px 1px 3px rgba(0, 0, 0, 0.1),
          inset -1px -1px 3px rgba(255, 255, 255, 0.6);
        transform: translateY(1px); // 轻微下移，增强下沉感
      }
    }
    .time-info {
      .create-time {
        font-size: 14px;
        color: $font-color-normal;
        margin-bottom: 5px;
      }
      .update-time {
        font-size: 14px;
        color: $font-color-normal;
      }
    }

    .btns {
      font-size: 12px;
      display: flex;
      flex-direction: column;
      gap: 4px; // 按钮间距

      .btn {
        padding: 5px 10px;
        border-radius: $radius-lg;
        cursor: pointer;
        text-align: center;
        // 突起阴影：外层下右暗阴影，内层上左亮阴影
        box-shadow:
          2px 2px 4px rgba(0, 0, 0, 0.2),
          -2px -2px 4px rgba(255, 255, 255, 0.8);
        transition: all 0.2s ease; // 平滑过渡
      }

      // hover 下沉效果：反转阴影方向
      .btn:hover {
        box-shadow:
          -2px -2px 4px rgba(0, 0, 0, 0.1),
          2px 2px 4px rgba(255, 255, 255, 0.5),
          inset 1px 1px 3px rgba(0, 0, 0, 0.1),
          inset -1px -1px 3px rgba(255, 255, 255, 0.6);
        transform: translateY(1px); // 轻微下移，增强下沉感
      }

      // 按钮区分色（可选）
      .editor {
        color: #1890ff;
      }
      .share {
        color: #00b42a;
      }
    }
  }
}
</style>
