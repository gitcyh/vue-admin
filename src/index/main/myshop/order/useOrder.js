import { reactive } from 'vue'



const rules = reactive({
  // phone: [
  //   { required: true, message: '请输入手机号码', trigger: 'blur' },
  //   { validator: checkPhone, trigger: 'blur' }
  // ],
  num: [{ required: true, message: '请输入数量', trigger: 'blur' }],
  orderTime: [{ required: true, message: '请选择日期', trigger: 'blur' }],
})



export default {
  rules,
}

