<template>
    <el-upload ref="upload" class="upload-demo" :limit="1" :on-exceed="handleExceed"
        accept="image/jpeg,image/jpg,image/png" action="/api/upload" :on-preview="handlePreview" :onChange="onChange"
        v-model:file-list="fileList" :on-remove="handleRemove" list-type="picture-card" :auto-upload="false">
        <template #trigger>
            <el-button type="primary">请选择文件</el-button>
        </template>
        <span class="el-upload__tip">jpg/jpeg/png 文件小于2M</span>
    </el-upload>
    <el-dialog v-model="dialogVisible" style="overflow: hidden;" append-to-body>
        <el-image :src="dialogImageUrl" alt="Preview Image" fit="scale-down" />
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import operation from '../util/operation';
import request from '../../request/request';

const props = defineProps({
    fileList: {
        type: Array,
        default: []
    },
})



const upload = ref();
const dialogImageUrl = ref('')
const dialogVisible = ref(false)


const submitUpload = () => {
    //upload.value.submit();
    return new Promise((resolve, reject) => {
        if (props.fileList[0] && props.fileList[0].raw) {
            let formData = new FormData();
            formData.append("file", props.fileList[0].raw);//拿到存在fileList的文件存放到formData中
            request.post("/upload", formData, {
                "Content-Type": "multipart/form-data;charset=utf-8"
            }).then(res => {
                if (res.data.code === 200) {
                    resolve(res);
                } else {
                    reject(res)
                }
            })
        }else{
            resolve({
                data:{
                    data:{
                        fileId:"",
                    }
                }
            });
        }

    })
}
defineExpose({
    submitUpload
})


const handleExceed = (files) => {
    upload.value.clearFiles()
    const file = files[0];
    file.uid = genFileId()
    upload.value.handleStart(file)
}

const handleRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const handlePreview = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url;
    dialogVisible.value = true
}

const onChange = function (file, fileList) {
    const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1);
    const whiteList = ['png', 'jpg', 'jpeg'];
    const isSuffix = whiteList.indexOf(fileSuffix.toLowerCase()) === -1;
    const isLt2M = file.size / 1024 / 1024 > 2
    console.log('this.fileList:', this.fileList)
    if (isSuffix) {
        operation.warning('上传文件只能是 png、jpg、jpeg格式');
        const currIdx = fileList.indexOf(file)
        fileList.splice(currIdx, 1)
        return;
    }
    if (isLt2M) {
        operation.warning('上传文件大小不能超过 2MB')
        const currIdx = fileList.indexOf(file)
        this.fileList.splice(currIdx, 1)
        return;
    }
}


</script>

<style scoped>
.el-upload__tip {
    padding-left: 10px;
}
</style>
