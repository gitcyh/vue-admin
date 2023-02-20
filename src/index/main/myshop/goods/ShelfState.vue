<template>
    <el-dialog v-model="visible" :show-close="false" draggable title="上下架操作" top="2vh">
        <template #header="{ close, titleId, titleClass }">
            <div>
                <h6 :id="titleId" :class="titleClass">上下架操作</h6>
                <el-button @click="close" :icon="CloseBold" circle />
            </div>
        </template>
        <el-form :model="data" label-width="100px">
            <el-form-item label="是否上架" required>
                <el-radio-group v-model="isSale">
                    <el-radio :label="-1">下架</el-radio>
                    <el-radio :label="0">待上架</el-radio>
                    <el-radio :label="1">上架</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">关闭</el-button>
                <el-button type="primary" @click="submitForm()">确认</el-button>
            </span>
        </template>
</el-dialog>
</template>
 
<script setup>
import { ref } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import api from '../../../../request/api';
import request from '../../../../request/request';
import operation from '../../../../common/util/operation';



const visible = ref(false);

defineExpose({
    visible
})

const close = function () {
    visible.value = false;
}

const props = defineProps({
    id: String,
    isSale: Number,
})

const submitForm = function(){
    request.post(api.handleShelf,{
        id:props.id,
        isSale:props.isSale,
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
 
<style scoped></style>


