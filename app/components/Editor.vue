<template>
  <div class="editor-container">
    <div v-if="props.quesSchame !== null">
      <titleEditor
        :titleSchame="props.quesSchame.state.title"
        @updateDataToStore="updateDataToStore"
        v-if="props.quesSchame.state.title.isShow"
      />
      <descEditor
        :descSchame="props.quesSchame.state.desc"
        @updateDataToStore="updateDataToStore"
        v-if="props.quesSchame.state.desc.isShow"
      />
      <optionsEditor
        :optionsSchame="props.quesSchame.state.options"
        :isStringOption="props.isStringOptions"
        v-if="props.quesSchame.state.options.isShow"
        @updateDataToStore="updateDataToStore"
      />
      <positionEditor
        :positionSchame="props.quesSchame.state.position"
        v-if="props.quesSchame.state.position.isShow"
        @updateDataToStore="updateDataToStore"
      />
      <sizeEditor
        :sizeSchame="props.quesSchame.state.titleSize"
        @updateDataToStore="updateDataToStore"
        changeType="title"
        v-if="props.quesSchame.state.titleSize.isShow"
      />
      <sizeEditor
        :sizeSchame="props.quesSchame.state.descSize"
        @updateDataToStore="updateDataToStore"
        changeType="desc"
        v-if="props.quesSchame.state.descSize.isShow"
      />
      <italicEditor
        :italicSchame="props.quesSchame.state.titleItalic"
        @updateDataToStore="updateDataToStore"
        changeType="title"
        v-if="props.quesSchame.state.titleItalic.isShow"
      />
      <italicEditor
        :italicSchame="props.quesSchame.state.descItalic"
        @updateDataToStore="updateDataToStore"
        changeType="desc"
        v-if="props.quesSchame.state.descItalic.isShow"
      />
      <weightEditor
        :weightSchame="props.quesSchame.state.titleWeight"
        @updateDataToStore="updateDataToStore"
        changeType="title"
        v-if="props.quesSchame.state.titleWeight.isShow"
      />
      <weightEditor
        :weightSchame="props.quesSchame.state.descWeight"
        @updateDataToStore="updateDataToStore"
        changeType="desc"
        v-if="props.quesSchame.state.descWeight.isShow"
      />
      <colorEditor
        :colorSchame="props.quesSchame.state.titleColor"
        @updateDataToStore="updateDataToStore"
        changeType="title"
        v-if="props.quesSchame.state.titleColor.isShow"
      />
      <colorEditor
        :colorSchame="props.quesSchame.state.descColor"
        @updateDataToStore="updateDataToStore"
        changeType="desc"
        v-if="props.quesSchame.state.descColor.isShow"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { oneOfStateType } from "~/types/ques/quesSchameType";
import type quesSchameType from "~/types/ques/quesSchameType";
import type titleSchameType from "~/types/ques/titleSchemaType";
const surveyStore = useSurveyStore();
const props = defineProps<{
  quesSchame: quesSchameType | titleSchameType | null;
  isStringOptions: boolean | null;
  activeNum: number | null;
}>();
const updateDataToStore = (
  quesStateSchame: oneOfStateType,
  changeType?: "title" | "desc"
) => {
  const quesNum = props.activeNum;
  if (quesNum !== null) {
    surveyStore.updateQues(quesNum, quesStateSchame, changeType);
  }
};
</script>

<style scoped lang="scss">
.editor-container {
  overflow-y: scroll;
  margin: 20px 0;
  padding: 10px;
  border-radius: $radius-lg;
  // height: 100%;
  width: 20%;
  background-color: $bg-color;
}
</style>
