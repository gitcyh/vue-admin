<template>
    <div class="shop-view">
        <div class="shop-title">
            我的店铺信息
        </div>
        <el-form ref="ruleFormRef" :model="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="店铺名称">
                <el-input :value="ruleForm.shopName" readonly />
            </el-form-item>
            <el-form-item label="店铺地址">
                <el-input type="text" :value="ruleForm.shopAddress" readonly />
            </el-form-item>
            <el-form-item label="店铺电话">
                <el-input type="text" :value="ruleForm.shopTel" readonly />
            </el-form-item>
            <el-form-item label="店主姓名">
                <el-input type="text" :value="ruleForm.shopKeeper" readonly />
            </el-form-item>
            <el-form-item label="店主身份证">
                <el-input type="text" :value="ruleForm.idCard" readonly />
            </el-form-item>
            <el-form-item label="店主手机号">
                <el-input type="text" :value="ruleForm.telephone" readonly/>
            </el-form-item>
            <el-form-item label="公司名称">
                <el-input type="text" :value="ruleForm.shopCompany" readonly/>
            </el-form-item>
            <el-form-item label="店铺经纬度" style="display:flex;justify-content: space-between;">
                <el-input type="text" :value="ruleForm.longitude+','+ruleForm.latitude"  readonly/>
            </el-form-item>
            <el-form-item label="营业时间">
                <el-col :span="10">
                    <el-form-item prop="startTime">
                        <el-input :value-format="'HH:mm:ss'" :value="ruleForm.startTime" />
                    </el-form-item>
                </el-col>
                <el-col style="text-align:center;" :span="4">
                    <span>-</span>
                </el-col>
                <el-col :span="10">
                    <el-form-item prop="endTime">
                        <el-input :value-format="'HH:mm:ss'" :value="ruleForm.endTime" />
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="营业状态">
                <el-input type="text" :value="getShopActive()" style="width:100px;" readonly />
            </el-form-item>
            <el-form-item label="审核状态">
                <el-input type="text" :value="getApplyState()" style="width:100px;margin-right: 10px;" readonly/>
                <span style="color:red;font-size: 12px;">{{ getReason() }}</span>
            </el-form-item>
            <el-form-item label="店铺文件">
                <div class="shop-img">
                    <div>
                        <span>店铺图片:</span><el-image style="width: 100px; height: 100px" :src="getImgSrc()" fit="fill" :preview-src-list="[getImgSrc()]" />
                    </div>
                    <div>
                        <span>营业执照:</span><el-image style="width: 100px; height: 100px" :src="getLicenseSrc()" fit="fill" :preview-src-list="[getLicenseSrc()]" />
                    </div>
                </div>
            </el-form-item>
        </el-form>
        <div class="shop-btn">
            <ShopEditVue></ShopEditVue>
        </div>
        
    </div>

</template>
  
<script setup>
import { ref, reactive,onMounted,provide } from 'vue'
import ShopEditVue from './ShopEdit.vue';
import useShop from './useShop';
import jwtUtil from '../../../../common/util/jwtUtil';


const props = defineProps({
    data:Object,
})

const ruleFormRef = ref();
const visible = ref(false);
defineExpose({
    visible
})
const ruleForm = reactive({
    shopName: '',
    shopAddress: '',
    shopTel: '',
    shopKeeper: '',
    idCard: '',
    telephone: '',
    imgId: '',
    shopCompany: '',
    licenseId: '',
    startTime: '09:00:00',
    endTime: '22:30:00',
    longitude: '',
    latitude: '',
    applyStatus:0,
    applyDesc:"",
    shopActive:0,
})

const getApplyState = function(){
    if(ruleForm.applyStatus === 0){
        return "待审核"
    }else if(ruleForm.applyStatus === -1){
        return "审核不通过"
    }else if(ruleForm.applyStatus === 1){
        return "审核通过"
    }else{
        return "待审核"
    }
}

const getReason = function(){
    if(ruleForm.applyStatus === -1){
        return ruleForm.applyDesc
    }else {
        return ""
    }
}

const getShopActive = function(){
    if(ruleForm.shopActive === 1){
        return "营业中"
    }else {
        return "休息中"
    }
}

const getImgSrc = function(){
    return jwtUtil.getImgUrl(ruleForm.imgId)
}

const getLicenseSrc = function(){
    return jwtUtil.getImgUrl(ruleForm.licenseId)
}



const getShop = function(){
    useShop.getShop(ruleForm);
}

provide("refreshView",getShop);
onMounted(()=>{
    getShop();
})

</script>
  
<style scoped>
.shop-view{
    margin-top: 20px;
    width: 50vw;
    border:1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
}

.shop-title{
    height: 40px;
    display: flex;
    justify-content: center;
    font-size: 20px;
}

.shop-btn{
    display: flex;
    flex-direction: row-reverse;
}
.shop-img{
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.shop-img div{
    width: 200px;
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.shop-img div span{
    margin-right: 10px;
}

</style>


