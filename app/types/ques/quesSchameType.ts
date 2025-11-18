import type { DefineComponent, Raw } from "vue";
import type { allQuesType } from "./detailQuesType";
import type titleType from "./common/titleType";
import type descType from "./common/descType";
import type optionsType from "./common/optionsType";
import type positionType from "./common/positionType";
import type sizeType from "./common/sizeType";
import type weightType from "./common/weightType";
import type italicType from "./common/italicType";
import type colorType from "./common/colorType";
export type VueComType = ReturnType<typeof defineComponent>;
export default interface quesSchameType {
  name: allQuesType;
  id: string;
  type: VueComType;
  state: {
    title: titleType;
    desc: descType;
    options: optionsType;
    position: positionType;
    titleSize: sizeType;
    descSize: sizeType;
    descWeight: weightType;
    titleWeight: weightType;
    descItalic: italicType;
    titleItalic: italicType;
    titleColor: colorType;
    descColor: colorType;
  };
}

export interface quesStateType {
  title: titleType;
  desc: descType;
  options: optionsType;
  position: positionType;
  titleSize: sizeType;
  descSize: sizeType;
  titleWeight: weightType;
  descWeight: weightType;
  descItalic: italicType;
  titleItalic: italicType;
  titleColor: colorType;
  descColor: colorType;
}
