<template>
  <div style="padding: 20px 0px; height: 100%">
    <div class="feedbackItems">
      <feedbackItem
        v-for="item in mockData"
        :username="item.username"
        :userAvatorPath="item.userAvatorPath"
        :feedback-date="item.feedbackDate"
        :feedback-text="item.feedbackText"
      />
    </div>
    <feedbackInput></feedbackInput>
  </div>
</template>

<script setup lang="ts">
import feedbackItem from "~/components/feedbackComs/feedbackItem.vue";
import feedbackInput from "~/components/feedbackComs/feedbackInput.vue";
definePageMeta({
  layout: "default",
});
//模拟数据
const mockData = [
  {
    username: "user1",
    userAvatorPath:
      "https://tse1-mm.cn.bing.net/th/id/OIP-C.7ZtXPmjTCzQbwQOIpZK-hwHaKO?w=134&h=185&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3",
    feedbackText: "This is a feedback",
    feedbackDate: new Date(),
    
  },
  {
    username: "user2",
    userAvatorPath:
      "https://tse4-mm.cn.bing.net/th/id/OIP-C.buUDZWZdaAGV5uoK0ACVlgHaE8?w=285&h=190&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3",
    feedbackText: "Another feedback",
    feedbackDate: new Date(),
  },
];
</script>

<style lang="scss" scoped></style>
