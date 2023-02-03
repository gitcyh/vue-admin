<template>
    <div class="register-wrap">
        <div class="register-container">
            <div class="register-item register-title">
                找回密码
            </div>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
                <el-form-item class="register-item" label="" prop="phone">
                    <el-input type="text" v-model="ruleForm.phone"  placeholder="请输入手机号" :prefix-icon="Message" clearable></el-input>
                </el-form-item>
                <el-form-item class="register-item" label="" prop="email">
                    <el-input type="email" v-model="ruleForm.email"  placeholder="请输入注册时的邮箱" :prefix-icon="Message" clearable></el-input>
                </el-form-item>
                <el-form-item class="register-item">
                    <el-button color="#626aef" style="width:100%;" @click="findPwd(ruleFormRef)">找回密码</el-button>
                </el-form-item>
              </el-form>
        </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref,reactive } from 'vue'
  import {Message} from '@element-plus/icons-vue'
  import useCheck from '../../common/check/useCheck';
  import operation from '../../common/util/operation';
  
  const ruleFormRef = ref();
  const ruleForm = reactive({
      email: '',
  
  })

  const rules = reactive({
    phone:[
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { validator: useCheck.checkPhone, trigger: 'blur' }
    ],
      email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱' },
      ],
  })
  
  const findPwd = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!')
      } else {
        operation.warning("请输入相关信息");
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
  