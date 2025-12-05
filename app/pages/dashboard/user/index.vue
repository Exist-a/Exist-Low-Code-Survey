<template>
  <div class="user-container">
    <div class="user-info">
      <img
        :src="userInfo.userAvatorPath"
        alt=""
        class="user-avator"
        @click="editAvator"
      />
      <input type="file" hidden ref="avatorInput" @change="updateAvator" />
      <div class="name-id">
        <div class="edit">
          <input
            class="name-input"
            type="text"
            v-show="isEdit"
            ref="nameInput"
            :value="userInfo.username"
          />
          <div class="cancel-btn" v-show="isEdit" @click="isEdit = false">
            取消
          </div>

          <div class="save-btn" v-show="isEdit" @click="editName">确认</div>
        </div>

        <p class="user-name" @click="isEdit = true" v-show="!isEdit">
          {{ userInfo.username }}
        </p>
        <p class="user-id">ID：{{ userInfo.userId }}</p>
      </div>
      <div class="data-panel">
        <!-- 核心新增：问卷统计内容 -->
        <div class="panel-header">
          <span class="panel-title">问卷数据统计</span>
        </div>
        <div class="stats-grid">
          <!-- 基础项：我的问卷数量 -->
          <div class="stat-item">
            <span class="stat-label">我的问卷数量</span>
            <span class="stat-value">8</span>
          </div>
          <!-- 基础项：我参与的问卷数 -->
          <div class="stat-item">
            <span class="stat-label">我参与的问卷数</span>
            <span class="stat-value">15</span>
          </div>
          <!-- 基础项：问卷总计回答人数 -->
          <div class="stat-item">
            <span class="stat-label">问卷总计回答人数</span>
            <span class="stat-value">246</span>
          </div>
          <!-- 补充项：我的问卷平均回收率 -->
          <div class="stat-item">
            <span class="stat-label">我的问卷平均回收率</span>
            <span class="stat-value">89%</span>
          </div>
          <!-- 补充项：最近7天创建问卷数 -->
          <div class="stat-item">
            <span class="stat-label">最近7天创建问卷数</span>
            <span class="stat-value">3</span>
          </div>
          <!-- 补充项：我的问卷最高参与人数 -->
          <div class="stat-item">
            <span class="stat-label">我的问卷最高参与人数</span>
            <span class="stat-value">68</span>
          </div>
        </div>
      </div>
    </div>
    <div class="survey-data">
      <chartsItem></chartsItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import chartsItem from '~/components/userComs/chartsItem.vue';
definePageMeta({
  layout: "default",
});
const userStore = useUserStore();
const userInfo = ref(userStore.getUserInfo());
const nameInput = ref<HTMLInputElement>();
const avatorInput = ref<HTMLInputElement>();
const isEdit = ref<boolean>(false);

const editName = () => {
  if (!nameInput.value) {
    showErrorToast({
      title: "修改失败",
      desc: "请刷新页面重试",
    });
    return;
  }
  const newName = nameInput.value.value.trim();
  const { isOk, msg } = usernameValid(newName);
  if (!isOk) {
    showErrorToast({
      title: "修改失败",
      desc: msg,
    });
  } else {
    showSuccessToast({
      title: "修改成功",
      desc: msg,
    });
    //进行api调用，传到后端

    //前端渲染
    userStore.setUserName(newName);
    userInfo.value = userStore.getUserInfo();
  }
  isEdit.value = false;
};

const editAvator = () => {
  if (!avatorInput.value) {
    showErrorToast({
      title: "修改失败",
      desc: "请刷新页面重试",
    });
    return;
  }
  avatorInput.value.click();
};
const updateAvator = async () => {
  if (!avatorInput.value) {
    showErrorToast({
      title: "修改失败",
      desc: "请刷新页面重试",
    });
    return;
  }
  if (!avatorInput.value.files || !avatorInput.value.files[0]) {
    showErrorToast({
      title: "修改失败",
      desc: "请刷新页面重试",
    });
    return;
  }
  const file = avatorInput.value.files[0];
  //获取对象后与后端交流，这里暂时转为base64
  const base64 = await fileToBase64(file);
  userInfo.value.userAvatorPath = base64;
};
</script>

<style scoped lang="scss">
.user-container {
  overflow-y: scroll;
  height: 100%;
  padding: 20px 0;
  .user-info {
    display: flex;
    align-items: flex-start;
    border-bottom: 1px dotted $font-color-light;
    width: 100%;
    // padding: 20px 0;
    align-items: center;
    .user-avator {
      height: 25vh;
      border-radius: 50%;
      object-fit: contain;
      border: 2px solid $font-color-normal;
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.341);
    }
    .name-id {
      // transform: translateY(50%);
      // padding: 20px;
      margin-left: 100px;
      .edit {
        display: flex;
        align-items: center;
        .name-input {
          // background-color: $bg-color;
          border: 1px solid $font-color-normal;
          border-radius: $radius-lg;
          font-size: 16px;
          height: 40px;
          margin-bottom: 20px;
          width: 130px;
          padding: 10px;
        }
        .cancel-btn {
          margin-bottom: 20px;
          margin-left: 10px;
          height: 30px;
          width: 60px;
          line-height: 30px;
          font-size: 14px;
          text-align: center;
          border-radius: $radius-base;
          background-color: $danger;
          cursor: pointer;
        }
        .save-btn {
          margin-bottom: 20px;
          margin-left: 10px;
          height: 30px;
          width: 60px;
          line-height: 30px;
          font-size: 14px;
          text-align: center;
          border-radius: $radius-base;
          cursor: pointer;
          background-color: $success;
        }
      }

      .user-name {
        font-size: 40px;
        cursor: pointer;
        margin-bottom: 20px;
      }
      .user-id {
        color: $font-color-light;
      }
    }

    .data-panel {
      margin: 20px auto;
      height: 30vh;
      background-color: $bg-color;
      width: 25vw;
      border: 1.5px solid $font-color-normal;
      border-radius: $radius-lg;
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.195);
      transition: all 0.5s ease;
      padding: 15px;
      box-sizing: border-box;

      // 新增：面板标题
      .panel-header {
        border-bottom: 1px solid $font-color-light;
        padding-bottom: 8px;
        margin-bottom: 12px;
        .panel-title {
          font-size: 18px;
          font-weight: 600;
          color: $font-color-normal;
        }
      }

      // 新增：网格布局（一行两个）
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        height: calc(100% - 40px);
        overflow-y: auto; // 数据过多时滚动

        // 新增：单个统计项
        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          border-radius: $radius-base;
          padding: 8px 5px;
          box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.08);

          .stat-label {
            font-size: 14px;
            color: $font-color-light;
            margin-bottom: 5px;
          }

          .stat-value {
            font-size: 20px;
            font-weight: 600;
            color: $font-color-normal;
          }
        }
      }
    }
  }
  .survey-data{
    // overflow-y: scroll;
  }
}
</style>
