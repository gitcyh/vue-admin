import { defineStore } from "pinia";


const userMenu = [
    {
        name: "首页",
        value: "index",
        path: "/index/myindex",
        icon: 'HomeFilled',
    },
    {
        name: "我的店铺",
        value: "myshop",
        path: "/index/myshop",
        icon:'Location',
        children: [
            {
                name: "店铺设置",
                value: "shopseting",
                path: "/index/shopseting",
                icon:'Setting',
            },
            {
                name: "订单管理",
                value: "order",
                path: "/index/order",
                icon:'Memo',
            },
            {
                name: "库存管理",
                value: "stock",
                path: "/index/stock",
                icon: 'icon-menu',
                icon:'Files',
            },
            {
                name: "客户管理",
                value: "customer",
                path: "/index/customer",
                icon:'Avatar',
            },
            {
                name: "员工管理",
                value: "mystaff",
                path: "/index/mystaff",
                icon:'User',
            },
            {
                name: "商品管理",
                value: "goods",
                path: "/index/goods",
                icon:'GoodsFilled',
            },
            {
                name: "收支管理",
                value: "goods",
                path: "/index/expenses",
                icon:'Shop',
            },
        ]
    },
];

const adminMenu = [
    {
        name: "首页",
        value: "index",
        path: "/index/myindex",
        icon:'HomeFilled',
    },
    {
        value: "shopmgr",
        name: "店铺管理",
        path: "/index/shopmgr",
        icon:'IconMenu',
    },
    {
        value: "goodsHouse",
        name: "商品库",
        path: "/index/goodsHouse",
        icon:'House',
    },
    {
        value: "catMgr",
        name: "类别库",
        path: '/index/catMgr',
        icon:'List',
    },
];

const userSelectedMenu = [
    {
        name: '首页',
        path: "/index/myindex"
    }
]

const adminSelectedMenu = [
    {
        name: '首页',
        path: "/index/myindex"
    }
]




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
            selectedMenu: [],
            currentMenu:"/index/myindex",
        }
    },
    actions: {
        changeState(menuList,selectedMenu) {
            this.menuList = menuList;
            this.selectedMenu = selectedMenu;
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
    menuStore,
    userSelectedMenu,
    adminSelectedMenu,
}