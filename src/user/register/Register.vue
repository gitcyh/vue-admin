<template>
  <div class="register-wrap">
      <div class="register-container">
          <div class="register-item register-title">
              欢迎注册
          </div>
          <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
                <el-form-item class="register-item" prop="userName">
                    <el-input type="text" v-model="ruleForm.userName" placeholder="请输入用户名" :prefix-icon="User" clearable></el-input>
                </el-form-item>
                <el-form-item class="register-item"  prop="phone">
                    <el-input type="text" v-model="ruleForm.phone" placeholder="请输入手机号" :prefix-icon="Iphone" clearable></el-input>
                </el-form-item>
                <el-form-item class="register-item" prop="passWord">
                    <el-input type="password" v-model="ruleForm.passWord"  placeholder="请输入密码" :prefix-icon="Lock" clearable></el-input>
                </el-form-item>
                <el-form-item class="register-item" prop="repassWord">
                    <el-input type="password" v-model="ruleForm.repassWord"  placeholder="请再次确认密码" :prefix-icon="Lock" clearable></el-input>
                </el-form-item>
                <el-form-item class="register-item" prop="email">
                    <el-input type="email" v-model="ruleForm.email"  placeholder="请输入邮箱" :prefix-icon="Message" clearable></el-input>
                </el-form-item>
                <el-form-item class="register-item">
                    <el-button color="#626aef" style="width:100%;" @click="register(ruleFormRef)">注    册</el-button>
                </el-form-item>
            </el-form>
      </div>
  </div>
</template>


<script setup>
import { ref,reactive } from 'vue'
import {User,Lock,Message,Iphone} from '@element-plus/icons-vue'
import useCheck from '../../common/check/useCheck';
import operation from '../../common/util/operation';
import request from '../../request/request'
import { useRouter } from 'vue-router'

const router = useRouter();
const ruleFormRef = ref();
const ruleForm = reactive({
    userName: '',
    passWord: '',
    repassWord: '',
    email: '',

})
const checkPassWord = function (rlue, value, callback) {
    if (value !== ruleForm.passWord) {
        callback(new Error('两次密码不同'))
    }else {
        checkPwd(rlue, value, callback);
    }
}
const checkPwd = function (rlue, value, callback) {
    let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
     if(!reg.test(value)){
        callback(new Error('必须包含大小写字母和数字的组合,长度在8-20之间'))
    } else {
        callback();
    }
}
const rules = reactive({
    userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    phone:[
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { validator: useCheck.checkPhone, trigger: 'blur' }
    ],
    passWord: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: checkPwd, trigger: 'blur' }
    ],
    repassWord: [
        { required: true, message: '请再次确认密码', trigger: 'blur' },
        { validator: checkPassWord, trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱' },
    ],
})

const register = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
        request.post('/register',{
                username:ruleForm.userName,
                password:ruleForm.passWord,
                phone:ruleForm.phone,
                email:ruleForm.email,
            }).then(res => {
                if(res.data.code === 200){
                    router.push({
                        name: "登录",
                        path: "/login"
                    })
                }else{
                    operation.warning(res.data.msg)
                }
            });
    } else {
        operation.warning("注册信息有误");
    }
  })
}
</script>



<style scoped>
    .register-wrap{
        display: flex;
        width:100%;
        height: 100vh;
        justify-content: center;
        align-items: center;
        background: url(../../public/img/login-bg2.jpeg) no-repeat;
        background-size: cover;
    }
    .register-container{
        width: 300px;
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }
    .register-item{
        width: 300px;
        margin-top: 50px;

    }
    .register-title{
        text-align: center;
        color: #fff;
        font-size: 24px;
        margin-top: 10px;
    }
</style>
