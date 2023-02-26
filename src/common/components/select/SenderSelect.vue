<template>
    <el-select v-model="senderId" filterable placeholder="请选择配送员" @change="inputChange" style="width: 100%">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" >
        </el-option>
    </el-select>
</template>
  
<script setup>
import { ref, onMounted,defineEmits,defineProps } from 'vue'
import request from '../../../request/request';
import api from '../../../request/api';

const props = defineProps({
    senderId:String
})


const options = ref([]);
const emits = defineEmits(['update:senderId'])

const inputChange = function (value) {
    emits('update:senderId', value);
}

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
  