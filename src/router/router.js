import { createRouter,createWebHistory } from 'vue-router'
import Login from '../user/login/Login.vue'
import Register from '../user/register/Register.vue'
import Index from '../index/Index.vue'
import Myshop from '../index/main/myshop/shop/Myshop.vue'
import Myindex from '../index/main/myindex/Myindex.vue'
import {menuStore} from "../store/menuStore"
import GoodsHouse from '../index/main/goodsHouse/GoodsHouse.vue'
import StaffMgr from '../index/main/myshop/staff/StaffMgr.vue'
import Forget from '../user/forget/Forget.vue'
import Error_404 from '../common/components/Error_404.vue'
import CustomerMgr from '../index/main/myshop/customer/CustomerMgr.vue'
import OrderMgr from '../index/main/myshop/order/OrderMgr.vue'
import GoodsMgr from '../index/main/myshop/goods/GoodsMgr.vue'
import ShopList from '../index/main/ShopMgr/ShopList.vue'

const routes = [
    {
        path:"/",
        redirect:'/login'
    },
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
        path:"/forget",
        name:"找回密码",
        component:Forget
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
                name:"我的店铺",
                path:'/index/myshop',
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
                path:'/index/order',
                name:"订单管理",
                components:{
                    main:OrderMgr
                }
            },
            {
                name:"客户管理",
                path:'/index/customer',
                components:{
                    main:CustomerMgr
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
                name:"商品管理",
                path:'/index/goods',
                components:{
                    main:GoodsMgr
                }
            },
            {
                name:"商品库",
                path:'/index/goodsHouse',
                components:{
                    main:GoodsHouse
                }
            },
            {
                name:"店铺管理",
                path:'/index/shopmgr',
                components:{
                    main:ShopList
                }
            },
            
        ]
    },
    {
        path: '/404',
        component: Error_404
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
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
        path:to.path
        })
    }
    //console.log(to,from)
})

export default router;