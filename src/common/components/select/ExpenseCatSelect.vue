<template>
    <el-form-item label="支出类别">
        <el-select v-model="expenseCat" placeholder="请选择费用支出类别" @change="inputChange" clearable style="width:100%">
            <el-option v-for="item in options" :key="item.key" :label="item.label" :value="item.value">
                <span style="float:left">{{item.index + '.' + item.label }}</span>
                <span style="float:right;font-size: 13px; ">{{ item.description }}</span>
            </el-option>
        </el-select>
    </el-form-item>
</template>
  
<script setup>
import { onMounted,ref,defineEmits,defineProps } from 'vue';
import request from '../../../request/request';
import api from '../../../request/api';

defineProps({
    expenseCat: String,
})
const options = ref([]);

const emits = defineEmits(['update:modelValue'])

const inputChange = function (value) {
    emits('update:modelValue', value);
}

onMounted(() => {
    request.post(api.sysGetExpenseCategorys).then((res) => {
        if (res.data.code === 200) {
            options.value = res.data.data.data.map((item,index) => {
                return {
                    index:index+1,
                    key: item.id,
                    value: item.id,
                    label: item.name,
                    description:item.description,
                }
            });
        }
    });
})


</script>
  
<style scoped>

</style>


