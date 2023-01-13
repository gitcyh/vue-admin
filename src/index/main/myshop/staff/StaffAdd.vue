<template>
    <div>
        <el-button :icon="Plus" type="primary" size="small" @click="visible = true">添加员工</el-button>
        <el-dialog v-model="visible" :show-close="false" draggable title="添加员工">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">添加员工</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="useStaffCheck.rules" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="ruleForm.name" clearable />
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="ruleForm.sex">
                            <el-radio label="0">男</el-radio>
                            <el-radio label="1">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model.number="ruleForm.age" clearable />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input type="text" v-model="ruleForm.phone" clearable />
                    </el-form-item>
                    <el-form-item label="身份证" prop="IDCard">
                        <el-input type="text" v-model="ruleForm.IDCard" clearable />
                    </el-form-item>
                    <el-form-item label="入职日期">
                        <el-date-picker v-model="ruleForm.date" type="date"  label="请选择日期"  placeholder="请选择日期" clearable style="width: 100%"/>
                    </el-form-item>
                    <el-form-item label="住址" prop="address">
                        <el-input v-model="ruleForm.address" type="textarea" clearable />
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="useStaffCheck.resetForm(ruleFormRef)">重置</el-button>
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
import UseStaffCheck from './useStaffCheck'
let useStaffCheck = UseStaffCheck();

const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    name: '',
    age: '',
    sex: '0',
    phone: '',
    IDCard: '',
    date:'',
    address: '',
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
        useGoodsCheck.tips();
    }
  })
}


</script>
  
<style scoped>



</style>


