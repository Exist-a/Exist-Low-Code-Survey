import type { DefineComponent } from 'vue'

export default interface colorType {
  id: string
  status: string
  isShow: boolean
  name: 'color-editor'
  editCom: DefineComponent
}
