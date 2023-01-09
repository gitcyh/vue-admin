
const checkPhone = function (rlue, value, callback) {
  if (value.match(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/)) {
    callback()
  } else {
    callback(new Error('请输入正确的手机号码'))
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


const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

export default {
  resetForm,
  checkPhone,
  checkIDCard
}

