import type { DefineComponent } from 'vue'
import type { VueComType } from '../quesSchameType'

export default interface optionsType {
  id: string
  status: stringOptionsStatus[]|ImgOptionsStatus[]
  currentStatus: number
  isShow: boolean
  name: 'options-editor'
  editCom: VueComType
}
type stringOptionsStatus = string
type ImgOptionsStatus = {
  value:string,
  imgPath:string,
  imgDesc:string
}