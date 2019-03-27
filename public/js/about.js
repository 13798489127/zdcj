NameSpace.register('ZD.About');

$(document).ready(function () {
    ZD.About.GetData();
});

ZD.About.GetData = function () {
    ZD.AJAX({
        url: '/service/GetCompanyAll',
        success: function (rs) {
            rs.forEach(function (data) {
                ZD.About.Print(data);
            });
        }
    });
};

ZD.About.Print = function (data) {
    $(' <div class="col-md-12 col-xs-12">' +
        '    <div class="art-intor-left-title wow bounceInRight" data-wow-offset="10" data-wow-delay="0.1s">\n' +
        '        <div class="art-intor-left-title">\n' +
        '            <div class="fankuai"></div>\n' + data.company_title + '</div>\n' +
        '        </div>' +
        '    <div class="art-intor-left-wenben wow rubberBand" data-wow-offset="10" data-wow-delay="0.1s">' + data.company_content + '</div>' +
        '</div>').appendTo($('#ZD_About_Main')[0]);
};