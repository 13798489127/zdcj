ZD.Login=NameSpace.register('ZD.Login');
ZD.Login.Post=function(button){
    if(!ZD.Login.from[0].value.length){
        alert('请输入用户名');
        return false;
    }
    if(!ZD.Login.from[1].value.length){
        alert('请输入密码');
        return false;
    }
    if(!ZD.Login.from[2].value.length){
        alert('请输入验证码');
        return false;
    }
    button.disabled=true;
    $.ajax({
        url: ZD.Service + '/service/login',
        type: 'post',
        dataType:'json',
        data: {
            username: ZD.Login.from[0].value,
            password: ZD.Login.from[1].value,
            validate:ZD.Login.from[2].value
        },
        success: function (res) {
            button.disabled=false;
            res=res[0];
            if(res.state==='validata-error'){
                alert(res.msg);
                ZD.Login.authCode.click();
                return false;
            }
            if(res.state==='nouser'){
                alert(res.msg);
                ZD.Login.from[0].value='';
                return false;
            }
            if(res.state==='error'){
                alert(res.msg);
                ZD.Login.from[1].value='';
                return false;
            }
            if(res.state==='success'){
                localStorage.setItem('login_time',res.login_time);
                localStorage.setItem('token',res.token);
                localStorage.setItem('username',res.user);
                window.location.href=ZD.Service+'/admin/main.html';
                return false;
            }
        }
    });
};
ZD.Login.Init=function(){
    ZD.Login.from=$(".login input");
    ZD.Login.Button=ZD.Login.from[3];
    ZD.Login.authCode=$(".authCode IMG")[0];
    ZD.Login.authCode.onclick=function () {
        this.src=ZD.Service +'/service/verifyCode?'+Math.random();
    };
    ZD.Login.authCode.click();
    localStorage.clear();
    ZD.Login.from[0].value=ZD.Login.from[1].value=ZD.Login.from[2].value='';
    document.onkeydown=function (e) {
        var currKey=0,evt=e||window.event;
        currKey=evt.keyCode||evt.which||evt.charCode;
        if(currKey===13) {
            window.event.cancelBubble = true;
            window.event.returnValue = false;
            ZD.Login.Button.click();
        }
    }
}();
