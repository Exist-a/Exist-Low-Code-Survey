import type { DefineComponent } from 'vue'
import type { VueComType } from '../quesSchameType'

export default interface weightType {
  id: string
  currentStatus: number
  status: string[]
  isShow: boolean
  name: 'weight-editor'
  editCom: VueComType
}
