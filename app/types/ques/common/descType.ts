import type { DefineComponent } from 'vue'

export default interface descType {
  id: string
  status: string
  isShow: boolean
  name: 'desc-editor'
  editCom: DefineComponent
}
