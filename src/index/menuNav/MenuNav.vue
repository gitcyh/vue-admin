<template>
  <div class="menuNav-wrap">
      <el-tag :type="currentPath===tag.path ? 'success' : 'info'" v-for="tag in tags" :key="tag.name" class="menuNav-item" closable  @click="navto(tag)" @close="handleClose(tag)">{{ tag.name }}</el-tag>
  </div>
</template>


<script setup>  
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {menuStore} from "../../store/menuStore"
const router = useRouter();
const tags = menuStore().$state.selectedMenu


const handleClose = (tag) => {
  if(tag.name === "首页"){
    return
  }
  let index = tags.indexOf(tag);
  tags.splice(index, 1);
  router.push({
      name:"",
      path:tags[index-1].path,
  })
}

const navto = (tag)=>{
    router.push({
        name:"",
        path:tag.path,
    })
}
const currentPath = ref('')
router.afterEach((to, from) => {
  currentPath.value = to.path;
})


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


