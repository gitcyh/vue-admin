<template>
    <div>
        <el-button type="primary" size="small" @click="visible = true">添加押金单</el-button>
        <el-dialog v-model="visible" :show-close="false" draggable title="添加押金单" append-to-body="true">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">添加押金单</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="useCustomerCheck.rules" label-width="100px">
                    <el-form-item label="押金描述" prop="descrition">
                        <el-input type="textarea" v-model="ruleForm.descrition" clearable />
                    </el-form-item>
                    <el-form-item label="押金金额" prop="money">
                        <el-input v-model="ruleForm.money" type="number" style="width:214px" />
                    </el-form-item>
                    <el-form-item label="押桶数量" prop="num">
                        <el-input v-model="ruleForm.num" type="number" style="width:214px" />
                    </el-form-item>
                    <DepositState />
                    <el-form-item label="押金单据">
                        <Upload :fileList="fileList"/>
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
import { CloseBold } from '@element-plus/icons-vue'
import UseCustomerCheck from './useCustomerCheck'
import Upload from '../../../../common/components/Upload.vue';
import DepositState from './DepositState.vue';

let useCustomerCheck = UseCustomerCheck();

const fileList = ref([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  }
])

const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    money: '',
    num: 0,
    descrition: '',
    remark:'',
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


