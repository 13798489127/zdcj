NameSpace.register('ZD.News');

ZD.News.LoadNewsType = function () {
    ZD.AJAX({
        url: '/service/GetNewsType',
        success: function (rs) {
            var classify_id, classify_name, classify_position;
            for (var i = 0; i < rs.length; i++) {
                classify_id = rs[i].classify_id;
                classify_name = rs[i].classify_name;
                classify_position = rs[i].classify_position;
                ZD.News.PrintType(classify_id, classify_name, classify_position)
            }
            if (ZD.GetUrlParam('type')) {
                ZD.News.Select.val(ZD.GetUrlParam('type'))
                ZD.News.NowType=ZD.GetUrlParam('type');
            } else {
                ZD.News.NowType = rs[0].classify_id;
            }
            ZD.News.LoadByType(ZD.GetUrlParam('type') || ZD.News.NowType, ZD.GetUrlParam('page') || 1);
        }
    })
};

ZD.News.PrintType = function (classify_id, classify_name, classify_position) {
    var a = $('<option>' + classify_name + '</option>');
    a.val(classify_id);
    ZD.News.Select.append(a);
    a = $('<option>' + classify_name + '</option>');
    a.val(classify_id);
    ZD.News.ControlSelect.append(a);
    a = $('<option>' + classify_name + '</option>');
    a.val(classify_id);
    ZD.News.AddSelect.append(a);
    a.data = {
        id: classify_id,
        name: classify_name,
        position: classify_position
    };
};

ZD.News.LoadByType = function (type, page) {
    ZD.News.Size = 6;
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
            ZD.News.Container[0].innerHTML = ZD.News.Head;
            if (rs.length === 0) {
                ZD.News.PageType = type;
                ZD.News.Container.append($('<li style="text-align: center; line-height: 100px;">暂无数据</li>'));
                $(ZD.News.PageContainer).html('');
                return;
            }
            ZD.News.allCount = rs[0].all_count;
            var news_id, classify_id, news_title, news_content, news_preview, create_time, news_position;
            for (var i = 0; i < rs.length; i++) {
                news_id = rs[i].news_id;
                classify_id = rs[i].classify_id;
                news_title = rs[i].news_title;
                news_content = rs[i].news_content;
                news_preview = rs[i].news_preview;
                create_time = rs[i].create_time;
                news_position = rs[i].news_position;
                ZD.News.PrintNews(news_id, classify_id, news_title, news_content, news_preview, create_time, news_position);
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

ZD.News.PrintNews = function (news_id, classify_id, news_title, news_content, news_preview, create_time, news_position) {
    var preview = '<p>' + news_title + '</p>';
    // if (news_preview === '无图' || news_preview === 'null' || news_preview === null) {
    //     preview = '<p>无图</p><p>' + news_title + '</p>';
    // }
    var a = $('<li><span>' + preview + '</span><span>当前位置:' + news_position + '</span><div><button>编辑</button><button>删除</button></div></li>');
    a.data = {
        news_id: news_id,
        classify_id: classify_id,
        news_title: news_title,
        news_content: news_content,
        news_preview: news_preview,
        create_time: create_time,
        news_position: news_position
    };
    ZD.News.Container.append(a);
    var button = a[0].getElementsByTagName('button');
    button[0].onclick = function () {
        ZD.News.Edit(a, this);
    };
    button[1].onclick = function () {
        ZD.News.Delete(a);
    }
};

ZD.News.Edit = function (type, button) {
    ZD.News.AddMenu.hide();
    ZD.News.List.hide();
    ZD.News.Control.show();
    ZD.News.addImageID = type.data.news_id;
    ZD.News.ControlForm[0].value = type.data.news_title;
    ZD.News.ControlForm[1].value = type.data.news_position;
    ZD.News.ControlForm[2].value = type.data.classify_id;

    $(ZD.News.Update.Quill.container.firstChild).html(type.data.news_content);
    // if (type.data.news_preview && type.data.news_preview !== '无图') {
    //     ZD.News.ControlPreview.src = ZD.Service + '/' + type.data.news_preview;
    // }
    // ZD.News.ControlForm[4].onchange = function () {
    //     ZD.UpLoadPreview(this, ZD.News.ControlPreview)
    // };
    ZD.News.ControlButton[1].onclick = function () {
        if (!ZD.News.ControlForm[0].value.length) {
            alert('请输入新闻标题');
            return false;
        }
        if (!ZD.News.ControlForm[1].value.length) {
            alert('请设置新闻排序');
            return false;
        }
        if (!$(ZD.News.Update.Quill.container.firstChild).html().length) {
            alert('请输入新闻详情');
            return false;
        }
        button.disabled = true;
        // if (ZD.News.ControlForm[4].value.length) {
        //     ZD.UpLoad('news', ZD.News.ControlForm[4], type.data.news_preview, type.data.news_id, function (rs) {
        //         ZD.News.ControlForm[4].value = '';
        //         if (rs[0].state === 'success') {
        //             ZD.News.Update(type, button);
        //         } else {
        //             alert(rs[0].msg);
        //         }
        //     });
        // } else {
        ZD.News.Update(type, button);
        // }
    }
};

ZD.News.Update = function (type, button) {
    ZD.AJAX({
        url: '/service/EditNews',
        data: {
            news_id: type.data.news_id,
            news_title: ZD.News.ControlForm[0].value,
            news_position: ZD.News.ControlForm[1].value,
            classify_id: ZD.News.ControlForm[2].value,
            news_content: $(ZD.News.Update.Quill.container.firstChild).html(),
            old_news_position: type.data.news_position
        },
        success: function (rs) {
            button.disabled = false;
            rs = rs[0];
            if (rs.state === 'success') {
                ZD.News.LoadByType(ZD.News.NowType, 1);
                ZD.News.ControlButton[0].click()
            }
            alert(rs.msg);
        }
    })
};

ZD.News.Update.QuillEditor = function () {
    ZD.News.Update.Quill = new Quill('#ZD_Update_Editor', {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                [{'align': []}],

                [{'header': 2}],               // custom button values
                // [{'header': [1, 2, 3, 4, 5, 6, false]}],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                [{'image': ''}],

                ['blockquote', 'code-block'],

                ['clean']                                         // remove formatting button
            ]
        },
        placeholder: '请输入招聘信息...',
        theme: 'snow'
    });
    toolbar = ZD.News.Update.Quill.getModule('toolbar');
    toolbar.addHandler('image', function () {
        var input = $('#ql-image', this.container);
        if (!input[0]) {
            $('<input type="file" accept="image/*" id="ql-image" class="ql-image">').bind('change',
                ZD.closure(ZD.News.addImage, [ZD.News.Update.Quill])).appendTo(this.container).click();
        } else {
            input.click();
        }
    });
};

ZD.News.addImageID = null;
ZD.News.addImage = function (Quill) {
    ZD.UpLoad('news', this, null, ZD.News.addImageID, function (rs) {
        if (rs[0] && rs[0].state === 'success') {
            Quill.insertEmbed(Quill.getSelection().index || 0, 'image', ZD.Service + rs[0].url);
        } else {
            alert('图片上传失败');
        }
    });
};

ZD.News.Add = function (button) {
    if (!ZD.News.AddForm[0].value.length) {
        alert('请输入新闻标题');
        return false;
    }
    if (!$(ZD.News.Add.Quill.container.firstChild).html().length) {
        alert('请输入新闻详情');
        return false;
    }
    button.disabled = true;
    ZD.AJAX({
        url: '/service/AddNews',
        data: {
            news_title: ZD.News.AddForm[0].value,
            news_position: ZD.News.AddForm[1].value,
            classify_id: ZD.News.AddForm[2].value,
            news_content: $(ZD.News.Add.Quill.container.firstChild).html()
        },
        success: function (rs) {
            button.disabled = false;
            rs = rs[0];
            if (rs.state === 'success') {
                ZD.News.AddButton[0].click();
                ZD.News.AddForm[0].value = ZD.News.AddForm[1].value = ZD.News.AddForm[2].value = '';
                $(ZD.News.Add.Quill.container.firstChild).html('');
                // if (ZD.News.AddForm[4].value.length) {
                //     ZD.UpLoad('news', ZD.News.AddForm[4], null, rs.news_id, function (res) {
                //         ZD.News.AddForm[4].value = ZD.News.ControlPreview.src = '';
                //         if (res[0].state === 'success') {
                //             ZD.News.PrintNews(rs.news_id, rs.classify_id, rs.news_title, rs.news_content, res[0].url, 0, rs.news_position);
                //         } else {
                //             alert(res[0].msg);
                //         }
                //     });
                // }
                ZD.News.PrintNews(rs.news_id, rs.classify_id, rs.news_title, rs.news_content, null, 0, rs.news_position);
                ZD.News.PageChange(1, rs.news_position);
            }
            alert(rs.msg);
        }
    })
};

ZD.News.Add.QuillEditor = function () {
    ZD.News.Add.Quill = new Quill('#ZD_Add_Editor', {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                [{'align': []}],

                [{'header': 2}],               // custom button values
                // [{'header': [1, 2, 3, 4, 5, 6, false]}],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                [{'image': ''}],

                ['blockquote', 'code-block'],

                ['clean']                                         // remove formatting button
            ]
        },
        placeholder: '请输入招聘信息...',
        theme: 'snow'
    });

    toolbar = ZD.News.Add.Quill.getModule('toolbar');
    toolbar.addHandler('image', function () {
        var input = $('#ql-image', this.container);
        if (!input[0]) {
            $('<input type="file" accept="image/*" id="ql-image" class="ql-image">').bind('change',
                ZD.closure(ZD.News.addImage, [ZD.News.Add.Quill])).appendTo(this.container).click();
        } else {
            input.click();
        }
    });
};

ZD.News.PageChange = function (make, now_position) {
    if (ZD.News.Page) {
        ZD.News.allCount = Math.max(0, ZD.News.allCount + make);
        ZD.News.Page.pageCount = Math.ceil(ZD.News.allCount / ZD.News.Size);
        ZD.News.Page.currentPage = Math.min(ZD.News.Page.pageCount, Math.ceil(now_position + 1 / ZD.News.Size));
        ZD.News.Page.switch(ZD.News.Page.currentPage);
    }
};

ZD.News.Delete = function (type) {
    var a = confirm('确认删除' + type.data.news_title + '这条新闻吗');
    if (a === true) {
        ZD.AJAX({
            url: '/service/DeleteNews',
            data: {
                id: type.data.news_id,
                image: type.data.news_preview
            },
            success: function (rs) {
                rs = rs[0];
                if (rs.state === 'success') {
                    type.remove();
                    ZD.News.PageChange(-1, type.data.news_position);
                }
                alert(rs.msg);
            }
        })
    }
};

ZD.News.Init = function () {
    ZD.News.Head = '<li class="ZD-Ul-head NewsList-head"><span>新闻预览/标题</span><span>设置排序</span><div>操作</div></li>';
    ZD.News.Select = $(".NewsShowType select");
    ZD.News.NowType = 'null';
    ZD.News.List = $(".NewsShowMain");
    ZD.News.Container = $(".NewsList");
    ZD.News.Control = $(".NewsMangerControl");
    ZD.News.ControlForm = $(".NewsMangerControl [info]");
    ZD.News.ControlButton = $(".NewsMangerControl button");
    ZD.News.ControlSelect = $(".NewsMangerControlSelect");
    ZD.News.ControlPreview = $(".NewsMangerControl img")[0];
    ZD.News.AddMenu = $(".NewsMangerAdd");
    ZD.News.AddForm = $(".NewsMangerAdd [info]");
    ZD.News.AddButton = $(".ZD_Add_Button button");
    ZD.News.AddSelect = $(".NewsMangerAddSelect");
    // ZD.News.AddPreview = $(".NewsMangerAdd img")[0];
    ZD.News.AddButton[0].onclick = ZD.News.ControlButton[0].onclick = function () {
        ZD.News.List.show();
        ZD.News.Control.hide();
        ZD.News.AddMenu.hide();
    };
    ZD.News.AddButton[1].onclick = function () {
        ZD.News.Add(this);
    };
    ZD.News.PageContainer = $(".NewsPage")[0];
    $(".ZD-Button")[0].onclick = function () {
        ZD.News.List.hide();
        ZD.News.Control.hide();
        ZD.News.AddMenu.show();
        ZD.News.addImageID = 'temp';
        if (ZD.News.NowType !== 'null') {
            ZD.News.AddForm[3].value = ZD.News.NowType;
        }
    };
    ZD.News.Select.on('change', function () {
        ZD.News.NowType = this.value;
        ZD.News.LoadByType(ZD.News.NowType, 1);
    });
    // ZD.News.AddForm[4].onchange = function () {
    //     ZD.UpLoadPreview(this, ZD.News.AddPreview)
    // };
    ZD.News.LoadNewsType();
    ZD.News.Add.QuillEditor();
    ZD.News.Update.QuillEditor();
}();

