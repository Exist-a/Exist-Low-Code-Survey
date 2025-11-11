import type { DefineComponent } from 'vue'

export default interface optionsType {
  id: string
  status: string[]
  currentStatus: number
  isShow: boolean
  name: 'options-editor'
  editCom: DefineComponent
}
