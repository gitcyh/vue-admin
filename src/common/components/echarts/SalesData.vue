<template>
    <div class="sale">
        <div class="sale-left">
            <div class="title">
                {{ getLeftTitle() }}
            </div>
            <div class="content">
                {{ summoney }}
                <span class="yuan">元</span>
            </div>
        </div>
        <div class="sale-right">
            <div class="title">
                {{ getRightTitle() }}
            </div>
            <div class="content">
                {{ sumtotal }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import request from '../../../request/request';
import dateUtil from '../../util/dateUtil';
import api from '../../../request/api'


const props = defineProps({
    type: String,
    date: String,
})

const getDefaultDate = function () {
    if (!props.date) {
        if (props.type === 'date') {
            return dateUtil.getYMD(new Date())
        } else if (props.type === 'month') {
            return dateUtil.getYM(new Date())
        } else if (props.type === 'year') {
            return dateUtil.getY(new Date())
        }
    } else {
        return props.date;
    }

}

const getLeftTitle = function () {
    if (props.type === 'date') {
        return '今日销售额'
    } else if (props.type === 'month') {
        return '本月销售额'
    } else if (props.type === 'year') {
        return '今年销售额'
    }
}

const getRightTitle = function () {
    if (props.type === 'date') {
        return '今日销售量'
    } else if (props.type === 'month') {
        return '本月销售量'
    } else if (props.type === 'year') {
        return '今年销售量'
    }
}

const summoney = ref(0);
const sumtotal = ref(0);

const getTotal = function () {
    request.post(api.sysGetTotal, {
        shopId: localStorage.getItem("shopId"),
        type: props.type,
        date: getDefaultDate(),
    }).then(res => {
        if (res.data.code === 200) {
            const { money, total } = res.data.data.data;
            summoney.value = money;
            sumtotal.value = total;
        } else {
            summoney.value = 0;
            sumtotal.value = 0;
        }

    })
}

onMounted(() => {
    getTotal();
})

</script>

<style scoped>
.sale {
    display: flex;
    width: 300px;
    height: 100%;
    margin: 5px;

}

.sale-left {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-right: 20px;
}

.yuan {
    font-size: 20px;
}

.sale-right {
    display: flex;
    flex-direction: column;
    width: 50%;
}

.title {
    color: #fff;
    font-size: 12px;
}

.content {
    color: #eaee09;
    font-size: 38px;
    font-weight: bold;
    padding-left: 10px;
}
</style>