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
            ZD.Case.Container[0].innerHTML='';

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
ZD.Case.Print=function(case_id,case_name,case_preview) {
    var preview = '<img src="' + ZD.Service + '/' + case_preview + '">';
    if (case_preview === '无图' || case_preview === 'null' || case_preview === null) {
        preview = '<p>无图</p>';
    }
    var a = $(' <div class="col-lg-4 col-sm-6 col-xs-12 zoomIn animated">\n' +
        '                    <div class="picture1"><a class="Jfancybox" rel="group" href="' + ZD.Service + '/' + case_preview + '"> <span class="icon-search magnifier"></span><div class="p-1"><img src="' + ZD.Service + '/' + case_preview + '"><div class="h-text"><p>' + case_name + '</p></div></div></a></div>\n' +
        '                </div>');
    ZD.Case.Container.append(a);
    a.data = {
        id: case_id,
        name: case_name,
        preview: case_preview
    };
};
ZD.Case.Init=function () {
    ZD.Case.Size = 6;
    ZD.Case.Container=$(".CaseContainer");
    ZD.Case.PageContainer=$(".pagination");
    ZD.Case.Load(ZD.GetUrlParam('page')||1);
}();