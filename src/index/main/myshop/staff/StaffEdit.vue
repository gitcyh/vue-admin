<template>
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
                            <el-radio :label="0">男</el-radio>
                            <el-radio :label="1">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input type="text" v-model.number="ruleForm.age" clearable />
                    </el-form-item>
                    <el-form-item label="入职日期">
                        <el-date-picker v-model="ruleForm.entryDate" type="date"  value-format="YYYY-MM-DD HH:mm:ss"  placeholder="请选择日期" clearable style="width: 100%"/>
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

</template>
  
<script setup>
import { ref, reactive,defineProps,watch } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import useStaff from './useStaff'
import request from '../../../../request/request';
import api from '../../../../request/api';
import operation from '../../../../common/util/operation';

const props = defineProps({
    id:String,
})


const ruleFormRef = ref();
const visible = ref(false);
defineExpose({
    visible
})

const close = function(){
    visible.value = false;
}
const ruleForm = reactive({
    id:'',
    name: '',
    age: 0,
    sex: 0,
    phone: '',
    idCard: '',
    address: '',
    entryDate:'',
})

watch(visible,(newValue,oldValue)=>{
    request.get(api.getStaff,{
        params:{
            id:props.id
        }
    }).then(res =>{
        if(res.data.code === 200){
            const {id,name,age,sex,phone,idCard,address,entryDate} = res.data.data.data;
            ruleForm.id = id;
            ruleForm.name = name;
            ruleForm.age = age;
            ruleForm.sex = sex;
            ruleForm.phone = phone;
            ruleForm.idCard = idCard;
            ruleForm.address = address;
            ruleForm.entryDate = entryDate;
        }
    })
})

const updateStaff = function(){
    request.post(api.updateStaff,{
        id: ruleForm.id,
        name: ruleForm.name,
        age: ruleForm.age,
        sex: ruleForm.sex,
        phone: ruleForm.phone,
        idCard: ruleForm.idCard,
        entryDate:ruleForm.entryDate,
        address: ruleForm.address,
    }).then(res =>{
        if(res.data.code === 200){
            operation.success("修改成功");
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
        updateStaff();
    } else {
        operation.warning("校验失败");
    }
  })
}


</script>
  
<style scoped>

</style>


