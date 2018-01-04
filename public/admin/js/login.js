/*
* @Author: zw
* @Date:   2017-12-31 11:39:15
* @Last Modified by:   zw
* @Last Modified time: 2017-12-31 11:52:37
*/
$(function() {
	adminLogin();
});
// 后台登录
function adminLogin() {
	$('.btn-login').on('click',function () {
		var username = $('#username').val();
		var password = $('#password').val();
		console.log(username);
		console.log(password);
		$.ajax({
			url:'/employee/employeeLogin',
			data:{'username':username,'password':password},
			type:'post',
			success:function (data) {
				console.log(data);
				if(data.success){
					window.location.href = 'index.html';
				}else{
					alert(data.message);
				}
			}
		})
	});
}