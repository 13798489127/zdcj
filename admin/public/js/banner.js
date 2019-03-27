NameSpace.register('ZD.Banner');

/*
* 页面第一启动项
* */
$(document).ready(function () {
    ZD.Banner();
    ZD.Banner.ControlShow('ZD_Banner_List');
    ZD.Banner.Max = 1;
});

/*
* 设置默认最大值
* */
ZD.Banner.Max = 1;

/*
* 初始化获取所有banner函数
* */
ZD.Banner = function () {
    ZD.AJAX({
        url: '/service/GetBanner',
        success: function (rs) {
            ZD.Banner.Empty();
            rs.forEach(function (data) {
                ZD.Banner.Print(data);
            });
            var length = $('.ZD_Banner').children().length;
            length > ZD.Banner.Max && (ZD.Banner.Max = length);
            ZD.Banner.NoData();
        }
    });
};

/*
* 清空处理
* */
ZD.Banner.Empty = function () {
    var i = 1;
    var li = $('.ZD_Banner').children();
    for (i; i < li.length; i++) {
        $(li[i]).remove();
    }
};


/*
* 无数据处理
* */
ZD.Banner.NoData = function () {
    var li = $('.ZD_Banner').children();
    if (li.length <= 1) {
        $('<li style="text-align: center; line-height: 100px;">暂无数据</li>').appendTo($('.ZD_Banner'));
    }
};

/*
* 打印函数
* @param data [object] 数据源
* */
ZD.Banner.Print = function (data) {
    ZD.Banner.Max < data.banner_position && (ZD.Banner.Max = data.banner_position);
    var li = $('<li></li>').appendTo($('.ZD_Banner')[0]);
    var span = $('<span></span>').appendTo(li);
    $('<p></p>').css({'font-size': '20px', 'font-weight': 'bold'}).html(data.banner_title).appendTo(span);
    $('<p></p>').css({'font-size': '16px', 'font-weight': 'bold'}).html(data.banner_titles).appendTo(span);
    $('<p></p>').html(data.banner_desp).appendTo(span);
    $('<span></span>').html('<img alt="图片丢失" src="' + ZD.Service + '/' + data.banner_preview + '" />').appendTo(li);
    $('<span></span>').html('<a href="' + data.banner_href + '" alt=' + data.banner_title + '">' + data.banner_href + '</a>').appendTo(li);
    $('<span></span>').html('当前位置:' + data.banner_position).appendTo(li);
    var opera = $('<div></div>').appendTo(li);
    $('<button>编辑</button>').appendTo(opera).click(function () {
        ZD.Banner.Update(data);
    });

    $('<button>删除</button>').appendTo(opera).click(function () {
        ZD.Banner.Delete(li, data);
    });
};


/*
* 添加按钮界面设置
* */
ZD.Banner.Add = function () {
    ZD.Banner.ControlShow('ZD_Banner_Add');
    ZD.Banner.SetValue('ZD_Banner_Add');
};

/*
* 添加Banner请求发送
* */
ZD.Banner.AddRequest = function () {
    var file = $('.ZD_Banner_Add input[type=file]');
    var input = $('.ZD_Banner_Add').find('input');
    if (input[2].value > ZD.Banner.Max + 1) {
        return alert('排序位置超出限制范围,有效范围为：1-' + (ZD.Banner.Max + 1));
    }
    if (file.val()) {
        ZD.AJAX({
            url: '/service/AddBanner',
            data: {
                banner_title: input[0].value,
                banner_titles: input[1].value,
                banner_desp: $('.ZD_Banner_Add').find('textarea').val(),
                banner_href: input[2].value,
                banner_position: input[3].value
            },
            success: function (rs) {
                if (rs[0] && rs[0].state === 'success') {
                    ZD.UpLoad('banner', file[0], null, rs[0].banner_id, function (res) {
                        if (res[0].state === 'success') {
                            ZD.Banner.Change = true;
                            ZD.Banner.SetValue('ZD_Banner_Add');
                        }
                        alert(res[0].msg);
                        ZD.Banner.Back();
                    });
                }
            }
        });
    } else {
        alert('请选择Banner图片!');
    }
};

/*
* 返回函数
* 检查是否跟新
* */
ZD.Banner.Back = function () {
    if (ZD.Banner.Change) {
        ZD.Banner();
        ZD.Banner.Change = false;
    }
    ZD.Banner.ControlShow('ZD_Banner_List');
};

/*
* 设置内容
* @param className [string]  设置内容的外出元素className
* @param data      [object]  数据信息
* */
ZD.Banner.SetValue = function (className, data) {
    data = data ? data : {};
    var input = $('.' + className).find('input');
    var textarea = $('.' + className).find('textarea');
    $(input[0]).val(data.banner_title || '');
    $(input[1]).val(data.banner_titles || '');
    textarea.val(data.banner_desp || '');
    $(input[2]).val(data.banner_href || '');
    $(input[3]).val(data.banner_position || '');
    $('.' + className).find('.ZD_Banner_Preview').html(data.banner_preview ? ('<img alt="" src="' + ZD.Service + '/' + data.banner_preview + '" />') : '');
};

/*
* 跟新界面显示控制
* @param data [object] 被操作的原始数据
* */
ZD.Banner.Update = function (data) {
    ZD.Banner.ControlShow('ZD_Banner_Update');
    ZD.Banner.SetValue('ZD_Banner_Update', data);
    $('.ZD_Banner_Update').find('button')[1].onclick = function () {
        ZD.Banner.UpdateRequest(data);
    };
};

/*
* 更新请求发送
* 在此处判断是否需要修改图片
* @param data [object] 原始数据
* */
ZD.Banner.UpdateRequest = function (data) {
    var file = $('.ZD_Banner_Update input[type=file]');
    if ($('.ZD_Banner_Update').find('input')[3].value > ZD.Banner.Max) {
        return alert('排序位置超出限制范围,有效范围为：1-' + ZD.Banner.Max);
    }
    if (file.val()) {
        ZD.UpLoad('banner', file[0], data.banner_preview, data.banner_id, function (res) {
            if (res[0].state === 'success') {
                ZD.Banner.UpdateInfo(data);
            }
        });
    } else {
        ZD.Banner.UpdateInfo(data);
    }
};


/*
* 更新信息
* @param data [object] 原始数据
* */
ZD.Banner.UpdateInfo = function (data) {
    var input = $('.ZD_Banner_Update').find('input');
    ZD.AJAX({
        url: '/service/UpdateBanner',
        data: {
            banner_id: data.banner_id,
            banner_title: input[0].value,
            banner_titles: input[1].value,
            banner_desp: $('.ZD_Banner_Update').find('textarea').val(),
            banner_href: input[2].value,
            banner_position: input[3].value,
            old_position: data.banner_position
        },
        success: function (rs) {
            if (rs[0] && rs[0].state === 'success') {
                ZD.Banner.Change = true;
                ZD.Banner.Back();
            }
            alert(rs[0].msg);
        }
    });
};

/*
* 删除方法
* @param li   [element] 删除的元素
* @param data [object] 数据
* */
ZD.Banner.Delete = function (li, data) {
    var _confirm = confirm('确认删除' + data.banner_title + '这个Banner吗');
    if (_confirm === true) {
        ZD.AJAX({
            url: '/service/DeleteBanner',
            data: {id: data.banner_id, img_path: data.banner_preview},
            success: function (rs) {
                if (rs[0] && rs[0].state === 'success') {
                    li.remove();
                    ZD.Banner.NoData();
                } else {
                    alert('删除失败');
                }
            }
        });
    }
};

/*
* 界面显示控制
* @param className [string] 显示的界面的className
* */
ZD.Banner.ControlShow = function (className) {
    $('.ZD_Banner_main').children().hide();
    $('.' + className).show();
};

/*
* 即时预览
* @param input [element] 文件域
* */
ZD.Banner.UpLoadPreview = function (input) {
    var box = $(input).parent().prev();
    var img = box.find('img');
    if (!img.length) {
        img = $('<img alt="">').appendTo(box);
    }
    ZD.UpLoadPreview(input, img[0]);
};
