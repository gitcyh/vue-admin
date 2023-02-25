<template>
    <div class="clock">
        <span class="date">{{ date }}</span>
        <span class="time">{{ time }}</span>
        <span class="week">{{ week }}</span>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import dateUtil from '../../util/dateUtil';

let date = ref("");
let time = ref("");
let week = ref("");


function currentTime() {
    setInterval(formatDate, 1000);
}
function formatDate() {
    let currentDate = new Date();
    date.value = dateUtil.getYMD(currentDate);
    week.value = dateUtil.getWeek(currentDate);
    time.value = dateUtil.getHMS(currentDate);
}

onMounted(() => {
    currentTime();
})

</script>

<style scoped>
.clock {
    width: 300px;
    height: 40px;
    font-size: 18px;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 1);
}

.date {
    margin-right: 5px;
    margin-left: 10px;
}

.time {
    margin-right: 20px;
}
.week{
    min-width: 50px;
}
</style>