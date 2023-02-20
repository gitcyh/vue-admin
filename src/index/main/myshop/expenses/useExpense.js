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
    date: [{ required: true, message: '请选择费用发生时间', trigger: 'blur' }],
    name: [{ required: true, message: '请输入费用名称', trigger: 'blur' }],
    amount: [
        { required: true, message: '请输入成本价', trigger: 'blur' },
        { type: 'number', message: '价格必须是一个数字', trigger: 'blur' },
        { validator: checkPrice, trigger: 'blur' },
    ],
})



export default {
    rules,
}

