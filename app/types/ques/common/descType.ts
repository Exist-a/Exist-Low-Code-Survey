import type { DefineComponent } from 'vue'
import type { VueComType } from '../quesSchameType'

export default interface descType {
  id: string
  status: string
  isShow: boolean
  name: 'desc-editor'
  editCom: VueComType
}
