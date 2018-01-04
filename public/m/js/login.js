/*
 * @Author: zw
 * @Date:   2017-12-30 10:23:06
 * @Last Modified by:   zw
 * @Last Modified time: 2017-12-30 17:39:57
 */
$(function() {
    login();
})

function login() {
    // 1. 注册登录事件
    $('.btn-login').on('click', function() {
        // 2. 获取输入框的用户名 表单是val值
        var username = $('.username').val().trim();
        // 3. 获取密码
        var password = $('.password').val().trim();
        if (username && password) {
            // 4. 请求登录接口 注意是POST请求
            $.ajax({
                url: '/user/login',
                type: 'post',
                data: { 'username': username, 'password': password },
                success: function(data) {                    
                    // 5. 判断是否登录成功
                    if (data.success) {
                        mui.toast('登录成功');
                        // 6. 登录成功之后跳转到上一页 比如是从个人中心跳转到登录 就跳转到个人中心页面 
                        //如果从详情页跳转到登录 就回到详情
                        //如果点击购物车进入的登录 回到购物车页面
                        // 7.返回上一页
                        // history.go(-1);location.reload();返回上一页之后不会刷新需要手动调用刷新方法                        
                        //也可以返回上一页 并且会刷新
                        history.back();
                    } else {
                        //8. 如果登录失败提示失败原因
                        mui.toast(data.message);
                    }
                }
            });
        } else {
            // 9. 如果用户名密码没有输入提示输入用户名和密码
            // 9.1 mui组件里面的 消失消息框
            // mui.toast('请输入用户名和密码', { duration: 2000, type: 'div' });
            // 9.2 警告框 第一参数是提示内容 第二个是提示标题 第三个参数就是点击确定后会调用的回调函数
            mui.alert('请输入用户名密码', '温馨提示', function() {
                console.log('你点击了确定');
            });
        }
    });
}
