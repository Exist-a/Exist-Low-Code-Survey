<template>
  <div class="container">
    <palette @addQues="addQues"></palette>
    <div class="survey" ref="survey">
      <component
        v-for="(ques, index) in quesList"
        :key="index"
        :is="getCom(ques)"
        :num="quesNumList[index]"
        :quesSchame="ques"
        @click.native="selectQues($event, ques)"
        class="quesCom"
      />
    </div>

    <editor class="editor" :isStringOptions :quesSchame="activeQues"/>
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
    () => import("~/components/quesComs/textInput/textInput.vue")
  ),
  "dropdown-select": defineAsyncComponent(
    () => import("~/components/quesComs/select/dropdownSelect.vue")
  ),
  "date-time": defineAsyncComponent(
    () => import("~/components/quesComs/advancedQuestion/dateTime.vue")
  ),
  "date-of-birth": defineAsyncComponent(
    () => import("~/components/quesComs/personalInfo/dateOfBirth.vue")
  ),
  scale: defineAsyncComponent(
    () => import("~/components/quesComs/advancedQuestion/scale.vue")
  ),
  satisfaction: defineAsyncComponent(
    () => import("~/components/quesComs/advancedQuestion/satisfaction.vue")
  ),
  sort: defineAsyncComponent(
    () => import("~/components/quesComs/advancedQuestion/sort.vue")
  ),
  remark: defineAsyncComponent(
    () => import("~/components/quesComs/remark/remark.vue")
  ),
  phone: defineAsyncComponent(
    () => import("~/components/quesComs/contactInfo/phone.vue")
  ),
  qq: defineAsyncComponent(
    () => import("~/components/quesComs/contactInfo/qq.vue")
  ),
  email: defineAsyncComponent(
    () => import("~/components/quesComs/contactInfo/email.vue")
  ),
  name: defineAsyncComponent(
    () => import("~/components/quesComs/personalInfo/name.vue")
  ),
  "id-card": defineAsyncComponent(
    () => import("~/components/quesComs/personalInfo/idCard.vue")
  ),
  gender: defineAsyncComponent(
    () => import("~/components/quesComs/personalInfo/gender.vue")
  ),
  age: defineAsyncComponent(
    () => import("~/components/quesComs/personalInfo/age.vue")
  ),
  education: defineAsyncComponent(
    () => import("~/components/quesComs/personalInfo/education.vue")
  ),
  university: defineAsyncComponent(
    () => import("~/components/quesComs/personalInfo/university.vue")
  ),
  major: defineAsyncComponent(
    () => import("~/components/quesComs/personalInfo/major.vue")
  ),
  industry: defineAsyncComponent(
    () => import("~/components/quesComs/personalInfo/industry.vue")
  ),
  occupation: defineAsyncComponent(
    () => import("~/components/quesComs/personalInfo/occupation.vue")
  ),
  "img-single-select": defineAsyncComponent(
    () => import("~/components/quesComs/select/imgSingleSelect.vue")
  ),
  "img-mult-select": defineAsyncComponent(
    () => import("~/components/quesComs/select/imgMultSelect.vue")
  ),
  wechat: defineAsyncComponent(
    () => import("~/components/quesComs/contactInfo/wechat.vue")
  ),
};
const quesList = computed<quesSchameType[]>(() => surveyStore.getQues());
const quesNumList = surveyStore.getQuesNum();

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
//点击选择题目
const survey = ref<HTMLElement | null>(null);
const activeQues = ref<quesSchameType | null>(null);
const isStringOptions = ref<boolean>(false);
const selectQues = (e: MouseEvent, quesSchame: quesSchameType) => {
  //清除上一个active
  if (survey.value) {
    console.log(survey.value.children);
    const children = survey.value.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i]?.classList.contains("active")) {
        children[i]?.classList.remove("active");
      }
    }
  }
  if (e.currentTarget && e.currentTarget instanceof HTMLElement) {
    if (e.currentTarget.classList.contains("active")) {
      e.currentTarget.classList.remove("active");
    } else {
      e.currentTarget.classList.add("active");
    }
    activeQues.value = quesSchame;
    if (typeof activeQues.value.state.options.status[0] === "string") {
      isStringOptions.value = true;
    } else {
      isStringOptions.value = false;
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  height: 100%;
  .survey {
    padding: 10px;
    flex: 1;
  }
  .quesCom:hover {
    transform: translateY(-5px);
    box-shadow: $shadow-lg;
  }
  .quesCom {
    padding: 20px 10px 10px 10px;
    transition: all 0.5s ease;
  }
  .active {
    transform: translateY(-5px);
    box-shadow: $shadow-lg;
  }
}
</style>
