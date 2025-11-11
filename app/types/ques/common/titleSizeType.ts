import type { DefineComponent } from 'vue'

export default interface titleSizeType {
  id: string
  currentStatus: number
  status: string[]
  isShow: boolean
  name: 'size-editor'
  editCom: DefineComponent
}
