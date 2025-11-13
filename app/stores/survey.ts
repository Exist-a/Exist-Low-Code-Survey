import { defineStore } from 'pinia'
import type { labelType } from '~/configs/paletteSchame'
import type { detailQuesType } from '~/types/ques/detailQuesType'
import singleSelectSchema from '~/configs/quesSchame/singleSelectSchema'
import type quesSchameType from '~/types/ques/quesSchameType'
export const useSurveyStore = defineStore('survey', () => {
  const surveyList = ref<quesSchameType[]>([])
  const quesMap = {
    'single-select': singleSelectSchema()
  }
  //向问卷中添加题目，添加的是对应schame的默认内容（待处理）
  const addQues = (ques: keyof detailQuesType, detailQues: detailQuesType[typeof ques]) => {
    // 拿到题目后，向数组中添加题目的schame
    surveyList.value.push(quesMap['single-select'])
  }
  return { addQues }
})
