<template>
    <el-dialog v-model="visible" :show-close="false" draggable title="修改订单">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">修改订单</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="useOrderCheck.rules" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="日期" prop="date">
                        <el-date-picker v-model="data.date" type="datetime"  label="请选择日期"  placeholder="请选择日期" clearable style="width: 100%"/>
                    </el-form-item>
                    <el-form-item label="客户名称" prop="name">
                        <el-input v-model="data.name" clearable />
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="data.address" type="text" clearable />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone">
                        <el-input type="text" v-model="data.phone" clearable />
                    </el-form-item>
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input v-model="data.goodsName"  clearable />
                    </el-form-item>
                    <el-form-item label="规格" prop="specs">
                        <el-input v-model="data.specs"  clearable />
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <el-input-number v-model="data.price" :min="0"  size="small" :controls="false" style="width: 214px"/>
                    </el-form-item>
                    <el-form-item label="数量" prop="num">
                        <el-input-number v-model="data.num" :min="0"  size="small" :controls="false" style="width: 214px"/>
                    </el-form-item>
                    <PayWayVue :payway="ruleForm.payway"></PayWayVue>
                    <SendStateVue :sendState="ruleForm.sendState"></SendStateVue>
                    <SenderVue :sender="ruleForm.sender"></SenderVue>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="text" v-model="data.remark" clearable />
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

</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import SendStateVue from './SendState.vue'
import PayWayVue from './PayWay.vue'
import SenderVue from './Sender.vue'
import { Plus, CloseBold } from '@element-plus/icons-vue'
import UseOrderCheck from './useOrderCheck'
let useOrderCheck = UseOrderCheck();

const props = defineProps({
    data:Object,
})

const ruleFormRef = ref();
const visible = ref(false);
defineExpose({
    visible
})
const ruleForm = reactive({
    date:'',
    name: '',
    address: '',
    phone: '',
    goodsName:'',
    specs:'',
    price:0,
    num:0,
    payway:'微信支付',
    sendState:'0',
    sender:'配送员',
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


