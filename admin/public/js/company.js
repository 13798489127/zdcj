NameSpace.register('ZD.Company');

ZD.Company.Content = {};
ZD.Company.Head = '<li class="ZD-Ul-head"><span>标题</span><span>设置顺序</span><span>操作</span></li>';

$(document).ready(function () {
    ZD.Company.GetData();
});

ZD.Company.GetData = function () {
    ZD.AJAX({
        url: '/service/GetCompany',
        success: function (rs) {
            ZD.Company.Empty();
            rs.forEach(function (data) {
                ZD.Company.Print(data);
            });
            var length = $('.ZD_Company').children().length;
            length > ZD.Company.Max && (ZD.Company.Max = length);
            ZD.Company.NoData();
        }
    });
};

/*
* 界面显示控制
* @param className [string] 显示的界面的className
* */
ZD.Company.ControlShow = function (className) {
    $('.zd_admin_right_content_main').children().hide();
    $('.' + className).show();
};

ZD.Company.Empty = function () {
    $('.ZD-Ul').html(ZD.Service.Head);
};

ZD.Company.NoData = function () {
    var li = $('.ZD_Company').children();
    if (li.length <= 1) {
        $('<li style="text-align: center; line-height: 100px;">暂无数据</li>').appendTo($('.ZD_Company'));
    }
};

ZD.Company.Print = function (data) {
    var li = $('<li></li>').appendTo($('.ZD_Company')[0]);
    var title = $('<span></span>').html(data.company_title).appendTo(li);
    $('<span></span>').html('当前位置:' + data.company_position).appendTo(li);
    var opera = $('<div></div>').appendTo(li);
    $('<button>修改内容</button>').appendTo(opera).click(function () {
        ZD.Company.Update(data, title);
    });

    $('<button>删除</button>').appendTo(opera).click(function () {
        ZD.Company.Delete(data, li);
    });
};

ZD.Company.Add = function () {
    var company_title = prompt('添加公司信息：', '请输入信息标题');
    if (company_title != null && company_title.trim() != '') {
        ZD.AJAX({
            url: '/service/AddCompany',
            data: {company_title: company_title},
            success: function (rs) {
                if (rs[0] && rs[0].state === 'success') {
                    if ($('.ZD_Company').children()[0].innerHTML === '暂无数据') {
                        $('.ZD_Company').html('');
                    }
                    rs[0].company_title = company_title;
                    ZD.Company.Print(rs[0]);
                } else {
                    alert('添加失败');
                }
            }
        });
    }
};

ZD.Company.Delete = function (data, li) {
    var _confirm = confirm('确认删除' + data.company_title + '这个信息吗');
    if (_confirm === true) {
        ZD.AJAX({
            url: '/service/DeleteCompany',
            data: {company_id: data.company_id},
            success: function (rs) {
                if (rs[0] && rs[0].state === 'success') {
                    li.remove();
                    ZD.Company.NoData();
                    alert('删除成功');
                } else {
                    alert('删除失败');
                }
            }
        });
    }
};

ZD.Company.UpdateId = null;
ZD.Company.Update = function (data, titleSpan) {
    if (!ZD.Company.Quill) {
        ZD.Company.QuillEditor();
    }
    if (!ZD.Company.Content[data.company_id]) {
        ZD.Company.GetCompanyContent(data.company_id);
    } else {
        $(ZD.Company.Quill.container.firstChild).html(ZD.Company.Content[data.company_id]);
    }
    ZD.Company.ControlShow('ZD_Company_Editor');
    $('.ZD_Company_Title input').val(data.company_title);
    $('#ZD_Company_Update').unbind();
    $('#ZD_Company_Update').bind('click', function () {
        ZD.Company.UpdateRequest(data, titleSpan);
    });
    ZD.Company.UpdateId = data.company_id;
};

ZD.Company.UpdateRequest = function (data, titleSpan) {
    ZD.AJAX({
        url: '/service/UpdateCompany',
        data: {
            company_id: data.company_id,
            company_title: $('.ZD_Company_Title input').val(),
            company_content: $(ZD.Company.Quill.container.firstChild).html()
        },
        success: function (rs) {
            if (rs[0] && rs[0].state === 'success') {
                alert('保存成功');
                $(titleSpan).html($('.ZD_Company_Title input').val());
                ZD.Company.ControlShow('ZD_Company_List');
            } else {
                alert('保存服务出错，请联系开发人员。')
            }
        }
    });
};

ZD.Company.GetCompanyContent = function (company_id) {
    ZD.AJAX({
        url: '/service/GetCompanyContent',
        data: {
            'company_id': company_id
        },
        success: function (rs) {
            if (rs && rs[0].state === 'success') {
                ZD.Company.Content[company_id] = rs[0].company_content;
            } else {
                ZD.Company.Content[company_id] = '';
            }
            $(ZD.Company.Quill.container.firstChild).html(ZD.Company.Content[company_id]);
        }
    });
};

ZD.Company.QuillEditor = function () {
    ZD.Company.Quill = new Quill('#ZD_Editor', {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

                [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                [{'align': []}],

                [{'header': 1}, {'header': 2}],               // custom button values
                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                [{'image': ''}],

                ['blockquote', 'code-block'],

                ['clean']                                          // remove formatting button
            ]
        },
        placeholder: '请输入内容...',
        theme: 'snow'
    });

    toolbar = ZD.Company.Quill.getModule('toolbar');
    toolbar.addHandler('image', function () {
        var input = $('#ql-image', this.container);
        if (!input[0]) {
            $('<input type="file" accept="image/*" id="ql-image" class="ql-image">').bind('change',
                ZD.Company.addImage).appendTo(this.container).click();
        } else {
            input.click();
        }
    });
};

ZD.Company.addImage = function () {
    ZD.UpLoad('company', this, null, ZD.Company.UpdateId, function (rs) {
        if (rs[0] && rs[0].state === 'success') {
            ZD.Company.Quill.insertEmbed(ZD.Company.Quill.getSelection().index || 0, 'image', ZD.Service + rs[0].url);
        } else {
            alert('图片上传失败');
        }
    });
};

