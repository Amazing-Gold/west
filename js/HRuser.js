//关闭积分框
function hideUpbox() {
    $(".up-box").addClass('hide');
}
//打开积分规则框
function showGuizebox() {
    $(".guizebox").removeClass('hide');
}
//打开积分兑换框
function showDuihuanbox() {
    $(".duihuanbox").removeClass('hide');
}

$(function () {

    layui.use('laydate', function () {
        var laydate = layui.laydate;

        laydate.render({
            elem: '#time' //指定元素
        });
    });

    //加载执行获取用户信息
    getMessage()

    var ok1 = false;
    var ok2 = false;
    var ok3 = false;
    var ok4 = false;
    var ok5 = false;
    var ok6 = false;
    var ok7 = false;
    var ok8 = false;

    // // 姓名验证
    // $('input[name="name"]').blur(function () {
    //     if ($(this).val().search(/^[\u4E00-\u9FA5A-Za-z]+$/) == -1) {
    //         $(this).next().next().text(' * 请输入正确姓名')
    //     } else {
    //         $(this).next().next().text('')
    //         ok1 = true;
    //     }
    // });
    // 验证昵称 /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/
    $('#nickname').blur(function () {
        if ($(this).val().search(/^[\u4e00-\u9fa5a-zA-Z0-9_]+$/) == -1) {
            $(this).next().text(' * 昵称中只可含有数字、字母、和"_"')
            ok2 = true;
        } else {
            $(this).next().text('')
        }
    });
    // 手机号验证
    $('#usernumber').blur(function () {
        if ($(this).val().search(/^[1][3,4,5,7,8][0-9]{9}$/) == -1) {
            $(this).next().text(' * 请输入11位手机号码')
        } else {
            $(this).next().text('')
            ok3 = true;
        }
    });
    // 验证参加工作时间
    $('#time').blur(function () {
        // $("#time").attr("value",$(this).val());
        console.log($(this).val())
        if ($(this).val() != '') {
            $(this).next().text('')
            ok4 = true;
        } else {
            $(this).next().text(' * 请选择日期')
        }
    });
    // 验证行业
    $('#profession').blur(function () {
        if ($(this).val() != '') {
            $(this).next().text('')
            ok5 = true;
        } else {
            $(this).next().text(' * 请选择行业')
        }
    });
    // 验证公司名称
    $('#companyname').blur(function () {
        if ($(this).val() != '') {
            $(this).next().text('')
            ok6 = true;
        } else {
            $(this).next().next().next().text(' * 请输入正确的公司名称')
        }
    });
    // 验证公司规模
    $('#scale').blur(function () {
        if ($(this).val() != '') {
            $(this).next().text('')
            ok7 = true;
        } else {
            $(this).next().text(' * 请选择公司规模')
        }
    });
    // 验证职位
    $('#userpost').blur(function () {
        if ($(this).val() != '') {
            $(this).next().text('')
            ok8 = true;
        } else {
            $(this).next().text(' * 请选择职位')
        }
    });

    // 保存信息按钮
    $("#save-usermessage").click(function () {
        if (ok2 && ok3 && ok4 && ok5 && ok6 && ok7 && ok8) {
            $.ajax({
                url: hrName + "/api/user/updateUser",
                type: "post",
                cache: false,
                dataType: "json",
                async: true,
                xhrFields: {      
                    withCredentials: true    
                },
                crossDomain: true,
                data: {
                    // userName: $('input[name="name"]').val(), //姓名
                    nickName: $('#nickname').val(), //昵称
                    sex: $("input[name='sex']:checked").val(), //性别
                    mobile: $('#usernumber').val(), //手机号
                    inWorkDate1: $('#time').val(), //参加工作时间
                    companyName: $('#companyname').val(), //公司名
                    industry: $('#profession').val(), //所属行业
                    companySize: $('#scale').val(), //公司规模
                    positional: $('#userpost').val(), //职位
                },
                success: function (data) {
                    if (data.code == "200") {
                        layer.alert('成功')
                        getMessage();
                    } else {
                        layer.alert(data.description)
                    }
                }
            })
        } else {
            layer.alert("请填写完整信息!")
        }
    })

    // 时间戳转换
    var formatlistdate = function (time) {
        var date = new Date(time);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
    }

    // 已有信息展示
    function getMessage() {
        $.ajax({
            url: hrName + "/api/user/getUser",
            type: "get",
            cache: false,
            dataType: "json",
            async: true,
            xhrFields: {      
                withCredentials: true    
            },
            crossDomain: true,
            data: {

            },
            success: function (data) {
                var time = formatlistdate(data.detail.inWorkDate);
                if (data.code == "200") {
                    $('#nickname').val(data.detail.nickName)
                    if (data.detail.sex == "男") {
                        $('#man').attr("checked", 'checked')
                    } else if (data.detail.sex == "女") {
                        $('#woman').attr("checked", 'checked')
                    }
                    $('#usernumber').val(data.detail.mobile)
                    $('#time').val(time)
                    $('#companyname').val(data.detail.companyName)
                    $('#profession').val(data.detail.industry)
                    $('#scale').val(data.detail.companySize)
                    $('#userpost').val(data.detail.positional)
                    ok2 = ok3 = ok4 = ok5 = ok6 = ok7 = ok8 = true
                } else {
                    layer.alert(data.description)
                }
            }
        })
    }

    // 页面2
    var alter_oldpwd = false
    var alter_setpwd = false
    var alter_okpwd = false
    var alter_eml = false

    // 旧密码验证
    $('#alter-oldpwd').blur(function () {
        if ($(this).val().length >= 6 && $(this).val().length <= 20 && $(this).val() != '') {
            $(this).next().text('')
            alter_oldpwd = true;
        } else {
            $(this).next().text(' * 密码应该为6-20位之间')
        }
    });
    // 新密码验证
    $('#alter-setpwd').blur(function () {
        if ($(this).val().length >= 6 && $(this).val().length <= 20 && $(this).val() != '') {
            $(this).next().text('')
            alter_setpwd = true;
        } else {
            $(this).next().text(' * 密码应该为6-20位之间')
        }
    });
    // 确认密码验证
    $('#alter-okpwd').blur(function () {
        if ($(this).val().length >= 6 && $(this).val().length <= 20 && $(this).val() != '' && $(this).val() == $('#alter-setpwd').val()) {
            $(this).next().text('')
            alter_okpwd = true;
        } else {
            $(this).next().text(' * 两次密码不一致')
        }
    });

    // 邮箱验证
    $('#alter-eml').blur(function () {
        if ($(this).val().search(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/) == -1) {
            $(this).next().text(' * 请输入正确的邮箱格式')
        } else {
            $(this).next().text('')
            alter_eml = true
        }
    });
    // 验证码验证
    $('#eml-code').blur(function () {
        if ($(this).val().length == 0) {
            $(this).next().next().text(' * 请输入验证码')
        } else {
            $(this).next().next().text('')
            // cod = true;
        }
    });

    // 验证码倒计时
    $('#eml-get-code').click(function () {
        if ($('#alter-eml').val().search(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/) == -1) {
            $('#alter-eml').next().text(' * 请输入正确的邮箱格式')
            return;
        } else {
            emlGetCode();

            var count = 30;
            var countdown = setInterval(CountDown, 1000);

            function CountDown() {
                $("#eml-get-code").attr("disabled", true);
                $("#eml-get-code").css("background", "#ccc");
                $("#eml-get-code").text(count + "S");
                if (count == 0) {
                    $("#eml-get-code").css("background", "#189AE5");
                    $("#eml-get-code").removeAttr("disabled");
                    $("#eml-get-code").text("获取验证码");
                    clearInterval(countdown);
                }
                count--;
            }
        }
    })

    // 获取验证码
    function emlGetCode() {
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
                email: $("#alter-eml").val(),
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

    // 确认修改密码事件
    $("#pwd-btn").click(function () {
        if (alter_oldpwd && alter_setpwd && alter_okpwd) {
            $.ajax({
                url: hrName + "/api/user/setting/changePassword",
                type: "post",
                cache: false,
                dataType: "json",
                async: true,
                xhrFields: {      
                    withCredentials: true    
                },
                crossDomain: true,
                data: {
                    oldPassword: $('#alter-oldpwd').val(),
                    newPassword: $('#alter-okpwd').val()
                },
                success: function (data) {
                    if (data.code == "200") {
                        layer.alert("密码修改成功")
                    } else {
                        layer.alert(data.description)
                    }
                }
            })
        } else {
            layer.alert('表单信息有误')
        }

    })
    // 确认修改邮箱事件
    $("#eml-btn").click(function () {
        if (alter_eml) {
            $.ajax({
                url: hrName + "/api/user/updateEmail",
                type: "get",
                cache: false,
                dataType: "json",
                async: true,
                xhrFields: {      
                    withCredentials: true    
                },
                crossDomain: true,
                data: {
                    newEmail: $('#alter-eml').val(),
                    emailCode: $('#eml-code').val(),
                },
                success: function (data) {
                    if (data.code == "200") {
                        layer.alert("邮箱修改成功")
                    } else {
                        layer.alert(data.description)
                    }
                }
            })
        } else {
            layer.alert('表单信息有误')
        }

    })

})