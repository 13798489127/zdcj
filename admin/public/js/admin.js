ZD.UpLoad = function (upload_type, file, old_fileName,data,callBack) {
    var formData = new FormData();
    formData.append('upload_type', upload_type);
    formData.append('file', file.files[0]);
    formData.append('old_fileName', old_fileName);
    formData.append('data', data);
    ZD.AJAX({
        upload:true,
        url: '/service/UploadFile',
        data : formData,
        success : callBack
    });
};
ZD.CheckUpLoad=function (filename,format) {
    return ZD.StringExist(filename,format?format:'apng,png,jpg,jpeg,bmp,gif,APNG,PNG,JPG,JPEG,BMP,GIF');
};
ZD.StringExist=function (str, substr) {
    if(typeof str !== "string"){ return; }
    if(substr==='|*|'){return true}
    for(var i=0;i<substr.split(',').length;i++){
        if(str.indexOf(substr.split(',')[i]) >= 0 === true ){ return true; }
    }
    return false;
};
ZD.UpLoadPreview=function (file,area) {
    file.files&&file.files[0]?area.src = window.URL.createObjectURL(file.files[0]):"";
};
!function () {
    var data=localStorage;
    var head=$(".right_head *");
    var nav=$(".left_menu_select")[0];
    var nav_head=$(".zd_admin_right_content_head")[0];
    nav_head.innerHTML=nav.innerHTML;
    document.title='深圳市正东厨房设备有限公司'+nav.innerHTML;
    head[0].innerHTML='(上次登录时间：'+data.login_time+')';
    head[1].innerHTML=data.username;
    head[3].onclick=function () {
        localStorage.clear();
        window.location.href=ZD.Service+'/service/logout';
    };
    ZD.AJAX({
        url:'/service/check'
    });
}();