ZD.NewsType=NameSpace.register('ZD.NewsType');
ZD.NewsType.Load=function(){
    ZD.AJAX({
        url:'/service/GetNewsType',
        success:function (rs) {
            var classify_id,classify_name,classify_position;
            ZD.NewsType.Container[0].innerHTML=ZD.NewsType.Head;
            if (rs.length === 0) {
                ZD.NewsType.Container.append($('<li style="text-align: center; line-height: 100px;">暂无数据</li>'));
                return;
            }
            for(var i=0;i<rs.length;i++){
                classify_id=rs[i].classify_id;
                classify_name=rs[i].classify_name;
                classify_position=rs[i].classify_position;
                ZD.NewsType.Print(classify_id,classify_name,classify_position)
            }
        }
    })
};
ZD.NewsType.Print=function(classify_id,classify_name,classify_position){
    var a=$('<li><span>'+classify_name+'</span><span>当前位置:'+classify_position+'</span><div><button>编辑</button><button>删除</button></div></li>');
    ZD.NewsType.Container.append(a);
    a.data={
        id:classify_id,
        name:classify_name,
        position:classify_position
    };
    var button=a[0].getElementsByTagName('button');
    button[0].onclick=function () {
        ZD.NewsType.Edit(a,this);
    };
    button[1].onclick=function () {
        ZD.NewsType.Delete(a)
    }
};
ZD.NewsType.Edit=function(type,button){
    ZD.NewsType.AddMenu.hide();
    ZD.NewsType.List.hide();
    ZD.NewsType.Control.show();
    ZD.NewsType.ControlForm[0].value=type.data.name;
    ZD.NewsType.ControlForm[1].value=type.data.position;
    ZD.NewsType.ControlButton[1].onclick=function () {
        if(!ZD.NewsType.ControlForm[0].value.length){
            alert('请输入分类名称');
            return false;
        }
        if(!ZD.NewsType.ControlForm[1].value.length){
            alert('请设置排序');
            return false;
        }
        button.disabled=true;
        ZD.AJAX({
            url:'/service/EditNewsClassify',
            data:{
                classify_id:type.data.id,
                classify_name:ZD.NewsType.ControlForm[0].value,
                classify_position:ZD.NewsType.ControlForm[1].value,
                old_position:type.data.position
            },
            success:function (rs) {
                button.disabled=false;
                rs=rs[0];
                if(rs.state==='success'){
                    ZD.NewsType.Load();
                    ZD.NewsType.ControlButton[0].click()
                }
                alert(rs.msg);
            }
        })
    }
};
ZD.NewsType.Add=function(button){
    if(!ZD.NewsType.AddForm[0].value.length){
        alert('请输入新闻类别名称');
        return false;
    }
    button.disabled=true;
    ZD.AJAX({
        url:'/service/AddNewsClassify',
        data:{
            classify_name:ZD.NewsType.AddForm[0].value,
            classify_position:ZD.NewsType.AddForm[1].value
        },
        success:function (rs) {
            button.disabled=false;
            rs=rs[0];
            if(rs.state==='success'){
                ZD.NewsType.AddButton[0].click();
                ZD.NewsType.Print(rs.classify_id,rs.classify_name,rs.classify_position);
                ZD.NewsType.AddForm[0].value=ZD.NewsType.AddForm[1].value='';
            }
            alert(rs.msg);
        }
    })
};
ZD.NewsType.Delete=function(type){
    var a=confirm('确认删除'+type.data.name+'这个分类吗');
    if(a===true){
        ZD.AJAX({
            url:'/service/DeleteNewsClassify',
            data:{
                classify_id:type.data.id
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
ZD.NewsType.init=function () {
    ZD.NewsType.Head='<li class="ZD-Ul-head NewsTypeList-head"><span>新闻动态类型</span><span>设置排序</span><div>操作</div></li>';
    ZD.NewsType.List=$(".NewsTypeShow");
    ZD.NewsType.Container=$('.NewsTypeList');
    ZD.NewsType.Control=$(".NewsTypeMangerControl");
    ZD.NewsType.ControlForm=$(".NewsTypeMangerControl input");
    ZD.NewsType.ControlButton=$(".NewsTypeMangerControl button");
    ZD.NewsType.AddMenu=$(".NewsTypeMangerAdd");
    ZD.NewsType.AddForm=$(".NewsTypeMangerAdd input");
    ZD.NewsType.AddButton=$(".NewsTypeMangerAdd button");
    ZD.NewsType.AddButton[0].onclick=ZD.NewsType.ControlButton[0].onclick=function(){
        ZD.NewsType.List.show();
        ZD.NewsType.Control.hide();
        ZD.NewsType.AddMenu.hide();
    };
    ZD.NewsType.AddButton[1].onclick=function(){
        ZD.NewsType.Add(this);
    };
    $(".ZD-Button")[0].onclick=function(){
        ZD.NewsType.List.hide();
        ZD.NewsType.Control.hide();
        ZD.NewsType.AddMenu.show();
    };
    ZD.NewsType.Load();
}();