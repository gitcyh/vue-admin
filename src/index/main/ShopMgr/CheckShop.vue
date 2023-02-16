<template>
    <el-dialog top="2vh" v-model="visible" :show-close="false" draggable title="店铺审核">
        <template #header="{ close, titleId, titleClass }">
            <div>
                <h6 :id="titleId" :class="titleClass">店铺审核</h6>
                <el-button @click="close" :icon="CloseBold" circle />
            </div>
        </template>
        <el-form :model="data" label-width="100px" class="demo-ruleForm">
            <el-form-item label="审核状态">
                <el-radio-group v-model="data.applyStatus">
                    <el-radio :label="-1">审核不通过</el-radio>
                    <el-radio :label="0">待审核</el-radio>
                    <el-radio :label="1">审核通过</el-radio>
            </el-radio-group>
            </el-form-item>
            <el-form-item label="原因描述" required>
                <el-input type="text" v-model="data.applyDesc" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">关闭</el-button>
                <el-button  type="primary"  @click="submit()">审核</el-button>
            </span>
        </template>
    </el-dialog>


</template>
  
<script setup>
import { ref } from 'vue'
import {CloseBold} from "@element-plus/icons-vue";
import request from '../../../request/request';
import api from '../../../request/api';
import operation from '../../../common/util/operation';

const props = defineProps({
    data: Object,
})


const visible = ref(false);
defineExpose({
    visible
})

const close = function(){
    visible.value = false;
}

const submit = function(){
    request.post(api.checkShop,{
        id:props.data.id,
        applyStatus:props.data.applyStatus,
        applyDesc:props.data.applyDesc
    }).then(res =>{
        if(res.data.code === 200){
            operation.success();
        }else{
            operation.warning();
        }
        close();
    })
}



</script>
  
<style scoped>


</style>


