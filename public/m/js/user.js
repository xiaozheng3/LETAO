/*
 * @Author: zw
 * @Date:   2017-12-30 11:15:07
 * @Last Modified by:   zw
 * @Last Modified time: 2017-12-31 10:42:53
 */
$(function() {
    getUserMessage();
    exitLogin();
});
// 获取用户信息
function getUserMessage() {
    // 1. 请求获取用户信息的API
    $.ajax({
        url: '/user/queryUserMessage',
        success: function(data) {
            // 2. 判断data.error的值是否是400 如果是400表示未登录
            if (data.error) {
                mui.toast('未登录');
                // 3. 未登录就跳转到登录页面
                window.location.href = 'login.html';

            } else {
                // 4. 如果已经登录就显示用户的名字和手机
                $('.username').html(data.username);
                $('.mobile').html(data.mobile);
            }
        }
    })
}

function exitLogin() {
    $('.btn-exit').on('click', function() {
        $.ajax({
            url:'/user/logout',
            success:function (data) {
                mui.toast('退出成功');
                window.location.href = 'login.html';
            }
        })
    });
}

// function clearCookie() {
//     var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
//     if (keys) {
//         for (var i = keys.length; i--;)
//             document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
//     }
// }

