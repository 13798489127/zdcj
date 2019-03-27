ZD.User=NameSpace.register('ZD.User');
ZD.User.Load=function(){
    ZD.AJAX({
        url:'/service/GetUser',
        success:function (rs) {
            var id,name,time;
            ZD.User.Container[0].innerHTML=ZD.User.Head;
            if (rs.length === 0) {
                ZD.User.Container.append($('<li style="text-align: center; line-height: 100px;">暂无数据</li>'));
                return;
            }
            for(var i=0;i<rs.length;i++){
                id=rs[i].userid;
                name=rs[i].username;
                time=rs[i].register_time;
                ZD.User.Print(id,name,time)
            }
        }
    })
};
ZD.User.Print=function(id,name,time){
    var a=$('<li><span>'+name+'</span><span>'+time+'</span><div><button>编辑</button><button>删除</button></div></li>');
    ZD.User.Container.append(a);
    a.data={
        id:id,
        name:name
    };
    var button=a[0].getElementsByTagName('button');
    button[0].onclick=function () {
        ZD.User.Edit(a,this);
    };
    button[1].onclick=function () {
        ZD.User.Delete(a)
    }
};
ZD.User.Edit=function(user,button){
    ZD.User.AddMenu.hide();
    ZD.User.UserList.hide();
    ZD.User.Control.show();
    ZD.User.ControlForm[0].value=ZD.User.ControlForm[1].value=ZD.User.ControlForm[2].value=ZD.User.ControlForm[3].value='';
    ZD.User.ControlForm[0].value=user.data.name;
    ZD.User.ControlButton[1].onclick=function () {
        if(!ZD.User.ControlForm[0].value.length){
            alert('请输入管理账号');
            return false;
        }
        if(!ZD.User.ControlForm[2].value.length){
            alert('请输入管理员密码');
            return false;
        }
        if(!ZD.User.ControlForm[3].value.length){
            alert('请输入确认账号');
            return false;
        }
        if(ZD.User.ControlForm[3].value!==ZD.User.ControlForm[2].value){
            alert('两次输入密码不相同！');
            return false;
        }
        button.disabled=true;
        ZD.AJAX({
            url:'/service/updateUser',
            data:{
                userid:user.data.id,
                username:ZD.User.ControlForm[0].value,
                oldpass:ZD.User.ControlForm[1].value,
                newpass:ZD.User.ControlForm[3].value
            },
            success:function (rs) {
                button.disabled=false;
                rs=rs[0];
                if(rs.state==='success'){
                    user.data.name=ZD.User.ControlForm[0].value;
                    user[0].getElementsByTagName('span')[0].innerHTML=user.data.name;
                    ZD.User.ControlButton[0].click()
                }
                alert(rs.msg);
            }
        })
    }
};
ZD.User.Delete=function(user){
    var a=confirm('确认删除'+user.data.name+'这个账号吗');
    if(a===true){
        ZD.AJAX({
            url:'/service/DeleteUser',
            data:{
                userid:user.data.id
            },
            success:function (rs) {
                rs=rs[0];
                if(rs.state==='success'){
                    user.remove();
                }
                alert(rs.msg);
            }
        })
    }
};
ZD.User.Add=function(button){
    if(!ZD.User.AddForm[0].value.length){
        alert('请输入管理账号');
        return false;
    }
    if(!ZD.User.AddForm[1].value.length){
        alert('请输入管理员密码');
        return false;
    }
    if(!ZD.User.AddForm[2].value.length){
        alert('请输入确认账号');
        return false;
    }
    if(ZD.User.AddForm[1].value!==ZD.User.AddForm[2].value){
        alert('两次输入密码不相同！');
        return false;
    }
    button.disabled=true;
    ZD.AJAX({
        url:'/service/register',
        data:{
            username:ZD.User.AddForm[0].value,
            password:ZD.User.AddForm[1].value
        },
        success:function (rs) {
            button.disabled=false;
            rs=rs[0];
            if(rs.state==='success'){
                ZD.User.AddButton[0].click();
                ZD.User.Print(rs.userid,rs.username,rs.register_time);
                ZD.User.AddForm[0].value=ZD.User.AddForm[1].value=ZD.User.AddForm[2].value='';
            }
            alert(rs.msg);
        }
    })
};
ZD.User.Init=function () {
    ZD.User.Head='<li class="ZD-Ul-head userMangerHead"><span>用户名</span><span>添加时间</span><div>操作</div></li>';
    ZD.User.Container=$(".userManger");
    ZD.User.UserList=$(".userMangerShow");
    ZD.User.Control=$(".userMangerControl");
    ZD.User.AddMenu=$(".userMangerAdd");
    ZD.User.ControlForm=$(".userMangerControl input");
    ZD.User.ControlButton=$(".userMangerControl button");
    ZD.User.AddButton=$(".userMangerAdd button");
    ZD.User.AddForm=$(".userMangerAdd input");
    ZD.User.AddButton[0].onclick=ZD.User.ControlButton[0].onclick=function(){
        ZD.User.UserList.show();
        ZD.User.Control.hide();
        ZD.User.AddMenu.hide();
    };
    ZD.User.AddButton[1].onclick=function(){
        ZD.User.Add(this);
    };
    $(".userMangerAddButton")[0].onclick=function(){
        ZD.User.UserList.hide();
        ZD.User.Control.hide();
        ZD.User.AddMenu.show();
    };
    ZD.User.Load();
}();