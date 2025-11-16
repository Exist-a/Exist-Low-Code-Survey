<template>
  <div class="container">
    <palette @addQues="addQues"></palette>
    <div class="survey" ref="survey">
      <!-- <singleSelect></singleSelect> -->
      <component
        v-for="(ques, index) in quesList"
        :key="index"
        :is="getCom(ques)"
        :num = "quesNumList[index]"
      />
    </div>

    <editor class="editor"></editor>
  </div>
</template>

<script setup lang="ts">
// import { onMounted, onUnmounted } from 'vue'
import { paletteItemsEn } from "~/configs/paletteSchame";
import type { quesType } from "~/types/ques/quesType";
import type quesSchameType from "~/types/ques/quesSchameType";
import type { allQuesType } from "~/types/ques/detailQuesType";
definePageMeta({
  layout: "default",
});
const surveyStore = useSurveyStore();
//题目组件映射表
const quesComMap: Record<allQuesType, any> = {
  "single-select": defineAsyncComponent(
    () => import("~/components/quesComs/select/singleSelect.vue")
  ),
  "mult-select": defineAsyncComponent(
    () => import("~/components/quesComs/select/multSelect.vue")
  ),
  "text-input": defineAsyncComponent(
    () => import("~/components/quesComs/textInput.vue")
  ),
  "dropdown-select": defineAsyncComponent(
    () => import("~/components/quesComs/select/dropdownSelect.vue")
  ),
  "date-time": defineAsyncComponent(
    () => import("~/components/quesComs/dateTime.vue")
  ),
  "date-of-birth": defineAsyncComponent(
    () => import("~/components/quesComs/dateOfBirth.vue")
  ),
  scale: defineAsyncComponent(() => import("~/components/quesComs/scale.vue")),
  satisfaction: defineAsyncComponent(
    () => import("~/components/quesComs/satisfaction.vue")
  ),
  sort: defineAsyncComponent(() => import("~/components/quesComs/sort.vue")),
  remark: defineAsyncComponent(
    () => import("~/components/quesComs/remark.vue")
  ),
  phone: defineAsyncComponent(() => import("~/components/quesComs/phone.vue")),
  qq: defineAsyncComponent(() => import("~/components/quesComs/qq.vue")),
  email: defineAsyncComponent(() => import("~/components/quesComs/email.vue")),
  name: defineAsyncComponent(() => import("~/components/quesComs/name.vue")),
  "id-card": defineAsyncComponent(
    () => import("~/components/quesComs/idCard.vue")
  ),
  gender: defineAsyncComponent(
    () => import("~/components/quesComs/gender.vue")
  ),
  age: defineAsyncComponent(() => import("~/components/quesComs/age.vue")),
  education: defineAsyncComponent(
    () => import("~/components/quesComs/education.vue")
  ),
  university: defineAsyncComponent(
    () => import("~/components/quesComs/university.vue")
  ),
  major: defineAsyncComponent(() => import("~/components/quesComs/major.vue")),
  industry: defineAsyncComponent(
    () => import("~/components/quesComs/industry.vue")
  ),
  occupation: defineAsyncComponent(
    () => import("~/components/quesComs/occupation.vue")
  ),
  "img-single-select": defineAsyncComponent(
    () => import("~/components/quesComs/select/imgSingleSelect.vue")
  ),
  "img-mult-select": defineAsyncComponent(
    () => import("~/components/quesComs/select/imgMultSelect.vue")
  ),
  wechat: defineAsyncComponent(
    () => import("~/components/quesComs/wechat.vue")
  ),
};
const quesList = computed<quesSchameType[]>(() => surveyStore.getQues());
const quesNumList = surveyStore.getQuesNum(s)
const survey = ref<HTMLElement | null>(null);

//点击添加题目
const addQues = (paletteName: quesType, quesName: number) => {
  //拿到目前要增加的题目
  if (!paletteItemsEn[paletteName][quesName]) return;
  console.log(paletteName, quesName);
  //向store中添加题目
  surveyStore.addQues(paletteName, paletteItemsEn[paletteName][quesName]);
};
const getCom = (ques: quesSchameType) => {
  return quesComMap[ques.name];
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  height: 100%;
  .survey {
    flex: 1;
    // background-color: #073738;
  }
}
</style>
