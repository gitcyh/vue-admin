import { reactive } from 'vue'
import useCheck from '../../../../common/check/useCheck'
import request from '../../../../request/request';
import api from '../../../../request/api';



const rules = reactive({
  price: [
    { required: true, message: '请输入进货单价', trigger: 'blur' },
    { validator: useCheck.checkPrice, trigger: 'blur' },
  ],
  num: [
    { required: true, message: '请输入数量', trigger: 'blur' },
    { validator: useCheck.checkPrice, trigger: 'blur' },
  ],
  money: [
    { required: true, message: '请输入进货金额', trigger: 'blur' },
    { validator: useCheck.checkPrice, trigger: 'blur' },
  ],
  instockTime: [{ required: true, message: '请选择进货日期', trigger: 'blur' }],
})


const getStockQuantity = function () {
  return request.post(api.getStockQuantity, {
    shopId: localStorage.getItem("shopId")
  })
}




export default {
  rules,
  getStockQuantity
}

