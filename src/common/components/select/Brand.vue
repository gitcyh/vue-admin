<template>
    <el-select filterable :filter-method="filterFun" v-model="brand" placeholder="请选择品牌名称" @change="inputChange" clearable
        style="width:100%">
        <el-option v-for="item in filterData" :key="item.key" :label="item.label" :value="item.label" />
    </el-select>
</template>
  
<script setup>
import { onMounted, ref,defineEmits } from 'vue';
import request from '../../../request/request';
import api from '../../../request/api';

defineProps({
    brand: String,
})
const emits = defineEmits(['update:modelValue'])

const inputChange = function (value) {
    emits('update:modelValue', value);
}
let options = [];

const filterData = ref([]);

const filterFun = function (value) {
    if (value) {
        filterData.value = options.filter(data => {
            return data.label.includes(value)
        })
    } else {
        return filterData.value = options;
    }
}

onMounted(() => {
    request.post(api.sysGetBrandList).then((res) => {
        if (res.data.code === 200) {
            options = res.data.data.data.map(item => {
                return {
                    key: item.id,
                    value: item.id,
                    label: item.brand
                }
            });
            filterData.value = JSON.parse(JSON.stringify(options));
        }
    });
})


</script>
  
<style scoped></style>


