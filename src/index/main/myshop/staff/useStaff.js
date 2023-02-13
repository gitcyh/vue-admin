import { reactive } from 'vue'
import { ElNotification } from 'element-plus'

const warning = () => {
    ElNotification({
        title: 'Warning',
        message: '员工信息有误',
        type: 'warning',
    })
}

const checkPhone = function (rlue, value, callback) {
    if (value.match(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/)) {
        callback()
    } else {
        callback(new Error('请输入正确的手机号码'))
    }
}

const checkAge = function (rlue, value, callback) {
    if (value > 120) {
        callback(new Error('年龄输入错误'))
    } else {
        callback();
    }
}

const checkIDCard = function (rlue, value, callback) {
    const reg = /^[1-8][1-7]\d{4}(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dX]$/;
    if (reg.test(value) === false) {
        callback(new Error('请输入正确格式的身份证号码'))
    } else {
        callback()
    }
}

const rules = reactive({
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
    age: [
        { required: true, message: '请输入年龄', trigger: 'blur' },
        { type: 'number', message: '年龄必须是一个数字', trigger: 'blur' },
        { validator: checkAge, trigger: 'blur' }
    ],
    // phone: [
    //     { required: true, message: '请输入手机号码', trigger: 'blur' },
    //     { validator: checkPhone, trigger: 'blur' }
    // ],
    // idCard: [
    //     { required: true, message: '请输入身份证号码', trigger: 'blur' },
    //     { validator: checkIDCard, trigger: 'blur' }
    // ],
    // address: [{ required: true, message: '请输入住址', trigger: 'blur' }],
    entryDate: [{ required: true, message: '请选择入职日期', trigger: 'blur' }],
})

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}

export default {
    rules,
    warning,
    resetForm
}

