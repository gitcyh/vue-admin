import { reactive } from 'vue'
import useCheck from '../../../../common/check/useCheck'



const rules = reactive({
    shopName: [{ required: true, message: '请输入店铺名称', trigger: 'blur' }],
    shopAddress: [{ required: true, message: '请输入店铺地址', trigger: 'blur' }],
    shopTel: [{ required: true, message: '请输入店铺电话', trigger: 'blur' }],
    shopkeeper: [{ required: true, message: '请输入店主姓名', trigger: 'blur' }],
    idCard: [
        { required: true, message: '请输入店主身份证', trigger: 'blur' },
        { validator: useCheck.checkIDCard, trigger: 'blur' }
    ],
    telephone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        { validator: useCheck.checkPhone, trigger: 'blur' }
    ],
    shopCompany: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
    startTime: [{ required: true, message: '请输入开始营业时间', trigger: 'blur' }],
    endTime: [{ required: true, message: '请输入结束营业时间', trigger: 'blur' }],
})

const getPosition = function (ruleForm) {
    navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude; // 纬度
        let longitude = position.coords.longitude; // 经度
        ruleForm.longitude = longitude;
        ruleForm.latitude = latitude;
        console.log(longitude,latitude)

    }, function () {
        operation.warning("获取地理位置失败")
    });
}
export default {
    rules,
    resetForm: useCheck.resetForm,
    getPosition
}

