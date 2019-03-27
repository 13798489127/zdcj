ZD.Product = NameSpace.register('ZD.Product');
ZD.Product.LoadProductType = function () {
    ZD.AJAX({
        url: '/service/GetProductType',
        success: function (rs) {
            var classify_id, classify_name, classify_position;
            for (var i = 0; i < rs.length; i++) {
                classify_id = rs[i].classify_id;
                classify_name = rs[i].classify_name;
                classify_position = rs[i].classify_position;
                ZD.Product.PrintType(classify_id, classify_name, classify_position)
            }
            if(ZD.GetUrlParam('type')){
                ZD.Product.Select.val(ZD.GetUrlParam('type'))
            }
        }
    })
};
ZD.Product.PrintType = function (classify_id, classify_name, classify_position) {
    var a = $('<option>' + classify_name + '</option>');
    a.val(classify_id);
    ZD.Product.Select.append(a);
    a = $('<option>' + classify_name + '</option>');
    a.val(classify_id);
    ZD.Product.ControlSelect.append(a);
    a = $('<option>' + classify_name + '</option>');
    a.val(classify_id);
    ZD.Product.AddSelect.append(a);
    a.data = {
        id: classify_id,
        name: classify_name,
        position: classify_position
    };
};
ZD.Product.LoadByType = function (type, page) {
    var url = '/service/GetProductByType';
    if (type === null || type === 'null') {
        url = '/service/GetCommentProduct';
        ZD.CleanUrl();
    }
    ZD.Product.Size = 6;
    ZD.AJAX({
        url: url,
        data: {
            type: type,
            page: page,
            size: ZD.Product.Size
        },
        success: function (rs) {
            ZD.Product.Container[0].innerHTML = ZD.Product.Head;
            if (history.pushState) {
                history.pushState({}, document.title, ZD.ChangeUrlParam({page : page, type : type}));
            }
            if (rs.length === 0) {
                ZD.Product.PageType = type;
                ZD.Product.Container.append($('<li style="text-align: center; line-height: 100px;">暂无产品</li>'));
                return;
            }
            var product_id, product_classify, product_name, product_desp, product_prview, product_position,
                product_recommend, recommend_position;
            ZD.Product.allCount = rs[0].all_count;
            for (var i = 0; i < rs.length; i++) {
                product_id = rs[i].product_id;
                product_classify = rs[i].product_classify;
                product_name = rs[i].product_name;
                product_desp = rs[i].product_desp;
                product_prview = rs[i].product_prview;
                product_position = rs[i].product_position;
                product_recommend = rs[i].product_recommend;
                recommend_position = rs[i].recommend_position;
                ZD.Product.PrintProduct(product_id, product_classify, product_name, product_desp, product_prview, product_position, product_recommend, recommend_position);
            }
            //分页容器 ZD.Product.PageContainer
            if (type != null && type !== 'null') {
                if (ZD.Product.PageType !== type) {
                    $(ZD.Product.PageContainer).html('');
                    ZD.Product.PageType = type;
                    ZD.Product.Page = new ZD.Page(ZD.Product.PageContainer, Math.ceil(ZD.Product.allCount / ZD.Product.Size), function (page) {
                        ZD.Product.LoadByType(ZD.Product.PageType, page);
                    });
                }
            } else {
                ZD.Product.Page = null;
                $(ZD.Product.PageContainer).html('');
                ZD.Product.PageType = '';
            }
        }
    })
};
ZD.Product.PrintProduct = function (product_id, product_classify, product_name, product_desp, product_prview, product_position, product_recommend, recommend_position) {
    var button = '<button>设置首页推荐</button>';
    var preview = '<img src="' + ZD.Service + '/' + product_prview + '"><p>' + product_name + '</p>';
    var position = product_position;
    if (parseInt(product_recommend) === 1) {
        button = '<button>取消推荐</button>';
        position = recommend_position;
    } else {
        position = product_position;
    }
    if (product_prview === '无图' || product_prview === 'null' || product_prview === null) {
        preview = '<p>无图</p><p>' + product_name + '</p>';
    }
    var a = $('<li><span>' + preview + '</span><span>当前位置:' + position + '</span><div>' + button + '<button>编辑</button><button>删除</button></div></li>');
    a.data = {
        product_id: product_id,
        product_classify: product_classify,
        product_name: product_name,
        product_desp: product_desp,
        product_prview: product_prview,
        product_position: product_position,
        product_recommend: product_recommend,
        recommend_position: recommend_position
    };
    ZD.Product.Container.append(a);
    var button = a[0].getElementsByTagName('button');
    button[0].onclick = function () {
        ZD.Product.ChangeCommend(a, this)
    };
    button[1].onclick = function () {
        ZD.Product.Edit(a, this);
    };
    button[2].onclick = function () {
        ZD.Product.Delete(a);
    }
};
ZD.Product.Edit = function (type, button) {
    ZD.Product.AddMenu.hide();
    ZD.Product.List.hide();
    ZD.Product.Control.show();
    ZD.Product.ControlForm[0].value = type.data.product_name;
    if (parseInt(type.data.product_recommend) === 1) {
        ZD.Product.ControlForm[1].value = type.data.recommend_position;
    } else {
        ZD.Product.ControlForm[1].value = type.data.product_position;
    }
    ZD.Product.ControlForm[2].value = type.data.product_desp;
    ZD.Product.ControlForm[3].value = type.data.product_recommend;
    ZD.Product.ControlForm[3].onchange = function () {
        if (parseInt(this.value) === 1) {
            ZD.Product.ControlForm[1].value = type.data.recommend_position;
        } else {
            ZD.Product.ControlForm[1].value = type.data.product_position;
        }
    };
    ZD.Product.ControlForm[4].value = type.data.product_classify;
    if (type.data.product_prview && type.data.product_prview !== '无图') {
        ZD.Product.ControlPreview.src = ZD.Service + '/' + type.data.product_prview;
    }
    ZD.Product.ControlForm[5].onchange = function () {
        ZD.UpLoadPreview(this, ZD.Product.ControlPreview)
    };
    ZD.Product.ControlButton[1].onclick = function () {
        if (!ZD.Product.ControlForm[0].value.length) {
            alert('请输入产品名称');
            return false;
        }
        if (!ZD.Product.ControlForm[1].value.length) {
            alert('请设置产品排序');
            return false;
        }
        if (!ZD.Product.ControlForm[2].value.length) {
            alert('请输入产品描述');
            return false;
        }
        button.disabled = true;
        if (ZD.Product.ControlForm[5].value.length) {
            ZD.UpLoad('product', ZD.Product.ControlForm[5], type.data.product_prview, type.data.product_id, function (rs) {
                ZD.Product.ControlForm[5].value = '';
                if (rs[0].state === 'success') {
                    ZD.Product.Update(type, button);
                } else {
                    alert(rs[0].msg);
                }
            });
        } else {
            ZD.Product.Update(type, button);
        }
    }
};
ZD.Product.Update = function (type, button) {
    ZD.AJAX({
        url: '/service/EditProduct',
        data: {
            product_id: type.data.product_id,
            product_classify: ZD.Product.ControlForm[4].value,
            product_name: ZD.Product.ControlForm[0].value,
            product_desp: ZD.Product.ControlForm[2].value,
            product_position: ZD.Product.ControlForm[1].value,
            product_recommend: ZD.Product.ControlForm[3].value,
            recommend_position: ZD.Product.ControlForm[1].value,
            old_position: type.data.product_position,
            old_recommend_position: type.data.recommend_position
        },
        success: function (rs) {
            button.disabled = false;
            rs = rs[0];
            if (rs.state === 'success') {
                ZD.Product.LoadByType(ZD.Product.NowType, 1);
                ZD.Product.ControlButton[0].click()
            }
            alert(rs.msg);
        }
    })
};
ZD.Product.ChangeCommend = function (type, button) {
    button.disabled = true;
    var state = parseInt(type.data.product_recommend);
    var new_state = -1;
    if (state === 1) {
        new_state = 0;
    } else {
        new_state = 1;
    }
    ZD.AJAX({
        url: '/service/EditCommend',
        data: {
            product_id: type.data.product_id,
            product_recommend: new_state
        },
        success: function (rs) {
            button.disabled = false;
            rs = rs[0];
            if (rs.state === 'success') {
                type.data.product_recommend = new_state;
                if (new_state === 1) {
                    button.innerHTML = '取消推荐';
                } else {
                    button.innerHTML = '设置首页推荐';
                }
                if (ZD.Product.NowType === 'null' || ZD.Product.NowType === '首页推荐') {
                    type.remove()
                }
            }
            alert(rs.msg);
        }
    })
};
ZD.Product.Add = function (button) {
    if (!ZD.Product.AddForm[0].value.length) {
        alert('请输入产品名称');
        return false;
    }
    if (!ZD.Product.AddForm[2].value.length) {
        alert('请输入产品描述');
        return false;
    }
    button.disabled = true;
    ZD.AJAX({
        url: '/service/AddProduct',
        data: {
            product_classify: ZD.Product.AddForm[4].value,
            product_name: ZD.Product.AddForm[0].value,
            product_desp: ZD.Product.AddForm[2].value,
            product_position: ZD.Product.AddForm[1].value,
            product_recommend: ZD.Product.AddForm[3].value,
            recommend_position: ZD.Product.AddForm[1].value
        },
        success: function (rs) {
            button.disabled = false;
            rs = rs[0];
            if (rs.state === 'success') {
                ZD.Product.AddButton[0].click();
                ZD.Product.AddForm[0].value = ZD.Product.AddForm[1].value = ZD.Product.AddForm[2].value = '';
                if (ZD.Product.AddForm[5].value.length) {
                    ZD.UpLoad('product', ZD.Product.AddForm[5], null, rs.product_id, function (res) {
                        ZD.Product.AddForm[5].value = ZD.Product.AddPreview.src = '';
                        if (res[0].state === 'success') {
                            ZD.Product.PrintProduct(rs.product_id, rs.product_classify, rs.product_name, rs.product_desp, res[0].url, rs.product_position, rs.product_recommend, rs.recommend_position);
                        } else {
                            alert(res[0].msg);
                        }
                    });
                } else {
                    ZD.Product.PrintProduct(rs.product_id, rs.product_classify, rs.product_name, rs.product_desp, null, rs.product_position, rs.product_recommend, rs.recommend_position);
                }
                ZD.Product.PageChange(1, rs.recommend_position);
            }
            alert(rs.msg);
        }
    })
};
ZD.Product.PageChange = function (make, now_position) {
    if (ZD.Product.Page) {
        ZD.Product.allCount = Math.max(0, ZD.Product.allCount + make);
        ZD.Product.Page.pageCount = Math.ceil(ZD.Product.allCount / ZD.Product.Size);
        ZD.Product.Page.currentPage = Math.min(ZD.Product.Page.pageCount, Math.ceil(now_position + 1 / ZD.Product.Size));
        ZD.Product.Page.switch(ZD.Product.Page.currentPage);
    }
};
ZD.Product.Delete = function (type) {
    var a = confirm('确认删除' + type.data.product_name + '这个产品吗');
    if (a === true) {
        ZD.AJAX({
            url: '/service/DeleteProduct',
            data: {
                id: type.data.product_id,
                image: type.data.product_prview
            },
            success: function (rs) {
                rs = rs[0];
                if (rs.state === 'success') {
                    ZD.Product.PageChange(-1, type.data.product_position - 1);
                    type.remove();
                }
                alert(rs.msg);
            }
        })
    }
};
ZD.Product.Init = function () {
    ZD.Product.Head = '<li class="ZD-Ul-head productList-head"><span>产品预览/名称</span><span>设置排序</span><div>操作</div></li>';
    ZD.Product.Select = $(".ProductShowType select");
    ZD.Product.NowType = 'null';
    ZD.Product.List = $(".ProductShowMain");
    ZD.Product.Container = $(".productList");
    ZD.Product.Control = $(".ProductMangerControl");
    ZD.Product.ControlForm = $(".ProductMangerControl [info]");
    ZD.Product.ControlButton = $(".ProductMangerControl button");
    ZD.Product.ControlSelect = $(".ProductMangerControlSelect");
    ZD.Product.ControlPreview = $(".ProductMangerControl img")[0];
    ZD.Product.AddMenu = $(".ProductMangerAdd");
    ZD.Product.AddForm = $(".ProductMangerAdd [info]");
    ZD.Product.AddButton = $(".ProductMangerAdd button");
    ZD.Product.AddSelect = $(".ProductMangerAddSelect");
    ZD.Product.AddPreview = $(".ProductMangerAdd img")[0];
    ZD.Product.AddButton[0].onclick = ZD.Product.ControlButton[0].onclick = function () {
        ZD.Product.List.show();
        ZD.Product.Control.hide();
        ZD.Product.AddMenu.hide();
    };
    ZD.Product.AddButton[1].onclick = function () {
        ZD.Product.Add(this);
    };
    ZD.Product.PageContainer = $(".ProductPage")[0];
    $(".ZD-Button")[0].onclick = function () {
        ZD.Product.List.hide();
        ZD.Product.Control.hide();
        ZD.Product.AddMenu.show();
        if (ZD.Product.NowType !== 'null') {
            ZD.Product.AddForm[4].value = ZD.Product.NowType;
        }
    };
    ZD.Product.Select.on('change', function () {
        ZD.Product.NowType = this.value;
        ZD.Product.LoadByType(ZD.Product.NowType, 1);
    });
    ZD.Product.AddForm[5].onchange = function () {
        ZD.UpLoadPreview(this, ZD.Product.AddPreview)
    };
    ZD.Product.LoadProductType();
    ZD.Product.LoadByType(ZD.GetUrlParam('type')||null,  ZD.GetUrlParam('page')||1);
}();