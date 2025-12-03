<template>
  <div class="save-container">
    <div class="btn btn-save" @click="save">保存问卷</div>
    <div class="btn btn-preview">问卷预览</div>
    <div class="btn btn-PDF">导出PDF</div>
    <div class="btn btn-cancel">取消编辑</div>
  </div>
</template>

<script setup lang="ts">
const surveyStore = useSurveyStore();
//定义保存问卷方法
const save = () => {
    //获取当前问卷中题目
    const surveyList = surveyStore.getSurveyList()
    //随后对传至后端
    showDialog({
      title: "保存问卷",
      content: "问卷已保存",
      confirmText: "确认",
      cancelText: "取消",
    });
    console.log("保存问卷",surveyList);
}
const cancel = () => {
    showDialog({
      title: "取消编辑",
      content: "是否确认取消编辑？",
      confirmText: "确认",
      cancelText: "取消",
      onConfirm: () => {
        //传入取消编辑逻辑
        console.log("已取消编辑");
      },
      onCancel: () => {
        console.log("继续编辑");
      },
    });   
}
</script>

<style scoped lang="scss">
.save-container {
  overflow-y: scroll;
  margin: 20px 0;
  padding: 10px;
  border-radius: $radius-lg;
  // height: 100%;
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
}
</style>
