import axios from "axios";

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL, // 所有的请求地址前缀部分
    timeout: 60000,
})

request.interceptors.request.use(function(config){
    if(localStorage.getItem("token")){
        config.headers.token = localStorage.getItem("token");
    }
    
    return config;
},function(error){
    //console.log("请求拦截失败",error);
    return Promise.reject(error);
})

request.interceptors.response.use(function(response){
    if(response.data.token){
        localStorage.setItem("token",response.data.token);
    }
    return response;
},function(error){
    if(error.response.data.code === 401){
        window.location.href = "/login";
    }
    return Promise.reject(error);
})

export default request