import type { DefineComponent } from 'vue'
import type { VueComType } from '../quesSchameType'

export default interface optionsType {
  id: string
  status: string[]
  currentStatus: number
  isShow: boolean
  name: 'options-editor'
  editCom: VueComType
}
