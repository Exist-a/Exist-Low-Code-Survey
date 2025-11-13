import type { DefineComponent } from 'vue'
import type { VueComType } from '../quesSchameType'

export default interface colorType {
  id: string
  status: string
  isShow: boolean
  name: 'color-editor'
  editCom: VueComType
}
