<template>
    <el-button :icon="View" color="#626aef" size="small" @click="visible = true">预览</el-button>
    <el-dialog style="z-index:99" v-model="visible" :show-close="false" title="预览" :fullscreen="true"
        append-to-body>
        <template #header="{ close, titleId, titleClass }">
            <div>
                <h6 :id="titleId" :class="titleClass">预览</h6>
                <el-button @click="close" :icon="CloseBold" circle />
            </div>
        </template>
        <div v-html="data"></div>
    </el-dialog>
</template>
 
<script setup>
import { ref } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold, View } from '@element-plus/icons-vue'

const visible = ref(false);



const props = defineProps({
    data: String,
})



</script>
 
<style scoped>
</style>


