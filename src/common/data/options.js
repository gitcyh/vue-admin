const payOptions = [
    {
        value: 0,
        label: '微信支付',
    },
    {
        value: 1,
        label: '支付宝',
    },
    {
        value: 2,
        label: '水票',
    },
    {
        value: 3,
        label: '月结',
    },
    {
        value: 4,
        label: '按季度',
    },
    {
        value: 5,
        label: '按年',
    },
    {
        value: 6,
        label: '现金',
    },
    {
        value: 7,
        label: '网单',
    },
    {
        value: 8,
        label: '对公',
    },
    {
        value: 9,
        label: '未支付',
    },
    {
        value: 10,
        label: '记账',
    },
    {
        value: 11,
        label: '其他',
    },
]

const sendOptions = [
    {
        value: 0,
        label: '未配送',
    },
    {
        value: 1,
        label: '配送中',
    },
    {
        value: 2,
        label: '已配送',
    },
    {
        value: 3,
        label: '客户自提',
    },
    {
        value: 4,
        label: '其他',
    },
]

const getPayway = function(value){
    return payOptions.find(item => item.value === value).label
}

const getSendState = function(value){
    return sendOptions.find(item => item.value === value).label
}

export default{
    payOptions,
    sendOptions,
    getPayway,
    getSendState
}