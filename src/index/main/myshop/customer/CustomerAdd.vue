<template>
    <div>
        <el-button :icon="Plus" type="primary" size="small" @click="visible = true">添加客户</el-button>
        <el-dialog v-model="visible" :show-close="false" draggable title="添加客户">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">添加客户</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="useCustomerCheck.rules" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="客户名称" prop="name">
                        <el-input v-model="ruleForm.name" clearable />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input type="text" v-model="ruleForm.phone" clearable />
                    </el-form-item>
                    <el-form-item label="住址" prop="address">
                        <el-input v-model="ruleForm.address" type="text" clearable />
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="text" v-model="ruleForm.remark" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="useCustomerCheck.resetForm(ruleFormRef)">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="visible = false">取消</el-button>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>

</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { Plus, CloseBold } from '@element-plus/icons-vue'
import UseCustomerCheck from './useCustomerCheck'
let useCustomerCheck = UseCustomerCheck();

const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    name: '',
    phone: '',
    address: '',
    remark:'',
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
        operation.warning("校验失败");
    }
  })
}


</script>
  
<style scoped>



</style>


