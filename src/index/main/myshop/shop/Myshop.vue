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
import ShopAddVue from "./ShopAdd.vue";
import ShopViewVue from "./ShopView.vue";

const hasShop = ref(true);

onMounted(()=>{
    console.log('请求店铺信息')
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


