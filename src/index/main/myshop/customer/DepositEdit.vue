<template>
    <div>
        <el-dialog v-model="visible" :show-close="false" draggable title="修改押金单" append-to-body>
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">修改押金单</h6>
                    <el-button @click="close" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="useCustomer.despositRules" label-width="100px">
                    <el-form-item label="押金描述" prop="description">
                        <el-input type="text" v-model="ruleForm.description" clearable />
                    </el-form-item>
                    <el-form-item label="押金金额" prop="money">
                        <el-input v-model="ruleForm.money" type="number" />
                    </el-form-item>
                    <el-form-item label="押桶数量" prop="num">
                        <el-input v-model="ruleForm.num" type="number" />
                    </el-form-item>
                    <el-form-item label="押金状态" prop="state">
                        <DepositState v-model="ruleForm.state" />
                    </el-form-item>
                    <el-form-item label="押金单据">
                        <Upload ref="uploadDesposit" :fileList="fileList" />
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" v-model="ruleForm.remark" clearable />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="close">取消</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                </span>
            </template>
        </el-dialog>
    </div>

</template>
  
<script setup>
import { ref, reactive, watch } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import useCustomer from './useCustomer'
import Upload from '../../../../common/components/Upload.vue';
import DepositState from './DepositState.vue';
import request from '../../../../request/request';
import api from '../../../../request/api';
import operation from '../../../../common/util/operation';


const fileList = ref([
    {
        name: 'desposit.jpeg',
        url: '',
    }
])

const uploadDesposit = ref();

const ruleFormRef = ref();
const visible = ref(false);
const props = defineProps({
    id: String,
})
defineExpose({
    visible
})
const ruleForm = reactive({
    money: '',
    num: 0,
    description: '',
    remark: '',
    state: 1,
    fileId: '',
    customerId:'',
})


const close = function(){
    visible.value = false;
}

const updateDesposit = function () {
    request.post(api.updateDesposit, {
        id:props.id,
        money: ruleForm.money,
        num: ruleForm.num,
        description: ruleForm.description,
        remark: ruleForm.remark,
        state: ruleForm.state,
        fileId: ruleForm.fileId,
        customerId:ruleForm.customerId,
    }).then(res =>{
        if (res.data.code == 200) {
            operation.success("修改成功");
        }else{
            operation.warning("操作失败")
        }
        close();
    })
}

const getDesposit = function () {
    request.get(api.getDesposit, {
        params: {
            id: props.id
        }
    }).then(res => {
        if (res.data.code === 200) {
            const { money, num, description, remark, state, fileId,customerId } = res.data.data.data;
            ruleForm.money = money;
            ruleForm.num = num;
            ruleForm.description = description;
            ruleForm.remark = remark;
            ruleForm.state = state;
            ruleForm.fileId = fileId;
            ruleForm.customerId = customerId;
            fileList.value[0].url = "/api/download?id=" + fileId + "&token=" + localStorage.getItem("token");
        }
    })
}

watch(visible, (newValue, oldValue) => {
    if (newValue) {
        getDesposit();
    }
})

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            uploadDesposit.value.submitUpload().then(res => {
                const fileId = res.data.data.fileId;
                ruleForm.fileId = fileId;
                updateDesposit();
            })
        } else {
            operation.warning("校验失败");
        }
    })
}


</script>
  
<style scoped>

</style>


