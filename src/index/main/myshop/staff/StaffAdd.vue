<template>
    <div>
        <el-button :icon="Plus" type="primary" size="small" @click="visible = true">添加员工</el-button>
        <el-dialog v-model="visible" :show-close="false" draggable title="添加员工">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">添加员工</h6>
                    <el-button @click="close" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="useStaff.rules" label-width="100px" class="demo-ruleForm">
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
                        <el-input type="text" v-model.number="ruleForm.age" clearable />
                    </el-form-item>
                    <el-form-item label="入职日期" prop="entryDate">
                        <el-date-picker v-model="ruleForm.entryDate" type="date"  format="YYYY-MM-DD" :value-format="'YYYY-MM-DD HH:mm:ss'"  placeholder="请选择日期" clearable style="width: 100%"/>
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input type="text" v-model="ruleForm.phone" clearable />
                    </el-form-item>
                    <el-form-item label="身份证" prop="idCard">
                        <el-input type="text" v-model="ruleForm.idCard" clearable />
                    </el-form-item>
                    <el-form-item label="住址" prop="address">
                        <el-input v-model="ruleForm.address" type="textarea" clearable />
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
    </div>

</template>
  
<script setup>
import { ref, reactive,inject } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { Plus, CloseBold } from '@element-plus/icons-vue'
import useStaff from './useStaff'
import request from '../../../../request/request';
import api from '../../../../request/api';
import operation from '../../../../common/util/operation';
import dateUtil from '../../../../common/util/dateUtil';

const refresh = inject("refresh");
const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    name: '',
    age: '',
    sex: '0',
    phone: '',
    idCard: '',
    entryDate:dateUtil.getYMDHMS(new Date()),
    address: '',
})

const close = function(){
    visible.value = false;
}


const addStaff = function(){
    request.post(api.addStaff,{
        shopId:localStorage.getItem("shopId"),
        name: ruleForm.name,
        age: ruleForm.age,
        sex: ruleForm.sex,
        phone: ruleForm.phone,
        idCard: ruleForm.idCard,
        entryDate:ruleForm.entryDate,
        address: ruleForm.address,
    }).then(res =>{
        if(res.data.code === 200){
            operation.success("添加成功");
        }else{
            operation.success("操作失败");
        }
        close();
        refresh();
    })
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      addStaff();
    } else {
        operation.warning("校验失败");
    }
  })
}


</script>
  
<style scoped>



</style>


