NameSpace.register('ZD.Services');
$(document).ready(function (e) {
    ZD.Services.GetData();
});
/*
* 获取所有客服函数
* */
ZD.Services.GetData = function () {
    ZD.AJAX({
        url: '/service/GetService',
        success: function (rs) {
            ZD.Services.Empty();
            rs.forEach(function (data) {
                ZD.Services.Print(data);
            });
            ZD.Services.NoData();
            ZD.Services.Max = Math.max($('.ZD_Service').children().length - 1, ZD.Services.Max);
        }
    });
};
ZD.Services.Head = '<li class="ZD-Ul-head productList-head"><span>产品预览/名称</span><span>设置排序</span><div>操作</div></li>';
/*
* 清空处理
* */
ZD.Services.Empty = function () {
    $('.ZD_Service').html(ZD.Service.Head);
};

/*
* 打印数据
* @param data {object} 客服信息JSON
* */
ZD.Services.Print = function (data) {
    ZD.Services.Max = Math.max(data.service_position, ZD.Services.Max);
    var li = $('<li>' +
        '<span>' + data.service_code + '</span>' +
        '<span>' + data.service_name + '</span>' +
        '<span>' + data.service_position + '</span>' +
        '</li>').appendTo($('.ZD_Service')[0]);

    var opera = $('<div></div>').appendTo(li);
    $('<button>编辑</button>').appendTo(opera).click(function () {
        ZD.Services.Update(data, li);
    });
    $('<button>删除</button>').appendTo(opera).click(function () {
        ZD.Services.Delete(li, data);
    });
};

/*
* 无数据处理
* */
ZD.Services.NoData = function () {
    var li = $('.ZD_Service').children();
    if (li.length <= 1) {
        $('<li style="text-align: center; line-height: 100px;">暂无数据</li>').appendTo($('.ZD_Service'));
    }
};

/*
* 添加按钮界面显示设置
* */
ZD.Services.Add = function () {
    ZD.Services.ControlShow('ZD_Service_Add');
    ZD.Services.SetValue('ZD_Service_Add');
};

/*
* 添加Service请求发送
* */
ZD.Services.AddRequest = function () {
    var input = $('.ZD_Service_Add input');
    if (input[1].value > ZD.Services.Max + 1) {
        return alert('排序位置超出限制范围,有效范围为：1-' + (ZD.Services.Max + 1));
    }
    ZD.AJAX({
        url: '/service/AddService',
        data: {
            service_name: input[0].value,
            service_position: input[1].value,
            service_code: $('.ZD_Service_Add textarea').val()
        },
        success: function (rs) {
            if (rs[0] && rs[0].state === 'success') {
                ZD.Services.Change = true;
                ZD.Services.SetValue('ZD_Service_Add');
            }
            alert(re[0].msg);
        }
    });
};

/*
* 返回函数
* 检查是否跟新
* */
ZD.Services.AddBack = function () {
    if (ZD.Services.Change) {
        ZD.Services.GetData();
        ZD.Services.Change = false;
    }
    ZD.Services.ControlShow('ZD_Service_List');
};

/*
* 跟新界面显示控制
* @param data [object] 被操作的原始数据
* */
ZD.Services.Update = function (data, li) {
    ZD.Services.ControlShow('ZD_Service_Update');
    ZD.Services.SetValue('ZD_Service_Update', data);
    $('.ZD_Service_Update').find('button')[1].onclick = function () {
        ZD.Services.UpdateRequest(data, li);
    };
};

/*
* 更新请求发送
* 在此处判断是否需要修改图片
* @param data [object]  原始数据
* @param li   [element] 数据展示的元素
* */
ZD.Services.UpdateRequest = function (data, li) {
    var input = $('.ZD_Service_Update input');
    if (input[1].value > ZD.Services.Max + 1) {
        return alert('排序位置超出限制范围,有效范围为：1-' + (ZD.Services.Max + 1));
    }
    ZD.AJAX({
        url: '/service/UpdateService',
        data: {
            service_id: data.service_id,
            service_name: input[0].value,
            service_position: input[1].value,
            service_code: $('.ZD_Service_Update textarea').val(),
            old_position: data.service_position
        },
        success: function (rs) {
            if (rs[0] && rs[0].state === 'success') {
                ZD.Services.GetData();
                alert(rs[0].msg);
                ZD.Services.ControlShow('ZD_Service_List');
            }
        }
    });
};

/*
* 设置内容
* @param className [string]  设置内容的外出元素className
* @param data      [object]  数据信息
* */
ZD.Services.SetValue = function (className, data) {
    data = data || {};
    $('.' + className + ' input')[0].value = data.service_name || '';
    $('.' + className + ' input')[1].value = data.service_position || '';
    $('.' + className + ' textarea')[0].value = data.service_code || '';
};


/*
* 删除方法
* @param li   [element] 删除的元素
* @param data [object] 数据
* */
ZD.Services.Delete = function (li, data) {
    var _confirm = confirm('确认删除' + data.service_name + '这个客服吗');
    if (_confirm === true) {
        ZD.AJAX({
            url: '/service/DeleteService',
            data: {id: data.service_id},
            success: function (rs) {
                if (rs[0] && rs[0].state === 'success') {
                    li.remove();
                    ZD.Services.NoData();
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
ZD.Services.ControlShow = function (className) {
    $('.zd_admin_right_content_main').children().hide();
    $('.' + className).show();
};


