<template>
    <el-button :icon="Plus" type="primary" size="small" @click="visible = true">添加客户</el-button>
        <el-dialog v-model="visible" :show-close="false" draggable title="添加客户">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">添加客户</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="useCustomer.rules" label-width="100px" >
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
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="visible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
                </span>
            </template>
        </el-dialog>

</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { Plus, CloseBold } from '@element-plus/icons-vue'
import useCustomer from './useCustomer'
import request from '../../../../request/request'
import api from '../../../../request/api'
import operation from '../../../../common/util/operation'
import Settlement from './Settlement.vue'

const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    name: '',
    phone: null,
    address: '',
    wechat:null,
    remark:'',
    settlement:null,
})
const close = function(){
    visible.value = false;
}

const changeSettlement = function(value){
    ruleForm.settlement = value;
}
const addCustomer = function(){
    request.post(api.addCustomer,{
        shopId:localStorage.getItem("shopId"),
        name: ruleForm.name,
        phone: ruleForm.phone,
        address: ruleForm.address,
        wechat:ruleForm.wechat,
        settlement:ruleForm.settlement,
        remark:ruleForm.remark,
    }).then(res =>{
        if(res.data.code === 200){
            operation.success("添加成功");
        }else{
            operation.success("操作失败");
        }
        close();
    })
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      addCustomer();
    } else {
        operation.warning("校验失败");
    }
  })
}


</script>
  
<style scoped>



</style>


