<template>
    <el-dialog v-model="visible" :show-close="false" draggable title="客户信息修改">
        <template #header="{ close, titleId, titleClass }">
            <div>
                <h6 :id="titleId" :class="titleClass">客户信息修改</h6>
                <el-button @click="close" :icon="CloseBold" circle />
            </div>
        </template>
        <div>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="useCustomer.rules" label-width="100px">
                <el-form-item label="客户名称" prop="name">
                    <el-input v-model="ruleForm.name" clearable />
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="ruleForm.address" type="text" clearable />
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input type="text" v-model="ruleForm.phone" clearable />
                </el-form-item>
                <el-form-item label="微信号" prop="wechat">
                    <el-input type="text" v-model="ruleForm.wechat" clearable />
                </el-form-item>
                <Settlement :settlement="ruleForm.settlement" :changeSettlement="changeSettlement"></Settlement>
                <el-form-item label="备注" prop="remark">
                    <el-input type="text" v-model="ruleForm.remark" clearable />
                </el-form-item>

            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
            </span>
        </template>
    </el-dialog>

</template>
  
<script setup>
import { ref, reactive, watch,inject } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { Plus, CloseBold } from '@element-plus/icons-vue'
import useCustomer from './useCustomer'
import request from '../../../../request/request';
import api from '../../../../request/api';
import operation from '../../../../common/util/operation';
import Settlement from './Settlement.vue'


const props = defineProps({
    id: String,
})

const refresh = inject("refresh");
const ruleFormRef = ref();
const visible = ref(false);
defineExpose({
    visible
})

const close = function () {
    visible.value = false;
}
const ruleForm = reactive({
    id: '',
    name: '',
    phone: '',
    address: '',
    remark: '',
    wechat: '',
    settlement:'',
})

const changeSettlement = function(value){
    ruleForm.settlement = value;
}

const getCustomer = function () {
    request.get(api.getCustomer, {
        params: {
            id: props.id
        }
    }).then(res => {
        if (res.data.code == 200) {
            const { id, name, phone, address, remark, wechat,settlement } = res.data.data.data;
            ruleForm.id = id;
            ruleForm.name = name;
            ruleForm.phone = phone;
            ruleForm.address = address;
            ruleForm.remark = remark;
            ruleForm.wechat = wechat;
            ruleForm.settlement = settlement;
        }
    })
}

const updateCustomer = function () {
    request.post(api.updateCustomer, {
        id: ruleForm.id,
        name: ruleForm.name,
        phone: ruleForm.phone,
        address: ruleForm.address,
        remark: ruleForm.remark,
        wechat: ruleForm.wechat,
        settlement:ruleForm.settlement,
    }).then(res => {
        if (res.data.code == 200) {
            operation.success("修改成功");
        }else{
            operation.warning("操作失败")
        }
        close();
        refresh();
    })
}

watch(visible, (newValue, oldValue) => {
    if (newValue) {
        getCustomer();
    }
})

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            updateCustomer();
        } else {
            operation.warning("校验失败");
        }
    })
}


</script>
  
<style scoped>

</style>


