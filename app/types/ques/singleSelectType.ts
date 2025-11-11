import type { DefineComponent } from 'vue'
import type titleType from './common/titleType'
import type descType from './common/descType'
import type optionsType from './common/optionsType'
import type positionType from './common/positionType'
import type sizeType from './common/sizeType'
import type weightType from './common/weightType'
import type italicType from './common/italicType'
import type colorType from './common/colorType'
export default interface singleSelectType {
  name: 'single-select'
  id: string
  type: DefineComponent
  state: {
    title: titleType
    desc: descType
    options: optionsType
    position: positionType
    titleSize: sizeType
    descSize: sizeType
    descWeight:weightType
    titleItalic: italicType
    titleColor: colorType
    descColor: colorType
  }
}
