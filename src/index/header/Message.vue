<template>
    <div class="header-message">
        <el-badge is-dot class="item" @click="visible = true">
            <el-icon size="24">
                <Bell />
            </el-icon>
        </el-badge>
    </div>
    <el-dialog v-model="visible" :show-close="false" draggable title="系统消息">
        <template #header="{ close, titleId, titleClass }">
            <div>
                <h6 :id="titleId" :class="titleClass">系统消息</h6>
                <el-button @click="visible = false" :icon="CloseBold" circle />
            </div>
        </template>
        <div>
            暂无系统消息
        </div>
    </el-dialog>

</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CloseBold,Bell } from '@element-plus/icons-vue'


const visible = ref(false);

</script>
  
<style scoped>
.header-message {
  cursor: pointer;
  width: 40px;
}


</style>


