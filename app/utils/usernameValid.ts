interface returnMsg {
  isOk: boolean;
  msg: string;
}
export const usernameValid = (username: string): returnMsg => {
  if (username.trim() === "") {
    return {
      isOk: false,
      msg: "昵称不能为空",
    };
  }
  if (username.trim().length > 15) {
    return {
      isOk: false,
      msg: "昵称长度不能超过15个字",
    };
  }
  return { isOk: true, msg: "昵称修改成功" };
};
