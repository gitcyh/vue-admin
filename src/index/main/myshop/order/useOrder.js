import { reactive } from 'vue'
import { ElNotification } from 'element-plus'

const warning = () => {
  ElNotification({
    title: 'Warning',
    message: '客户信息有误',
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


const rules = reactive({
  // phone: [
  //   { required: true, message: '请输入手机号码', trigger: 'blur' },
  //   { validator: checkPhone, trigger: 'blur' }
  // ],
  name: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
  //address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
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

