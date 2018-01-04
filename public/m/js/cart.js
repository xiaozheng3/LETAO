/*
 * @Author: zw
 * @Date:   2017-12-30 15:21:58
 * @Last Modified by:   zw
 * @Last Modified time: 2017-12-31 10:35:14
 */
$(function() {
    queryCart();
    selectProduct();
    deleteCart();
    editCart();
    selectSize();
    selectNum();
});

// 查询购物车商品
function queryCart() {
    // 1. 发生ajax请求购物车商品数据
    $.ajax({
        url: '/cart/queryCart',
        success: function(data) {
            // 2. 判断如果未登录就跳转到登录页面
            if (data.error) {
                window.location.href = 'login.html';
            } else {
                // 3. 已经登录了就渲染购物车页面 注意 data是一个数组不是一个对象 要包装成对象
                var html = template('cartTmp', { 'rows': data });
                $('.mui-table-view').html(html);
                //4. 调用计算总金额方法计算总金额
                getOrderSum(data);
            }
        }
    })
}

// 计算订单总额
function getOrderSum(data) {
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
        sum += (data[i].price * data[i].num);
    }
    // 设置总金额为当前的价格
    $('.order-price').html(sum);
}
// 选择商品计算总金额
function selectProduct() {
    $('#main').on('click', '.product-check input', function() {
        var price = $(this).parent().parent().find('.price').data('price');
        var num = $(this).parent().parent().find('.num').data('num');
        var count = price * num;
        console.log(count);
        // 获取总额
        var sum = parseInt($('.order-price').html());
        var checked = $(this).attr('checked');
        if (checked == 'true') {
            $(this).attr('checked', 'false');
        } else {
            $(this).attr('checked', 'true');
        }
        if ($(this).attr('checked') == 'true') {
            sum += parseInt(count);
        } else {
            sum -= parseInt(count);
        }
        // 用总金额 减去当前点击的商品的价格
        $('.order-price').html(parseInt(sum));
    });
}
//删除商品
function deleteCart() {
    // 1. 给删除按钮添加点击事件
    $('body').on('tap', '.btn-delete', function() {
        // 2. 获取当前购物车要删除的商品的id 传入API
        $.ajax({
            url: '/cart/deleteCart',
            data: { 'id': $(this).data('id') },
            success: function(data) {
                mui.toast('删除成功');
                queryCart();
            }
        })
    })
}

// 2.2 定义选择尺码和选择数量的函数
function selectSize() {
    $('body').on('tap', '.btn-size', function() {
        $('.btn-size').removeClass('active');
        $(this).addClass('active');
    });
}
// 2.3 定义选择数量的函数
function selectNum() {
    // 2.4 给-添加事件 数量--
    $('body').on('tap', '.btn-reduce', function() {
        var num = $(this).parent().find('input').val();
        num--;
        if (num <= 0) {
            num = 0;
        }
        $(this).parent().find('input').val(num);
    });
    // 2.5 给+添加事件 数量++
    $('body').on('tap', '.btn-add', function() {
        var num = parseInt($(this).parent().find('input').val());
        num++;
        // 剩余数量
        var residueNum = parseInt($('.residue-num').html());
        if (num >= residueNum) {
            num = residueNum;
        }
        $(this).parent().find('input').val(num);
    });
}


function editCart() {
    // 1. 给编辑按钮添加点击事件
    $('body').on('click', '.btn-edit', function() {
        // 3. 把尺码和数量放到对话框的内容里面
        var nowSize = $(this).data('now-size');
        var productSize = $(this).data('product-size');
        var size = [];
        var start = productSize.split('-')[0];
        var end = productSize.split('-')[1];
        for (var i = start; i <= end; i++) {
            size.push(parseInt(i));
        }
        var nowNum = $(this).data('now-num');
        var productNum = $(this).data('product-num');
        var product = {
            'nowSize': nowSize,
            'productSize': size,
            'nowNum': nowNum,
            'productNum': productNum,
            'id': $(this).data('id')
        }
        var html = template('editCartTmp', product).replace(/(\r)?\n/g, "");
        var li = $(this).parent().parent()[0];
        // 2. 弹出MUI的对话 confirm 把准备好的模板放到对话框里面
        mui.confirm(html, '标题', ['确定', '取消'], function(e) {
            if (e.index == 0) {
                // 4. 确定的时候要把当前选中的尺码和数量获取
                var selectedSize = $('.btn-size.active').html();
                var selectedNum = $('.count').val();
                var id = product.id;
                $.ajax({
                    url: '/cart/updateCart',
                    data: { 'id': id, 'size': selectedSize, 'num': selectedNum },
                    type:'post',
                    success:function (data) {
                        // 调用滑动关闭的方法 需要传入 当前编辑框的爷爷 而且必须是DOM对象
                        mui.swipeoutClose(li);
                        queryCart();
                    }
                })
            } else {
                console.log('取消');
            }
        });
    });
}
