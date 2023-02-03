<template>
    <div>
        <span @click="visible = true">个人中心</span>
        <el-dialog v-model="visible" :show-close="false" draggable title="个人中心" :append-to-body="true">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">个人中心</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div class="brand-add">
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
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
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold} from '@element-plus/icons-vue'
import UploadVue from '../../common/components/Upload.vue';

const ruleFormRef = ref();
const upload_img = ref();
const visible = ref(false);
const ruleForm = reactive({
    brand: '',
})
const currentIndex = ref("")

const fileList =[
{
    name: 'food.jpeg',
    url: 'http://localhost:8099/download?id=3428506fbd4b4ae1a805020d952c9d4b',
  },
]

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
const submitUpload = () => {
    upload_img.value.submitUpload()
}

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            submitUpload();
            console.log('submit!')
        } else {
            operation.tips("请输入品牌名称");
        }
    })
}

</script>
  
<style scoped>



</style>


