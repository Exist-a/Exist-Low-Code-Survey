export const useUserStore = defineStore("user", () => {
  //先写死数据
  const username = ref<string>("Exist");
  const userAvatorPath = ref<string>(
    "https://tse1-mm.cn.bing.net/th/id/OIP-C.W-aIISi2O6ZdKANiYw7JwgAAAA?w=187&h=187&c=7&r=0&o=7&cb=ucfimg2&dpr=2&pid=1.7&rm=3&ucfimg=1"
  );
  const userId = ref<number>(10000001);
  const getUserInfo = () => {
    return {
      username: username.value,
      userAvatorPath: userAvatorPath.value,
      userId: userId.value,
    };
  };
  return {
    getUserInfo,
  };
});
