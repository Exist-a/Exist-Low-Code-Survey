import { defineStore } from 'pinia'
import type { labelType } from '~/configs/paletteSchame';
export const useSurveyStore = defineStore('survey',()=>{
    const surveyList = [];
    //向问卷中添加题目，添加的是对应schame的默认内容（待处理）
    const addQues = (ques:labelType)=>{

    }
})