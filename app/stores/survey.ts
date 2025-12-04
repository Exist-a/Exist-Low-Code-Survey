import { defineStore } from "pinia";
import type { detailQuesType } from "~/types/ques/detailQuesType";
import singleSelectSchema from "~/configs/quesSchame/selectSchema/singleSelectSchema";
import multSelectSchema from "~/configs/quesSchame/selectSchema/multSelectSchema";
import type quesSchameType from "~/types/ques/quesSchameType";
import imgMultSelectSchema from "~/configs/quesSchame/selectSchema/imgMultSelectSchema";
import imgSingleSelectSchema from "~/configs/quesSchame/selectSchema/imgSingleSelectSchema";
import type { oneOfStateType } from "~/types/ques/quesSchameType";
import surveyTitleSchema from "~/configs/quesSchame/surveyTitleSchame";
import type titleSchameType from "~/types/ques/titleSchemaType";
import dropdownSelectSchema from "~/configs/quesSchame/selectSchema/dropdownSelectSchema";
import textInputSchema from "~/configs/quesSchame/textInputSchema/textInputSchema";
import scaleSchema from "~/configs/quesSchame/advancedQuestionSchema/scaleSchema";
import satisfactionSchema from "~/configs/quesSchame/advancedQuestionSchema/satisfactionSchema";
import dateTimeSchema from "~/configs/quesSchame/advancedQuestionSchema/dateTimeSchema";
import sortSchema from "~/configs/quesSchame/advancedQuestionSchema/sortSchema";
import remarkSchema from "~/configs/quesSchame/remark/remarkSchema";
import wechatSchema from "~/configs/quesSchame/contactInfo/wechatSchema";
import universitySchema from "~/configs/quesSchame/personalInfo/university";
import phoneSchema from "~/configs/quesSchame/contactInfo/phoneSchema";
import qqSchema from "~/configs/quesSchame/contactInfo/qqSchema";
import emailSchema from "~/configs/quesSchame/contactInfo/emailSchema";
import dateOfBirthSchema from "~/configs/quesSchame/personalInfo/dateOfBirthSchema";
import genderSchema from "~/configs/quesSchame/personalInfo/genderSchema";
import idCardSchema from "~/configs/quesSchame/personalInfo/idCardSchema";
import industrySchema from "~/configs/quesSchame/personalInfo/industrySchema";
import majorSchema from "~/configs/quesSchame/personalInfo/majorSchema";
import nameSchema from "~/configs/quesSchame/personalInfo/nameSchema";
import occupationSchema from "~/configs/quesSchame/personalInfo/occupationSchema";
import ageSchema from "~/configs/quesSchame/personalInfo/ageSchema";
import { ref } from "vue";
import educationSchema from "~/configs/quesSchame/personalInfo/educationSchema";
export const useSurveyStore = defineStore("survey", () => {
  const surveyList = ref<quesSchameType[]>([]);
  const surveyNum = ref<number[]>([]);
  const surveyTitle = ref<titleSchameType>(surveyTitleSchema());
  const quesMap = {
    "single-select": singleSelectSchema,
    "mult-select": multSelectSchema,
    "img-mult-select": imgMultSelectSchema,
    "img-single-select": imgSingleSelectSchema,
    "dropdown-select": dropdownSelectSchema,
    "text-input": textInputSchema,
    scale: scaleSchema,
    satisfaction: satisfactionSchema,
    "date-time": dateTimeSchema,
    sort: sortSchema,
    remark: remarkSchema,
    "wechat":wechatSchema,
    "university":universitySchema,
    "qq":qqSchema,
    "phone":phoneSchema,
    "email":emailSchema,
    "date-of-birth":dateOfBirthSchema,
    "gender":genderSchema,
    "id-card":idCardSchema,
    "industry":industrySchema,
    "major":majorSchema,
    "name":nameSchema,
    "occupation":occupationSchema,
    "age":ageSchema,
    "education":educationSchema,
  };
  //向问卷中添加题目，添加的是对应schame的默认内容
  const addQues = (
    ques: keyof detailQuesType,
    detailQues: detailQuesType[typeof ques]
  ) => {
    // 拿到题目后，向数组中添加题目的schame
    if (detailQues === "remark") {
      //说明是remark类型的题目
      surveyNum.value.push(-1); //remark类型题目不显示题号，使用-1占位
      surveyList.value.push(quesMap[detailQues]());
    } else {
      //列表中推入新序号
      surveyNum.value.push(getNewQuesNum());
      surveyList.value.push(quesMap[detailQues]());
      console.log(quesMap[detailQues]());
    }
  };
  const getQues = () => {
    return surveyList.value;
  };
  const getQuesNum = () => {
    return surveyNum.value;
  };
  const getNewQuesNum = (): number => {
    if (surveyList.value.length === 0) {
      return 1; // 无题目时，第一个题目序号为1
    }
    // 从后往前找最后一个有效序号（非-1且存在的项）
    const len = surveyNum.value.length;
    for (let i = len - 1; i >= 0; i--) {
      if (surveyNum.value[i] !== -1 && surveyNum.value[i] !== undefined) {
        return surveyNum.value[i]! + 1;
      }
    }
    return 1; // 所有项都是remark时，新题目序号为1
  };
  //更新题号
  const updateQuesNum = (index: number) => {
    if (surveyNum.value[index] && surveyNum.value[index] !== -1) {
      //是有题号的题目
      surveyNum.value.splice(index, 1);
      for (let i = index; i < surveyNum.value.length; i++) {
        const current = surveyNum.value[i];
        if (current === undefined) {
          continue;
        }
        if (current && current !== -1) {
          surveyNum.value[i] = current - 1;
        } else {
          continue;
        }
      }
    } else {
      surveyNum.value.splice(index, 1);
    }
  };
  const updateQues = (
    quesNum: number,
    quesStateSchame: oneOfStateType,
    changeType?: "title" | "desc"
  ) => {
    const name = quesStateSchame.name;
    const stateMap = {
      "title-editor": "title",
      "desc-editor": "desc",
      "options-editor": "options",
      "position-editor": "position",
      "size-editor": changeType === "title" ? "titleSize" : "descSize",
      "weight-editor": changeType === "title" ? "titleWeight" : "descWeight",
      "italic-editor": changeType === "title" ? "titleItalic" : "descItalic",
      "color-editor": changeType === "title" ? "titleColor" : "descColor",
    } as const;
    if (surveyList.value[quesNum]) {
      surveyList.value[quesNum].state[stateMap[name]] = quesStateSchame as any;
    }
  };
  const deleteQues = (index: number) => {
    surveyList.value.splice(index, 1);
    updateQuesNum(index);
  };
  const updateTitle = (titleSchema: titleSchameType) => {
    surveyTitle.value = titleSchema;
  };
  const getTitle = () => {
    return surveyTitle.value;
  };
  const getSurveyList = ()=>{
    console.log(surveyTitle.value)
    return [surveyTitle.value,...surveyList.value];
  }
  return {
    addQues,
    getQues,
    getQuesNum,
    updateQues,
    deleteQues,
    updateTitle,
    getTitle,
    getSurveyList,
  };
});
