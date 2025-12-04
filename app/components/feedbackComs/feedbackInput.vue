<template>
  <div class="feedback-input-container">
    <div class="btns">
      <div class="send-btn btn" @click="send">
        <Icon name="mynaui:send" size="24px" class="icon" />
      </div>
      <div class="fold-btn btn" @click="fold">
        <Icon name="bytesize:chevron-top" size="24px" class="icon" />
      </div>
      <div class="emoji-btn btn" @click="showEmojis">
        <Icon
          name="streamline-ultimate:smiley-lol-sideways"
          size="24px"
          class="icon"
        />
      </div>
    </div>
    <div class="emoji-box" ref="emojiBox" style="height: 0; padding: 0">
      <div
        class="emoji"
        v-for="(emoji, index) in emojis"
        @click="selectEmoji(index)"
      >
        {{ emoji }}
      </div>
    </div>
    <textarea
      name=""
      id=""
      class="feedback-textarea"
      placeholder="请输入您的反馈内容..."
      ref="textarea"
    />
  </div>
</template>

<script setup lang="ts">
import type { VueElement } from "vue";

const textarea = ref<HTMLTextAreaElement>();
const emojiBox = ref<HTMLDivElement>();
const emojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😜",
  "😝",
  "🤑",
  "🤗",
  "🤩",
  "🤔",
  "🤨",
  "😐",
  "😑",
  "😶",
  "🙄",
  "😏",
  "😣",
  "😥",
  "😮",
  "🤐",
  "😯",
  "😪",
  "😫",
  "🥱",
  "😴",
  "😌",
  "😛",
  "😜",
  "😝",
  "🤤",
  "😒",
  "😓",
  "😔",
  "😕",
  "🙃",
  "🤑",
  "😲",
  "☹️",
  "🙁",
  "😖",
  "😞",
  "😟",
  "😤",
  "😢",
  "😭",
  "😦",
  "😧",
  "😨",
  "😩",
  "🤯",
  "😬",
  "😰",
  "😱",
  "😳",
  "🥵",
  "🥶",
  "😡",
  "😠",
  "🤬",
  "😷",
  "🤒",
  "🤕",
  "🤢",
  "🤮",
  "🤧",
  "😇",
  "🤠",
  "🥳",
  "🥴",
  "🥺",
  "🤥",
  "🤫",
  // 手势
  "👍",
  "👎",
  "✊",
  "✋",
  "✌️",
  "🤞",
  "🤟",
  "🤘",
  "👌",
  "👈",
  "👉",
  "👆",
  "👇",
  "☝️",
  "✍️",
  "🤙",
  "💪",
  "🖐️",
  "🖖",
  "🤲",
  "🙏",
  "🤝",
  "🫱",
  "🫲",
  "🫰",
  "👏",
  "🙌",
  "👐",
  "🤲",
  "💅",
  // 情感符号
  "❤️",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🖤",
  "💔",
  "❣️",
  "💕",
  "💞",
  "💓",
  "💗",
  "💖",
  "💘",
  "💝",
  "💟",
  "⭐",
  "🌟",
  "✨",
  "🔥",
  "💥",
  "💫",
  "💦",
  "💨",
  "🕳️",
  "💣",
  "🎇",
  "🎆",
  "🎉",
  "🎊",
  "🎋",
  "🎍",
  "🎐",
  "🎑",
  "🎁",
  "🎀",
  "🎗️",
  "🏆",
  "🏅",
  // 美食
  "🍎",
  "🍐",
  "🍊",
  "🍋",
  "🍌",
  "🍉",
  "🍇",
  "🍓",
  "🫐",
  "🍈",
  "🍒",
  "🍑",
  "🥭",
  "🍍",
  "🥥",
  "🥝",
  "🍅",
  "🍆",
  "🥑",
  "🥦",
  "🥬",
  "🥒",
  "🌶️",
  "🫑",
  "🥕",
  "🧄",
  "🧅",
  "🥔",
  "🍠",
  "🥐",
  "🍞",
  "🥖",
  "🫓",
  "🥨",
  "🥯",
  "🥞",
  "🧇",
  "🧀",
  "🍳",
  "🥚",
  "🍗",
  "🍖",
  "🥩",
  "🥓",
  "🍔",
  "🍟",
  "🍕",
  "🌭",
  "🥪",
  "🥙",
  "🧆",
  "🌮",
  "🌯",
  "🫔",
  "🥗",
  "🥘",
  "🫕",
  "🍝",
  "🍜",
  "🍲",
  "🍛",
  "🍣",
  "🍱",
  "🥟",
  "🥠",
  "🥡",
  "🦪",
  "🍤",
  "🍙",
  "🍚",
  "🍘",
  "🍥",
  "🥮",
  "🍢",
  "🍡",
  "🍧",
  "🍨",
  "🍦",
  "🥧",
  "🍰",
  "🎂",
  "🍮",
  "🍭",
  "🍬",
  "🍫",
  "🍿",
  "🧈",
  "🥜",
  "🫘",
  "🍯",
  "🥛",
  "🍼",
  "☕",
  "🫖",
  "🍵",
  "🧃",
  "🥤",
  "🧋",
  "🍶",
  "🍷",
  // 日常物品/交通/自然
  "📱",
  "📲",
  "💻",
  "🖥️",
  "🖨️",
  "📞",
  "☎️",
  "📟",
  "📠",
  "🖱️",
  "🖨️",
  "⌨️",
  "💽",
  "💾",
  "💿",
  "📀",
  "🔋",
  "🔌",
  "🪫",
  "🕹️",
  "🎮",
  "📡",
  "🔍",
  "🔎",
  "🕯️",
  "🪔",
  "📸",
  "📹",
  "🎥",
  "📼",
  "💿",
  "📀",
  "🔦",
  "🕯️",
  "🚗",
  "🚕",
  "🚙",
  "🚌",
  "🚎",
  "🏎️",
  "🚓",
  "🚑",
  "🚒",
  "🚐",
  "🚚",
  "🚛",
  "🚜",
  "🛴",
  "🚲",
  "🛵",
  "🏍️",
  "🚨",
  "🚔",
  "🚍",
  "🚘",
  "🚖",
  "✈️",
  "🛫",
  "🛬",
  "🚀",
  "🛰️",
  "🚁",
  "🚟",
  "🚠",
  "🚡",
  "🚢",
  "🛶",
  "⛵",
  "🚤",
  "🛥️",
  "🌞",
  "🌝",
  "🌛",
  "🌜",
  "⭐",
  "🌟",
  "🌙",
  "🌚",
  "🌑",
  "🌒",
  "🌓",
  "🌔",
  "🌕",
  "🌖",
  "🌗",
  "🌘",
  "🌎",
  "🌍",
  "🌏",
  "🗺️",
  "🌐",
  "🗿",
  "🗻",
  "⛰️",
  "🌄",
  "🌅",
  "🌠",
  "🌈",
  "☁️",
  "🌧️",
  "⛈️",
  "🌩️",
  "🌨️",
  "☃️",
  "⛄",
  "🌬️",
  "💨",
  "🌪️",
  "🌫️",
  "🌊",
];
const switchEleHeight = (ele: Ref, status: 0 | 1) => {
  //status为0则折叠，1为展开

  if (ele.value && status) {
    //展开
    ele.value.style.removeProperty("height");
    ele.value.style.removeProperty("padding");
  } else if (ele.value && !status) {
    ele.value.style.height = "0px";
    ele.value.style.padding = "0px";
  }
};
const send = () => {
  //发送逻辑
};
const fold = () => {
  //点击后展开或折叠
  if (textarea.value && textarea.value.style.height) {
    switchEleHeight(textarea, 1);
  } else if (textarea.value && !textarea.value.style.height) {
    switchEleHeight(textarea, 0);
  }
};
const selectEmoji = (index: number) => {
  const emoji = emojis[index] as string;
  if (textarea.value) textarea.value.value = textarea.value?.value + emoji;
};
const showEmojis = () => {
  if (emojiBox.value && emojiBox.value.style.height) {
    switchEleHeight(emojiBox, 1);
  } else if (emojiBox.value && !emojiBox.value.style.height) {
    switchEleHeight(emojiBox, 0);
  }
};
</script>

<style scoped lang="scss">
@use "sass:color";
$shadow-light: 0 2px 8px rgba(0, 0, 0, 0.08); // 轻量外阴影
$shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.12); // 中等外阴影
$shadow-inner: inset 0 1px 3px rgba(0, 0, 0, 0.05); // 内阴影
$shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.15); // 按钮hover阴影
.feedback-input-container {
  // height: 20vh;
  will-change: transform;

  background-color: $bg-color;
  width: calc(95vw - 40px);
  position: absolute;
  bottom: 0;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.06);
  border-radius: $radius-lg $radius-lg 0 0; // 容器整体圆角，和子元素衔接
  // overflow: hidden; // 裁剪子元素阴影溢出
  .btns {
    display: flex;
    justify-content: space-between;
    background-color: $bg-color;
    border-radius: $radius-lg $radius-lg 0 0;
    padding: 4px 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    transition: all 0.5s ease; // 过渡动画，阴影变化更柔和
    position: relative;
    z-index: 1; // 确保阴影在文本域上方
    .btn {
      height: 24px;
      width: 24px;
      cursor: pointer;
      color: $font-color-normal;
      border-radius: 4px; // 按钮圆角，配合hover阴影
      transition: all 0.2s ease; // 过渡动画，阴影变化更柔和
    }
    &:hover {
      box-shadow: $shadow-hover;
      transform: translateY(-1px); // 轻微上浮，增强立体感
    }

    // 按钮active：按下效果，阴影缩小
    &:active {
      box-shadow: $shadow-light;
      transform: translateY(0);
    }
  }
  .emoji-box {
    will-change: transform;
    position: absolute;
    height: 310px;
    width: 300px;
    background-color: color.scale($bg-color, $alpha: -20%);
    box-shadow: $shadow-light;
    transition: height 0.5s ease-in-out;
    border-radius: $radius-lg;
    bottom: 250px;
    right: 0px;
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    .emoji {
      height: 25px;
      width: 25px;
      font-size: 25px;
      margin: 2.5px;
      justify-content: space-between;
    }
  }
  .feedback-textarea {
    background-color: $bg-color;
    border-radius: 0 0 $radius-lg $radius-lg;
    padding: 10px;
    transition: all 0.5s ease-in-out;
    width: 100%;
    height: 200px;
    resize: none;
    border: none; // 去掉默认边框
    overflow-y: scroll;
    // 文本域内阴影：提升输入框质感，替代边框
    box-shadow: $shadow-inner;
    font-size: 18px;
    // 文本域focus：外阴影+内阴影加强，突出激活态
    &:focus {
      outline: none;
      box-shadow: $shadow-inner; // 聚焦时的微光边框+内阴影
    }
  }
}
</style>
