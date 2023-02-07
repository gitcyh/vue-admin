import { reactive } from 'vue'
import api from '../../../request/api'
import request from '../../../request/request'

const rules = reactive({
    name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
    specs: [{ required: true, message: '请输入商品规格', trigger: 'blur' }],
    brand: [{ required: true, message: '请选择品牌名称', trigger: 'blur' }],
})

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}

const getId = function(src){
    return src.substr(src.lastIndexOf("=")+1);
}

// 增加之前从数据库删除文本编辑器删除的图片
const beforeAdd = function(imageList1,editorRef){
    const currentImageList = editorRef.value.editorRef.getElemsByType('image').map(item => getId(item.src));
    const list = [];
    for(let i=0;i<imageList1.length;i++){
        let item = imageList1[i];
        if(currentImageList.indexOf(item) < 0){
            list.push(item)
        }
    }
    if(list.length > 0){
        request.post(api.deleteFile, {
            list:list,
        })
    }
}

const getGoods = function(id){
    return request.get(api.sysGetGoods, {
        params:{
            id: id,
        }
    })
}


export default{
    rules,
    resetForm,
    getId,
    beforeAdd,
    getGoods
}

