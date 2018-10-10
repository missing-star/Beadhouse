var app = new Vue({
    el: '#app',
    data: {
        sendCodeText: '发送验证码',
        code: '',
        phone: '',
        time: 60
    },
    methods: {
        sendCode: function () {
            //验证手机号
            if (!/^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/.test(app.phone)) {
                mui.toast('请输入正确的手机号');
            }
            else {
                //是否已发送验证码时间未到
                if (app.time <= 0 || app.time == 60) {
                    //发送验证码
                    $.getJSON('', {phone: app.phone}, function (data) {
                        if (data.code == 1) {
                            mui.toast('验证码发送成功!');
                            app.time = 60;
                            app.sendCodeText = app.time + 's重新发送';
                            var interval = setInterval(function () {
                                if (app.time == 1) {
                                    app.sendCodeText = '重新发送';
                                    clearInterval(interval);
                                }
                                else {
                                    app.sendCodeText = (--app.time) + 's重新发送';
                                }
                            }, 1000);
                        }
                        else {
                            mui.toast('验证码发送失败，请重试!');
                        }
                    });
                }
            }
        }
    }
});

//提交表单
function submitForm() {
    //验证验证码是否为6位
    if (app.code.trim().length != 6) {
        mui.toast('验证码输入错误');
    }
    else {
        //验证手机号和验证码是否匹配
        $.getJSON('', {phone: app.phone, code: app.code}, function (data) {
            if (data.code == 1) {
                //通过
            }
            else {
                //不通过
                mui.toast('验证码错误');
            }
        });
    }
}

window.onload = function () {
}