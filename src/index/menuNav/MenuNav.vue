<template>
  <div class="menuNav-wrap">
      <el-tag v-for="tag in tags" :key="tag.name" class="menuNav-item" closable :type="tag.type" @click="navto(tag)" @close="handleClose(tag)">{{ tag.name }}</el-tag>
  </div>
</template>


<script setup>  
import { Fold, Expand, Bell,CaretBottom  } from "@element-plus/icons-vue";
import {useRouter} from 'vue-router';

import {menuStore} from "../../store/menuStore"
const router = useRouter();
const tags = menuStore().$state.selectedMenu


const handleClose = (tag) => {
  if(tag.name === "首页"){
    return
  }
  tags.splice(tags.indexOf(tag), 1)
}

const navto = (tag)=>{
    router.push({
        name:"",
        path:tag.path,

    })
}

// defineProps({
//   isCollapse: Boolean,
//   changeCollapse: Function,
// });

// const emit = defineEmits(["changeCollapse"]);

// function change(value) {
//   console.log(value);
//   emit("changeCollapse", value);
// }
</script>

<style scoped>
.menuNav-wrap{
  background: #e2ebe4;
  height: 30px;
  display: flex;
  align-items: center;
  overflow-y: auto;
}
.menuNav-item{
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
}
</style>


