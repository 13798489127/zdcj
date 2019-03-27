NameSpace.register('ZD.Recruit');
$(document).ready(function () {
    ZD.Recruit.QuillEditor();
    ZD.Recruit.Get();
});

ZD.Recruit.Get = function () {
    ZD.AJAX({
        url: '/service/GetRecruit',
        success: function (rs) {
            $(ZD.Recruit.Quill.container.firstChild).html(rs.recruit_content);
        }
    });
};

ZD.Recruit.Update = function () {
    ZD.AJAX({
        url: '/service/UpdateRecruit',
        data: {
            recruit_content: $(ZD.Recruit.Quill.container.firstChild).html()
        },
        success: function (rs) {
            if (rs[0] && rs[0].state === 'success') {
                alert('保存成功');
            } else {
                alert('保存服务出错，请联系开发人员。')
            }
        }
    });
};

ZD.Recruit.QuillEditor = function () {
    ZD.Recruit.Quill = new Quill('#ZD_Editor', {
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

    toolbar = ZD.Recruit.Quill.getModule('toolbar');
    toolbar.addHandler('image', function () {
        var input = $('#ql-image', this.container);
        if (!input[0]) {
            $('<input type="file" accept="image/*" id="ql-image" class="ql-image">').bind('change',
                ZD.Recruit.addImage).appendTo(this.container).click();
        } else {
            input.click();
        }
    });
};

ZD.Recruit.addImage = function () {
    ZD.UpLoad('company', this, null, 'recruitManage', function (rs) {
        if (rs[0] && rs[0].state === 'success') {
            ZD.Recruit.Quill.insertEmbed(ZD.Recruit.Quill.getSelection().index || 0, 'image', ZD.Service + rs[0].url);
        } else {
            alert('图片上传失败');
        }
    });
};

