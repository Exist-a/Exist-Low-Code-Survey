import type { DefineComponent } from 'vue'
import type { VueComType } from '../quesSchameType'

export default interface positionType {
  id: string
  currentStatus: number
  status: string[]
  isShow: boolean
  name: 'position-editor'
  editCom: VueComType
}
