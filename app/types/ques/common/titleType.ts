import type { DefineComponent } from 'vue'
import type { VueComType } from '../quesSchameType'

export default interface titleType {
  id: string
  status: string
  isShow: boolean;
  name: 'title-editor' 
  editCom: VueComType
}
