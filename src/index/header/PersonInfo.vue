<template>
    <div>
        <span @click="visible = true">个人中心</span>
        <el-dialog v-model="visible" :show-close="false" draggable title="个人中心" append-to-body>
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">个人中心</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div class="brand-add">
                <el-form ref="ruleFormRef" :model="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="头像" prop="shop_img">
                        <UploadVue ref="upload_img" :file-list="fileList"></UploadVue>
                    </el-form-item>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username" readonly />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="ruleForm.phone" readonly />
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email" readonly />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="visible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">确认修改</el-button>
                </span>
            </template>
        </el-dialog>
    </div>

</template>
  
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import UploadVue from '../../common/components/Upload.vue';
import request from '../../request/request';
import operation from '../../common/util/operation';
import jwtUtil from '../../common/util/jwtUtil';

const ruleFormRef = ref();
const upload_img = ref();
const visible = ref(false);
const ruleForm = reactive({
    username: '',
    phone: '',
    email: '',
    userid: '',
    pictureId: '',
})

const fileList = [
    {
        name: 'picture.jpeg',
        url: jwtUtil.getPictureId(),
    },
]


onMounted(() => {
    request.post("/getUserInfo", {
        username: localStorage.getItem("username")
    }).then(res => {
        if (res.data.code === 200) {
            const { username, phone, email, userid } = res.data.data;
            ruleForm.username = username;
            ruleForm.phone = phone;
            ruleForm.email = email;
            ruleForm.userid = userid;
        } else {
            operation.warning(res.data.msg)
        }
    })
})



const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            upload_img.value.submitUpload().then(res => {
                const fileId = res.data.data.fileId;
                ruleForm.fileId = fileId;
                request.post("/updateUserInfo",{ 
                    id:ruleForm.userid,
                    pictureId:fileId,
                }).then(res => {
                    localStorage.setItem("pictureId",fileId)
                    if (res.data.code === 200) {
                        operation.success("信息修改成功!");
                        visible.value = false;
                    } else {
                        operation.warning(res.data.msg)
                    }
                })
            })
        } else {
            operation.warning("请输入品牌名称");
        }
    })
}

</script>
  
<style scoped>

</style>


