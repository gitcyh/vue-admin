<template>
    <div class="login-wrap">
        <div class="login-container">
            <div class="login-item login-title">
                欢迎登录
            </div>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
                <el-form-item class="login-item" label="" prop="userName">
                    <el-input type="text" v-model="ruleForm.userName" placeholder="请输入用户名" :prefix-icon="User"
                        clearable></el-input>
                </el-form-item>
                <el-form-item class="login-item" label="" prop="passWord">
                    <el-input type="password" v-model="ruleForm.passWord" placeholder="请输入密码" :prefix-icon="Lock"
                        clearable></el-input>
                </el-form-item>
                <el-form-item class="login-item valiCode" label="" prop="valiCode">
                    <el-input style="width:130px" type="text" v-model="valiCode" placeholder="请输入验证码"
                        :prefix-icon="Lock" @input="valiCodeInput"></el-input>
                    <span :class="valiClass">{{ valiResult }}</span>
                    <VerifyCode :contentWidth="80" :contentHeight="32" :identifyCode="identifyCode"
                        @click="makeCode(4)"></VerifyCode>
                </el-form-item>

                <el-form-item class="login-item">
                    <el-button class="login-btn" color="#626aef" style="width:100%;"
                        @click="login(ruleFormRef)">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
                </el-form-item>
            </el-form>
            <div class="login-item login-last">
                <span @click="forget">忘记密码</span>/<span @click="register">注册</span>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import request from '../request/request'
import { useRouter } from 'vue-router'
import VerifyCode from './VerifyCode.vue'

const ruleFormRef = ref();
const ruleForm = reactive({
    userName: '',
    passWord: '',

})

const router = useRouter();
const rules = reactive({
    userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    passWord: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const login = async function (formEl) {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid && checkCode()) {
            request.get('https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg')
                .then(res => {
                    router.push({
                        name: "首页",
                        path: "/index/myindex"
                    })
                });
        } else {
            fail();
        }
    })
}

const register = function () {
    router.push({
        name: "注册",
        path: "/register"
    })
}
const forget = function () {
    router.push({
        name: "找回密码",
        path: "/forget"
    })
}
const valiClass = ref("");
const valiResult = ref("");
const valiCode = ref("");

const checkCode = function () {
    return valiCode.value.toLocaleLowerCase() === identifyCode.value.toLocaleLowerCase()
}
const fail = function () {
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
    background: url(../../public/img/login-bg2.jpeg) no-repeat;
    background-size: cover;
}

.login-container {
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.login-item {
    width: 300px;
    margin-top: 40px;
}

.login-title {
    text-align: center;
    color: #fff;
    font-size: 24px;
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

.valiCode>>>.el-form-item__content {
    justify-content: space-between;
    align-items: center;
}

.valiCode .el-input {
    width: 150px;
}

.valiCode .s-canvas {
    position: relative;
    top: 6px;
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
