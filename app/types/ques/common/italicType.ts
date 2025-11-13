import type { DefineComponent } from 'vue'
import type { VueComType } from '../quesSchameType'

export default interface italicType {
  id: string
  currentStatus: number
  status: string[]
  isShow: boolean
  name: 'italic-editor'
  editCom: VueComType
}
