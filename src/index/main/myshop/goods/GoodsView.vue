<template>
    <el-dialog v-model="visible" :show-close="false" draggable title="查看商品" top="2vh">
           <template #header="{ close, titleId, titleClass }">
               <div>
                   <h6 :id="titleId" :class="titleClass">查看商品</h6>
                   <el-button @click="close" :icon="CloseBold" circle />
               </div>
           </template>
           <div style="overflow-y: auto;height: 80vh;">
               <el-form ref="ruleFormRef" :model="data" label-width="100px">
                    <el-form-item label="商品名称">
                       <el-input :value="data.goodsName" readonly />
                    </el-form-item>
                    <el-form-item label="品牌名称">
                        <el-input type="text" :value="data.brandName" readonly />
                    </el-form-item>
                    <el-form-item label="商品分类">
                        <el-input type="text" :value="data.brandName" readonly />
                    </el-form-item>
                    <el-form-item label="规格">
                        <el-input type="text" :value="data.specs" readonly />
                    </el-form-item>
                    <el-form-item label="成本价">
                        <el-input :value="data.costPrice" readonly />
                    </el-form-item>
                    <el-form-item label="配送价">
                        <el-input :value="data.deliveryPrice" readonly />
                    </el-form-item>
                    <el-form-item label="自提价">
                        <el-input :value="data.selfPrice" readonly />
                    </el-form-item>
                    <el-form-item label="审核状态" >
                        <el-input type="text" style="width: 200px;" :value="useGoods.getapplyState(data.goodsStatus)" readonly /> <span v-if="data.goodsStatus === -1" style="color:red">原因描述：{{ data.applyDesc }}</span>
                    </el-form-item>
                    <el-form-item label="商品图片">
                        <el-image style="width: 100px; height: 100px" :src="getImgSrc()" fit="fill"
                            :preview-src-list="[getImgSrc()]" />
                    </el-form-item>
                    <el-form-item label="商品描述">
                        <div style="overflow: auto;height: 400px;width: 100%;" v-html="data.goodsDesc"></div>
                    </el-form-item>
               </el-form>
           </div>
           <template #footer>
               <span class="dialog-footer">
                   <el-button @click="close">关闭</el-button>
               </span>
           </template>
   </el-dialog>
</template>
 
<script setup>
import { ref } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold } from '@element-plus/icons-vue'
import jwtUtil from '../../../../common/util/jwtUtil';
import useGoods from './useGoods';



const visible = ref(false);

defineExpose({
    visible
})

const close = function(){
    visible.value = false;
}

const props = defineProps({
   data:Object,
})


const getImgSrc = function(){
    return jwtUtil.getImgUrl(props.data.imgId)
}


</script>
 
<style scoped>
.my-header {
   height: 30px;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
}
</style>


