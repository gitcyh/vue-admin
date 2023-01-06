<template>
    <div class="goods-add">
        <span @click="visible = true">个人中心</span>
        <el-dialog v-model="visible" :show-close="false" draggable title="个人中心">
            <template #header="{ close, titleId, titleClass }">
                <div class="my-header">
                    <h6 :id="titleId" :class="titleClass">个人中心</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div class="brand-add">
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username" readonly />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="ruleForm.phone" readonly />
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email" readonly />
                    </el-form-item>
                    <el-form-item label="头像" prop="shop_img">
                        <UploadVue ref="upload_img"></UploadVue>
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
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold} from '@element-plus/icons-vue'
import UploadVue from '../../common/components/Upload.vue';

const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    brand: '',
})
const currentIndex = ref("")

const rules = reactive({
    brand: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }],
})

const hideInput = function(){
    currentIndex.value = "";
}

const handleEdit = function(index, row){
    currentIndex.value = index;
}

const handleDelete = function(index, row){
    operation.handleDelete(function(){
        console.log(index,row);
    })
}


const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            operation.tips("请输入品牌名称");
        }
    })
}

</script>
  
<style scoped>
/* .goods-add .el-dialog__header {
    height: 30px;
    padding-left: 4px;
    padding-top: 4px;
    padding-right: 10px;
} */

.my-header {
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.brand-btn>>>.el-form-item__content {
    flex-direction: row-reverse
}
</style>


