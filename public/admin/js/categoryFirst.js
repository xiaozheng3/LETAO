/*
 * @Author: zw
 * @Date:   2017-12-31 16:17:36
 * @Last Modified by:   zw
 * @Last Modified time: 2017-12-31 17:35:48
 */
$(function() {
    getCategoryFirst();
    addCategoryFirst();
    prvePage();
    nextPage();
});
// 获取一级分类的数据
function getCategoryFirst() {
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        data: { 'page': 1, 'pageSize': 5 },
        success: function(data) {
            data.page = Math.ceil(data.total / 5);
            pageCount = data.page;
            var page = [];
            for (var i = 1; i <= data.page; i++) {
                page.push(i);
            }
            data.page = page;
            console.log(data.page);
            var html = template('categoryFirstTmp', data);
            $('.main-body').html(html);
        }
    })
}

function addCategoryFirst() {
    $('.btn-add').on('click', function() {
        var categoryName = $('.category-first').val().trim();
        $.ajax({
            url: '/category/addTopCategory',
            data: { 'categoryName': categoryName },
            type: 'post',
            success: function(data) {
                if (data.success) {
                    // alert('添加成功');
                    // 重新渲染页面
                    getCategoryFirst();
                    // 清空输入框
                    $('.category-first').val('');
                }
            }
        })
    });
}

var page = 1;
var pageCount = 1;

function prvePage() {
    $('body').on('click', '.prev', function() {
        page--;
        if (page <= 1) {
            page = 1;
        }
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: { 'page': page, 'pageSize': 5 },
            success: function(data) {
                data.page = Math.ceil(data.total / 5);
                pageCount = data.page;
                var page = [];
                for (var i = 1; i <= data.page; i++) {
                    page.push(i);
                }
                data.page = page;
                console.log(data.page);
                var html = template('categoryFirstTmp', data);
                $('.main-body').html(html);
            }
        })
    })
}

function nextPage() {
    $('body').on('click', '.next', function() {
        page++;
        if (page >= pageCount) {
            page = pageCount;
        }
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: { 'page': page, 'pageSize': 5 },
            success: function(data) {
                data.page = Math.ceil(data.total / 5);
                pageCount = data.page;
                var page = [];
                for (var i = 1; i <= data.page; i++) {
                    page.push(i);
                }
                data.page = page;
                console.log(data.page);
                var html = template('categoryFirstTmp', data);
                $('.main-body').html(html);
            }
        })
    })
}
