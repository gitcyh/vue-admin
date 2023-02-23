<template>
    <div class="weather">
        <div class="location">
            <p class="city">{{ city }}&nbsp;<svg t="1671417503231" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2087" width="12" height="12">
                    <path
                        d="M753.536 663.552a337.066667 337.066667 0 0 0 0-478.805333c-133.333333-132.565333-349.738667-132.565333-483.072 0a337.066667 337.066667 0 0 0 0 478.805333L512 903.68l241.536-240.128zM210.304 724.096a422.4 422.4 0 0 1 0-599.893333C376.917333-41.386667 647.082667-41.386667 813.653333 124.245333a422.4 422.4 0 0 1 0 599.893334L512 1024l-301.696-299.946667zM512 512a85.333333 85.333333 0 1 0 0-170.666667 85.333333 85.333333 0 0 0 0 170.666667z m0 85.333333a170.666667 170.666667 0 1 1 0-341.333333 170.666667 170.666667 0 0 1 0 341.333333z"
                        fill="#ffffff" p-id="2088"></path>
                </svg></p>
            <span class="air">空气{{ air }}</span>
            <span class="temn">{{ tem1 }}/{{ tem2 }}</span>
        </div>
        <div class="tem">
            <span class="phrase">{{ phrase }}</span>
            <span>{{ tem }}℃</span>
        </div>

    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

let tem = ref("");
let tem1 = ref("");
let tem2 = ref("");
let phrase = ref("");
let air = ref("");
let city = ref("深圳市");

onMounted(() => {

    let ipurl = 'https://restapi.amap.com/v3/ip?key=963519b28c5cea4a04f353978f5ef54a';//调用高德ip地位服务
    axios.get(ipurl).then(data => {
        let url = 'https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=深圳';
        if (data.data.status === '1') {
            city.value = data.data.city;
            let city_ = city.value.replace("市", "");
            url = 'https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=' + city_;
        }
        axios.get(url).then(data => {
            let weather = data.data.data[0];
            tem.value = weather.tem;//当前温度
            tem1.value = weather.tem1;//最高温度
            tem2.value = weather.tem2;//最低温度
            phrase.value = weather.phrase;//当前天气如小雨
            air.value = weather.air_level;//当前空气质量如优
        })
    })

})

</script>

<style scoped>
.weather {
    width: 300px;
    height: 40px;
    color: #fff;
    margin-left: 5px;
    display: flex;

}

.location {
    width: 120px;
}

.air {
    font-size: 12px;
    margin-right: 5px;
}

.temn {
    font-size: 12px;
}

.tem {
    width: 220px;
    margin-top: 8px;
}

.phrase {
    margin-right: 10px;
}
</style>