import { ref,reactive } from 'vue'
import { ElNotification } from 'element-plus'


export default function(){


    const checkPrice = function (rlue, value, callback) {
        if (value <= 0) {
            callback(new Error('价格输入有误'))
        } else {
            callback();
        }
    }
    const rules = reactive({
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        brand: [{ required: true, message: '请选择品牌', trigger: 'blur' }],
        price: [
            { required: true, message: '请输入价格', trigger: 'blur' },
            { type: 'number', message: '价格必须是一个数字',trigger: 'blur' },
            { validator: checkPrice, trigger: 'blur'  },
        ],
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

    return{
        rules,
        warning,
        resetForm,
    }
}

