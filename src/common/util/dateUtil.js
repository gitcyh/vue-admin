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

export default{
    getHMS,
    getYMDHMS
}