//命名空间类
window.NameSpace = {};
NameSpace.register = function (fullNS) {
    var a = arguments, o = null, i, j, d;
    for (i = 0; i < a.length; i = i + 1) {
        d = a[i].split(".");
        o = window;
        for (j = 0; j < d.length; j = j + 1) {
            o[d[j]] = o[d[j]] || {};
            o = o[d[j]];
        }
    }
    return o;
};
/*后台请求服务地址*/
ZD = NameSpace.register('ZD');
ZD.Service = location.origin + "/zdcj";
ZD.AJAX = function (options) {
    var url = options.url;
    localStorage.token ? url = url + '?token=' + localStorage.token : "";
    var param = {
        url: ZD.Service + url,
        type: options.type ? options.type : 'post',
        dataType: 'json',
        data: options.data,
        success: options.success ? options.success : function (rs) {
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                alert('认证失效，返回登录页');
                window.location.href = ZD.Service + '/service/logout?e=1';
            }
        }
    };
    if (options.upload) {
        param.contentType = false;
        param.processData = false;
    }
    $.ajax(param);
};
/* 分页控件
* @param pageBox     必填 {element}  创建位置
* @param pageCount   必填 {number}   页数总数
* @param callBack    必填 {function} 回调函数 参数一固定为当前页数
* @param perPageNum  选填 {number}   显示页码按钮个数
* @param currentPage 选填 {number}   当前页数
* */
ZD.Page = function (pageBox, pageCount, callBack, perPageNum, currentPage) {
    $(pageBox).html('');
    this.pageCount = pageCount;
    this.perPageNum = perPageNum || 5;
    this.currentPage = currentPage || ZD.GetUrlParam('page') || 1;
    this.callBack = callBack;
    this.pageEle = $('<div></div>').addClass('control_page').appendTo(pageBox);
    this.buttonArea();
    this.skipArea();
    this.switch(this.currentPage, true);
};
ZD.Page.prototype = {
    //按钮区域
    buttonArea: function () {
        var pageEle = this.pageEle;
        var prevEle = $('<div></div>').addClass('control_page_pagination').appendTo(pageEle);
        this.pageButton = $('<div></div>').addClass('control_page_pagination').appendTo(pageEle);
        var nextEle = $('<div></div>').addClass('control_page_pagination').appendTo(pageEle);

        $('<div>«</div>').appendTo(prevEle).click(ZD.closure(this.switch, [1], this));
        $('<div><</div>').appendTo(prevEle).click(ZD.closure(this.change, [-1], this));

        $('<div>></div>').appendTo(nextEle).click(ZD.closure(this.change, [1], this));
        $('<div>»</div>').appendTo(nextEle).click(ZD.closure(this.switch, [this.pageCount], this));
    },
    //跳转区域
    skipArea: function () {
        var pageSkip = $('<div></div>').addClass('control_page_pagination control_page_skip').appendTo(this.pageEle);

        $('<span>跳转到：</span>').appendTo(pageSkip);

        var _pageSkipInput = $('<input type="number"/>').appendTo(pageSkip);
        $('<div class="control_page_button">确定</div>').appendTo(pageSkip).click(ZD.closure(this.skip, [_pageSkipInput], this));
    },
    /*
    * 跳转函数
    * @param pageSkipInput  {element}   输入框
    * */
    skip: function (pageSkipInput) {
        var page = parseInt(pageSkipInput.val());
        if (!page || page < 0 || page > this.pageCount) {
            alert('请输入正确页码！');
        } else {
            this.switch(page);
        }
    },
    /*
    * 在当前页面前进多少也或者后退多少页处理函数  用于上下页切换
    * @param make  {number}  相对切换页数
    * */
    change: function (make) {
        this.switch(this.currentPage + make);
    },
    /*
    * 切换页函数
    * @param pageNumber  {number}  切换到第几页
    * */
    switch: function (pageNumber, inexecution) {
        this.scope = Math.min(Math.floor(this.perPageNum / 2), 3);
        var startPage = this.getPrintStartPage(pageNumber);
        startPage = Math.max(1, Math.min(startPage, this.pageCount - this.perPageNum + 1));
        this.currentPage = Math.max(1, Math.min(pageNumber, this.pageCount));
        this.pageArea(startPage);
        !inexecution && this.callBack(this.currentPage);
    },
    /*
    * 计算页码开始位置
    * @param now  {number}  当前页码数
    * */
    getPrintStartPage: function (now) {
        var page = $(this.pageButton).find('div');
        var start = parseInt($(page[0]).html()) || 1;
        var end = Math.min(start + this.perPageNum - 1, this.pageCount) || this.perPageNum;
        if (now >= start && now < (start + this.scope)) {
            return start - this.scope;
        } else if (now > (end - this.scope) || now < start || now > end) {
            return now - this.scope;
        } else {
            return start;
        }
    },
    /*
    * 打印页码函数
    * @param start  {number}  开始位置
    * */
    pageArea: function (start) {
        var pageArea = this.pageButton;

        $(pageArea).html('');

        if (this.currentPage > this.perPageNum - this.scope) {
            $('<i>...</i>').appendTo(pageArea);
        }

        var maxPage = Math.min(start + this.perPageNum, this.pageCount + 1);
        var $this = this;
        for (start; start < maxPage; start++) {
            (function (page) {
                var ele = $('<div>' + page + '</div>').appendTo(pageArea).click(function () {
                    $this.switch(page);
                });
                page === $this.currentPage && ele.addClass('control_page_active');
            })(start);
        }

        if (maxPage < this.pageCount + 1) {
            $('<i>...</i>').appendTo(pageArea);
        }
    }
};

ZD.closure = function (fun, para, region) {
    //创建一个函数返回
    return function () {
        fun.apply(region || this, para);
    }
};

ZD.ChangeUrlParam = function (valueKey, value) {
    var paramObject = ZD.GetUrlParam();
    if (typeof valueKey === 'object') {
        for (variable  in  valueKey) {
            paramObject[variable] = valueKey[variable];
        }
    } else {
        paramObject[valueKey] = value;
    }
    var newParam = '';
    for (key in  paramObject) {
        newParam += key + '=' + paramObject[key] + '&';
    }
    return '?' + newParam.substring(0, newParam.length - 1);
};

ZD.GetUrlParam = function (valueKey) {
    var key, val, param = location.href.split("?")[1];
    var paramObject = {};
    if (param) {
        param = param.split("&");
        param.forEach(function (str) {
            key = str.substring(0, str.indexOf("="));
            val = str.substring(str.indexOf("=") + 1);
            paramObject[key] = val;
        });
    }
    return valueKey ? paramObject[valueKey] : paramObject;
};

ZD.CleanUrl = function () {
    var newUrl = location.href.split('?')[0];
    history.pushState([], '', newUrl);
};

ZD.SetState = function (valueKey, value) {
    if (history.pushState) {
        history.pushState({}, document.title,  ZD.ChangeUrlParam(valueKey, value));
    }
};