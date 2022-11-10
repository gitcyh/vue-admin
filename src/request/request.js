import axios from "axios";

const request = axios.create({
    timeout: 10000
})

request.interceptors.request.use(function(config){
    console.log("请求拦截成功",config);
    return config;
},function(error){
    console.log("请求拦截失败",error);
    return Promise.reject(error);
})

request.interceptors.response.use(function(response){
    console.log("响应拦截成功",response);
    return response;
},function(error){
    console.log("响应拦截失败",error);
    return Promise.reject(error);
})

export default request