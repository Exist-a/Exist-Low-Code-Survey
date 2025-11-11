import type { DefineComponent } from 'vue'

export default interface titleType {
  id: string
  status: string
  isShow: boolean
  name: 'title-editor'
  editCom: DefineComponent
}
