$(window).load(function () {
    var offset = 220;
    var duration = 500;
    var ww = window.innerWidth;

    /*gotop*/

    $(window).scroll(function () {
        if (jQuery(this).scrollTop() > offset) {
            $('.backToTop').fadeIn(duration);
        } else {
            $('.backToTop').fadeOut(duration);
        }
    });
    $('.backToTop').click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    });

    /*menu*/
    var menuLeft = document.getElementById('cbp-spmenu-s1'),
        showLeftPush = document.getElementById('showLeftPush'),
        body = document.body;
    showLeftPush.onclick = function () {
        classie.toggle(this, 'active');
        classie.toggle(body, 'cbp-spmenu-push-toright');
        classie.toggle(menuLeft, 'cbp-spmenu-open');
        disableOther('showLeftPush');
    };

    function disableOther(button) {
        if (button !== 'showRightPush') {
            classie.toggle(showRightPush, 'disabled');
        }
    }

    /*搜尋*/
    $('.searchItem').click(function () {
        $('.search').fadeIn();
        return false;
    });
    $('.closeBtn, .searchBg').click(function () {
        $('.search').fadeOut();
        return false;
    });

    /*訊息*/
    $('.msgItem').click(function () {
        $('.massage').fadeIn();
        return false;
    });
    $('.closeBtn, .searchBg').click(function () {
        $('.massage').fadeOut();
        return false;
    });

    /*評價*/
    $('.order.rate a').click(function () {
        $('.rating').fadeIn();
        return false;
    });
    $('.closeBtn, .searchBg').click(function () {
        $('.rating').fadeOut();
        return false;
    });

    /*店家訂購內容*/
    $('.storeMenuList .mask, .storeMenuList .storeMenuName a').click(function () {
        $('.menuDetail').fadeIn();
        return false;
    });
    $('.closeBtn, .searchBg').click(function () {
        $('.menuDetail').fadeOut();
        return false;
    });

    /*轉盤*/
    $('.zoomBtn a.go').click(function () {
        $(".circle").removeClass("end").addClass("open");
        $(".circleBg").fadeIn();
        $(".zoomBtn a.go").fadeOut(200);
        $(".zoomBtn a.end").delay(600).fadeIn();
        $("#wheel").delay(1000).fadeIn(200);
        $(".goBtn a").fadeIn();
        return false;
    });
    $('.zoomBtn a.end, .circleBg').click(function () {
        $(".circle").removeClass("open").addClass("end");
        $(".circleBg").fadeOut(600).delay(300);
        $(".zoomBtn a.end").fadeOut(200);
        $(".zoomBtn a.go").delay(600).fadeIn();
        $("#wheel").fadeOut();
        $(".goBtn a").fadeOut();
        return false;
    })

    /*animation*/
    new WOW().init();
})


$(document).ready(function () {
    /*form check*/
    $(".formcontent").validationEngine("attach", {
        promptPosition: "topLeft"
    });

});

    
    /*     使用者登入小幫手     */
$('#helper').click(function () { 
    $('#userId').val('grabngo');
    $('#pswd').val('1111');
});
$('#helper2').click(function () { 
    $('#userId').val('gg_jc');
    $('#pswd').val('1111');
});