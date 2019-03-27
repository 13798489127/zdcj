ZD.Index=NameSpace.register('ZD.Index');
//产品板块开始
ZD.Index.Product={
    load:function(){
        var _this=this;
        ZD.AJAX({
            url:  '/service/GetCommentProduct',
            success: function (rs) {
                _this.Container[0].innerHTML='';
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
                    _this.PrintProduct(product_id, product_classify, product_name, product_desp, product_prview);
                }
                $('.show_hide').showHide({
                    speed: 500,
                    changeText: 0,
                    showText: 'View',
                    hideText: 'Close'
                });
            }
        })
    },
    PrintProduct:function(product_id, product_classify, product_name, product_desp, product_prview){
        var a = $('<li class="col-md-3"><div class="thumbnail animated fadeInDown"><img src="'+ZD.Service+'/'+product_prview+'" alt="'+product_name+'" draggable="false"><a class="more show_hide" rel="#sliding'+product_id+'"><i class="icon-plus"></i></a><h3>'+product_name+'</h3><div class="mask"></div></div></li>');
        var b=$('<div id="sliding'+product_id+'" class="toggleDiv row-fluid single-project" style="display: none">\n' +
            '                <div class="col-md-6">\n' +
            '                    <img src="'+ZD.Service+'/'+product_prview+'" alt="'+product_name+'" draggable="false"></div>\n' +
            '                <div class="col-md-6">\n' +
            '                    <div class="project-description">\n' +
            '                        <div class="project-title clearfix">\n' +
            '                            <h3>产品详细信息</h3>\n' +
            '                            <span class="show_hide close"><i class="icon-cancel"></i></span>\n' +
            '                        </div>\n' +
            '                        <div class="project-info">\n' +product_desp+
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>');
        a.data = {
            product_id: product_id,
            product_classify: product_classify,
            product_name: product_name,
            product_desp: product_desp,
            product_prview: product_prview
        };
        this.Container.append(a);
        this.Detail.append(b);
    },
    init:function () {
        this.Container=$("#portfolio-grid");
        this.Detail=$("#single-project");
        this.load();
    }
};
//新闻板块开始
ZD.Index.News={
    load:function () {
        var _this=this;
        ZD.AJAX({
            url:  '/service/GetIndexNews',
            success: function (rs) {
                _this.Container[0].innerHTML='';
                if (rs.length === 0) {
                    _this.Container.append($('<p style="text-align: center; line-height: 100px;">暂无数据</p>'));
                    return;
                }
                var news_id, classify_name, news_title, news_content, news_preview,create_time;
                for (var i = 0; i < rs.length; i++) {
                    news_id = rs[i].news_id;
                    classify_name = rs[i].classify_name;
                    news_title = rs[i].news_title;
                    news_content = rs[i].news_content;
                    news_preview = rs[i].news_preview;
                    create_time=rs[i].create_time;
                    _this.PrintNews(news_id, classify_name, news_title, news_content, news_preview,create_time);
                }
            }
        })
    },
    PrintNews:function (news_id, classify_name, news_title, news_content, news_preview,create_time) {
        var a='<div class="col-md-4"><div class="testimonial"><p>'+news_content+'</p><div class="whopic"><div class="arrow"></div><strong>'+classify_name+'<small>'+create_time+'</small></strong></div></div></div>';
        this.Container.append(a);
    },
    init:function () {
        this.Container=$(".NewsContainer");
        this.load();
    }
};
//成功案例开始
ZD.Index.Case={
    load:function(){
        var _this=this;
        ZD.AJAX({
            url:  '/service/GetIndexCase',
            success: function (rs) {
                _this.Container[0].innerHTML='';
                var case_id, case_name, case_preview;
                for (var i = 0; i < rs.length; i++) {
                    case_id = rs[i].case_id;
                    case_name = rs[i].case_name;
                    case_preview = rs[i].case_preview;
                    _this.PrintCase(case_id, case_name, case_preview);
                }
                _this.Container.bxSlider({
                    pager: false,
                    minSlides: 1,
                    maxSlides: 5,
                    moveSlides: 2,
                    slideWidth: 210,
                    slideMargin: 25,
                    prevSelector: $('#client-prev'),
                    nextSelector: $('#client-next'),
                    prevText: '<i class="icon-left-open"></i>',
                    nextText: '<i class="icon-right-open"></i>'
                });
            }
        })
    },
    PrintCase:function(case_id, case_name, case_preview){
        var a= '<li class="bx-clone" title="'+case_name+'"><img src="'+ZD.Service+'/'+case_preview+'" alt="'+case_name+'" draggable="false"></a></li>';
        this.Container.append(a);
    },
    init:function () {
        this.Container=$("#clint-slider");
        this.load();
    }
};
//联系我们开始
ZD.Index.Contact={
    init:function f() {
        var _this=this;
        this.Input=$(".contact-form *");
        this.Button=$(".contact-form button")[0];
        this.Button.onclick=function () {
            if(!_this.Input[1].value.length){
                alert('请输入您的姓名');
                return false
            }
            if(!_this.Input[2].value.length){
                alert('请输入您的联系方式');
                return false
            }
            if(!_this.Input[3].value.length){
                alert('请输入您的留言内容');
                return false
            }
            ZD.AJAX({
                url:"/service/FeedBack",
                data:{
                    name:_this.Input[1].value,
                    contact:_this.Input[2].value,
                    content:_this.Input[3].value
                },
                success:function (rs) {
                    rs=rs[0];
                    if(rs.state==='success'){
                        _this.Input[1].value=_this.Input[2].value=_this.Input[3].value='';
                    }
                    alert(rs.msg);
                }
            })
        }
    }
};
ZD.Index.Init=function () {
    ZD.Index.Product.init();//初始化加载产品
    ZD.Index.News.init();//初始化加载新闻
    ZD.Index.Case.init();//初始化加载成功案例
    ZD.Index.Contact.init();
}();