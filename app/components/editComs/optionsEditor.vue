<template>
  <div class="options-container">
    <div class="header">
      <div class="header-title">选项</div>
      <div class="add-btn" @click="addOption">
        <Icon name="teenyicons:add-small-outline" size="25px"></Icon>
      </div>
    </div>
    <div class="string-options" v-if="isStringOption === true">
      <!-- 是字符串类型的选项 -->
      <div class="option" v-for="(item, index) in props.optionsSchame.status">
        <editorInput
          type="text"
          v-model:modelValue="props.optionsSchame.status[index] as string"
          class="string-input"
          placeholder="请输入选项"
        />
        <div class="reduce-btn" @click="reduceOption(index)">
          <Icon name="teenyicons:minus-small-outline" size="40px"></Icon>
        </div>
      </div>
    </div>
    <div class="img-options" v-else-if="isStringOption === false"></div>
  </div>
</template>

<script setup lang="ts">
import type optionsType from "~/types/ques/common/optionsType";
import type {imgOptionsStatus} from "~/types/ques/common/optionsType";
const props = defineProps<{
  optionsSchame: optionsType;
  isStringOption: boolean|null;
}>();
const emits = defineEmits(["updateDataToStore"]);
watch(
  () => {
    props.optionsSchame.status;
  },
  () => {
    emits("updateDataToStore", {
      quesStateSchame: props.optionsSchame,
    });
  },
  { deep: true }
);
const reduceOption = (index: number) => {
  if(props.optionsSchame.status.length === 1){
    //弹出组件无法减少
    return
  }
  props.optionsSchame.status.splice(index, 1);
};
//定义typeChecker
const stringChecker = (it: unknown): it is string => typeof it === "string";
const imgOptionChecker = (item: unknown): item is imgOptionsStatus => {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const target = item as imgOptionsStatus;

  return (
    typeof target.value === "string" &&
    typeof target.imgPath === "string" &&
    typeof target.imgDesc === "string"
  );
};
//定义选项schame
const defaultImgOption:imgOptionsStatus = {
  value:'默认图片单选',
  imgDesc:'默认图片描述',
  imgPath:''

}
const addOption = () => {
  if (
    props.isStringOption &&
    isArrayOfType<string>(props.optionsSchame.status, stringChecker)
  ) {
    //是string
    props.optionsSchame.status.push("默认选项");
  } else if(props.isStringOption&&isArrayOfType<imgOptionsStatus>(props.optionsSchame.status,imgOptionChecker)){
    //是img
    props.optionsSchame.status.push(defaultImgOption)
  }
};
</script>

<style scoped lang="scss">
.options-container:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.options-container {
  background-color: #fff;
  border-radius: $radius-lg;
  padding: 10px;
  transition: box-shadow 0.2s ease;
  margin-bottom: 10px;
  .header {
    display: flex;
    justify-content: space-between;
    margin: 5px;
    align-items: center;
    .header-title {
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }
    .add-btn {
      height: 25px;
      width: 25px;
      background-color: $bg-color;
      border-radius: $radius-base;
      color: #1f2937e3;
    }
  }

  .string-options {
    // padding: 10px;

    .option {
      display: flex;
      vertical-align: baseline;
      .string-input {
        margin: 5px;
        border-radius: $radius-lg;
        height: 40px;
        font-size: 14px;
      }
      .reduce-btn {
        cursor: pointer;
        text-align: center;
        color: #fff;
        // font-size: 20px;
        margin: 5px;
        line-height: 30px;
        height: 40px;
        width: 40px;
        flex-shrink: 0;
        border-radius: $radius-lg;
        background-color: #1f2937e3;
      }
    }
  }
}
</style>
