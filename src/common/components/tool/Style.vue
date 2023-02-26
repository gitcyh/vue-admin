<template>
    <div class="style-content" v-show="styleShow" ref="styleEl">
        <div class="style-row">
            <div class="row-fontfamily">
                <el-select size="small" v-model="style['font-family']" placeholder="请选择字体" @change="changeFont">
                    <el-option v-for="item in fontFamily" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <div class="row-fontsize">
                <el-select size="small" v-model="style['font-size']" placeholder="请选择字体大小" @change="changeSize">
                    <el-option v-for="item in fontSize" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
        </div>
        <div class="style-row">
            <div class="row-item row-svg" @click="bold" :style="weightStyle()">
                <svg t="1677339677950" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="2743" width="20" height="20">
                    <path
                        d="M362.976 804.704h141.12c79.616 0 135.776-10.24 168.384-30.784 32.64-20.48 48.96-54.496 48.96-101.984 0-47.904-15.584-82.016-46.72-102.304-31.168-20.288-85.92-30.432-164.288-30.432h-147.456v265.504z m0-345.152h132.832c60.16 0 104.768-9.728 133.76-29.12 29.056-19.456 43.552-49.44 43.552-90.048 0-38.4-13.12-67.872-39.392-88.384-26.272-20.48-64-30.752-113.12-30.752h-157.632v238.304zM545.376 896H236.48c-14.816 0-25.92-3.872-33.344-11.648-7.424-7.776-11.136-19.424-11.136-34.976 0-17.28 15.04-44.672 50.24-44.672h20.96V221.248H242.24c-32.64 0-46.4-28.928-46.4-46.624 0-15.104 3.776-26.656 11.424-34.656 7.616-8 18.624-11.968 33.024-11.968h266.336c89.824 0 158.24 17.792 205.248 53.44 47.04 35.584 70.56 87.296 70.56 155.072 0 34.112-7.2 63.904-21.6 89.376-14.4 25.472-35.84 46.4-64.192 62.816 45.76 16.832 79.744 40.32 101.984 70.56 22.24 30.24 33.376 68.64 33.376 115.264 0 39.296-9.536 75.136-28.608 107.52-19.072 32.352-45.952 58.88-80.704 79.616a232.64 232.64 0 0 1-69.28 26.24c-25.408 5.408-61.44 8.096-108.032 8.096z"
                        fill="#000000" p-id="2744"></path>
                </svg>
            </div>
            <div class="row-item row-svg" @click="bias" :style="biasStyle()">
                <svg t="1677339767616" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="3495" width="20" height="20">
                    <path
                        d="M424.6 236.2l7.9-38.3h287.3l-7.9 38.3h-13.4c-30.9 0-51.8 2.5-62.7 7.6-10.9 5.1-19.8 14.6-26.7 28.5-6.9 13.9-14.9 29.9-28.6 82.1l-72 287.6c-13 49.4-20.4 81.8-22.1 97.1s1.5 26.6 9.6 34.1c8.1 7.4 26.3 11.1 54.8 11.1h18.5l-14.9 41.9H267.1l14.9-41.9h18.5c26.9 0 46.4-3.4 58.5-10.2 12.1-6.8 21.5-17.4 28-31.7 6.6-14.4 16.8-47.8 30.6-100.3l71.8-287.6c13.2-50 17.9-65.3 19-79.8 1-14.5-2.5-24.6-10.6-30.1-8.1-5.6-28.1-8.3-59.9-8.3h-13.3z"
                        p-id="3496"></path>
                </svg>
            </div>
            <div class="row-item">
                <el-color-picker v-model="style['background-color']" show-alpha :predefine="predefineColors"
                    @change="changebgColor" />
            </div>
            <div class="row-item">
                <el-color-picker v-model="style.color" show-alpha :predefine="predefineColors" @change="changeColor" />
            </div>
            <div class="row-btn">
                <el-button-group>
                    <el-button :icon="Plus" size="small" @click="plus" />
                    <el-button :icon="Minus" size="small" @click="minus" />
                </el-button-group>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineExpose } from 'vue';
import { Plus, Minus } from '@element-plus/icons-vue';


const fontFamily = [
    {
        value: '微软雅黑',
        label: '微软雅黑',
    },
    {
        value: '隶书',
        label: '隶书',
    },
    {
        value: '宋体',
        label: '宋体',
    },
    {
        value: '仿宋',
        label: '仿宋',
    },
    {
        value: '楷体',
        label: '楷体',
    },
    {
        value: '黑体',
        label: '黑体',
    },
]

const fontSize = [
    {
        value: "12px",
        label: 12,
    },
    {
        value: "14px",
        label: 14,
    },
    {
        value: "16px",
        label: 16,
    },
    {
        value: "18px",
        label: 18,
    },
    {
        value: "20px",
        label: 20,
    },
    {
        value: "22px",
        label: 22,
    },
    {
        value: "24px",
        label: 24,
    },
    {
        value: "26px",
        label: 26,
    },
    {
        value: "28px",
        label: 28,
    },
    {
        value: "30px",
        label: 30,
    },
]

const props = defineProps({
    style: {
        default: {
            'font-family': '微软雅黑',
            'font-size': "14px",
            'font-weight': 'normal',
            'background-color': 'rgba(255,255,255,1)',
            color: 'rgba(0,0,0,1)',
            'font-style': 'normal',
        },
        type: Object
    },
    changeStyle: Function
})

const styleShow = ref(false);
const styleEl = ref();
defineExpose({
    styleShow, styleEl
})
const changeFont = function (value) {
    props.changeStyle(props.style);
}

const changeSize = function (value) {
    props.changeStyle(props.style);
}

const changebgColor = function (value) {
    props.changeStyle(props.style);
}

const changeColor = function (value) {
    props.changeStyle(props.style);

}

const plus = function () {
    if (Number(props.style['font-size'].replaceAll("px","")) >= 30) {
        return
    }
    props.style['font-size'] = Number(props.style['font-size'].replaceAll("px","")) + 2 + "px";
    props.changeStyle(props.style);
}

const minus = function () {
    if (Number(props.style['font-size'].replaceAll("px","")) <= 12) {
        return
    }
    props.style['font-size'] = Number(props.style['font-size'].replaceAll("px","")) - 2 + "px";
    props.changeStyle(props.style);
}

const bold = function () {
    if (props.style['font-weight'] === 'normal') {
        props.style['font-weight'] = 'bold'
    } else {
        props.style['font-weight'] = 'normal'
    }
    props.changeStyle(props.style);
}
const bias = function () {
    if (props.style['font-style'] === 'normal') {
        props.style['font-style'] = 'italic'
    } else {
        props.style['font-style'] = 'normal'
    }
    props.changeStyle(props.style);
}
const predefineColors = ref([
    '#000000',
    '#ff4500',
    '#ff8c00',
    '#f89898',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
    '#337ecc',
    '#79bbff',
    '#529b2e',
    '#b88230',
    '#eebe77',
])

const weightStyle = function () {
    if (props.style['font-weight'] === 'bold') {
        return {
            'background-color': 'rgba(209,237,196,1)'
        }
    } else {
        return {
            'background-color': 'rgba(255,255,255,1)'
        }
    }
}

const biasStyle = function () {
    if (props.style['font-style'] === 'italic') {
        return {
            'background-color': 'rgba(209,237,196,1)'
        }
    } else {
        return {
            'background-color': 'rgba(255,255,255,1)'
        }
    }
}

</script>

<style scoped>
.style-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 160px;
    height: 56px;
    position: absolute;
    z-index: 999;
    background-color: #eee;
}

.style-row {
    display: flex;
    flex-direction: row;
}

.row-fontfamily {
    width: 100px;
}

.row-fontsize {
    width: 51px;
}

.row-item {
    width: 24px;
    height: 24px;
    border: 1px solid #ccc;
}

.row-svg {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.row-item:deep() .el-color-picker__trigger {
    width: 24px !important;
    height: 24px !important;
    padding: 0px !important;
}

.row-btn {
    display: flex;
}

.row-btn button {
    padding: 12px 5px;
}
</style>