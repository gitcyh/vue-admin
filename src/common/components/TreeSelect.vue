<template>
    <el-tree-select check-strictly v-model="value" :data="tree" :render-after-expand="false" @node-click="nodeClick" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '../../request/request';
import api from '../../request/api';

const props = defineProps({
    value: String,
    nodeClick: Function,
})

const tree = ref([]);

// 获取节点路径数组，数组长度表示节点深度，长度+1表示所属第几级分类
const getPath = function(data, value) {
    let arr = []
    for(let i=0;i<data.length;i++){
        let item = data[i];
        if (item.value === value){
            arr.push(item);
            return arr;
        } 
        if (item.children) {
            arr.push(item);
            const res = getPath(item.children, value);
            if(res.length){
                arr = arr.concat(res)
            }else{
                arr.pop();
            }
        }
    }
    return arr;
}

const nodeClick = function (data) {
    let deep = getPath(tree.value, data.value).length + 1;
    props.nodeClick(data.value, deep);
}



function dataToTree(parents, children) {
    parents.map(parent => {
        children.map((c, index) => {
            if (c.parentId === parent.value) {
                let _children = JSON.parse(JSON.stringify(children));
                _children.splice(index, 1);
                dataToTree([c], _children);
                if (parent.children) {
                    parent.children.push(c);
                } else {
                    parent.children = [c];
                }
            }
        })
    })
}

onMounted(() => {
    request.post(api.sysGetCategorys).then(res => {
        let list = res.data.data.data;
        list = list.map(item => {
            return {
                parentId: item.parentId,
                value: item.id,
                label: item.name,
            }
        })
        let parents = list.filter(item => item.parentId === null);
        let children = list.filter(item => item.parentId !== null);
        dataToTree(parents, children)
        tree.value = parents;

    })
})

// 获取树最大深度(层级)
const getMaxFloor = function (treeData) {
    let max = 0
    const each = function (data, floor) {
        data.forEach(e => {
            e.floor = floor
            if (floor > max) {
                max = floor
            }
            if (e.children) {
                each(e.children, floor + 1)
            }
        })
    }
    each(treeData, 1)
    return max
}
</script>
