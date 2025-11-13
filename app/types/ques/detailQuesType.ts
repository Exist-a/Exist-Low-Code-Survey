export type detailQuesType = {
  "select":
    | 'single-select'
    | 'mult-select'
    | 'dropdown-select'
    | 'img-single-select'
    | 'img-mult-select'

  'text-input': 'text-input'
  'advanced-question': 'scale' | 'satisfaction' | 'date-time' | 'sort'
  "remark": 'remark'
  'contact-info': 'phone' | 'wechat' | 'qq' | 'email'
  'personal-info':
    | 'name'
    | 'id-card'
    | 'date-of-birth'
    | 'gender'
    | 'age'
    | 'education'
    | 'university'
    | 'major'
    | 'industry'
    | 'occupation'
}

//所有题目类型的联合类型
export type allQuesType = detailQuesType[keyof detailQuesType];