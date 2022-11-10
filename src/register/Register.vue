<template>
  <div class="register-wrap">
      <div class="register-container">
          <div class="register-item register-title">
              欢迎注册
          </div>
          <div class="register-item">
              <el-input type="text" v-model="userName" placeholder="请输入用户名" :prefix-icon="User"></el-input>
          </div>
          <div class="register-item">
              <el-input type="password" v-model="passWord"  placeholder="请输入密码" :prefix-icon="Lock"></el-input>
          </div>
          <div class="register-item">
              <el-input type="password" v-model="repassWord"  placeholder="请再次确认密码" :prefix-icon="Lock"></el-input>
          </div>
          <div class="register-item">
                <el-button type="primary" style="width:100%;" @click="register">注    册</el-button>
          </div>
          
          
         
      </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import {User,Lock} from '@element-plus/icons-vue'

const userName = ref('')
const passWord = ref('')
const register = function(){
    console.log(userName,passWord)
}
</script>



<style scoped>
    .register-wrap{
        display: flex;
        width:100%;
        height: 100vh;
        justify-content: center;
        align-items: center;
        background-color: rgb(42, 82, 158);
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
        width: 100%;
        margin-top: 50px;

    }
    .register-title{
        text-align: center;
        color: #fff;
        font-size: 24px;
        margin-top: 10px;
    }
</style>
