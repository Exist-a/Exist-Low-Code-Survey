import singleSelect from "~/components/quesComs/select/singleSelect.vue";
import titleEditor from "~/components/editComs/titleEditor.vue";
import descEditor from "~/components/editComs/descEditor.vue";
import optionsEditor from "~/components/editComs/optionsEditor.vue";
import positionEditor from "~/components/editComs/positionEditor.vue";
import sizeEditor from "~/components/editComs/sizeEditor.vue";
import weightEditor from "~/components/editComs/weightEditor.vue";
import italicEditor from "~/components/editComs/italicEditor.vue";
import colorEditor from "~/components/editComs/colorEditor.vue";
import { markRaw } from "vue";
import { v4 as uuidv4 } from "uuid";
import idCard from "~/components/quesComs/personalInfo/idCard.vue";
export default function idCardSchema() {
  //对应组件
  return {
    name: "id-card" as const,
    id: uuidv4(),
    type: markRaw(idCard),
    state: {
      title: {
        id: uuidv4(),
        status: "身份证默认标题",
        isShow: true,
        name: "title-editor" as const,
        editCom: markRaw(titleEditor),
      },
      desc: {
        id: uuidv4(),
        status: "身份证默认描述",
        isShow: true,
        name: "desc-editor" as const,
        editCom: markRaw(descEditor),
      },
      options: {
        id: uuidv4(),
        status: ["默认选项1", "默认选项2"],
        currentStatus: 0,
        isShow: false,
        name: "options-editor" as const,
        editCom: markRaw(optionsEditor),
      },
      position: {
        id: uuidv4(),
        currentStatus: 0,
        status: ["左对齐", "居中对齐"],
        isShow: true,
        name: "position-editor" as const,
        editCom: markRaw(positionEditor),
      },
      titleSize: {
        id: uuidv4(),
        currentStatus: 0,
        status: ["22", "20", "18"],
        isShow: true,
        name: "size-editor" as const,
        editCom: markRaw(sizeEditor),
      },
      descSize: {
        id: uuidv4(),
        currentStatus: 0,
        status: ["16", "14", "12"],
        isShow: true,
        name: "size-editor" as const,
        editCom: markRaw(sizeEditor),
      },
      titleWeight: {
        id: uuidv4(),
        currentStatus: 1,
        status: ["加粗", "正常"],
        isShow: true,
        name: "weight-editor" as const,
        editCom: markRaw(weightEditor),
      },
      descWeight: {
        id: uuidv4(),
        currentStatus: 1,
        status: ["加粗", "正常"],
        isShow: true,
        name: "weight-editor" as const,
        editCom: markRaw(weightEditor),
      },
      titleItalic: {
        id: uuidv4(),
        currentStatus: 1,
        status: ["斜体", "正常"],
        isShow: true,
        name: "italic-editor" as const,
        editCom: markRaw(italicEditor),
      },
      descItalic: {
        id: uuidv4(),
        currentStatus: 1,
        status: ["斜体", "正常"],
        isShow: true,
        name: "italic-editor" as const,
        editCom: markRaw(italicEditor),
      },
      titleColor: {
        id: uuidv4(),
        status: "#000000",
        isShow: true,
        name: "color-editor" as const,
        editCom: markRaw(colorEditor),
      },
      descColor: {
        id: uuidv4(),
        status: "#909399",
        isShow: true,
        name: "color-editor" as const,
        editCom: markRaw(colorEditor),
      },
    },
  };
}
