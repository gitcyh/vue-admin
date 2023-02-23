import { defineStore } from "pinia";
import { List, Menu as IconMenu, Location, Setting, User, HomeFilled, House, Avatar, Memo, Files, GoodsFilled, Shop } from "@element-plus/icons-vue";
import { markRaw } from 'vue'



const userMenu = [
    {
        name: "首页",
        value: "index",
        path: "/index/myindex",
        icon: markRaw(HomeFilled),
    },
    {
        name: "我的店铺",
        value: "myshop",
        path: "/index/myshop",
        icon: markRaw(Location),
        children: [
            {
                name: "店铺设置",
                value: "shopseting",
                path: "/index/shopseting",
                icon: markRaw(Setting),
            },
            {
                name: "订单管理",
                value: "order",
                path: "/index/order",
                icon: markRaw(Memo),
            },
            {
                name: "库存管理",
                value: "stock",
                path: "/index/stock",
                icon: 'icon-menu',
                icon: markRaw(Files),
            },
            {
                name: "客户管理",
                value: "customer",
                path: "/index/customer",
                icon: markRaw(Avatar),
            },
            {
                name: "员工管理",
                value: "mystaff",
                path: "/index/mystaff",
                icon: markRaw(User),
            },
            {
                name: "商品管理",
                value: "goods",
                path: "/index/goods",
                icon: markRaw(GoodsFilled),
            },
            {
                name: "收支管理",
                value: "goods",
                path: "/index/expenses",
                icon: markRaw(Shop),
            },
        ]
    },
];

const adminMenu = [
    {
        name: "首页",
        value: "index",
        path: "/index/myindex",
        icon: markRaw(HomeFilled),
    },
    {
        value: "shopmgr",
        name: "店铺管理",
        path: "/index/shopmgr",
        icon: markRaw(IconMenu),
    },
    {
        value: "goodsHouse",
        name: "商品库",
        path: "/index/goodsHouse",
        icon: markRaw(House),
    },
    {
        value: "catMgr",
        name: "类别库",
        path: '/index/catMgr',
        icon: markRaw(List),
    },
];



//仓库
const menuStore = defineStore('menu', {
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'menu',
                storage: localStorage,
            }
        ]
    },
    state() {
        return {
            menuList: [],
            selectedMenu: [
                {
                    name: '首页',
                    path: "/index/myindex"
                }
            ],
            currentMenu:"/index/myindex",
        }
    },
    actions: {
        changeState(menuList) {
            this.menuList = menuList;
        },
        pushMenu(menu) {
            this.selectedMenu.push(menu);
        },
        splice(index) {
            this.selectedMenu.splice(index, 1);
        },
        changeCurrentMenu(path){
            this.currentMenu = path;
        }
    },
    getters: {
        getSelectedMenu() {
            return this.selectedMenu;
        },
        getCurrentMenu(){
            return this.currentMenu;
        }
    }
})

export {
    userMenu,
    adminMenu,
    menuStore
}