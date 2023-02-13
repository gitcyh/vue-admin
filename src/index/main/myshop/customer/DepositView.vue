<template>
    <div>
        <el-dialog v-model="visible" :show-close="false" draggable title="查看押金单" append-to-body>
            <template #header="{ close, titleId, titleClass }">
                <div>
                    <h6 :id="titleId" :class="titleClass">查看押金单</h6>
                    <el-button @click="visible = false" :icon="CloseBold" circle />
                </div>
            </template>
            <div>
                <el-form ref="ruleFormRef" :model="data" label-width="100px">
                    <el-form-item label="创建日期" prop="createTime">
                        <el-input type="text" :value="data.createTime" readonly />
                    </el-form-item>
                    <el-form-item label="押金描述" prop="description">
                        <el-input type="text" :value="data.description" readonly />
                    </el-form-item>
                    <el-form-item label="押金金额" prop="money">
                        <el-input :value="data.money" type="number" style="width:214px"  readonly/>
                    </el-form-item>
                    <el-form-item label="押桶数量" prop="num">
                        <el-input :value="data.num" type="number" style="width:214px"  readonly/>
                    </el-form-item>
                    <el-form-item label="押金状态" prop="state">
                        <el-input :value="useCustomer.getState(data.state)" type="text" style="width:214px"  readonly/>
                    </el-form-item>
                    <el-form-item label="押金单据">
                        <el-image style="width: 100px; height: 100px" :src="getImg()" fit="fill" :preview-src-list="[getImg()]" />
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" :value="data.remark" readonly />
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>

</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import useCustomer from './useCustomer';

const ruleFormRef = ref();
const visible = ref(false);
const props = defineProps({
    data:Object,
})
defineExpose({
    visible
})


const getImg = function(){
    const token = localStorage.getItem("token");
    return "/api/download?id=" + props.data.fileId + "&token=" + token;
}


</script>
  
<style scoped>



</style>


