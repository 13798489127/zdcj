ZD.Contact=NameSpace.register('ZD.Contact');
ZD.Contact.Init=function () {
    ZD.Contact.Input=$(".contactPage *");
    ZD.Contact.Button=$(".contactPage button")[0];
    ZD.Contact.Button.onclick=function () {
        if(!ZD.Contact.Input[0].value.length){
            alert('请输入您的姓名');
            return false
        }
        if(!ZD.Contact.Input[1].value.length){
            alert('请输入您的联系方式');
            return false
        }
        if(!ZD.Contact.Input[2].value.length){
            alert('请输入您的留言内容');
            return false
        }
        ZD.AJAX({
            url:"/service/FeedBack",
            data:{
                name:ZD.Contact.Input[0].value,
                contact:ZD.Contact.Input[1].value,
                content:ZD.Contact.Input[2].value
            },
            success:function (rs) {
                rs=rs[0];
                if(rs.state==='success'){
                    ZD.Contact.Input[0].value=ZD.Contact.Input[1].value=ZD.Contact.Input[2].value='';
                }
                alert(rs.msg);
            }
        })
    }
}();