/*
* @Author: zw
* @Date:   2017-12-31 16:48:22
* @Last Modified by:   zw
* @Last Modified time: 2017-12-31 17:16:22
*/
$(function () {
	getCategorySecond();	
	addCategorySecond();
});
function getCategorySecond() {
	$.ajax({
		url:'/category/querySecondCategoryPaging',
		data:{'page':1,'pageSize':10},
		success:function (data) {
			var html = template('categorySecondTmp',data);
			$('.main-body').html(html)
		}
	})
}

function addCategorySecond() {
	// 1. 给添加二级分类点击事件
	$('body').on('click','.btn-add1',function () {
		// 2. 去请求一级分类 把一级分类的列表渲染到下拉框里面
		$.ajax({
			url:'/category/queryTopCategoryPaging',
			data:{'page':1,'pageSize':100},
			success:function (data) {
				//3. 生成一级分类的模板
				var html = template('addCategorySecondTmp',data);
				// 4. 把一级分类模板放到模态框的身体里面
				$('.modal-body').html(html);
			}
		})
	});
	// 1. 保存按钮的点击事件
	$('body').on('click','.btn-add',function () {
		// 2. 获取选择的分类的id
		var categoryId = $('#categoryFirst').val();
		// 3. 获取输入框输入的品牌
		var brandName = $('.category-second').val();
		// 4. 获取图片地址
		var brandLogo = $('.brand-logo').val().split('\\');
		brandLogo = '/mobile/images/'+brandLogo[brandLogo.length-1];
		// 5. 调用添加二级分类的API
		$.ajax({
			url:'/category/addSecondCategory',
			data:{'brandName':brandName,'categoryId':categoryId,'brandLogo':brandLogo,'hot':1},
			type:'post',
			success:function (data) {
				if(data.success){
					getCategorySecond();
				}
			}
		})
	})
}