<template>
    <el-upload ref="upload" class="upload-demo" :limit="1" :on-exceed="handleExceed" accept="image/jpeg,image/jpg,image/png"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :on-preview="handlePreview"
        :on-remove="handleRemove" list-type="picture" :auto-upload="false">
        <template #trigger>
            <el-button type="primary">请选择文件</el-button>
        </template>
        <span class="el-upload__tip">jpg/jpeg/png 文件小于2M</span>
    </el-upload>
</template>
  
<script setup>
import { ref } from 'vue'
import { genFileId } from 'element-plus'

const upload = ref();

const submitUpload = () => {
  upload.value.submit()
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

const handlePreview = (file) => {
    console.log(file)
}
</script>

<style scoped>
.el-upload__tip{
    padding-left:10px;
}
</style>
  