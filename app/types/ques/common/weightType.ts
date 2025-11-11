import type { DefineComponent } from 'vue'

export default interface weightType {
  id: string
  currentStatus: number
  status: string[]
  isShow: boolean
  name: 'weight-editor'
  editCom: DefineComponent
}
