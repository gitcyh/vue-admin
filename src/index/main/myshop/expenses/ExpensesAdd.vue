<template>
    <div>
        <el-button :icon="Plus" type="primary" size="small" @click="visible = true">添加支出</el-button>
        <el-dialog v-model="visible" :show-close="false" draggable title="添加支出">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">添加支出</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="useExpense.rules" label-width="100px">
                    <el-form-item label="日期" prop="date">
                        <el-date-picker v-model="ruleForm.date" :value-formate="YYYY-MM-DD" type="date"
                            placeholder="请选择费用发生时间" style="width:100%" />
                    </el-form-item>
                    <el-form-item label="费用名称" prop="name">
                        <el-input type="text" v-model="ruleForm.name" placeholder="请输入费用名称" clearable />
                    </el-form-item>
                    <ExpenseCatSelect :expenseCat="ruleForm.categoryId" :changeValue="changeValue" required>
                    </ExpenseCatSelect>
                    <el-form-item label="金额" prop="amount">
                        <el-input v-model.number="ruleForm.amount" type="number" />
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
import { CloseBold, Plus } from '@element-plus/icons-vue'
import ExpenseCatSelect from '../../../../common/components/select/ExpenseCatSelect.vue';
import useExpense from './useExpense';
import request from '../../../../request/request';
import api from '../../../../request/api';
import dateUtil from '../../../../common/util/dateUtil'
import operation from '../../../../common/util/operation';




const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    date: new Date(),
    categoryId: null,
    name: '',
    amount: 0,
    remark: '',
})

const close = function(){
    visible.value = false;
}

const changeValue = function (value) {
    ruleForm.categoryId = value;
}

const addPayout = function () {
    request.post(api.addPayout, {
        shopId:localStorage.getItem("shopId"),
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
            addPayout();
        } else {
            operation.warning("校验失败");
        }
    })
}


</script>
  
<style scoped>
</style>


