function getYMDHMS(date){
    //获取年月日，时间
    var year = date.getFullYear();
    var mon = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day = date.getDate()  < 10 ? "0"+(date.getDate()) : date.getDate();
    var hour = date.getHours()  < 10 ? "0"+(date.getHours()) : date.getHours();
    var min =  date.getMinutes()  < 10 ? "0"+(date.getMinutes()) : date.getMinutes();
    var seon = date.getSeconds() < 10 ? "0"+(date.getSeconds()) : date.getSeconds();
				
    var newdatee = year +"-"+ mon +"-"+ day +" "+ hour +":"+ min +":"+ seon;
    return newdatee;
}

const getHMS = function(date){
    var hour = date.getHours()  < 10 ? "0"+date.getHours() : date.getHours();
    var min =  date.getMinutes()  < 10 ? "0"+date.getMinutes() : date.getMinutes();
    var second = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();
    return `${hour}:${min}:${second}`
		
}

const getYMD = function(date){
    var year = date.getFullYear();
    var mon = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day = date.getDate()  < 10 ? "0"+(date.getDate()) : date.getDate();
    var newdatee = year +"-"+ mon +"-"+ day;
    return newdatee;
}

const getYM = function(date){
    var year = date.getFullYear();
    var mon = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var newdatee = year +"-"+ mon;
    return newdatee;
}

const getY = function(date){
    var year = date.getFullYear();
    return year;
}

export default{
    getHMS,
    getYMDHMS,
    getYMD,
    getYM,
    getY
}