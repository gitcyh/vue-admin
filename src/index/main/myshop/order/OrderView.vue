<template>
    <el-dialog v-model="visible" :show-close="false" draggable title="查看订单">
        <template #header="{ close, titleId, titleClass }">
            <div>
                <h6 :id="titleId" :class="titleClass">查看订单</h6>
                <el-button @click="close" :icon="CloseBold" circle />
            </div>
        </template>
        <div>
            <el-form :model="data" label-width="100px">
                <el-form-item label="订单日期" prop="orderTime">
                    <el-input :value="data.orderTime" type="text" readonly />
                </el-form-item>
                <el-form-item label="选择客户" prop="customerName">
                    <el-input :value="data.customerName" type="text" readonly />
                </el-form-item>
                <el-form-item label="客户名称" prop="customerName" v-show="data.customerId">
                    <el-input :value="data.customerName" readonly />
                </el-form-item>
                <el-form-item label="地址" prop="address" v-show="data.customerId">
                    <el-input :value="data.address" type="text" readonly />
                </el-form-item>
                <el-form-item label="手机号" prop="customerPhone" v-show="data.customerId">
                    <el-input type="text" :value="data.customerPhone" readonly />
                </el-form-item>
                <el-form-item label="选择商品" prop="goodsName">
                    <el-input type="text" :value="data.goodsName" readonly />
                </el-form-item>
                <el-form-item label="规格" prop="specs" v-show="data.goodsId">
                    <el-input :value="data.specs" readonly />
                </el-form-item>
                <el-form-item label="价格" prop="price" v-show="data.goodsId">
                    <el-input :value="data.price" type="text" readonly />
                </el-form-item>
                <el-form-item label="数量" prop="num">
                    <el-input :value="data.num" type="text" readonly />
                </el-form-item>
                <el-form-item label="配送员">
                    <el-input :value="data.senderName" type="text" readonly />
                </el-form-item>
                <el-form-item label="付款方式">
                    <el-input :value="data.payway" type="text" readonly />
                </el-form-item>
                <el-form-item label="配送状态">
                    <el-input :value="data.sendState" type="text" readonly />
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="text" :value="data.remark" readonly />
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup>
import { ref, defineExpose, defineProps } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'


const props = defineProps({
    data: Object
})

const visible = ref(false);
defineExpose({
    visible
})


const close = function () {
    visible.value = false;
}




</script>
  
<style scoped>
</style>


