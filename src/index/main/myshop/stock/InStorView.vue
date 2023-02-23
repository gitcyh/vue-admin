<template>
    <div>
        <el-dialog v-model="visible" :show-close="false" draggable title="查看入库" append-to-body>
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">查看入库</h6>
                    <el-button @click="close" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="ruleForm"  label-width="100px">
                    <el-form-item label="入库日期" prop="date">
                        <el-input type="text" :value="data.instockTime" readonly />
                    </el-form-item>
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input type="text" :value="data.goodsName" readonly />
                    </el-form-item>
                    <el-form-item label="进货单价" prop="price">
                        <el-input :value="data.price" type="number"  readonly />
                    </el-form-item>
                    <el-form-item label="进货数量" prop="num">
                        <el-input :value="data.num" type="number"  readonly />
                    </el-form-item>
                    <el-form-item label="进货金额" prop="money">
                        <el-input :value="data.money" type="number"  readonly/>
                    </el-form-item>
                    <el-form-item label="回桶数量" prop="bucket">
                        <el-input :value="data.bucket" type="number" readonly />
                    </el-form-item>
                    <el-form-item label="进货单据">
                        <el-image style="width: 100px; height: 100px" :src="getImgSrc()" fit="fill" :preview-src-list="[getImgSrc()]" />
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" :value="data.remark" readonly />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="close">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>

</template>
  
<script setup>
import { ref } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'


const props = defineProps({
    data:Object,
})



const ruleFormRef = ref();
const visible = ref(false);
defineExpose({
    visible
})

const close = function(){
    visible.value = false;
}

const getImgSrc = function () {
    const token = localStorage.getItem("token");
    return "/api/download?id=" + props.data.imgId + "&token=" + token;
}


</script>
  
<style scoped>



</style>


