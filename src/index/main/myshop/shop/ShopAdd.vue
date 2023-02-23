<template>
    <div class="shop">
        <el-button type="primary" size="large" @click="visible = true">申请开店</el-button>
        <el-dialog top="2vh" v-model="visible" :show-close="false" draggable title="申请开店">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">申请开店</h6>
                    <el-button @click="close" :icon="CloseBold" circle />
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
                    <el-form-item label="店铺图片" prop="imgId">
                        <UploadVue ref="upload_img"></UploadVue>
                    </el-form-item>
                    <el-form-item label="公司名称" prop="shopCompany">
                        <el-input type="text" v-model="ruleForm.shopCompany" placeholder="请输入公司名称" />
                    </el-form-item>
                    <el-form-item label="营业执照" prop="licenseId">
                        <UploadVue ref="upload_license"></UploadVue>
                    </el-form-item>
                    <el-form-item label="营业时间" required>
                        <el-col :span="10">
                            <el-form-item prop="startTime">
                                <el-time-picker style="width:100%" :value-format="'HH:mm:ss'" v-model="ruleForm.startTime" placeholder="请选择开始营业时间" />
                            </el-form-item>
                        </el-col>
                        <el-col style="text-align:center" :span="4">
                            <span>-</span>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item prop="endTime">
                                <el-time-picker style="width:100%" :value-format="'HH:mm:ss'" v-model="ruleForm.endTime" placeholder="请选择结束营业时间" />
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="营业状态" prop="licenseId">
                        <el-radio-group v-model="ruleForm.shopActive">
                            <el-radio :label="1" size="large">营业中</el-radio>
                            <el-radio :label="0" size="large">休息中</el-radio>
                        </el-radio-group>
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
                    <el-button @click="close">取消</el-button>
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
import dateUtil from '../../../../common/util/dateUtil';


const upload_img = ref();
const upload_license = ref();
const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    shopName: '',
    shopAddress: '',
    shopTel: '',
    shopkeeper: '',
    idCard: '',
    telephone: '',
    imgId: '',
    shopCompany: '',
    licenseId: '',
    startTime: '09:00:00',
    endTime: '22:30:00',
    longitude: '',
    latitude: '',
    shopActive:0,
})


const close = function(){
    visible.value = false;
}


const addShop = function () {
    request.post(api.addShop, {
        userId:jwtUtil.getValue("userid"),
        shopName: ruleForm.shopName,
        shopAddress: ruleForm.shopAddress,
        shopTel: ruleForm.shopTel,
        shopkeeper: ruleForm.shopkeeper,
        idCard: ruleForm.idCard,
        telephone: ruleForm.telephone,
        imgId: ruleForm.imgId,
        shopCompany: ruleForm.shopCompany,
        licenseId: ruleForm.licenseId,
        startTime: ruleForm.startTime,
        endTime: ruleForm.endTime,
        longitude: ruleForm.longitude,
        latitude: ruleForm.latitude,
        applyTime: dateUtil.getYMDHMS(new Date()),
        shopActive:ruleForm.shopActive,
    }).then(res => {
        if (res.data.code === 200) {
            let shopId = res.data.data.shopId;
            localStorage.setItem("shopId",shopId);
            operation.success("提交成功");
        } else {
            operation.warning("操作失败");
        }
        close();
    })
}




const getPosition = function () {
    useShop.getPosition(ruleForm)
}

const submit = async function () {
    await upload_img.value.submitUpload().then(res =>{
        const imgId = res.data.data.fileId;
        ruleForm.imgId = imgId;
    });
    await upload_license.value.submitUpload().then(res =>{
        const licenseId = res.data.data.fileId;
        ruleForm.licenseId = licenseId;
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


