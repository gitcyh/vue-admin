<template>
    <el-select v-model="sender" filterable placeholder="请选择配送员" @change="changeSender" style="width: 100%">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
        </el-option>
    </el-select>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import request from '../../../request/request';
import api from '../../../request/api';

const props = defineProps({
    changeSender:Function,
    sender:String
})


const options = ref([]);


onMounted(() => {
    request.post(api.getStaffs, {
        shopId: localStorage.getItem("shopId"),
    }).then(res => {
        if (res.data.code === 200) {
            options.value = res.data.data.data.map(item => {
                return {
                    value: item.id,
                    label: item.name,
                }
            })
        }
    })
})
</script>
  