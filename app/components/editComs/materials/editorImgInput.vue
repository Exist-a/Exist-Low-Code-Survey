<template>
  <div class="container">
    <input type="file" class="file-input" ref="input" @change="updateImg" />
    <div class="add-img" @click="addImg"></div>
    <div class="inputs">
      <input
        class="input"
        :type="props.type"
        placeholder="请输入选项"
        :value="modelValue?.value"
        @input="handleInput('value', $event)"
      />
      <input
        class="input"
        :type="props.type"
        placeholder="请输入描述"
        :value="modelValue?.imgDesc"
        @input="handleInput('imgDesc', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { imgOptionsStatus } from "~/types/ques/common/optionsType";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<exinput>();
const input = ref<HTMLInputElement | null>(null);
const handleInput = (flag: "value" | "imgDesc", e: InputEvent) => {
  if (e.target) {
    const inputTarget = e.target as HTMLInputElement;
    console.log(inputTarget.value);
    //这里有问题，提交的是imgOptionType
    if (flag === "value") {
      if (props.modelValue) {
        const option: imgOptionsStatus = {
          value: inputTarget.value,
          imgDesc: props.modelValue.imgDesc,
          imgPath: props.modelValue.imgPath,
        };
        emit("update:modelValue", option);
      }
    } else {
      if (props.modelValue) {
        const option: imgOptionsStatus = {
          value: props.modelValue.value,
          imgDesc: inputTarget.value,
          imgPath: props.modelValue.imgPath,
        };
        emit("update:modelValue", option);
      }
    }
  }
};

type exinputType = ["password", "text"][number];
interface exinput {
  modelValue: imgOptionsStatus | null;
  type: exinputType;
  placeHolder?: string;
  width?: string;
  height?: string;
}
const addImg = () => {
  if (input.value) {
    input.value.click();
    //继续完善
    // const file = input.value.value
    // if(isImg(file)){

    // }
  }
};
const updateImg = async () => {
  if (input.value && input.value.files) {
    const file = input.value.files[0];
    if (isImg(file).valid && props.modelValue && file) {
      //检验通过,将文件送至后端
      let base64File:string = '';
      const reader = new FileReader();
      reader.onload = () => {
        base64File = reader.result as string;
      };
      reader.onerror = () => {
        console.error("reader error");
      };
      base64File = await fileToBase64(file);
      console.log(base64File)
      console.log('reader ok')
      const option: imgOptionsStatus = {
          value: props.modelValue.value,
          imgDesc: props.modelValue.imgDesc,
          imgPath: base64File,
        };
      emit("update:modelValue", option);
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  .file-input {
    display: none;
  }
  .add-img {
    height: 75px;
    width: 30px;
    background-position: 0 21.5px;
    background-image: url("~/assets/imgs/img.png");
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: $radius-lg;
    outline: 1px solid black;
  }
  .inputs {
    flex: 1;
    margin-bottom: 10px;
    margin-left: 5px;
    .input {
      height: 35px;
      width: 100%;
      padding-left: 10px;
      //   box-shadow: 3px 3px 3px inset rgb(184, 184, 184);
      outline: 1px solid black;
      border-radius: $radius-base;
      border: 1px solid #e5e7eb;
      background-color: #fafafa;
      font-size: 16px;
      transition: all 0.2s ease;
      margin-bottom: 5px;
      font-size: 14px;
    }
    .input:focus {
      outline: none;
      border-color: $font-color-normal;
      background-color: #fff;
      box-shadow: 0 0 0 3px rgba(35, 90, 158, 0.246);
    }
  }
}
</style>
