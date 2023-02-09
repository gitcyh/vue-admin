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
                <el-form ref="ruleFormRef" :model="ruleForm"  label-width="100px">
                    <el-form-item label="日期" prop="date">
                        <el-date-picker v-model="date" type="datetime" placeholder="请选择费用发生时间" style="width:100%" />
                    </el-form-item>
                    <el-form-item label="费用名称" prop="name">
                        <el-input type="text" v-model="ruleForm.name" clearable  />
                    </el-form-item>
                    <el-form-item label="支出类别" prop="name">
                        <ExpensesCat :category="ruleForm.category"></ExpensesCat>
                    </el-form-item>
                    <el-form-item label="费用描述" prop="description">
                        <el-input v-model="ruleForm.description" type="text"  />
                    </el-form-item>
                    <el-form-item label="金额" prop="amount">
                        <el-input v-model="ruleForm.amount" type="number"  />
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
import { CloseBold,Plus } from '@element-plus/icons-vue'

import ExpensesCat from './ExpensesCat.vue';




const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    date: '2016-05-03',
    category: '0',
    name: '农夫山泉纯净水',
    description: '18L/桶',
    amount: 200,
    remark: '无',
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


