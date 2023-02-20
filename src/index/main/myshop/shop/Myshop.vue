<template>
    <div class="shop-container">
        <div v-if="!hasShop" class="shop-tip">
            <div class="tip-message">您当前没有店铺,请点击按钮申请开店</div>
            <ShopAddVue></ShopAddVue>
        </div>
        <div v-else class="shaop-content">
            <ShopViewVue></ShopViewVue>
        </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import api from "../../../../request/api";
import request from "../../../../request/request";
import ShopAddVue from "./ShopAdd.vue";
import ShopViewVue from "./ShopView.vue";
import jwtUtil from "../../../../common/util/jwtUtil";

const hasShop = ref(false);

const getShopByuserId = function(){
    request.get(api.getShop,{
        params:{
            userId:jwtUtil.getValue("userid"),
        }
    }).then(res =>{
        if(res.data.code === 200){
            let shopId = res.data.data.data.id;
            localStorage.setItem("shopId",shopId);
            hasShop.value = true;
        }else{
            hasShop.value = false;
        }
    })
}

onMounted(()=>{
    getShopByuserId();
})

</script>

<style scoped>
.shop-tip{
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin:auto;
}

.tip-message{
   padding-bottom: 50px;
   font-size: 18px;
}

.shaop-content{
    display: flex;
    justify-content: center;
    align-items: center;
}
    
</style>


