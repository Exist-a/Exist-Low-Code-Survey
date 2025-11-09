export type exinputType = ['password', 'text'][number]
export interface exinput {
  modelValue:string|null
  type:  exinputType
  placeHolder?: string
  width?:string
  height?:string
}
