<template>
  <div></div>
</template>

<script setup lang="ts">
definePageMeta({
    layout:"blank"
})
const route = useRoute();
onMounted(()=>{
    const id =route.params.id;
    //对比后端是否存在该问卷id

    //从数据库获取问卷

    //存在密码则让用户输入密码
    showDialog({
        title:"请输入密码",
        content:"该问卷已设置密码，请输入问卷密码继续答题",
        showInput: true,
        inputPlaceholder: "请输入密码",
        inputMaxlength: 8,
        showCancel:false,
        onConfirm:async (value:string)=>{
            //和密码对比
            showErrorToast({
                title:"密码有误",
                desc:"请重新输入"
            })
            return false

        }
    })
})
</script>

<style lang="scss" scoped></style>
