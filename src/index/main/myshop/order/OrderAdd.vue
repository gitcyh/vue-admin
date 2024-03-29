<template>
    <div>
        <el-button :icon="Plus" type="primary" size="small" @click="visible = true">添加订单</el-button>
        <el-dialog v-model="visible" :show-close="false" draggable title="添加订单">
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">添加订单</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="useOrder.rules" label-width="100px"
                    class="demo-ruleForm">
                    <el-form-item label="订单日期" prop="orderTime">
                        <el-date-picker v-model="ruleForm.orderTime" 
                         type="datetime" placeholder="请选择日期" clearable  style="width: 100%" />
                    </el-form-item>
                    <el-form-item label="选择客户"  required>
                        <CustomerSelectVue :customerId="ruleForm.customerId" :changeCustomer="changeCustomer"></CustomerSelectVue>
                    </el-form-item>
                    <el-form-item label="客户名称" prop="customerName" v-show="ruleForm.customerId" >
                        <el-input v-model="ruleForm.customerName" readonly />
                    </el-form-item>
                    <el-form-item label="地址" prop="address" v-show="ruleForm.customerId" >
                        <el-input v-model="ruleForm.address" type="text" readonly />
                    </el-form-item>
                    <el-form-item label="手机号" prop="customerPhone" v-show="ruleForm.customerId" >
                        <el-input type="text" v-model="ruleForm.customerPhone" clearable />
                    </el-form-item>
                    <el-form-item label="选择商品" required>
                        <GoodsSelect :goodsId="ruleForm.goodsId" :changeGoods="changeGoods"></GoodsSelect>
                    </el-form-item>
                    <el-form-item label="规格" prop="specs" v-show="ruleForm.goodsId">
                        <el-input v-model="ruleForm.specs" readonly />
                    </el-form-item>
                    <el-form-item label="价格" prop="price" v-show="ruleForm.goodsId">
                        <el-input-number v-model="ruleForm.price" :min="0" size="small" :controls="false" style="width: 100%" />
                    </el-form-item>
                    <el-form-item label="数量" prop="num">
                        <el-input-number v-model="ruleForm.num" :min="0" size="small" :controls="false" style="width: 100%" />
                    </el-form-item>
                    <el-form-item label="选择配送员" required>
                        <SenderSelect v-model:senderId="ruleForm.senderId"></SenderSelect>
                    </el-form-item>
                    <PayWayVue v-model:payway="ruleForm.payway" required></PayWayVue>
                    <SendStateVue v-model:sendState="ruleForm.sendState" required></SendStateVue>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="text" v-model="ruleForm.remark" clearable />
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
import { ref, reactive,inject } from 'vue'
import SendStateVue from '../../../../common/components/select/SendState.vue'
import PayWayVue from '../../../../common/components/select/PayWay.vue'
import SenderSelect from '../../../../common/components/select/SenderSelect.vue'
import { ElButton, ElDialog } from 'element-plus'
import { Plus, CloseBold } from '@element-plus/icons-vue'
import request from '../../../../request/request'
import api from '../../../../request/api'
import useOrder from './useOrder'
import operation from '../../../../common/util/operation'
import CustomerSelectVue from '../../../../common/components/select/CustomerSelect.vue'
import GoodsSelect from '../../../../common/components/select/GoodsSelect.vue'
import jwtUtil from '../../../../common/util/jwtUtil'
import dateUtil from '../../../../common/util/dateUtil'


const refresh = inject("refresh");

const ruleFormRef = ref();
const visible = ref(false);
const ruleForm = reactive({
    userId: jwtUtil.getValue("userid"),
    shopId: localStorage.getItem("shopId"),
    goodsId: null,
    customerId: null,
    orderTime: new Date(),
    customerName: '',
    address: '',
    customerPhone: '',
    goodsName: '',
    specs: '',
    price: 0,
    num: 0,
    payway: null,
    sendState: 0,
    senderId: '',
    remark: '',
    style: {
        'font-family': '微软雅黑',
        'font-size': "14px",
        'font-weight': 'normal',
        'background-color': 'rgba(255,255,255,1)',
        color: 'rgba(0,0,0,1)',
        'font-style': 'normal',
    }
})

const close = function () {
    visible.value = false;
}

const changeCustomer = function(data){
    ruleForm.customerId = data.value;
    ruleForm.customerName = data.name;
    ruleForm.address = data.label;
    ruleForm.customerPhone = data.phone;
}
const changeGoods = function(data){
    ruleForm.goodsId = data.value;
    ruleForm.goodsName = data.label;
    ruleForm.specs = data.specs;
    ruleForm.price = data.deliveryPrice;
}

const addOrder = function () {
    request.post(api.sysAddOrder, {
        userId: ruleForm.userId,
        shopId: ruleForm.shopId,
        goodsId: ruleForm.goodsId,
        customerId: ruleForm.customerId,
        orderTime: dateUtil.getYMDHMS(ruleForm.orderTime),
        customerName: ruleForm.customerName,
        address: ruleForm.address,
        customerPhone: ruleForm.customerPhone,
        goodsName: ruleForm.goodsName,
        specs: ruleForm.specs,
        price: ruleForm.price,
        num: ruleForm.num,
        payway: ruleForm.payway,
        sendState: ruleForm.sendState,
        senderId: ruleForm.senderId,
        remark: ruleForm.remark,
        style:JSON.stringify(ruleForm.style),
    }).then(res => {
        if (res.data.code === 200) {
            operation.success();
        } else {
            operation.warning();
        }
        close();
        refresh();
    })
}
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            addOrder();
        } else {
            operation.warning("校验失败");
        }
    })
}


</script>
  
<style scoped></style>


