import { ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import request from '../../../../request/request'
import api from '../../../../request/api'


const checkPrice = function (rlue, value, callback) {
    if (value < 0) {
        callback(new Error('价格输入有误'))
    } else {
        callback();
    }
}
const rules = reactive({
    name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
    brand: [{ required: true, message: '请选择品牌名称', trigger: 'blur' }],
    costPrice: [
        { required: true, message: '请输入成本价', trigger: 'blur' },
        { type: 'number', message: '价格必须是一个数字', trigger: 'blur' },
        { validator: checkPrice, trigger: 'blur' },
    ],
    deliveryPrice: [
        { required: true, message: '请输入配送价', trigger: 'blur' },
        { type: 'number', message: '价格必须是一个数字', trigger: 'blur' },
        { validator: checkPrice, trigger: 'blur' },
    ],
    selfPrice: [
        { required: true, message: '请输入自提价', trigger: 'blur' },
        { type: 'number', message: '价格必须是一个数字', trigger: 'blur' },
        { validator: checkPrice, trigger: 'blur' },
    ],
    categoryId: [{ required: true, message: '请选择分类', trigger: 'blur' }],
    specs: [{ required: true, message: '请输入规格', trigger: 'blur' }],
})

const warning = () => {
    ElNotification({
        title: 'Warning',
        message: '商品信息有误',
        type: 'warning',
    })
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}

const getGoods = function(id){
    return request.get(api.getGoods, {
        params:{
            id: id,
        }
    })
}


const getapplyState = function(value){
    if(value === -1){
        return "违规"
    }else if(value === 0){
        return "审核中"
    }else if(value === 1){
        return "已审核"
    }else{
        return "审核中"
    }
}

const getSaleState = function(value){
    if(value === 1){
        return "已上架"
    }else if(value === 0){
        return "待上架"
    }else if(value === -1){
        return "已下架"
    }else{
        return "待上架"
    }
}

const getSaleOperation = function(value){
    if(value === 1){
        return "下架"
    }else if(value === 0){
        return "待上架"
    }else if(value === -1){
        return "上架"
    }else{
        return "待上架"
    }
}


export default {
    rules,
    warning,
    resetForm,
    getGoods,
    getapplyState,
    getSaleState,
    getSaleOperation
}

