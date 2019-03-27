ZD.News=NameSpace.register('ZD.News');
ZD.News.LoadType=function(){
    ZD.AJAX({
        url: '/service/GetNewsType',
        success: function (rs) {
            var classify_id, classify_name, classify_position;
            ZD.News.ListContainer.html('');
            for (var i = 0; i < rs.length; i++) {
                classify_id = rs[i].classify_id;
                classify_name = rs[i].classify_name;
                classify_position = rs[i].classify_position;
                ZD.News.PrintType(classify_id, classify_name, classify_position)
            }
            if (ZD.GetUrlParam('type')&&ZD.GetUrlParam('type')!=='undefined') {

            }else{
                ZD.News.NowType = rs[0].classify_id;
            }
            ZD.News.LoadByType(ZD.News.NowType||ZD.GetUrlParam('type'), ZD.GetUrlParam('page') || 1);
            ZD.News.GetProduct();
        }
    })
};
ZD.News.PrintType=function(id,name){
    var a=$('<li id="'+id+'" class="news-right-list animated fadeInRight">'+name+'</li>');
    a[0].onclick=function () {
        ZD.News.LoadByType(id,1);
    };
    ZD.News.ListContainer.append(a);
};
ZD.News.LoadByType=function(type,page){
    var list=$(".news-right-list");
    list.removeClass('RightActive');
    $("#"+type).addClass('RightActive');
    ZD.AJAX({
        url: '/service/GetNewsByType',
        data: {
            type: type,
            page: page,
            size: ZD.News.Size
        },
        success: function (rs) {
            if (history.pushState) {
                history.pushState({}, document.title, ZD.ChangeUrlParam({page: page, type: type}));
            }
            ZD.News.Container[0].innerHTML ='';
            if (rs.length === 0) {
                ZD.News.PageType = type;
                ZD.News.Container.append($('<li style="text-align: center; line-height: 100px;">暂无数据</li>'));
                $(ZD.News.PageContainer).html('');
                return;
            }
            ZD.News.allCount = rs[0].all_count;
            var news_id, classify_id, news_title, create_time, news_content;
            for (var i = 0; i < rs.length; i++) {
                news_id = rs[i].news_id;
                classify_id = rs[i].classify_id;
                news_title = rs[i].news_title;
                create_time = rs[i].create_time;
                news_content = rs[i].news_content;
                ZD.News.PrintNews(news_id, classify_id, news_title, create_time, news_content);
            }
            //分页容器 ZD.News.PageContainer
            if (ZD.News.PageType !== type) {
                $(ZD.News.PageContainer).html('');
                ZD.News.PageType = type;
                ZD.News.Page = new ZD.Page(ZD.News.PageContainer, Math.ceil(ZD.News.allCount / ZD.News.Size), function (page) {
                    ZD.News.LoadByType(ZD.News.PageType, page);
                });
            }
        }
    })
};
ZD.News.PrintNews = function (news_id, classify_id, news_title, create_time, news_content) {
    var time=create_time.split(' ')[0];
    var a=$('<div class="news-List"><div class="news-List-left"><p>'+time.substr(0,7)+'</p><span>'+time.split('-')[2]+'</span></div class="news-List-right"><div class="news-List-right"><p class="news-List-right-title">'+news_title+'</p><div class="news-List-right-content">'+news_content+'</div></div></div>');
    a[0].onclick=function(){
        window.open(ZD.Service + '/detail.html?type=news&class=' + classify_id + '&id=' + news_id);
    };
    ZD.News.Container.append(a);
};
ZD.News.GetProduct=function(){
    ZD.News.ProductContainer=$(".news-right-product");
    ZD.News.PrintProduct=function(product_id, product_classify, product_name, product_desp, product_prview){
        (product_desp==='无'||product_desp.length===0)?product_desp='深圳市正东厨房设备有限公司推荐产品':product_desp;
        var a=$('<div class="news-classify">\n' +
            '                            <div class="news-classify-pic">\n' +
            '                                    <img src="'+ZD.Service+'/'+product_prview+'">\n' +
            '                            </div>\n' +
            '                            <div class="news-classify-text">'+product_name+'<p>'+product_desp+'</p></div>\n' +
            '                        </div>');
        a[0].data={
            "id":product_id,
            "classify":product_classify
        };
        ZD.News.ProductContainer.append(a);
        a[0].onclick=function () {
            window.open(ZD.Service + '/detail.html?type=product&class=' + this.data.classify + '&id=' + this.data.id);
        };
    };
    ZD.AJAX({
        url:  '/service/GetCommentProduct',
        success: function (rs) {
            if (rs.length === 0) {
                _this.Container.append($('<p style="text-align: center; line-height: 100px;">暂无产品</p>'));
                return;
            }
            var product_id, product_classify, product_name, product_desp, product_prview;
            for (var i = 0; i < rs.length; i++) {
                product_id = rs[i].product_id;
                product_classify = rs[i].product_classify;
                product_name = rs[i].product_name;
                product_desp = rs[i].product_desp;
                product_prview = rs[i].product_prview;
                ZD.News.PrintProduct(product_id, product_classify, product_name, product_desp, product_prview);
            }

        }
    })
};
ZD.News.Init=function () {
    ZD.News.Size =9;
    ZD.News.ListContainer=$('.ZD-NewsList');
    ZD.News.Container=$(".news-left");
    ZD.News.PageContainer=$(".pagination");
    ZD.News.LoadType();
}();