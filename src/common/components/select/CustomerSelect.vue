<template>
    <el-select v-model="customerId" filterable placeholder="请选择客户" @change="changeFun" style="width: 100%">
        <el-option v-for="item in filterData" :key="item.value" :label="item.label" :value="item.value" :filter-method="filterFun">
            <span>{{ item.label }}</span>
        </el-option>
    </el-select>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import request from '../../../request/request';
import api from '../../../request/api';

const props = defineProps({
    changeCustomer:Function,
    customerId:String,
})

let options = [];
const filterData = ref([]);

const filterFun = function(value){
    if(value){
        filterData.value = options.filter(data =>{
            return data.label.includes(value) || data.name.includes(value) || data.phone.includes(value) || data.wechat.includes(value)
        })
    }else{
        return filterData.value = options;
    }
}

const changeFun = function(value){
    let data = options.find(item => item.value === value)
    props.changeCustomer(data)
    console.log(data)
}

onMounted(() => {
    request.post(api.getCustomers, {
        shopId: localStorage.getItem("shopId"),
    }).then(res => {
        if (res.data.code === 200) {
            options = res.data.data.data.map(item => {
                return {
                    value: item.id,
                    label: item.address,
                    name: item.name,
                    phone: item.phone,
                    wechat: item.wechat,
                }
            })
            filterData.value = JSON.parse(JSON.stringify(options));
        }
    })
})
</script>
  