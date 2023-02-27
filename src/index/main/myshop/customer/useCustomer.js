import { reactive } from 'vue'
import { ElNotification } from 'element-plus'
import options from '../../../../common/data/options'


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

var rules = reactive({
  // phone: [
  //     { required: true, message: '请输入手机号码', trigger: 'blur' },
  //     { validator: checkPhone, }
  // ],
  name: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  settlement: [{ required: true, message: '请选择结算方式', trigger: 'blur' }],
})

var despositRules = reactive({
  description: [{ required: true, message: '请输入押金描述', trigger: 'blur' }],
  money: [{ required: true, message: '请输入押金金额', trigger: 'blur' }],
  num: [{ required: true, message: '请输入押桶数量', trigger: 'blur' }],
  state: [{ required: true, message: '请选择押金状态', trigger: 'blur' }],
})

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

// const options = [
//   {
//       value: 0,
//       label: '水票',
//   },
//   {
//       value: 1,
//       label: '及时支付',
//   },
//   {
//       value: 2,
//       label: '月结',
//   },
//   {
//       value: 3,
//       label: '按季度',
//   },
//   {
//       value: 4,
//       label: '按年',
//   },
//   {
//       value: 5,
//       label: '其他',
//   },
// ]

const getSettlement = function(value){
  let item = options.payOptions.find(item => item.value === value);
  return item?.label || "未知";
}


const states = [
    {
        value: -1,
        label: '已退',
    },
    {
        value: 0,
        label: '未押',
    },
    {
        value: 1,
        label: '已押',
    },
]

const getState = function(value){
  let item = states.find(item => item.value === value);
  return item?.label || "未知";
}


export default {
  rules,
  despositRules,
  warning,
  resetForm,
  options:options.payOptions,
  getSettlement,
  states,
  getState
}