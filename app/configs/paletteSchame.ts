export const paletteItems = {
  'out-line': ['大纲'],
  'select': ['单项选择', '多项选择', '下拉选择', '图片单选', '图片多选'],
  'text-input': ['文本输入'],
  'advanced-question': ['量表', '满意度', '日期/时间', '排序'],
  'remark': ['备注'],
  'contact-info': ['手机', '微信', 'QQ', '邮箱'],
  'personal-info': [
    '姓名',
    '身份证',
    '出生日期',
    '性别',
    '年龄',
    '学历',
    '大学',
    '专业',
    '行业',
    '职业'
  ]
}
export const paletteItemsEn = {
  'out-line': ['outline'],
  'select': ['single-select', 'mult-select', 'dropdown-select', 'img-single-select', 'img-mult-select'],
  'text-input': ['text-input'],
  'advanced-question': ['scale', 'satisfaction', 'date-time', 'sort'],
  'remark': ['remark'],
  'contact-info': ['phone', 'wechat', 'qq', 'email'],
  'personal-info': [
    'name',
    'id-card',
    'date-of-birth',
    'gender',
    'age',
    'education',
    'university',
    'major',
    'industry',
    'occupation'
  ]
} as const;
export type labelType = 'out-line'|'select'|'text-input'|'advanced-question'|'remark'|'contact-info'|'personal-info'