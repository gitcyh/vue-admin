<template>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
            :mode="mode" />
        <Editor style="height: 400px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
            :mode="mode" @onCreated="handleCreated" @onChange="handleChange" />
    </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'


const mode = 'default'; // 或 'simple'
const props = defineProps({
    valueHtml: String,// 内容 HTML
    pushImageList:Function,// 添加所有上传的文件集合
    changeValue: Function
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

defineExpose({
    editorRef
})

const toolbarConfig = {}
const editorConfig = {
    MENU_CONF: {
        uploadImage: {
            // form-data fieldName ，默认值 'wangeditor-uploaded-image'
            fieldName: 'file',
            server: '/api/editor/upload',
            headers: {
                token: localStorage.getItem("token")
            },
            maxFileSize: 1 * 1024 * 1024, // 1M
            // 最多可上传几个文件，默认为 100
            maxNumberOfFiles: 50,
            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: ['image/*'],
            // 小于该值就插入 base64 格式（而不上传），默认为 0
            base64LimitSize: 5 * 1024, // 5kb
           
            // 单个文件上传成功之后
            onSuccess(file, res) {
                console.log(`${file.name} 上传成功`, res)
            },
            // 单个文件上传失败
            onFailed(file, res) {
                console.log(`${file.name} 上传失败`, res)
            },

            // 上传错误，或者触发 timeout 超时
            onError(file, err, res) {
                console.log(`${file.name} 上传出错`, err, res)
            },
        },
        insertImage:{
            // 使用 onInsertedImage 来收集所有上传或者插入的图片，记录为 imageList1
            // 最后保存编辑器内容之前，使用 editor.getElemsByType('image') 获取当前编辑器的所有图片，记录为 imageList2
            // 对比 imageList1 和 imageList2 ，两者的差异，就是删除过的图
            onInsertedImage(imageNode) {
                if (imageNode == null) return
                const { src, alt, type, href } = imageNode;
                props.pushImageList(src);
                console.log('inserted image', src, alt, type, href)
            },
        },
        uploadVideo: {
            // form-data fieldName ，默认值 'wangeditor-uploaded-image'
            fieldName: 'file',
            server: '/api/editor/upload',
            headers: {
                token: localStorage.getItem("token")
            },
            maxFileSize: 100 * 1024 * 1024, // 100M
            // 最多可上传几个文件，默认为 100
            maxNumberOfFiles: 50,
            // 选择文件时的类型限制，默认为 ['video/*'] 。如不想限制，则设置为 []
            allowedFileTypes: ['video/*'],
            // 单个文件上传成功之后
            onSuccess(file, res) {
                console.log(`${file.name} 上传成功`, res)
            },
            // 单个文件上传失败
            onFailed(file, res) {
                console.log(`${file.name} 上传失败`, res)
            },

            // 上传错误，或者触发 timeout 超时
            onError(file, err, res) {
                console.log(`${file.name} 上传出错`, err, res)
            },
        }
    }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

const handleChange = (editor) => {
    props.changeValue(editor.getHtml());
}

</script>