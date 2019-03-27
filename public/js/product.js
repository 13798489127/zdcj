ZD.Product = NameSpace.register('ZD.Product');

ZD.Product.LoadProductType = function () {
    ZD.AJAX({
        url: '/service/GetProductType',
        success: function (rs) {
            var classify_id, classify_name, classify_position;
            ZD.Product.Nav.html('');
            for (var i = 0; i < rs.length; i++) {
                classify_id = rs[i].classify_id;
                classify_name = rs[i].classify_name;
                classify_position = rs[i].classify_position;
                ZD.Product.PrintType(classify_id, classify_name, classify_position)
            }
            if (ZD.GetUrlParam('type')) {
                ZD.Product.LoadProduct(ZD.GetUrlParam('type') || rs[0].classify_id, ZD.GetUrlParam('page') || 1);
                $("#" + ZD.GetUrlParam('type') || rs[0].classify_id)[0].className = 'filter active';
            } else {
                $(".filter")[0].click()
            }
        }
    })
};
ZD.Product.PrintType = function (classify_id, classify_name, classify_position) {
    var a = $(' <li id="' + classify_id + '" class="filter" data-filter="' + classify_id + '"><a>' + classify_name + '</a></li>');
    a.data = {
        id: classify_id,
        name: classify_name,
        position: classify_position
    };
    ZD.Product.Nav.append(a);
    a.on('click', function () {
        var fliter = $(".filter");
        for (var i = 0; i < fliter.length; i++) {
            fliter[i].className = 'filter';
        }
        a[0].className = 'filter active';
        ZD.Product.LoadProduct(classify_id, 1);
        if (history.pushState) {
            history.pushState({}, document.title, ZD.ChangeUrlParam({type: classify_id}));
        }
    })
};

ZD.Product.LoadProduct = function (type, page) {
    var size = 8;
    ZD.AJAX({
        url: '/service/GetProductByType',
        data: {
            type: type,
            page: page,
            size: size
        },
        success: function (rs) {
            ZD.Product.Container[0].innerHTML = '';
            if (rs.length === 0) {
                ZD.Product.Container.append($('<p style="text-align: center; line-height: 100px;">暂无产品</p>'));
                return;
            }
            var product_id, product_classify, product_name, product_desp, product_prview;
            ZD.Product.allCount = rs[0].all_count;
            for (var i = 0; i < rs.length; i++) {
                product_id = rs[i].product_id;
                product_classify = rs[i].product_classify;
                product_name = rs[i].product_name;
                product_desp = rs[i].product_desp;
                product_prview = rs[i].product_prview;

                ZD.Product.PrintProduct(product_id, product_classify, product_name, product_desp, product_prview);
            }
            $('.show_hide').showHide({
                speed: 500,
                changeText: 0,
                showText: 'View',
                hideText: 'Close'
            });
            //分页容器 ZD.Product.PageContainer
            if (ZD.Product.PageType !== type) {
                ZD.Product.PageType = type;
                $(ZD.Product.PageContainer).html('');
                new ZD.Page(ZD.Product.PageContainer, Math.ceil(ZD.Product.allCount / size), function (page) {
                    if (history.pushState) {
                        history.pushState({}, document.title, ZD.ChangeUrlParam({
                            page: page,
                            type: ZD.Product.PageType
                        }));
                    }
                    ZD.Product.LoadProduct(ZD.Product.PageType, page);
                });
            }
        }
    })
};

ZD.Product.PrintProduct = function (product_id, product_classify, product_name, product_desp, product_prview) {
    var a = $(
        '<li class="col-md-3">' +
        '   <div class="thumbnail animated ">' +
        '       <img src="' + ZD.Service + '/' + product_prview + '" alt="' + product_name + '" draggable="false">' +
        '       <a class="more show_hide" rel="#sliding' + product_id + '">' +
        '           <i class="icon-search"></i>' +
        '       </a>' +
        '       <h3>' + product_name + '</h3>' +
        '       <div class="mask" ></div>' +
        '   </div>' +
        '</li>');
    $('.more', a)[0].onclick = $('.mask', a)[0].onclick = function () {
        ZD.Product.OpenDetail(product_classify, product_id);
    };

    // var b=$('<div id="sliding'+product_id+'" class="toggleDiv row-fluid single-project" style="display: none">\n' +
    //     '                <div class="col-md-6">\n' +
    //     '                    <img src="'+ZD.Service+'/'+product_prview+'" alt="'+product_name+'" draggable="false"></div>\n' +
    //     '                <div class="col-md-6">\n' +
    //     '                    <div class="project-description">\n' +
    //     '                        <div class="project-title clearfix">\n' +
    //     '                            <h3>产品详细信息</h3>\n' +
    //     '                            <span class="show_hide close"><i class="icon-cancel"></i></span>\n' +
    //     '                        </div>\n' +
    //     '                         <div class="project-info">\n' +product_desp+
    //     '                        </div>\n' +
    //     '                    </div>\n' +
    //     '                </div>\n' +
    //     '            </div>');
    a.data = {
        product_id: product_id,
        product_classify: product_classify,
        product_name: product_name,
        product_desp: product_desp,
        product_prview: product_prview
    };
    ZD.Product.Container.append(a);
    // ZD.Product.Detail.append(b);
};

ZD.Product.OpenDetail = function (classId, id) {
    // window.location.href = ZD.Service + '/detail.html?type=product&class=' + classId + '&id=' + id;
    window.open(ZD.Service + '/detail.html?type=product&class=' + classId + '&id=' + id);
};

ZD.Product.Init = function () {
    ZD.Product.Nav = $(".nav-pills");
    ZD.Product.Container = $("#portfolio-grid");
    ZD.Product.Detail = $("#single-project");
    ZD.Product.PageContainer = $(".pagination");
    ZD.Product.LoadProductType();
}();