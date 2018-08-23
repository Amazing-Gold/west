$(function () {

    layui.use('layer', function () {
        var layer = layui.layer;
    });

    var uid = false;
    var pwd = false;
    var cod = false;

    var zc_uid = false;
    var zc_setpwd = false;
    var zc_pwd = false;
    var zc_eml = false;
    var zc_code = false;

    var zh_setpwd = false;
    var zh_pwd = false;
    var zh_eml = false;
    var zh_code = false;


    // 用户名验证
    $('#uid').blur(function () {
        if ($(this).val().length >= 6 && $(this).val().length <= 20 && $(this).val() != '') {
            $(this).next().text('')
            uid = true;
        } else {
            $(this).next().text('用户名应该为6-20位之间')
        }
    });
    $('#zc-uid').blur(function () {
        if ($(this).val().length >= 6 && $(this).val().length <= 20 && $(this).val() != '') {
            $(this).next().text('')
            zc_uid = true;
        } else {
            $(this).next().text('用户名应该为6-20位之间')
        }
    });

    // 密码验证
    $('#pwd').blur(function () {
        if ($(this).val().length >= 6 && $(this).val().length <= 20 && $(this).val() != '') {
            $(this).next().text('')
            pwd = true;
        } else {
            $(this).next().text('密码应该为6-20位之间')
        }
    });
    $('#zc-setpwd').blur(function () {
        if ($(this).val().length >= 6 && $(this).val().length <= 20 && $(this).val() != '') {
            $(this).next().text('')
            zc_setpwd = true;
        } else {
            $(this).next().text('密码应该为6-20位之间')
        }
    });
    $('#zh-setpwd').blur(function () {
        if ($(this).val().length >= 6 && $(this).val().length <= 20 && $(this).val() != '') {
            $(this).next().text('')
            zh_setpwd = true;
        } else {
            $(this).next().text('密码应该为6-20位之间')
        }
    });

    // 确认密码验证
    $('#zc-pwd').blur(function () {
        if ($(this).val().length >= 6 && $(this).val().length <= 20 && $(this).val() != '' && $(this).val() == $('#zc-setpwd').val()) {
            $(this).next().text('')
            zc_pwd = true;
        } else {
            $(this).next().text('两次密码不一致')
        }
    });
    $('#zh-pwd').blur(function () {
        if ($(this).val().length >= 6 && $(this).val().length <= 20 && $(this).val() != '' && $(this).val() == $('#zh-setpwd').val()) {
            $(this).next().text('')
            zh_pwd = true;
        } else {
            $(this).next().text('两次密码不一致')
        }
    });

    // 验证邮箱
    $('#zc-eml').blur(function () {
        if ($(this).val().search(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/) == -1) {
            $(this).next().text('请输入正确的邮箱格式')
        } else {
            $(this).next().text('')
            zc_eml = true;
        }
    });
    $('#zh-eml').blur(function () {
        if ($(this).val().search(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/) == -1) {
            $(this).next().text('请输入正确的邮箱格式')
        } else {
            $(this).next().text('')
            zh_eml = true;
        }
    });

    // 验证 码验证
    $('#cod').blur(function () {
        if ($(this).val().length == 0) {
            $(this).parent().next().text('请输入验证码')
        } else {
            $(this).parent().next().text('')
            cod = true;
        }
    });
    $('#zc-code').blur(function () {
        if ($(this).val().length == 0) {
            $(this).parent().next().text('请输入验证码')
        } else {
            $(this).parent().next().text('')
            zc_code = true;
        }
    });
    $('#zh-code').blur(function () {
        if ($(this).val().length == 0) {
            $(this).parent().next().text('请输入验证码')
        } else {
            $(this).parent().next().text('')
            zh_code = true;
        }
    });

    // 点击验证码刷新
    $(".yanzheng>img").click(function () {
        var date = new Date();
        $(this).attr("src", hrName + "/common/code?ver=" + date.getTime());
    })

    // 登录失败刷新验证码
    function ClickCod() {
        var date = new Date();
        $(".yanzheng>img").attr("src", hrName + "/common/code?ver=" + date.getTime());
    }

    // 注册获取验证码
    function zcGetCode() {
        $.ajax({
            url: hrName + "/api/common/sendEmailCode",
            type: "get",
            cache: false,
            dataType: "json",
            async: true,
            xhrFields: {      
                withCredentials: true    
            },
            crossDomain: true,
            data: {
                email: $("#zc-eml").val(),
            },
            success: function (data) {
                if (data.code == "200") {
                    layer.alert("发送成功")
                } else {
                    layer.alert(data.description)
                }
            }
        })
    }
    // 找回获取验证码
    function zhGetCode() {
        $.ajax({
            url: hrName + "/api/user/setting/sendEmailCode",
            type: "get",
            cache: false,
            dataType: "json",
            async: true,
            xhrFields: {      
                withCredentials: true    
            },
            crossDomain: true,
            data: {
                email: $("#zh-eml").val(),
            },
            success: function (data) {
                if (data.code == "200") {
                    layer.alert("发送成功")
                } else {
                    layer.alert(data.description)
                }
            }
        })
    }

    // 验证码倒计时
    $('#zc-get-code').click(function () {
        if ($('#zc-eml').val().search(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/) == -1) {
            $('#zc-eml').next().text('请输入正确邮箱')
            return;
        } else {
            zcGetCode();

            var count = 30;
            var countdown = setInterval(CountDown, 1000);

            function CountDown() {
                $("#zc-get-code").attr("disabled", true);
                $("#zc-get-code").css("background", "#ccc");
                $("#zc-get-code").text(count + "S");
                if (count == 0) {
                    $("#zc-get-code").css("background", "#189AE5");
                    $("#zc-get-code").removeAttr("disabled");
                    $("#zc-get-code").text("获取验证码");
                    clearInterval(countdown);
                }
                count--;
            }
        }
    })
    $('#zh-get-code').click(function () {
        if ($('#zh-eml').val() == '') {
            $('#zh-eml').next().text('请输入邮箱')
            return;
        } else {
            zhGetCode();

            var count = 30;
            var countdown = setInterval(CountDown, 1000);

            function CountDown() {
                $("#zh-get-code").attr("disabled", true);
                $("#zh-get-code").css("background", "#ccc");
                $("#zh-get-code").text(count + "S");
                if (count == 0) {
                    $("#zh-get-code").css("background", "#189AE5");
                    $("#zh-get-code").removeAttr("disabled");
                    $("#zh-get-code").text("获取验证码");
                    clearInterval(countdown);
                }
                count--;
            }
        }
    })

    // 登录事件
    $("#btn").click(function () {
        if (uid && pwd && cod && $('#cbx').is(':checked')) {
            $.ajax({
                url: hrName + "/api/login",
                type: "post",
                cache: false,
                dataType: "json",
                async: true,
                xhrFields: {      
                    withCredentials: true    
                },
                crossDomain: true,
                data: {
                    username: $("#uid").val(), //取输入的用户名
                    password: $("#pwd").val(), //取输入的密码
                    code: $("#cod").val(), //取验证码
                },
                success: function (data) {
                    if (data.code == "200") {
                        location.href = "/HRuser.html";
                    } else {
                        layer.alert(data.description)
                        ClickCod();
                    }
                }
            })
        } else {
            layer.alert("请输入完整信息并同意用户协议!")
            ClickCod();
        }
    })

    // 注册事件
    $("#zc-btn").click(function () {
        if (zc_uid && zc_pwd && zc_setpwd && zc_code && zc_eml) {
            $.ajax({
                url: hrName + "/api/register",
                type: "post",
                cache: false,
                dataType: "json",
                async: true,
                data: {
                    username: $("#zc-uid").val(),
                    password: $("#zc-pwd").val(),
                    email: $("#zc-eml").val(),
                    emailCode: $("#zc-code").val(),
                },
                success: function (data) {
                    if (data.code == "200") {
                        layer.alert("注册成功，请登陆")
                        hideShade()
                    } else {
                        layer.alert(data.description)
                    }
                }
            })
        } else {
            layer.alert("请填写完整信息!")
        }

    })

    // 忘记密码事件
    $("#zh-btn").click(function () {
        if (zh_pwd && zh_setpwd && zh_code && zh_eml) {
            $.ajax({
                url: hrName + "/api/user/setting/createNewPassword",
                type: "post",
                cache: false,
                dataType: "json",
                async: true,
                data: {
                    newPassword: $("#zh-pwd").val(),
                    email: $("#zh-eml").val(),
                    emailCode: $("#zh-code").val(),
                },
                success: function (data) {
                    if (data.code == "200") {
                        layer.alert("密码修改成功，请登陆")
                        hideShade()
                    } else {
                        layer.alert(data.description)
                    }
                }
            })
        } else {
            layer.alert("请填写完整信息!")
        }

    })

});