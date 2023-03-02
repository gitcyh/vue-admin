<template>
 <div id="map"></div>
</template>

<script setup>
import AMapLoader from '@amap/amap-jsapi-loader';
import { shallowRef } from '@vue/reactivity';
import { onMounted } from 'vue';

const map = shallowRef(null);

const initMap = function () {
    AMapLoader.load({
        key: "6160f944e0ff3aa457793ac5e9d12d78",             // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.ToolBar', 'AMap.Scale', 'AMap.HawkEye', 'AMap.MapType', 'AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then((AMap) => {
        map.value = new AMap.Map("map", {  //设置地图容器id
            viewMode: "3D",    //是否为3D地图模式
            zoom: 16,           //初始化地图级别
            center: [114.05959, 22.65984], //初始化地图中心点位置
        });
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        map.value.addControl(new AMap.ToolBar());

        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        map.value.addControl(new AMap.Scale());

        // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
        map.value.addControl(new AMap.HawkEye({ isOpen: true }));

        // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
        map.value.addControl(new AMap.MapType());

        // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
        map.value.addControl(new AMap.Geolocation());

        createText(AMap).setMap(map.value);

    }).catch(e => {
        console.log(e);
    })
}
// 创建纯文本标记
const createText = function (AMap) {
    return new AMap.Text({
        text: '新围仔张衡路17号503',
        anchor: 'center', // 设置文本标记锚点
        cursor: 'pointer',
        angle: 0,
        style: {
            'padding': '.25rem 0.5rem',
            'margin-bottom': '1rem',
            'border-radius': '.25rem',
            'background-color': 'rgba(255,255,255,0.7)',
            'border-width': 0,
            'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
            'text-align': 'center',
            'font-size': '14px',
            'color': 'red'
        },
        position: [114.05959, 22.65984]
    });
}

onMounted(()=>{
    initMap();
})
</script>

<style scoped>
#map {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
}
</style>