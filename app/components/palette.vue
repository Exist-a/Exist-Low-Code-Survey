<template>
  <div class="_container">
    <div class="label" @click="changeQuesHandler">
      <div class="item active out-line" key="1">
        <Icon
          name="material-symbols-light:list-alt-outline"
          size="24"
          class="out-line"
        ></Icon>
        <p class="out-line">大纲</p>
      </div>
      <div class="item select" key="2">
        <Icon name="iconoir:password-cursor" class="select" size="24"></Icon>
        <p class="select">选择</p>
      </div>
      <div class="item text-input" key="3">
        <Icon name="mdi:text" size="24" class="text-input"></Icon>
        <p class="text-input">文本输入</p>
      </div>
      <div class="item advanced-question" key="4">
        <Icon
          name="mdi:star-box-outline"
          size="24"
          class="advanced-question"
        ></Icon>
        <p class="advanced-question">高级题型</p>
      </div>
      <div class="item remark" key="5">
        <Icon name="carbon:warning" size="24" class="remark"></Icon>
        <p class="remark">备注</p>
      </div>
      <div class="item contact-info" key="6">
        <Icon name="ion:call-sharp" class="contact-info" size="24"></Icon>
        <p class="contact-info">联系方式</p>
      </div>
      <div class="item personal-info" key="7">
        <Icon
          name="fluent-mdl2:contact-info"
          size="24"
          class="personal-info"
        ></Icon>
        <p class="personal-info">个人信息</p>
      </div>
    </div>
    <div class="main">
      <div v-if="paletteName === 'out-line'" class="if-out-line">
        <!-- 固定一个标题 -->
        <outLineItem
          :title="title.state.title.status"
          :is-title="true"
          :desc="title.state.desc.status"
        />
        <outLineItem
          v-for="(item, index) in quesList"
          :title="item.state.title.status"
          :num="quesNum[index]"
          :desc="item.state.desc.status"
          :is-title="false"
        />
        <!-- 渲染大纲 -->
      </div>
      <div v-else class="if-not-out-line">
        <div
          v-for="(item, index) in paletteItemsList"
          class="main-item"
          @click="emits('addQues', paletteName, index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { paletteItems } from "~/configs/paletteSchame";
import type { labelType } from "~/configs/paletteSchame";
import type quesSchameType from "~/types/ques/quesSchameType";
import outLineItem from "./outLineItem.vue";
import type titleSchameType from "~/types/ques/titleSchemaType";
const surveyStore = useSurveyStore();
const emits = defineEmits(["addQues"]);
const paletteItemsList = ref<string[]>(["大纲"]);
const paletteName = ref<labelType>("out-line");
const changeQuesHandler = (e: Event) => {
  //获取目前active
  const beforeActiveEl = document.querySelector(".item.active");
  if (beforeActiveEl) {
    beforeActiveEl.classList.remove("active");
  }

  //获取题型
  const dom = e.target as HTMLElement;
  const classList = dom.classList;
  console.log();
  if (classList.contains("iconify") && classList[2]) {
    //点击了icon
    const classname = classList[2] as labelType;
    paletteItemsList.value = paletteItems[classname];
    paletteName.value = classname;
    //获取父元素
    const parentNode = dom.parentNode as HTMLElement;
    console.log(parentNode);
    if (parentNode) {
      parentNode.classList.add("active");
    }
  } else if (dom.tagName === "P") {
    //点击了p
    const classname = classList[0] as labelType;
    paletteItemsList.value = paletteItems[classname];
    paletteName.value = classname;
    //获取父元素
    const parentNode = dom.parentNode as HTMLElement;
    console.log(parentNode);
    if (parentNode) {
      parentNode.classList.add("active");
    }
  } else {
    //点击了外层div
    let classname: labelType | undefined;
    classList.forEach((item) => {
      // 检查当前类名是否是paletteItems的有效键
      if (item in paletteItems) {
        classname = item as labelType;
      }
    });
    // 找到有效键后获取对应数组
    if (classname) {
      paletteItemsList.value = paletteItems[classname];
      paletteName.value = classname;
    }
    //添加active
    dom.classList.add("active");
  }
};

//获取store中的题目列表,用于大纲渲染
const quesList = ref<quesSchameType[]>(surveyStore.getQues());
const quesNum = ref<number[]>(surveyStore.getQuesNum());
const title = ref<titleSchameType>(surveyStore.getTitle());
</script>

<style scoped lang="scss">
._container {
  width: 25%;
  // height: 100%;
  margin: 20px 0;
  display: flex;
  align-items: stretch;
  .label {
    height: 100%;
    padding: 30px 10px;
    border-radius: $radius-lg;
    // width: 30%;
    background-color: $bg-color;
    .active {
      color: aliceblue;
      background-color: $font-color-normal;
    }
    .item {
      border-radius: $radius-lg;
      cursor: pointer;
      padding-top: 10px;
      margin-bottom: 10px;
      height: 70px;
      width: 70px;
      text-align: center;
      font-size: 14px;
      transition: all 0.5s ease;
    }
    .item:hover {
      box-shadow: $shadow-lg;
    }
  }
  .main {
    // flex-shrink: 0;
    min-width: 0;
    // flex-grow: 0;
    margin-left: 3px;
    background-color: $bg-color;
    flex: 1;
    height: 100%;
    border-radius: $radius-lg;
    padding: 25px 13px;
    .if-not-out-line {
      display: grid;
      // 列宽固定80px，自动填充（一行能放多少列就放多少）
      grid-template-columns: repeat(auto-fill, 80px);
      // 水平和垂直间距（替代flex的gap）
      gap: 20px;
      justify-content: center;
      align-content: flex-start;
      .main-item {
        height: 40px;
        background-color: #1f2937e8;
        color: #f0f2f5;
        font-size: 14px;
        border-radius: $radius-lg;
        text-align: center;
        line-height: 40px;
        box-sizing: border-box;
        cursor: pointer;
        user-select: none;
      }
    }
  }
}
</style>
