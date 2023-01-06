import { reactive } from 'vue'

const checkPhone = function (rlue, value, callback) {
  if (value.match(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/)) {
    callback()
  } else {
    callback(new Error('请输入正确的手机号码'))
  }
}


const rules = reactive({
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { validator: checkPhone, trigger: 'blur' }
  ],
  // IDCard: [
  //   { required: true, message: '请输入身份证号码', trigger: 'blur' },
  //   { validator: checkIDCard, trigger: 'blur' }
  // ],
  address: [{ required: true, message: '请输入住址', trigger: 'blur' }],
})

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

export default {
  rules,
  resetForm,
  checkPhone
}

