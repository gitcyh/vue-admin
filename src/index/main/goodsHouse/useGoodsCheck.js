import { reactive } from 'vue'

export default function(){

    const rules = reactive({
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        brand: [{ required: true, message: '请选择品牌', trigger: 'blur' }],
    })
    

    const resetForm = (formEl) => {
      if (!formEl) return
      formEl.resetFields()
    }

    return{
        rules,
        resetForm,
    }
}

