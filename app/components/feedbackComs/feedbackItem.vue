<template>
  <div class="feedback-item-container">
    <div class="feedback-info">
      <div class="user-info">
        <img :src="userAvatorPath" alt="" class="user-avator" />
        <div class="user-name">{{ username }}</div>
      </div>
      <div class="feedback-date">{{ dateToDateTime(feedbackDate) }}</div>
    </div>
    <div class="feedback-content">{{ feedbackText }}</div>
    <div class="feedback-actions">
      <div class="like-btn"></div>
      <div class="reply-btn"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface feedbackItemProps {
  username: string;
  userAvatorPath: string;
  feedbackText: string;
  feedbackDate: Date;
}
defineProps<feedbackItemProps>();
</script>

<style scoped lang="scss">
.feedback-item-container {
  margin-bottom: 20px;
  border-radius: $radius-lg;
  background-color: $bg-color;
  padding: 20px;
  border: 1px solid $font-color-normal;
  box-shadow:
    2px 3px 3px inset rgba(128, 128, 128, 0.716),
    -4px -4px 3px inset rgba(255, 255, 255, 0.821);
  .feedback-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    justify-content: space-between;
    .user-info {
      align-items: center;
      display: flex;
      .user-avator {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
        object-fit: cover;
      }
      .user-name {
        font-weight: bold;
        margin-right: 20px;
      }
    }

    .feedback-date {
      // color: $font-color-secondary;
      font-size: 14px;
    }
  }
  .feedback-content {
    margin-top: 20px;
  }
}
</style>
