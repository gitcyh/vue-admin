<template>
    <div class="shop">
        <el-button type="primary" size="large" @click="visible = true">申请开店</el-button>
        <el-dialog top="2vh" v-model="visible" :show-close="false" draggable title="申请开店">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">申请开店</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="useShop.rules" label-width="120px"
                    class="demo-ruleForm" style="height:700px;overflow-y:auto;">
                    <el-form-item label="店铺名称" prop="shopName">
                        <el-input v-model="ruleForm.shopName" placeholder="请输入店铺名称" clearable />
                    </el-form-item>
                    <el-form-item label="店铺地址" prop="shopAddress">
                        <el-input type="text" v-model="ruleForm.shopAddress" placeholder="请输入店铺地址" clearable />
                    </el-form-item>
                    <el-form-item label="店铺电话" prop="shopTel">
                        <el-input type="text" v-model="ruleForm.shopTel" placeholder="请输入店铺电话" />
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
                    <el-form-item label="店铺图片" prop="shopImg">
                        <UploadVue ref="upload_img"></UploadVue>
                    </el-form-item>
                    <el-form-item label="公司名称" prop="shopCompany">
                        <el-input type="text" v-model="ruleForm.shopCompany" placeholder="请输入公司名称" />
                    </el-form-item>
                    <el-form-item label="营业执照" prop="shopLicense">
                        <UploadVue ref="upload_license"></UploadVue>
                    </el-form-item>
                    <el-form-item label="营业时间" required>
                        <el-col :span="11">
                            <el-form-item prop="startTime">
                                <el-time-picker value-format="HH:mm:ss" v-model="ruleForm.startTime" @change="change" placeholder="请选择开始营业时间" />
                            </el-form-item>
                        </el-col>
                        <el-col class="text-center" :span="2">
                            <span class="text-gray-500">-</span>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item prop="endTime">
                                <el-time-picker value-format="HH:mm:ss" v-model="ruleForm.endTime" placeholder="请选择结束营业时间" />
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="店铺经纬度" prop="longitude" style="display:flex;justify-content: space-between;">
                        <el-button type="success" size="small" style="width:20%;"
                            @click="getPosition">点击获取地理位置</el-button>&nbsp;
                        <el-input type="text" v-model="ruleForm.longitude" placeholder="请输入经度"
                            style="width:20%;" />&nbsp;
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
import { ref, reactive,watch } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import UploadVue from '../../../../common/components/Upload.vue';
import operation from '../../../../common/util/operation'
import useShop from './useShop';
import request from '../../../../request/request';
import api from '../../../../request/api';
import jwtUtil from '../../../../common/util/jwtUtil';


const upload_img = ref();
const upload_license = ref();
const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    shopName: '',
    shopAddress: '',
    shopTel: '',
    shopKeeper: '',
    idCard: '',
    telephone: '',
    shopImg: '',
    shopCompany: '',
    shopLicense: '',
    startTime: '9:00:00',
    endTime: '22:30:00',
    longitude: '',
    latitude: '',
})



const change = function(value){
    console.log(value);
}

const addShop = function () {
    request.post(api.addShop, {
        userId:jwtUtil.getValue("userid"),
        shopName: ruleForm.shopName,
        shopAddress: ruleForm.shopAddress,
        shopTel: ruleForm.shopTel,
        shopKeeper: ruleForm.shopkeeper,
        idCard: ruleForm.idCard,
        telephone: ruleForm.telephone,
        shopImg: ruleForm.shopImg,
        shopCompany: ruleForm.shopCompany,
        shopLicense: ruleForm.shopLicense,
        startTime: ruleForm.startTime,
        endTime: ruleForm.endTime,
        longitude: ruleForm.longitude,
        latitude: ruleForm.latitude,
    }).then(res => {
        if (res.data.code === 200) {
            operation.success("提交成功");
        } else {
            operation.warning("操作失败");
        }
    })
}




const getPosition = function () {
    useShop.getPosition(ruleForm)
}

const submit = async function () {
    await upload_img.value.submitUpload().then(res =>{
        const shopImg = res.data.data.fileId;
        ruleForm.shopImg = shopImg;
    });
    await upload_license.value.submitUpload().then(res =>{
        const shopLicense = res.data.data.fileId;
        ruleForm.shopLicense = shopLicense;
    });

    addShop();
}


const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            submit();
        } else {
            operation.warning("店铺信息有误");
        }
    })
}

</script>
  
<style scoped>

</style>


