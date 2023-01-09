import { reactive } from 'vue'

export default function(){

    const rules = reactive({
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        specs: [{ required: true, message: '请输入商品规格', trigger: 'blur' }],
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

