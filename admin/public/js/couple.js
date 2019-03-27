ZD.couple=NameSpace.register('ZD.couple');
ZD.couple.Load=function(page){
    ZD.AJAX({
        url:'/service/GetFeedBack',
        data: {
            page: page,
            size:ZD.couple.Size
        },
        success:function (rs) {
            var feedback_id,feedback_name,feedback_contact,feedback_message;
            ZD.couple.Container[0].innerHTML=ZD.couple.Head;
            if (rs.length === 0) {
                ZD.couple.Container.append($('<li style="text-align: center; line-height: 100px;">暂无数据</li>'));
                return;
            }
            ZD.couple.allCount = rs[0].all_count;
            for(var i=0;i<rs.length;i++){
                feedback_id=rs[i].feedback_id;
                feedback_name=rs[i].feedback_name;
                feedback_contact=rs[i].feedback_contact;
                feedback_message=rs[i].feedback_message;
                ZD.couple.Print(feedback_id,feedback_name,feedback_contact,feedback_message)
            }
            //分页容器 ZD.couple.PageContainer
            if (!ZD.couple.Page) {
                $(ZD.couple.PageContainer).html('');
                ZD.couple.Page = new ZD.Page(ZD.couple.PageContainer, Math.ceil(ZD.couple.allCount / ZD.couple.Size), function (page) {
                    if (history.pushState) {
                        history.pushState({}, document.title, ZD.ChangeUrlParam({page : page}));
                    }
                    ZD.couple.Load(page);
                });
            }
        }
    })
};
ZD.couple.Print=function(feedback_id,feedback_name,feedback_contact,feedback_message){
    var a=$('<li><span>'+feedback_name+'</span><span>'+feedback_contact+'</span><span>'+feedback_message+'</span><div><button>删除</button></div></li>');
    ZD.couple.Container.append(a);
    a.data={
        id:feedback_id,
        name:feedback_name,
        contact:feedback_contact,
        message:feedback_message
    };
    var button=a[0].getElementsByTagName('button');
    button[0].onclick=function () {
        ZD.couple.Delete(a)
    };
};
ZD.couple.Delete=function(type){
    var a=confirm('确认删除'+type.data.name+'这个反馈信息吗');
    if(a===true){
        ZD.AJAX({
            url:'/service/DeleteFeedBack',
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
ZD.couple.init=function () {
    ZD.couple.Size = 6;
    ZD.couple.Head='<li class="ZD-Ul-head CoupleList-head"><span>反馈用户</span><span>联系方式</span><span>反馈内容</span><span>操作</span></li>';
    ZD.couple.List=$(".CaseShowMain");
    ZD.couple.Container=$('.CoupleList');
    ZD.couple.PageContainer = $('.CouplePageContainer')[0];
    ZD.couple.Load(ZD.GetUrlParam('page')||1);
}();