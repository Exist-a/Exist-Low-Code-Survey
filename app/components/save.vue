<template>
  <div class="save-container">
    <div class="btn btn-save" @click="save">保存问卷</div>
    <div class="btn btn-preview">问卷预览</div>
    <div class="btn btn-PDF">导出PDF</div>
    <div class="btn btn-cancel">取消编辑</div>
    <div class="switch">
      <span>是否启用密码</span>
      <Switch v-model="switchPasswordStatus" />
    </div>
    <input
      type="text"
      v-show="switchPasswordStatus"
      class="survey-password"
      placeholder="请输入问卷密码(最多8位)"
      maxlength="8"
    />
    <div class="switch">
      <span>是否设置起始时间</span>
      <Switch v-model="switchDurationStatus" />
    </div>
    <div class="datetime-group" v-show="switchDurationStatus">
      <div class="datetime-item">
        <span class="text">开始: </span
        ><input
          type="datetime-local"
          class="datetime-input"
          v-model="startDateTime"
        />
      </div>
      <div class="datetime-item">
        <span class="text"> 结束: </span
        ><input
          type="datetime-local"
          class="datetime-input"
          v-model="endDateTime"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Switch from "./switch.vue";
const surveyStore = useSurveyStore();
const switchPasswordStatus = ref(false);
const switchDurationStatus = ref(false);
const startDateTime = ref(dateToISO(new Date()));
const nextDay = new Date();
nextDay.setDate(nextDay.getDate() + 1);
const endDateTime = ref(dateToISO(nextDay));
//定义保存问卷方法
const save = () => {
  //获取当前问卷中题目
  const surveyList = surveyStore.getSurveyList();
  //随后对传至后端
  showDialog({
    title: "保存问卷",
    content: "问卷已保存",
    confirmText: "确认",
    cancelText: "取消",
  });
  console.log("保存问卷", surveyList);
};
const cancel = () => {
  showDialog({
    title: "取消编辑",
    content: "是否确认取消编辑？",
    confirmText: "确认",
    cancelText: "取消",
    onConfirm: () => {
      //传入取消编辑逻辑
      console.log("已取消编辑");
      return true;
    },
    onCancel: async () => {
      console.log("继续编辑");
    },
  });
};
</script>

<style scoped lang="scss">
.save-container {
  overflow-y: scroll;
  margin: 20px 0;
  padding: 10px;
  border-radius: $radius-lg;
  width: 20%;
  background-color: $bg-color;
  .btn {
    height: 50px;
    margin: 10px 20px;
    border-radius: $radius-lg;
    color: white;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    background-color: $font-color-normal;
  }
  .btn-preview {
    color: $info;
  }
  .btn-save {
    color: $success;
  }
  .btn-PDF {
    color: #ef6144;
  }
  .btn-cancel {
    color: $danger;
  }
  .switch {
    margin: 20px;
    align-items: center;
    display: flex;
    justify-content: center;
    span {
      margin-right: 10px;
    }
  }
  .survey-password {
    height: 40px;
    padding: 10px;
    width: calc(100% - 40px);
    margin: 0 20px;
    outline: none;
    border: none;
    background-color: $bg-color;
    border-bottom: 1px solid $font-color-normal;
  }
  .datetime-group {
    width: 100%; // 占满父容器宽度
    box-sizing: border-box; // 核心：padding/border 不增加总宽度
    padding: 0 10px; // 小屏幕左右留边，避免贴边溢出

    .datetime-item {
      margin: 0 auto; // item 整体居中
      width: 100%; // 自适应父容器
      max-width: 90vw; // 关键：限制最大宽度为屏幕宽度的90%，小屏幕不溢出
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px; // 文字和输入框间距
      box-sizing: border-box;

      .text {
        white-space: nowrap; // 防止文字换行
        font-size: 14px;
        color: #333;
        flex-shrink: 0; // 关键：文字不收缩，避免被输入框挤压变形
      }

      .datetime-input {
        flex: 1; // 占满剩余空间（自适应）
        width: 4.5vw; // 配合 flex:1 生效
        max-width: 200px; // 限制输入框最大宽度，小屏幕不溢出（可按需调整）
        padding: 6px 8px;
        border: 1px solid #e5e7eb;
        border-radius: 4px;
        box-sizing: border-box; // padding/border 不增加总宽度
        font-size: 14px; // 小屏幕适配字号
      }
    }
  }
}
</style>
