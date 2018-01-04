/*
 * @Author: zw
 * @Date:   2017-12-31 15:10:45
 * @Last Modified by:   zw
 * @Last Modified time: 2017-12-31 16:11:03
 */
$(function() {
    getUser();
    updateUser();
});

function getUser() {
    $.ajax({
        url: '/user/queryUser',
        data: { 'page': 1, 'pageSize': 10 },
        success: function(data) {
            var html = template('userTmp', data);
            $('.main-body').html(html);
        }
    })
}

function updateUser() {
    $('body').on('click', '.btn-options', function() {
        var id = $(this).data('id');
        var isDelete = $(this).data('is-delete');
        if (isDelete == 1) {
            isDelete = 2;
        } else {
            isDelete = 1;
        }
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: { 'id': id, 'isDelete': isDelete },
            success: function(data) {
                if (data.success) {
                    alert('修改成功');
                    // 修改成功重新刷新
                    getUser();
                }
            }
        })
    });
}
