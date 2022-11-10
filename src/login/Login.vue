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
              <el-input type="password" v-model="passWord"  placeholder="请输入密码" :prefix-icon="Lock"></el-input>
          </div>
          <div class="login-item">
                <el-button type="primary" style="width:100%;" @click="login">登      录</el-button>
          </div>
          
          
         
      </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import {User,Lock} from '@element-plus/icons-vue'
import request from '../request/request'
import {useRouter} from 'vue-router'

const router = useRouter();

const userName = ref('')
const passWord = ref('')
const login = function(){
    request.get('https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg')
    .then(res => {
        router.push({
            name:"首页",
            path:"/index/myindex"
        })
    });
}
</script>



<style scoped>
    .login-wrap{
        display: flex;
        width:100%;
        height: 100vh;
        justify-content: center;
        align-items: center;
        background-color: rgb(42, 82, 158);
    }
    .login-container{
        width: 300px;
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }
    .login-item{
        width: 100%;
        margin-top: 50px;

    }
    .login-title{
        text-align: center;
        color: #fff;
        font-size: 24px;
        margin-top: 10px;
    }
</style>
