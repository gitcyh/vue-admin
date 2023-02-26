import { createRouter, createWebHistory } from 'vue-router'
import { menuStore } from "../store/menuStore"


const routes = [
    {
        path: "/",
        redirect: '/login'
    },
    {
        path: "/login",
        name: "登录",
        component: () => import(/* webpackChunkName: mycomp*/ '../user/login/Login.vue')
    },
    {
        path: "/register",
        name: "注册",
        component: () => import(/* webpackChunkName: mycomp*/ '../user/register/Register.vue')
    },
    {
        path: "/forget",
        name: "找回密码",
        component: () => import(/* webpackChunkName: mycomp*/ '../user/forget/Forget.vue')
    },
    {
        path: "/index",
        name: "主页",
        component: () => import(/* webpackChunkName: mycomp*/ '../index/Index.vue'),
        children: [
            {
                path: '/index/myindex',
                name: "首页",
                components: {
                    main: () => import(/* webpackChunkName: mycomp*/ '../index/main/myindex/MyIndex.vue')
                }
            },
            {
                name: "我的店铺",
                path: '/index/myshop',
                components: {
                    main: () => import(/* webpackChunkName: mycomp*/ '../index/main/myindex/Myindex.vue')
                }
            },
            {
                path: '/index/shopseting',
                name: "店铺设置",
                components: {
                    main: () => import(/* webpackChunkName: mycomp*/ '../index/main/myshop/shop/Myshop.vue')
                }
            },
            {
                path: '/index/order',
                name: "订单管理",
                components: {
                    main: () => import(/* webpackChunkName: mycomp*/ '../index/main/myshop/order/OrderMgr.vue')
                }
            },
            {
                path: '/index/stock',
                name: "库存管理",
                components: {
                    main: () => import(/* webpackChunkName: mycomp*/ '../index/main/myshop/stock/StockMgr.vue')
                }
            },
            {
                name: "客户管理",
                path: '/index/customer',
                components: {
                    main: () => import(/* webpackChunkName: mycomp*/ '../index/main/myshop/customer/CustomerMgr.vue')
                }
            },
            {
                name: "员工管理",
                path: '/index/mystaff',
                components: {
                    main: () => import(/* webpackChunkName: mycomp*/ '../index/main/myshop/staff/StaffMgr.vue')
                }
            },
            {
                name: "商品管理",
                path: '/index/goods',
                components: {
                    main: () => import(/* webpackChunkName: mycomp*/ '../index/main/myshop/goods/GoodsMgr.vue')
                }
            },
            {
                name: "商品库",
                path: '/index/goodsHouse',
                components: {
                    main: () => import(/* webpackChunkName: mycomp*/ '../index/main/goodsHouse/GoodsHouse.vue')
                }
            },
            {
                name: "类别库",
                path: '/index/catMgr',
                components: {
                    main: () => import(/* webpackChunkName: mycomp*/ '../index/main/catHouse/CatMgr.vue')
                }
            },
            {
                name: "店铺管理",
                path: '/index/shopmgr',
                components: {
                    main: () => import(/* webpackChunkName: mycomp*/ '../index/main/ShopMgr/ShopList.vue')
                }
            },
            {
                name: "收支管理",
                path: '/index/expenses',
                components: {
                    main: () => import(/* webpackChunkName: mycomp*/ '../index/main/myshop/expenses/ExpensesMgr.vue')
                }
            },

        ]
    },
    {
        path: '/404',
        component: () => import(/* webpackChunkName: mycomp*/ '../common/components/Error_404.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

//全局路由前置守卫
router.beforeEach((to, from) => {
    //console.log(to,from)
    return true
})

//全局路由后置守卫
router.afterEach((to, from) => {
    if (to.path === from.path) {
        return;
    }
    const store = menuStore();
    const selectedMenu = store.getSelectedMenu;
    let find = selectedMenu.find(data => data.path === to.path);
    if (!find && !["/login", "register"].includes(to.path) && to.path !== "/index") {
        store.pushMenu({
            name: to.name,
            path: to.path
        })
    }
    //console.log(to,from)
})

export default router;