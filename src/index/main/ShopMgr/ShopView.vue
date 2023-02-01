<template>
    <el-dialog v-model="visible" :show-close="false" draggable title="查看订单">
        <template #header="{ close, titleId, titleClass }">
            <div>
                <h6 :id="titleId" :class="titleClass">查看订单</h6>
                <el-button @click="visible = false" :icon="CloseBold" circle />
            </div>
        </template>
        <div class="shop-title">
            店铺信息
        </div>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="店铺名称" prop="shopname">
                <el-input :value="ruleForm.shopname" readonly />
            </el-form-item>
            <el-form-item label="店铺地址" prop="shop_address">
                <el-input type="text" :value="ruleForm.shop_address" readonly />
            </el-form-item>
            <el-form-item label="店铺电话" prop="shop_tel">
                <el-input type="text" :value="ruleForm.shop_tel" readonly />
            </el-form-item>
            <el-form-item label="店主姓名" prop="shopkeeper">
                <el-input type="text" :value="ruleForm.shopkeeper" readonly />
            </el-form-item>
            <el-form-item label="店主身份证" prop="idCard">
                <el-input type="text" :value="ruleForm.idCard" readonly />
            </el-form-item>
            <el-form-item label="店主手机号" prop="telephone">
                <el-input type="text" :value="ruleForm.telephone" readonly />
            </el-form-item>
            <el-form-item label="公司名称" prop="shopCompany">
                <el-input type="text" :value="ruleForm.shopCompany" readonly />
            </el-form-item>
            <el-form-item label="店铺经纬度" prop="longitude" style="display:flex;justify-content: space-between;">
                <el-input type="text" :value="ruleForm.longitude" readonly />
            </el-form-item>
            <el-form-item label="起止营业时间" prop="serviceStartTime">
                <el-time-picker :value="ruleForm.serviceStartTime" readonly />&nbsp;~&nbsp;<el-time-picker
                    :value="ruleForm.serviceEndTime" readonly />
            </el-form-item>
            <el-form-item label="审核状态" prop="apply_status">
                <el-input type="text" :value="ruleForm.apply_status" style="width:100px;margin-right: 10px;" readonly />
                <span style="color:red;font-size: 12px;">审核失败原因</span>
            </el-form-item>
            <el-form-item label="店铺文件" prop="shop_img">
                <div class="shop-img">
                    <div>
                        <span>店铺图片:</span><el-image style="width: 100px; height: 100px"
                            src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" fit="fill"
                            :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']" />
                    </div>
                    <div>
                        <span>营业执照:</span><el-image style="width: 100px; height: 100px"
                            src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" fit="fill"
                            :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']" />
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
  
<script setup>
import { ref, reactive, defineExpose } from 'vue'
import { CloseBold} from "@element-plus/icons-vue";



const props = defineProps({
    data: Object,
})

const ruleFormRef = ref();
const visible = ref(false);
defineExpose({
    visible
})
const ruleForm = reactive({
    shopname: '',
    shop_address: '',
    shop_tel: '',
    shopkeeper: '',
    idCard: '',
    telephone: '',
    shop_img: '',
    shopCompany: '',
    shop_license: '',
    serviceStartTime: '',
    serviceEndTime: '',
    longitude: '',
    latitude: '',
    apply_status: ''
})

</script>
  
<style scoped>
.shop-view {
    margin-top: 20px;
    width: 50vw;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
}

.shop-title {
    height: 40px;
    display: flex;
    justify-content: center;
    font-size: 20px;
}

.shop-btn {
    display: flex;
    flex-direction: row-reverse;
}

.shop-img {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.shop-img div {
    width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.shop-img div span {
    margin-right: 10px;
}
</style>


