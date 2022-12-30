<template>
    <div class="login-wrap">
        <div class="login-container">
            <div class="login-item login-title">
                欢迎登录
            </div>
            <div class="login-item">
                <el-input type="text" v-model="userName" placeholder="请输入用户名" :prefix-icon="User"></el-input>
            </div>
            <div class="login-item">
                <el-input type="password" v-model="passWord" placeholder="请输入密码" :prefix-icon="Lock"></el-input>
            </div>
            <div class="login-item valiCode">
                <el-input type="text" v-model="valiCode" placeholder="请输入验证码" :prefix-icon="Lock"
                    @input="valiCodeInput">
                </el-input>
                <span :class="valiClass">{{ valiResult }}</span>
                <VerifyCode :contentWidth="80" :contentHeight="30" :identifyCode="identifyCode" @click="makeCode(4)">
                </VerifyCode>
            </div>
            <div class="login-item">
                <el-button class="login-btn" type="primary" style="width:100%;"
                    @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
            </div>
            <div class="login-item login-last">
                <span>忘记密码</span>/<span @click="register">注册</span>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import request from '../request/request'
import { useRouter } from 'vue-router'
import VerifyCode from './VerifyCode.vue'

const router = useRouter();

const userName = ref('')
const passWord = ref('')
const login = function () {
    if (checkCode()) {
        request.get('https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg')
            .then(res => {
                router.push({
                    name: "首页",
                    path: "/index/myindex"
            })
        });
    }else{
        fail();
    }

}

const register = function () {
    router.push({
        name: "注册",
        path: "/register"
    })
}
const valiClass = ref("");
const valiResult = ref("");
const valiCode = ref("");

const checkCode = function () {
    return valiCode.value.toLocaleLowerCase() === identifyCode.value.toLocaleLowerCase()
}
const fail = function(){
    valiResult.value = "验证失败";
    valiClass.value = 'valiFail';
}
const valiCodeInput = function () {
    if (valiCode.value.length === 4) {
        if (checkCode()) {
            valiClass.value = 'valiSuccess';
            valiResult.value = "验证成功";
        } else {
            fail();
        }
    } else {
        fail();
    }
}


const identifyCode = ref("");
onMounted(() => {
    makeCode(4);
})

//生成随机数字
const randomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
//生成随机字母
const randomStr = function () {
    // const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'n', 'm', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    //     'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    return letter[randomNum(0, letter.length)]
}
const makeCode = function (len) {
    valiResult.value = "";
    let value = "";
    for (let i = 0; i < len; i++) {
        if (i % 2 === 0) {
            value += randomNum(0, 9);
        } else {
            value += randomStr();
        }
    }
    identifyCode.value = value;
}


</script>



<style scoped>
.login-wrap {
    display: flex;
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: rgb(42, 82, 158);
}

.login-container {
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.login-item {
    width: 100%;
    margin-top: 40px;
}

.login-title {
    text-align: center;
    color: #fff;
    font-size: 24px;
    margin-top: 10px;
}

.login-btn {
    font-size: 20px;
    font-weight: bolder;
}

.login-last {
    text-align: right;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
}

.valiCode {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.valiCode .el-input {
    width: 150px;
}

.valiCode .s-canvas {
    position: relative;
    top: 2px;
}

.valiSuccess {
    color: #fff;
    font-size: 12px;
}

.valiFail {
    font-size: 12px;
    color: red;
}
</style>
