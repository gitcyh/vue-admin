<template>
    <el-form-item label="品牌名称" prop="brand">
        <el-select v-model="brand" placeholder="请选择品牌名称" @change="changeValue" clearable style="width:100%">
            <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.label" />
        </el-select>
    </el-form-item>
</template>
  
<script setup>
import { onMounted,ref } from 'vue';
import request from '../../../request/request';
import api from '../../../request/api';

defineProps({
    brand: String,
    changeValue:Function,
})
const options = ref([]);

onMounted(() => {
    request.post(api.sysGetBrandList).then((res) => {
        if (res.data.code === 200) {
            options.value = res.data.data.data.map(item => {
                return {
                    key: item.id,
                    value: item.id,
                    label: item.brand
                }
            });
        }
    });
})


</script>
  
<style scoped>

</style>


