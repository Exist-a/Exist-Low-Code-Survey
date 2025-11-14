import { defineStore } from 'pinia'
import type { labelType } from '~/configs/paletteSchame'
import type { detailQuesType } from '~/types/ques/detailQuesType'
import singleSelectSchema from '~/configs/quesSchame/singleSelectSchema'
import multSelectSchema from '~/configs/quesSchame/multSelectSchema'
import type quesSchameType from '~/types/ques/quesSchameType'
export const useSurveyStore = defineStore('survey', () => {
  const surveyList = ref<quesSchameType[]>([])
  //补全quesMap(待处理)
  const quesMap = {
    'single-select': singleSelectSchema(),
    'mult-select': multSelectSchema()
  }
  //向问卷中添加题目，添加的是对应schame的默认内容
  const addQues = (ques: keyof detailQuesType, detailQues: detailQuesType[typeof ques]) => {
    // 拿到题目后，向数组中添加题目的schame
    // surveyList.value.push(quesMap[detailQues])
  }
  const getQues = () => {
    return surveyList.value
  }
  return { addQues, getQues }
})
