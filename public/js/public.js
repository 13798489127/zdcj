//这个是统一加载页头页尾banner的js
ZD.Public=NameSpace.register('ZD.Public');
/*获取所有banner函数*/
ZD.Public.Banner = function () {
    ZD.AJAX({
        url: '/service/GetBanner',
        success: function (rs) {
            if (!rs) return;
            var i, banner_area = $('#da-slider > .container');
            banner_area.html('');
            for (i = 0; i < rs.length; i++) {
                $('<div class="da-slide ' + (i == 0 ? 'da-slide-fromright da-slide-current' : 'da-slide-toleft') + '">\n' +
                    '<h2>' + rs[i].banner_title + '</h2>\n' +
                    '<h4>' + rs[i].banner_titles + '</h4>\n' +
                    '<p>' + rs[i].banner_desp + '</p>\n' +
                    '<a href="'+ rs[i].banner_href +'" class="da-link button">更多</a>\n' +
                    '<div class="da-img">\n' +
                    '<img src="' + ZD.Service + '/' + rs[i].banner_preview + '" alt="image01" width="320">\n' +
                    '</div>\n' +
                    '</div>').appendTo(banner_area[0]);
            }
            $('<div class="da-arrows">\n' +
                '                    <span class="da-arrows-prev"></span>\n' +
                '                    <span class="da-arrows-next"></span>\n' +
                '                </div>').appendTo(banner_area[0]);
            //Initialize header slider.
            $('#da-slider').cslider();
        }
    });
};
/*绑定通用事件*/
ZD.Public.Bind=function(){
    function getViewportHeight() {
        var height = window.innerHeight; // Safari, Opera
        var mode = document.compatMode;
        if ( (mode || !$.support.boxModel) ) { // IE, Gecko
            height = (mode === 'CSS1Compat') ?
                document.documentElement.clientHeight : // Standards
                document.body.clientHeight; // Quirks
        }
        return height;
    }
    var containerWidth = $('.section .container').width();
    var triangle=$(".triangle");
    triangle.css({
        "border-left": containerWidth / 2 + 'px outset transparent',
        "border-right": containerWidth / 2 + 'px outset transparent'
    });
    $(window).resize(function () {
        containerWidth = $('.container').width();
        $(".triangle").css({
            "border-left": containerWidth / 2 + 'px outset transparent',
            "border-right": containerWidth / 2 + 'px outset transparent'
        });
    });
    $('#portfolio-grid').mixitup({
        'onMixStart': function (config) {
            $('div.toggleDiv').hide();
        }
    });
    $(window).scroll(function () {
        var vpH = getViewportHeight(),
            scrolltop = (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop),
            elems = [];
        $.each($.cache, function () {
            if (this.events && this.events.inview) {
                elems.push(this.handle.elem);
            }
        });
        if (elems.length) {
            $(elems).each(function () {
                var $el = $(this),
                    top = $el.offset().top,
                    height = $el.height(),
                    inview = $el.data('inview') || false;

                if (scrolltop > (top + height) || scrolltop + vpH < top) {
                    if (inview) {
                        $el.data('inview', false);
                        $el.trigger('inview', [ false ]);
                    }
                } else if (scrolltop < (top + height)) {
                    if (!inview) {
                        $el.data('inview', true);
                        $el.trigger('inview', [ true ]);
                    }
                }
            });
        }
    });
    $(window).scroll();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
        if ($(this).scrollTop() > 130) {
            $('.navbar').addClass('navbar-fixed-top animated fadeInDown');
        } else {
            $('.navbar').removeClass('navbar-fixed-top animated fadeInDown');
        }
    });
    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    $('div.toggleDiv').hide();
    /*产品查看缩放函数*/
    $.fn.showHide = function (options) {
        var defaults = {
            speed: 1000,
            easing: '',
            changeText: 0,
            showText: 'Show',
            hideText: 'Hide'
        };
        var options = $.extend(defaults, options);
        $(this).click(function () {
            $('.toggleDiv').slideUp(options.speed, options.easing);
            var toggleClick = $(this);
            var toggleDiv = $(this).attr('rel');
            $(toggleDiv).slideToggle(options.speed, options.easing, function () {
                if (options.changeText === 1) {
                    $(toggleDiv).is(":visible") ? toggleClick.text(options.hideText) : toggleClick.text(options.showText);
                }
            });
            return false;
        });
    };
    //动画函数
    $('.thumbnail').one('inview', function (event, visible) {
        if (visible === true) {
            jQuery(this).addClass("animated fadeInDown");
        } else {
            jQuery(this).removeClass("animated fadeInDown");
        }
    });
    //Animate triangles
    triangle.bind('inview', function (event, visible) {
        if (visible === true) {
            jQuery(this).addClass("animated fadeInDown");
        } else {
            jQuery(this).removeClass("animated fadeInDown");
        }
    });
    //animate first team member
    $('#first-person').bind('inview', function (event, visible) {
        if (visible === true) {
            jQuery('#first-person').addClass("animated pulse");
        } else {
            jQuery('#first-person').removeClass("animated pulse");
        }
    });
    //animate sectond team member
    $('#second-person').bind('inview', function (event, visible) {
        if (visible === true) {
            jQuery('#second-person').addClass("animated pulse");
        } else {
            jQuery('#second-person').removeClass("animated pulse");
        }
    });
    //animate thrid team member
    $('#third-person').bind('inview', function (event, visible) {
        if (visible == true) {
            jQuery('#third-person').addClass("animated pulse");
        } else {
            jQuery('#third-person').removeClass("animated pulse");
        }
    });
    //Animate price columns
    $('.price-column, .testimonial').bind('inview', function (event, visible) {
        if (visible === true) {
            jQuery(this).addClass("animated fadeInDown");
        } else {
            jQuery(this).removeClass("animated fadeInDown");
        }
    });
    //Animate contact form
    $('.contact-form').bind('inview', function (event, visible) {
        if (visible === true) {
            jQuery('.contact-form').addClass("animated bounceIn");
        } else {
            jQuery('.contact-form').removeClass("animated bounceIn");
        }
    });
    //Animate skill bars
    $('.skills > li > span').one('inview', function (event, visible) {
        if (visible === true) {
            jQuery(this).each(function () {
                jQuery(this).animate({
                    width: jQuery(this).attr('data-width')
                }, 3000);
            });
        }
    });
};
$(document).ready(function () {
    ZD.Public.Bind();
    ZD.Public.Banner();
});