<template>
    <el-upload :action="uploadUrl" :headers="headers" :data="data" :show-file-list="false" :on-success="success"
        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
        <el-button size="small" :icon="Upload" type="success">导入</el-button>
    </el-upload>
</template>

<script  setup>
import { defineProps } from 'vue';
import { Upload } from '@element-plus/icons-vue'


defineProps({
    uploadUrl:String,
})


const headers = {
    token:localStorage.getItem("token")
}

const data = {
    shopId:localStorage.getItem("shopId")
}

const success = function(res,file,fileList){
    console.log(res,file,fileList)
}



</script>
  