function getYMDHMS(date){		
    return getYMD(date) +" "+ getHMS(date);
}

const getHMS = function(date){
    var hour = date.getHours()  < 10 ? "0" + date.getHours() : date.getHours();
    var min =  date.getMinutes()  < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return `${hour}:${min}:${second}`
}

const getYMD = function(date){
    return getY(date) + "-" + getM(date) + "-" + getD(date);
}

const getYM = function(date){
    return getY(date) + "-" + getM(date);
}

const getWeek = function(date){
    let weekday = date.getDay();
    let weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return weekArr[weekday];
}

const getD = function(date){
    return date.getDate()  < 10 ? "0" + date.getDate() : date.getDate();
}

const getM = function(date){
    return (date.getMonth()+1) < 10 ? "0" + (date.getMonth()+1) : date.getMonth()+1;
}

const getY = function(date){
    return date.getFullYear();
}

export default{
    getHMS,
    getYMDHMS,
    getYMD,
    getYM,
    getY,
    getWeek
}