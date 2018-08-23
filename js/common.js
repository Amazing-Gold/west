var hrName = "http://192.168.1.127:8091";

$(function () {
    //右侧固定栏
    $('.flex ul').on('mouseenter', 'li', function () {
        var childrenlist = $(this).children()
        if (childrenlist.length < 2) return
        childrenlist[1].style.display = 'block'
        if (childrenlist.length < 3) return
        childrenlist[2].style.display = 'block'
    })
    $('.flex ul').on('mouseleave', 'li', function () {
        var childrenlist = $(this).children()
        if (childrenlist.length < 2) return
        childrenlist[1].style.display = 'none'
        if ((childrenlist.length < 3)) return
        childrenlist[2].style.display = 'none'
    })
    
    // 点击头像框
    $('.touxiang').click(function () {
        $('.show-box').toggle();
    })

    // 返回顶部
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1) { //当window的scrolltop距离大于1时，go to top按钮淡出，反之淡入
            $("#go-top").fadeIn();
        } else {
            $("#go-top").fadeOut();
        }
    });
    $("#go-top").click(function () {
        $("html,body").animate({
            scrollTop: 0
        }, 200); //点击go to top按钮时，以400的速度回到顶部，这里的400可以根据你的需求修改
        return false;
    });

});

// 遮罩显示
function showShade() {
    $(".shade").show();
    $("input").val("");
}
// 遮罩隐藏
function hideShade() {
    $(".shade").hide();
    $(".shade-c").hide();
    $("input").val('');
    $("form p").empty();
}
//注册层显示
function showZhuce() {
    $(".shade-c").hide();
    $(".shade").show();
    $(".shade-zhuce").show();
}
//找回密码层显示
function showZhaohui() {
    $(".shade-c").hide();
    $(".shade").show();
    $(".shade-zhaohui").show();
}

