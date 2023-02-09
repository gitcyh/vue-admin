import { reactive } from 'vue'
import api from '../../../request/api'
import request from '../../../request/request'


const  validatePId = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请选择所属分类'))
    } else {
      if (ruleForm.checkPass !== '') {
        if (!ruleFormRef.value) return
        ruleFormRef.value.validateField('checkPass', () => null)
      }
      callback()
    }
  }

const rules = reactive({
    name: [{ required: true, message: '请输入类别名称', trigger: 'blur' }],
    level: [{ required: true, message: '请选择分类级别', trigger: 'blur' }],
    parentId:[{validator: validatePId,trigger: 'blur'}]
})

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}





export default{
    rules,
    resetForm,

}

