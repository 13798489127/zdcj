ZD.WebInfo=NameSpace.register('ZD.WebInfo');
ZD.WebInfo.load=function(){
  ZD.AJAX({
      url:'/service/GetWebInfo',
      data:{
          abd:123,
          a:234
      },
      success:function (rs) {
          rs=rs[0];
          ZD.WebInfo.Input[0].value=rs.web_seodesp;
          ZD.WebInfo.Input[1].value=rs.web_titles;
          ZD.WebInfo.Input[2].value=rs.web_seokey;
          ZD.WebInfo.Input[3].value=rs.web_copyright;
          ZD.WebInfo.Input[4].value=rs.company_landline;
          ZD.WebInfo.Input[5].value=rs.company_phone;
          ZD.WebInfo.Input[6].value=rs.company_fax;
          ZD.WebInfo.Input[7].value=rs.company_email;
          ZD.WebInfo.Input[8].value=rs.company_name;
          ZD.WebInfo.Input[9].value=rs.company_address;
          ZD.WebInfo.Input[10].value=rs.company_contact;
          ZD.WebInfo.Input[11].value=rs.company_web;
          ZD.WebInfo.Logo.src=ZD.Service+'/'+rs.web_logo;
      }
  })
};
ZD.WebInfo.post=function(button){
    button.disabled=true;
    if(ZD.WebInfo.File.value.length){
        if(ZD.CheckUpLoad(ZD.WebInfo.File.value)){
            ZD.UpLoad('logo',ZD.WebInfo.File,null,null,function (rs) {
                ZD.WebInfo.File.value='';
                if(rs[0].state==='success') {
                    ZD.WebInfo.Update(button);
                }else{
                    alert(rs[0].msg);
                }
            });
        }else{
            alert(ZD.WebInfo.File.value+'不符合文件要求');
            ZD.WebInfo.File.value='';
        }
    }else{
        ZD.WebInfo.Update(button);
    }
    //'logo/product/case'logo或者产品或者案例file:'文件域', old_file:'需要删除的文件（文件名）,自定义数据一般为id'
};
ZD.WebInfo.Update=function(button){
    ZD.AJAX({
        url: '/service/EditWebInfo',
        data: {
            web_seodesp: ZD.WebInfo.Input[0].value,
            web_titles: ZD.WebInfo.Input[1].value,
            web_seokey: ZD.WebInfo.Input[2].value,
            web_copyright: ZD.WebInfo.Input[3].value,
            company_landline: ZD.WebInfo.Input[4].value,
            company_phone: ZD.WebInfo.Input[5].value,
            company_fax: ZD.WebInfo.Input[6].value,
            company_email: ZD.WebInfo.Input[7].value,
            company_name: ZD.WebInfo.Input[8].value,
            company_address: ZD.WebInfo.Input[9].value,
            company_contact: ZD.WebInfo.Input[10].value,
            company_web: ZD.WebInfo.Input[11].value
        },
        success: function (rs) {
            button.disabled = false;
            rs = rs[0];
            if (rs.state==='success') {
                ZD.WebInfo.Input[0].value = rs.web_seodesp;
                ZD.WebInfo.Input[1].value = rs.web_titles;
                ZD.WebInfo.Input[2].value = rs.web_seokey;
                ZD.WebInfo.Input[3].value = rs.web_copyright;
                ZD.WebInfo.Input[4].value = rs.company_landline;
                ZD.WebInfo.Input[5].value = rs.company_phone;
                ZD.WebInfo.Input[6].value = rs.company_fax;
                ZD.WebInfo.Input[7].value = rs.company_email;
                ZD.WebInfo.Input[8].value = rs.company_name;
                ZD.WebInfo.Input[9].value = rs.company_address;
                ZD.WebInfo.Input[10].value = rs.company_contact;
                ZD.WebInfo.Input[11].value = rs.company_web;
            }
            alert(rs.msg)
        }
    })
};
ZD.WebInfo.init=function () {
    ZD.WebInfo.Input=$(".webInfoMain [info]");
    ZD.WebInfo.Buton=$(".webInfoMain button")[0];
    ZD.WebInfo.File=$(".WebImfoFile")[0];
    ZD.WebInfo.Logo=$(".webInfoMain img")[0];
    ZD.WebInfo.Buton.onclick=function(){
        ZD.WebInfo.post(this);
    };
    ZD.WebInfo.load();
}();