<template>
    <div class="error-wrap">
        <el-empty :image-size="200" description="抱歉，页面找不到">
            <el-button type="primary" @click="toIndex">点击返回首页</el-button>
        </el-empty>
    </div>

</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();
const toIndex = function () {
    router.push({
        name: "首页",
        path: "/index/myindex"
    })
}
</script>

<style scoped>
.error-wrap {
    width: 100%;
    height: 100vh;
    background: url(../../public/img/error-bg.jpg) no-repeat;
    background-size: cover;
}
</style>