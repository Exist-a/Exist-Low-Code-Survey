import type { DefineComponent } from 'vue'
import type { VueComType } from '../quesSchameType'

export default interface sizeType {
  id: string
  currentStatus: number
  status: string[]
  isShow: boolean
  name: 'size-editor'
  editCom: VueComType
}
