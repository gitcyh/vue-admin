<template>
    <div>
        <el-button type="primary" size="small" @click="visible = true">添加押金单</el-button>
        <el-dialog v-model="visible" :show-close="false" draggable title="添加押金单" append-to-body>
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">添加押金单</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="useCustomer.despositRules" label-width="100px">
                    <el-form-item label="押金描述" prop="description">
                        <el-input type="text" v-model="ruleForm.description" clearable />
                    </el-form-item>
                    <el-form-item label="押金金额" prop="money">
                        <el-input v-model="ruleForm.money" type="number"/>
                    </el-form-item>
                    <el-form-item label="押桶数量" prop="num">
                        <el-input v-model="ruleForm.num" type="number"/>
                    </el-form-item>
                    <el-form-item label="押金单据">
                        <Upload ref="uploadDesposit" />
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" v-model="ruleForm.remark" clearable />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="visible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                </span>
            </template>
        </el-dialog>
    </div>

</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import useCustomer from './useCustomer'
import Upload from '../../../../common/components/Upload.vue';
import request from '../../../../request/request';
import api from '../../../../request/api';
import operation from '../../../../common/util/operation';

const props = defineProps({
    customerId: String
})

const uploadDesposit = ref();
const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    money: '',
    num: 0,
    description: '',
    remark: '',
    state: 1,
    fileId:'',
})



const close = function () {
    visible.value = false;
}

const addDesposit = function () {
    request.post(api.addDesposit, {
        money: ruleForm.money,
        num: ruleForm.num,
        description: ruleForm.description,
        remark: ruleForm.remark,
        state: ruleForm.state,
        customerId: props.customerId,
        fileId: ruleForm.fileId,
    }).then(res => {
        if (res.data.code === 200) {
            operation.success();
        } else {
            operation.warning();
        }
        close();
    })
}

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            uploadDesposit.value.submitUpload().then(res => {
                const fileId = res.data.data.fileId;
                ruleForm.fileId = fileId;
                addDesposit();
            })
        } else {
            operation.warning("校验失败");
        }
    })
}


</script>
  
<style scoped>

</style>


