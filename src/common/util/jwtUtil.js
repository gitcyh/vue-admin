


const getValue = function(key){
    let token = localStorage.getItem("token");
    let obj = JSON.parse(decodeURIComponent(window.atob(token.split('.')[1])));
    return obj[key];
}

const getDowloadId = function(id){
    const token = localStorage.getItem("token");
    return"/api/download?id=" + id + "&token=" + token;
}

const getPictureId = function(){
    const pictureId = localStorage.getItem("pictureId");
    const token = localStorage.getItem("token");
    return"/api/download?id=" + pictureId + "&token=" + token;
}


export default {
    getValue,
    getDowloadId,
    getPictureId
}