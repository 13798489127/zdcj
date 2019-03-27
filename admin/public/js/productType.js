ZD.ProductType=NameSpace.register('ZD.ProductType');
ZD.ProductType.Load=function(){
    ZD.AJAX({
        url:'/service/GetProductType',
        success:function (rs) {
            var classify_id,classify_name,classify_position;
            ZD.ProductType.Container[0].innerHTML=ZD.ProductType.Head;
            if (rs.length === 0) {
                ZD.ProductType.Container.append($('<li style="text-align: center; line-height: 100px;">暂无数据</li>'));
                return;
            }
            for(var i=0;i<rs.length;i++){
                classify_id=rs[i].classify_id;
                classify_name=rs[i].classify_name;
                classify_position=rs[i].classify_position;
                ZD.ProductType.Print(classify_id,classify_name,classify_position)
            }
        }
    })
};
ZD.ProductType.Print=function(classify_id,classify_name,classify_position){
    var a=$('<li><span>'+classify_name+'</span><span>当前位置:'+classify_position+'</span><div><button>编辑</button><button>删除</button></div></li>');
    ZD.ProductType.Container.append(a);
    a.data={
        id:classify_id,
        name:classify_name,
        position:classify_position
    };
    var button=a[0].getElementsByTagName('button');
    button[0].onclick=function () {
        ZD.ProductType.Edit(a,this);
    };
    button[1].onclick=function () {
        ZD.ProductType.Delete(a)
    }
};
ZD.ProductType.Edit=function(type,button){
    ZD.ProductType.AddMenu.hide();
    ZD.ProductType.List.hide();
    ZD.ProductType.Control.show();
    ZD.ProductType.ControlForm[0].value=type.data.name;
    ZD.ProductType.ControlForm[1].value=type.data.position;
    ZD.ProductType.ControlButton[1].onclick=function () {
        if(!ZD.ProductType.ControlForm[0].value.length){
            alert('请输入分类名称');
            return false;
        }
        if(!ZD.ProductType.ControlForm[1].value.length){
            alert('请设置排序');
            return false;
        }
        button.disabled=true;
        console.log(type.data.classify_position)
        ZD.AJAX({
            url:'/service/EditProductClassify',
            data:{
                classify_id:type.data.id,
                classify_name:ZD.ProductType.ControlForm[0].value,
                classify_position:ZD.ProductType.ControlForm[1].value,
                old_position:type.data.position
            },
            success:function (rs) {
                button.disabled=false;
                rs=rs[0];
                if(rs.state==='success'){
                    ZD.ProductType.Load();
                    ZD.ProductType.ControlButton[0].click()
                }
                alert(rs.msg);
            }
        })
    }
};
ZD.ProductType.Add=function(button){
    if(!ZD.ProductType.AddForm[0].value.length){
        alert('请输入产品类别名称');
        return false;
    }
    button.disabled=true;
    ZD.AJAX({
        url:'/service/AddProductClassify',
        data:{
            classify_name:ZD.ProductType.AddForm[0].value,
            classify_position:ZD.ProductType.AddForm[1].value
        },
        success:function (rs) {
            button.disabled=false;
            rs=rs[0];
            if(rs.state==='success'){
                ZD.ProductType.AddButton[0].click();
                ZD.ProductType.Print(rs.classify_id,rs.classify_name,rs.classify_position);
                ZD.ProductType.AddForm[0].value=ZD.ProductType.AddForm[1].value='';
            }
            alert(rs.msg);
        }
    })
};
ZD.ProductType.Delete=function(type){
    var a=confirm('确认删除'+type.data.name+'这个分类吗');
    if(a===true){
        ZD.AJAX({
            url:'/service/DeleteProductClassify',
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
ZD.ProductType.init=function () {
    ZD.ProductType.Head='<li class="ZD-Ul-head productTypeList-head"><span>产品类别</span><span>设置排序</span><div>操作</div></li>';
    ZD.ProductType.List=$(".productTypeShow");
    ZD.ProductType.Container=$('.productTypeList');
    ZD.ProductType.Control=$(".ProductTypeMangerControl");
    ZD.ProductType.ControlForm=$(".ProductTypeMangerControl input");
    ZD.ProductType.ControlButton=$(".ProductTypeMangerControl button");
    ZD.ProductType.AddMenu=$(".ProductTypeMangerAdd");
    ZD.ProductType.AddForm=$(".ProductTypeMangerAdd input");
    ZD.ProductType.AddButton=$(".ProductTypeMangerAdd button");
    ZD.ProductType.AddButton[0].onclick=ZD.ProductType.ControlButton[0].onclick=function(){
        ZD.ProductType.List.show();
        ZD.ProductType.Control.hide();
        ZD.ProductType.AddMenu.hide();
    };
    ZD.ProductType.AddButton[1].onclick=function(){
        ZD.ProductType.Add(this);
    };
    $(".ZD-Button")[0].onclick=function(){
        ZD.ProductType.List.hide();
        ZD.ProductType.Control.hide();
        ZD.ProductType.AddMenu.show();
    };
    ZD.ProductType.Load();
}();