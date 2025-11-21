<template>
  <div class="editor-container">
    <div v-if="props.quesSchame !== null">
      <titleEditor
        :titleSchame="props.quesSchame.state.title"
        @updateDataToStore="updateDataToStore"
      />
      <descEditor
        :descSchame="props.quesSchame.state.desc"
        @updateDataToStore="updateDataToStore"
      />
      <optionsEditor
        :optionsSchame="props.quesSchame.state.options"
        :isStringOption="props.isStringOptions"
        @updateDataToStore="updateDataToStore"
      />
      <positionEditor
        :positionSchame="props.quesSchame.state.position"
        @updateDataToStore="updateDataToStore"
      />
      <sizeEditor
        :sizeSchame="props.quesSchame.state.titleSize"
        @updateDataToStore="updateDataToStore"
        changeType="title"
      />
      <sizeEditor
        :sizeSchame="props.quesSchame.state.descSize"
        @updateDataToStore="updateDataToStore"
        changeType="desc"
      />
      <italicEditor
        :italicSchame="props.quesSchame.state.titleItalic"
        @updateDataToStore="updateDataToStore"
        changeType="title"
      />
      <italicEditor
        :italicSchame="props.quesSchame.state.descItalic"
        @updateDataToStore="updateDataToStore"
        changeType="desc"
      />
      <weightEditor
        :weightSchame="props.quesSchame.state.titleWeight"
        @updateDataToStore="updateDataToStore"
        changeType="title"
      />
      <weightEditor
        :weightSchame="props.quesSchame.state.descWeight"
        @updateDataToStore="updateDataToStore"
        changeType="desc"
      />
      <colorEditor
        :colorSchame="props.quesSchame.state.titleColor"
        @updateDataToStore="updateDataToStore"
        changeType="title"
      />
      <colorEditor
        :colorSchame="props.quesSchame.state.descColor"
        @updateDataToStore="updateDataToStore"
        changeType="desc"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { oneOfStateType } from "~/types/ques/quesSchameType";
import type quesSchameType from "~/types/ques/quesSchameType";
const surveyStore = useSurveyStore();
const props = defineProps<{
  quesSchame: quesSchameType | null;
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
