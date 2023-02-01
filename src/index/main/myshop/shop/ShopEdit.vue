<template>
    <div class="shop">
        <el-button type="primary" size="large" @click="visible = true">店铺信息修改</el-button>
        <el-dialog top="2vh" v-model="visible" :show-close="false" draggable title="修改店铺信息">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">修改店铺信息</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef"  :model="ruleForm" :rules="useShop.rules" label-width="120px" class="demo-ruleForm" style="height:700px;overflow-y:auto;">
                    <el-form-item label="店铺名称" prop="shopname">
                        <el-input v-model="ruleForm.shopname" placeholder="请输入店铺名称" clearable />
                    </el-form-item>
                    <el-form-item label="店铺地址" prop="shop_address">
                        <el-input type="text" v-model="ruleForm.shop_address" placeholder="请输入店铺地址" clearable />
                    </el-form-item>
                    <el-form-item label="店铺电话" prop="shop_tel">
                        <el-input type="text" v-model="ruleForm.shop_tel" placeholder="请输入店铺电话" />
                    </el-form-item>
                    <el-form-item label="店主姓名" prop="shopkeeper">
                        <el-input type="text" v-model="ruleForm.shopkeeper" placeholder="请输入店主姓名" />
                    </el-form-item>
                    <el-form-item label="店主身份证" prop="idCard">
                        <el-input type="text" v-model="ruleForm.idCard" placeholder="请输入店主身份证" />
                    </el-form-item>
                    <el-form-item label="店主手机号" prop="telephone">
                        <el-input type="text" v-model="ruleForm.telephone" placeholder="请输入店主手机号" />
                    </el-form-item>
                    <el-form-item label="店铺图片" prop="shop_img" required>
                        <UploadVue ref="upload_img" :fileList="fileList"></UploadVue>
                    </el-form-item>
                    <el-form-item label="公司名称" prop="shopCompany">
                        <el-input type="text" v-model="ruleForm.shopCompany" placeholder="请输入公司名称" />
                    </el-form-item>
                    <el-form-item label="营业执照" prop="shop_license" required>
                        <UploadVue ref="upload_license" :fileList="fileList"></UploadVue>
                    </el-form-item>
                    <el-form-item label="开始营业时间" prop="serviceStartTime">
                        <el-time-picker v-model="ruleForm.serviceStartTime" placeholder="请选择开始营业时间" />
                    </el-form-item>
                    <el-form-item label="结束营业时间" prop="serviceEndTime">
                        <el-time-picker v-model="ruleForm.serviceEndTime" placeholder="请选择结束营业时间" />
                    </el-form-item>
                    <el-form-item label="店铺经纬度" prop="longitude" style="display:flex;justify-content: space-between;">
                        <el-button type="success" size="small" style="width:20%;" @click="getPosition">点击获取地理位置</el-button>&nbsp;
                        <el-input type="text" v-model="ruleForm.longitude" placeholder="请输入经度" style="width:20%;" />&nbsp;
                        <el-input type="text" v-model="ruleForm.latitude" placeholder="请输入纬度" style="width:20%;" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="visible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">提交申请</el-button>
                </span>
            </template>
        </el-dialog>
    </div>

</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import UploadVue from '../../../../common/components/Upload.vue';
import operation from '../../../../common/util/operation'
import useShop from './useShop';

const upload_img = ref();
const upload_license = ref();
const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    shopname: '',
    shop_address: '',
    shop_tel: '',
    shopkeeper: '',
    idCard:'',
    telephone: '',
    shop_img: '',
    shopCompany: '',
    shop_license: '',
    serviceStartTime: '',
    serviceEndTime: '',
    longitude: '',
    latitude: '',
})

const fileList = ref([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  }
])



const getPosition = function () {
    useShop.getPosition(ruleForm)
}



const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            upload_img.value.submitUpload();
            upload_license.value.submitUpload();
        } else {
            operation.tips("店铺信息有误");
        }
    })
}

</script>
  
<style scoped>



</style>


