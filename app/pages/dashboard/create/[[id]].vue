<template>
  <div class="container">
    <palette @addQues="addQues"></palette>
    <div class="survey" ref="survey">
      <div class="ques" v-for="(ques, index) in quesList">
        <div class="reduce-btn" @click="delQues(index)">
          <Icon name="teenyicons:minus-small-outline" size="30px"></Icon>
        </div>
        <component
          :key="ques.id"
          :is="getCom(ques)"
          :num="quesNumList[index]"
          :quesSchame="ques"
          @click="selectQues($event, ques, index)"
          class="quesCom"
        />
      </div>
    </div>

    <editor
      class="editor"
      :isStringOptions
      :quesSchame="activeQues"
      :activeNum="activeNum"
    />
  </div>
</template>

<script setup lang="ts">
// import { onMounted, onUnmounted } from 'vue'
import { paletteItemsEn } from "~/configs/paletteSchame";
import type { quesType } from "~/types/ques/quesType";
import type quesSchameType from "~/types/ques/quesSchameType";
import type { allQuesType } from "~/types/ques/detailQuesType";
import { v4 as uuidv4 } from "uuid";

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
const quesNumList = ref(surveyStore.getQuesNum());

//点击添加题目
const addQues = (paletteName: quesType, quesName: number) => {
  //拿到目前要增加的题目
  if (!paletteItemsEn[paletteName][quesName]) return;
  //向store中添加题目
  surveyStore.addQues(paletteName, paletteItemsEn[paletteName][quesName]);
  //将更新active
  if (survey.value) {
    const childrenQues = survey.value.children;
    for (let i = 0; i < childrenQues.length; i++) {
      if (
        childrenQues[i] &&
        childrenQues[i]?.children[1]?.classList.contains("active")
      ) {
        childrenQues[i]?.children[1]?.classList.remove("active");

        childrenQues[i]?.children[0]?.classList.remove("btn-active");
      }
    }
    activeQues.value = null;
    activeNum.value = null;
  }
};
const getCom = (ques: quesSchameType) => {
  return quesComMap[ques.name];
};
//点击选择题目
const survey = ref<HTMLElement | null>(null);
const activeQues = ref<quesSchameType | null>(null);
const isStringOptions = ref<boolean | null>(null);
const activeNum = ref<number | null>(null);
const selectQues = (
  e: MouseEvent,
  quesSchame: quesSchameType,
  activeIndex: number
) => {
  //清除上一个active
  if (
    activeNum.value !== null &&
    e.currentTarget instanceof HTMLElement &&
    e.currentTarget &&
    !e.currentTarget.classList.contains("active") &&
    survey.value
  ) {
    const childrenQues = survey.value.children;
    for (let i = 0; i < childrenQues.length; i++) {
      if (
        childrenQues[i] &&
        childrenQues[i]?.children[1]?.classList.contains("active")
      ) {
        childrenQues[i]?.children[1]?.classList.remove("active");
        activeNum.value = null;
        activeQues.value = null;
        console.log("进入清除上一个active状态", activeNum.value);

        childrenQues[i]?.children[0]?.classList.remove("btn-active");
      }
    }
  }
  if (e.currentTarget && e.currentTarget instanceof HTMLElement) {
    const reduceBtn = e.currentTarget.previousElementSibling;
    if (
      e.currentTarget.classList.contains("active") &&
      reduceBtn?.classList.contains("btn-active")
    ) {

      reduceBtn.classList.remove("btn-active");
      e.currentTarget.classList.remove("active");
      activeQues.value = null;
      activeNum.value = null;
    } else {

      reduceBtn?.classList.add("btn-active");
      console.log(e.currentTarget.classList, 1);
      e.currentTarget.classList.add("active");
      console.log(e.currentTarget.classList, 2);

      activeQues.value = quesSchame;
      activeNum.value = activeIndex;
    }

    if (
      activeQues.value &&
      typeof activeQues.value.state.options.status[0] === "string"
    ) {
      isStringOptions.value = true;
    } else if (
      activeQues.value &&
      typeof activeQues.value.state.options.status[0] !== "string"
    ) {
      isStringOptions.value = false;
    } else {
      isStringOptions.value = null;
    }
  }
};
const delQues = (index: number) => {
  surveyStore.deleteQues(index);
  //editor清空
  activeQues.value = null;
  activeNum.value = null;
  //去除active
  const childrenQues = survey.value?.children;
  if (childrenQues && childrenQues[index]) {
    for (let i = 0; i < childrenQues.length; i++) {
      if (
        childrenQues[i] &&
        childrenQues[i]?.children[1]?.classList.contains("active")
      ) {
        childrenQues[i]?.children[1]?.classList.remove("active");

        childrenQues[i]?.children[0]?.classList.remove("btn-active");
      }
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
    .ques {
      position: relative;
      .reduce-btn {
        height: 30px;
        width: 30px;
        background-color: $danger;
        border-radius: $radius-base;
        position: absolute;
        right: 5px;
        visibility: hidden;
        z-index: 1;
      }
      .btn-active {
        visibility: visible;
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
  }
}
</style>
