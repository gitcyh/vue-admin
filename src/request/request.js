import axios from "axios";

const token = localStorage.getItem("token");

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // 所有的请求地址前缀部分
    timeout: 60000,
    headers: {token: token}
})

request.interceptors.request.use(function(config){
    //console.log("请求拦截成功",config);
    return config;
},function(error){
    //console.log("请求拦截失败",error);
    return Promise.reject(error);
})

request.interceptors.response.use(function(response){
    //console.log("响应拦截成功",response);
    return response;
},function(error){
    //console.log("响应拦截失败",error);
    return Promise.reject(error);
})

export default request