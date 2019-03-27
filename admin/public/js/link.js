ZD.Link=NameSpace.register('ZD.Link');
ZD.Link.Load=function(){
    ZD.AJAX({
        url:'/service/GetLink',
        success:function (rs) {
            var link_id,link_name,link_href;
            ZD.Link.Container[0].innerHTML=ZD.Link.Head;
            if (rs.length === 0) {
                ZD.Link.Container.append($('<li style="text-align: center; line-height: 100px;">暂无数据</li>'));
                return;
            }
            for(var i=0;i<rs.length;i++){
                link_id=rs[i].link_id;
                link_name=rs[i].link_name;
                link_href=rs[i].link_href;
                ZD.Link.Print(link_id,link_name,link_href)
            }
        }
    })
};

ZD.Link.Print=function(link_id,link_name,link_href){
    var a=$('<li><span>'+link_name+'</span><span><a href="'+link_href+'" target="_blank">'+link_href+'</a></span><div><button>编辑</button><button>删除</button></div></li>');
    ZD.Link.Container.append(a);
    a.data={
        id:link_id,
        name:link_name,
        href:link_href
    };
    var button=a[0].getElementsByTagName('button');
    button[0].onclick=function () {
        ZD.Link.Edit(a,this);
    };
    button[1].onclick=function () {
        ZD.Link.Delete(a)
    }
};
ZD.Link.Edit=function(type,button){
    ZD.Link.AddMenu.hide();
    ZD.Link.List.hide();
    ZD.Link.Control.show();
    ZD.Link.ControlForm[0].value=type.data.name;
    ZD.Link.ControlForm[1].value=type.data.href;
    ZD.Link.ControlButton[1].onclick=function () {
        if(!ZD.Link.ControlForm[0].value.length){
            alert('请输入链接名称');
            return false;
        }
        if(!ZD.Link.ControlForm[1].value.length){
            alert('请输入链接地址');
            return false;
        }
        button.disabled=true;
        ZD.AJAX({
            url:'/service/EditLink',
            data:{
                link_id:type.data.id,
                link_name:ZD.Link.ControlForm[0].value,
                link_href:ZD.Link.ControlForm[1].value
            },
            success:function (rs) {
                button.disabled=false;
                rs=rs[0];
                if(rs.state==='success'){
                    ZD.Link.Print(type.data.id,ZD.Link.ControlForm[0].value,ZD.Link.ControlForm[1].value);
                    type.remove();
                    ZD.Link.ControlButton[0].click()
                }
                ZD.Link.ControlForm[0].value=ZD.Link.ControlForm[1].value='';
                alert(rs.msg);
            }
        })
    }
};
ZD.Link.Add=function(button){
    if(!ZD.Link.AddForm[0].value.length){
        alert('请输入链接名称');
        return false;
    }
    if(!ZD.Link.AddForm[1].value.length){
        alert('请输入链接地址');
        return false;
    }
    button.disabled=true;
    ZD.AJAX({
        url:'/service/AddLink',
        data:{
            link_name:ZD.Link.AddForm[0].value,
            link_href:ZD.Link.AddForm[1].value
        },
        success:function (rs) {
            button.disabled=false;
            rs=rs[0];
            if(rs.state==='success'){
                ZD.Link.AddButton[0].click();
                ZD.Link.Print(rs.link_id,rs.link_name,rs.link_href);
                ZD.Link.AddForm[0].value=ZD.Link.AddForm[1].value='';
            }
            alert(rs.msg);
        }
    })
};
ZD.Link.Delete=function(type){
    var a=confirm('确认删除'+type.data.name+'这个链接吗');
    if(a===true){
        ZD.AJAX({
            url:'/service/DeleteLink',
            data:{
                link_id:type.data.id
            },
            success:function (rs) {
                rs=rs[0];
                if(rs.state==='success'){
                    type.remove();
                }
                alert(rs.msg);
            }
        })
    }
};
ZD.Link.init=function () {
    ZD.Link.Head='<li class="ZD-Ul-head LinkShowList-head"><span>链接名称</span><span>链接地址</span><div>操作</div></li>';
    ZD.Link.List=$(".LinkShow");
    ZD.Link.Container=$('.LinkShowList');
    ZD.Link.Control=$(".LinkShowListControl");
    ZD.Link.ControlForm=$(".LinkShowListControl input");
    ZD.Link.ControlButton=$(".LinkShowListControl button");
    ZD.Link.AddMenu=$(".LinkShowListControlAdd");
    ZD.Link.AddForm=$(".LinkShowListControlAdd input");
    ZD.Link.AddButton=$(".LinkShowListControlAdd button");
    ZD.Link.AddButton[0].onclick=ZD.Link.ControlButton[0].onclick=function(){
        ZD.Link.List.show();
        ZD.Link.Control.hide();
        ZD.Link.AddMenu.hide();
    };
    ZD.Link.AddButton[1].onclick=function(){
        ZD.Link.Add(this);
    };
    $(".ZD-Button")[0].onclick=function(){
        ZD.Link.List.hide();
        ZD.Link.Control.hide();
        ZD.Link.AddMenu.show();
    };
    ZD.Link.Load();
}();