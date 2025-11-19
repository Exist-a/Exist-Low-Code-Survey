import type { DefineComponent } from 'vue'
import type { VueComType } from '../quesSchameType'

export default interface optionsType {
  id: string
  status: stringOptionsStatus[]|imgOptionsStatus[]
  currentStatus: number
  isShow: boolean
  name: 'options-editor'
  editCom: VueComType
}
type stringOptionsStatus = string
export type imgOptionsStatus = {
  value:string,
  imgPath:string,
  imgDesc:string
}