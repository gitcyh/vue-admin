


const decode = function(token){
    if(!token){
        token = localStorage.getItem("token");
    }
    return JSON.parse(decodeURIComponent(window.atob(token.split('.')[1])))
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
    decode,
    getDowloadId,
    getPictureId
}