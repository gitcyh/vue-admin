import { createRouter,createWebHistory } from 'vue-router'
import Login from '../login/Login.vue'
import Register from '../register/Register.vue'
import Index from '../index/Index.vue'
import Myshop from '../index/main/myshop/Myshop.vue'
import Myindex from '../index/main/myindex/Myindex.vue'
import {menuStore} from "../store/menuStore"
import GoodsHouse from '../index/main/goodsHouse/GoodsHouse.vue'
import StaffMgr from '../index/main/myshop/staff/StaffMgr.vue'

const routes = [
    {
        path:"/login",
        name:"登录",
        component:Login
    },
    {
        path:"/register",
        name:"注册",
        component:Register
    },
    {
        path:"/index",
        name:"主页",
        component:Index,
        children:[
            {
                path:'/index/myindex',
                name:"首页",
                components:{
                    main:Myindex
                }
            },
            {
                path:'/index/shopseting',
                name:"店铺设置",
                components:{
                    main:Myshop
                }
            },
            {
                name:"我的店铺",
                path:'/index/myshop',
                components:{
                    main:Myindex
                }
            },
            {
                name:"员工管理",
                path:'/index/mystaff',
                components:{
                    main:StaffMgr
                }
            },
            {
                name:"商品库",
                path:'/index/goodsHouse',
                components:{
                    main:GoodsHouse
                }
            },
            
        ]
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes,
})

//全局路由前置守卫
router.beforeEach((to, from) => {
   //console.log(to,from)
    return true
  })

//全局路由后置守卫
router.afterEach((to, from) => {
    if(to.path === from.path){
        return;
    }
    const selectedMenu = menuStore().$state.selectedMenu;
    let find = selectedMenu.find(data => data.path === to.path);
    if(!find && !["/login","register"].includes(to.path) && to.path !== "/index"){
      selectedMenu.push({
        name:to.name,
        type:"",
        path:to.path
        })
    }
    //console.log(to,from)
})

export default router;