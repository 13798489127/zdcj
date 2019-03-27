NameSpace.register('ZD.Detail');

$(document).ready(function () {
    ZD.Detail.Nav = $('.ZD_ProDet_Type_Con');
    var type = ZD.GetUrlParam('type');
    var classId = ZD.GetUrlParam('class');
    var id = ZD.GetUrlParam('id');
    ZD.Detail.GetType(type, classId, id);
});

ZD.Detail.GetType = function (type, classId, id) {
    var flag = type === 'news';
    if (flag) {
        $('ul.navbar-nav').children()[4].className = 'active';
    } else {
        $('ul.navbar-nav').children()[2].className = 'active';
    }
    var data = {
        title: flag ? '新闻动态' : '产品展示',
        head: flag ? '新闻动态' : '厨房产品展示',
        h1: flag ? 'N' : 'P',
        p: flag ? "ews" : 'roducct',
        htmlName: flag ? 'news' : 'product',
        typeName: flag ? '新闻详情' : '产品详情',
        portName: flag ? 'News' : 'Product'
    };
    $(".ZD_ProDet_Type_Head h1")[0].innerHTML = data.h1;
    $('.ZD_ProDet_Type_Head p')[0].innerHTML = data.head;
    $('.ZD_ProDet_Type_Head p')[1].innerHTML = data.p;
    $('.NavHeadContainer >span').html(data.title);
    $('.NavHeadContainer .pull-right').html('<p> 当前位置：<a href="index.html">首页</a>><a href="' + data.htmlName + '.html">' + data.title + '</a>>' + data.typeName + ' </p>');
    ZD.AJAX({
        url: '/service/' + 'Get' + data.portName + 'Type',
        success: function (rs) {
            var classify_id, classify_name, classify_position;
            ZD.Detail.Nav.html('');
            for (var i = 0; i < rs.length; i++) {
                classify_id = rs[i].classify_id;
                classify_name = rs[i].classify_name;
                classify_position = rs[i].classify_position;
                ZD.Detail.PrintType(classify_id, classify_name, data.portName);
            }
            if (classId) {
                $("#" + classId)[0].className = 'active';
                $('.ZD_ProDet_Info .type_title').html($("#" + classId).html());
                if (id) {
                    ZD.Detail.GetDetail(classId, id, data.portName);
                } else {
                    $("#" + classId).click();
                }
            } else {
                $("#" + rs[0].classify_id)[0].className = 'active';
                $("#" + rs[0].classify_id).click();
            }
        }
    })
};

ZD.Detail.PrintType = function (classify_id, classify_name, port_name) {
    return $('<li id="' + classify_id + '"></li>').html(classify_name).click(function () {
        ZD.Detail.Switch(classify_id, 1, -1, port_name);
        $('.ZD_ProDet_Info .type_title').html(classify_name);
        $('.ZD_ProDet_Type_Con .active').removeClass('active');
        $(this).addClass('active');
    }).appendTo(ZD.Detail.Nav);
};

ZD.Detail.GetDetail = function (classId, id, port_name) {
    ZD.AJAX({
        url: '/service/Get' + port_name + 'Detail',
        data: {id: id},
        success: function (rs) {
            ZD.Detail.SetValue(rs, port_name);
        }
    });
};

ZD.Detail.Switch = function (classId, state, position, port_name) {
    ZD.AJAX({
        url: '/service/Get' + port_name + 'ByPos',
        data: {type: classId, state: state, position: position},
        success: function (rs) {
            ZD.Detail.SetValue(rs, port_name);
        }
    });
};

ZD.Detail.SetButtonFun = function (classId, position, port_name) {

    $('.page_button').children()[0].onclick = function () {
        ZD.Detail.Switch(classId, -1, position, port_name);
    };

    $('.page_button').children()[1].onclick = function () {
        ZD.Detail.Switch(classId, 1, position, port_name);
    };

};

ZD.Detail.SetValue = function (data, port_name) {

    if (!data) {
        alert(port_name.toLocaleLowerCase() === 'news' ? '更多资讯请留意官网更新...' : '更多产品即将上线...');
    } else {
        $('.ZD_ProDet_Info .product_name').html(data.product_name || data.news_title);
        if (data.product_prview) {
            $('.ZD_ProDet_Info .product_img').show();
            $('.ZD_ProDet_Info .product_img').children('img').attr('src', ZD.Service + '/' + data.product_prview);
        } else {
            $('.ZD_ProDet_Info .product_img').hide();
        }
        $('.ZD_ProDet_Info .product_describe').children('p').html(data.product_desp || data.news_content);
        $('.ZD_ProDet_Info .create_time').html(data.create_time);
        $('.ZD_ProDet_Info .brower_count').html(data.brower_count || 0);
        ZD.SetState({
            type: port_name.toLocaleLowerCase(),
            class: data.product_classify || data.classify_id,
            id: data.product_id || data.news_id
        });
        ZD.Detail.SetButtonFun(data.product_classify || data.classify_id, data.product_position || data.news_position, port_name);
    }
};

