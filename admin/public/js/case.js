ZD.Case=NameSpace.register('ZD.Case');
ZD.Case.Load=function(page){
    ZD.AJAX({
        url:'/service/GetCase',
        data: {
            page: page,
            size:ZD.Case.Size
        },
        success:function (rs) {
            var case_id,case_name,case_preview;
            ZD.Case.Container[0].innerHTML=ZD.Case.Head;

            if (rs.length === 0) {
                ZD.Case.Container.append($('<li style="text-align: center; line-height: 100px;">暂无数据</li>'));
                return;
            }
            ZD.Case.allCount = rs[0].all_count;
            for(var i=0;i<rs.length;i++){
                case_id=rs[i].case_id;
                case_name=rs[i].case_name;
                case_preview=rs[i].case_preview;
                ZD.Case.Print(case_id,case_name,case_preview)
            }
            //分页容器 ZD.Case.PageContainer
            if (!ZD.Case.Page) {
                $(ZD.Case.PageContainer).html('');
                ZD.Case.Page = new ZD.Page(ZD.Case.PageContainer, Math.ceil(ZD.Case.allCount / ZD.Case.Size), function (page) {
                    if (history.pushState) {
                        history.pushState({}, document.title, ZD.ChangeUrlParam({page : page}));
                    }
                    ZD.Case.Load(page);
                });
            }
        }
    })
};
ZD.Case.Print=function(case_id,case_name,case_preview){
    var preview = '<img src="' + ZD.Service + '/' + case_preview + '">';
    if (case_preview=== '无图'||case_preview==='null'||case_preview===null) {
        preview = '<p>无图</p>';
    }
    var a=$('<li><span>'+preview+'</span><span>'+case_name+'</span><div><button>编辑</button><button>删除</button></div></li>');
    ZD.Case.Container.append(a);
    a.data={
        id:case_id,
        name:case_name,
        preview:case_preview
    };
    var button=a[0].getElementsByTagName('button');
    button[0].onclick=function () {
        ZD.Case.Edit(a,this);
    };
    button[1].onclick=function () {
        ZD.Case.Delete(a)
    }
};
ZD.Case.Edit=function(type,button){
    ZD.Case.AddMenu.hide();
    ZD.Case.List.hide();
    ZD.Case.Control.show();
    ZD.Case.ControlForm[0].value=type.data.name;
    ZD.Case.ControlImage.src=ZD.Service+'/'+type.data.preview;
    ZD.Case.ControlForm[1].value='';
    ZD.Case.ControlButton[1].onclick=function () {
        if(!ZD.Case.ControlForm[0].value.length){
            alert('请输入案例标题');
            return false;
        }
        button.disabled=true;
        ZD.AJAX({
            url:'/service/EditCase',
            data:{
                case_id:type.data.id,
                case_name:ZD.Case.ControlForm[0].value
            },
            success:function (rs) {
                button.disabled=false;
                rs=rs[0];
                if(rs.state==='success'&&!ZD.Case.ControlForm[1].value.length){
                    ZD.Case.Load();
                    ZD.Case.ControlButton[0].click();
                }
                if(rs.state==='success'&&ZD.Case.ControlForm[1].value.length){
                    ZD.UpLoad('successCase',ZD.Case.ControlForm[1],type.data.preview,type.data.id,function (res) {
                        if(res[0].state==='success'){
                            ZD.Case.Load();
                            ZD.Case.ControlButton[0].click();
                        }
                    })
                }
                alert(rs.msg);
            }
        })
    }
};
ZD.Case.Add=function(button){
    if(!ZD.Case.AddForm[0].value.length){
        alert('请输入案例标题');
        return false;
    }
    if(!ZD.Case.AddForm[1].value.length){
        alert('请选择一张案例图片');
        return false;
    }
    button.disabled=true;
    ZD.AJAX({
        url:'/service/AddCase',
        data:{
            case_name:ZD.Case.AddForm[0].value
        },
        success:function (rs) {
            button.disabled=false;
            rs=rs[0];
            if(rs.state==='success'){
                ZD.Case.AddButton[0].click();
                ZD.UpLoad('successCase',ZD.Case.AddForm[1],null,rs.case_id,function (res) {
                    if(res[0].state==='success'){
                       $(ZD.Case.Container).children.length > 8 ?  ZD.Case.Print(rs.case_id,rs.case_name,res[0].url) : ZD.Case.Page.switch(Math.ceil(ZD.Case.allCount / ZD.Case.Size));
                        ZD.Case.AddForm[0].value=ZD.Case.AddForm[1].value = ZD.Case.AddImage.src ='';
                    }
                    alert(rs.msg);
                });
            }
        }
    })
};
ZD.Case.Delete=function(type){
    var a=confirm('确认删除'+type.data.name+'这个案例吗');
    if(a===true){
        ZD.AJAX({
            url:'/service/DeleteCase',
            data:{
                id:type.data.id,
                old_preview:type.data.preview
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
ZD.Case.init=function () {
    ZD.Case.Size = 6;
    ZD.Case.Head='<li class="ZD-Ul-head CaseList-head"><span>案例预览</span><span>案例标题</span><div>操作</div></li>';
    ZD.Case.List=$(".CaseShowMain");
    ZD.Case.Container=$('.CaseList');
    ZD.Case.Control=$(".CaseControl");
    ZD.Case.ControlForm=$(".CaseControl input");
    ZD.Case.ControlButton=$(".CaseControl button");
    ZD.Case.ControlImage=$(".CaseControl img")[0];
    ZD.Case.AddMenu=$(".CaseAdd");
    ZD.Case.AddForm=$(".CaseAdd input");
    ZD.Case.AddButton=$(".CaseAdd button");
    ZD.Case.AddImage=$(".CaseAdd img")[0];
    ZD.Case.PageContainer = $('.CasePageContainer')[0];
    ZD.Case.AddButton[0].onclick=ZD.Case.ControlButton[0].onclick=function(){
        ZD.Case.List.show();
        ZD.Case.Control.hide();
        ZD.Case.AddMenu.hide();
    };
    ZD.Case.AddButton[1].onclick=function(){
        ZD.Case.Add(this);
    };
    $(".ZD-Button")[0].onclick=function(){
        ZD.Case.List.hide();
        ZD.Case.Control.hide();
        ZD.Case.AddMenu.show();
    };
    ZD.Case.ControlForm[1].onchange=function(){
        ZD.UpLoadPreview(this,ZD.Case.ControlImage)
    };
    ZD.Case.AddForm[1].onchange=function(){
        ZD.UpLoadPreview(this,ZD.Case.AddImage)
    };
    ZD.Case.Load(ZD.GetUrlParam('page')||1);
}();