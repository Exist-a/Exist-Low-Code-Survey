import { defineStore } from "pinia";
import type { labelType } from "~/configs/paletteSchame";
import type { detailQuesType } from "~/types/ques/detailQuesType";
import singleSelectSchema from "~/configs/quesSchame/singleSelectSchema";
import multSelectSchema from "~/configs/quesSchame/multSelectSchema";
import type quesSchameType from "~/types/ques/quesSchameType";
import imgMultSelectSchema from "~/configs/quesSchame/imgMultSelectSchema";
import imgSingleSelectSchema from "~/configs/quesSchame/dropdownSelectSchema";
export const useSurveyStore = defineStore("survey", () => {
  const surveyList = ref<quesSchameType[]>([]);
  const surveyNum = ref<number[]>([]);

  //补全quesMap(待处理)
  const quesMap = {
    "single-select": singleSelectSchema(),
    "mult-select": multSelectSchema(),
    "img-mult-select": imgMultSelectSchema(),
    "img-single-select": imgSingleSelectSchema(),
  };
  //向问卷中添加题目，添加的是对应schame的默认内容
  const addQues = (
    ques: keyof detailQuesType,
    detailQues: detailQuesType[typeof ques]
  ) => {
    // 拿到题目后，向数组中添加题目的schame
    if (
      detailQues === "single-select" ||
      detailQues === "mult-select" ||
      detailQues === "img-mult-select" ||
      detailQues === "img-single-select"
    ) {
      //列表中推入新序号
      surveyNum.value.push(getNewQuesNum());

      surveyList.value.push(quesMap[detailQues]);
      //
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
  return { addQues, getQues, getQuesNum };
});
