<template>
    <div>
        <el-dialog v-model="visible" :show-close="false" draggable title="修改支出">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">修改支出</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="useExpense.rules"  label-width="100px">
                    <el-form-item label="日期" prop="date">
                        <el-date-picker v-model="ruleForm.date" type="date" placeholder="请选择费用发生时间" style="width:100%" />
                    </el-form-item>
                    <el-form-item label="费用名称" prop="name">
                        <el-input type="text" v-model="ruleForm.name" clearable  />
                    </el-form-item>
                    <ExpenseCatSelect v-model="ruleForm.categoryId" required></ExpenseCatSelect>
                    <el-form-item label="金额" prop="amount">
                        <el-input v-model.number="ruleForm.amount" type="number"  />
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
import { ref, reactive, watch } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import ExpenseCatSelect from '../../../../common/components/select/ExpenseCatSelect.vue';
import request from '../../../../request/request';
import api from '../../../../request/api';
import operation from '../../../../common/util/operation';
import useExpense from './useExpense';
import dateUtil from '../../../../common/util/dateUtil';


const props = defineProps({
    id:String
})


const ruleFormRef = ref();
const visible = ref(false);
defineExpose({
    visible
})
const ruleForm = reactive({
    id:'',
    date: '',
    categoryId: null,
    name: '',
    amount: 0,
    remark: '',
})


watch(visible,(newValue,oldValue)=>{
    if(newValue){
        request.get(api.getPayout,{
            params:{
                id:props.id,
            }
        }).then(res =>{
            if(res.data.code === 200){
                const {id,date,categoryId,name,amount,remark} = res.data.data.data;
                ruleForm.id = id;  
                ruleForm.date = date;
                ruleForm.categoryId = categoryId;
                ruleForm.name = name;
                ruleForm.amount = amount;
                ruleForm.remark = remark;
            }else{
                operation.warning("获取数据失败")
            }
        })
    }
})

const close = function(){
    visible.value = false;
}

const updateExpense = function(){
    request.post(api.updatePayout, {
        id:ruleForm.id,
        date: dateUtil.getYMDHMS(ruleForm.date),
        categoryId: ruleForm.categoryId,
        name: ruleForm.name,
        amount: ruleForm.amount,
        remark: ruleForm.remark,
    }).then(res =>{
        if(res.data.code === 200){
            operation.success();
        }else{
            operation.warning();
        }
        close();
    })
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid && ruleForm.categoryId) {
        updateExpense();
    } else {
        operation.warning("校验失败");
    }
  })
}


</script>
  
<style scoped>



</style>


