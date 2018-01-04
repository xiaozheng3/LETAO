/*
 * @Author: zw
 * @Date:   2017-12-29 16:49:30
 * @Last Modified by:   zw
 * @Last Modified time: 2017-12-31 12:01:17
 */
var id = getQueryString('id');
$(function() {

    // console.log(id);
    getProductDetail(id);
    refreshInit();
    selectSize();
    selectNum();
    addCart();
});

function refreshInit() {
    //初始化下拉刷新插件
    mui.init({
        pullRefresh: {
            container: '#pullrefresh', //传入父容器的选择器
            down: { //控制下拉刷新
                contentdown: '下拉刷新效果',
                contentover: '拉动的时候的效果',
                contentrefresh: '松开手的时候正在加载数据的显示文本...',
                callback: function() {
                        //模拟ajax请求 过1秒后结束下拉刷新
                        setTimeout(function() {
                            // 调用获取商品详情的方法 
                            getProductDetail(id, function() {
                                //刷新完成后关闭下拉刷新
                                mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                            });

                        }, 1000);
                    } //下拉刷新的回调函数
            }
        }
    });
}
// 获取商品的详情数据
function getProductDetail(id, callback) {
    $.ajax({
        url: '/product/queryProductDetail',
        data: { "id": id },
        success: function(data) {
            console.log(data);
            var size = [];
            var start = data.size.split('-')[0];
            var end = data.size.split('-')[1];
            for (var i = start; i <= end; i++) {
                size.push(parseInt(i));
            }
            data.size = size;

            var html = template('productDetailTmp', data);
            $('.product-detail').html(html);
            // 1. 获取第一个轮播图的item 克隆一份 添加重复类名 .addClass('mui-slider-item-duplicate');
            var first = $('.mui-slider-group').children().first().clone().addClass('mui-slider-item-duplicate');
            // 2. 获取最后一个轮播图的item 克隆一份 添加重复类名 .addClass('mui-slider-item-duplicate');
            var last = $('.mui-slider-group').children().last().clone().addClass('mui-slider-item-duplicate');
            // 3. 第一张图就放到轮播图的最后面
            $('.mui-slider-group').append(first);
            // 4. 把last放到轮播图的最前面
            $('.mui-slider-group').prepend(last);
            // 5. 给第一小圆点添加 active类名
            $('.mui-slider-indicator .mui-indicator').eq(0).addClass('mui-active');
            // 6. 初始化轮播图插件 轮播图动态添加的话必须手动再初始化一次
            mui('.mui-slider').slider({
                // 1. 开启自动轮播图 毫秒数
                interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
            });
            callback && callback();
        }
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

//添加商品到购物车
function addCart() {
    // 2.1 给加入购物车按钮添加点击事件
    $('.btn-cart').on('tap', function() {
        // 2.6 获取当前选中的大小和数量 有btn-size并且有active
        var nowSize = $('.btn-size.active').html();
        if (!nowSize) {
            mui.toast('请选择尺码');
            return;
        }
        var nowNum = $('.count').val();
        if (nowNum <= 0) {
            mui.toast('请选择数量');
            return;
        }
        // 2.7 调用添加购物车的API 把 商品id 商品的数量 和 尺寸传入
        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                productId: id,
                num: nowNum,
                size: nowSize
            },
            success: function(data) {
                // 判断如果没有没有登录 error就有值
                if(data.error){
                    // 跳转到登录页面
                    window.location.href = 'login.html';
                }
                if (data.success) {
                    // 提示跳转到购物车页面
                    mui.confirm('加入购物车成功', '温馨提示', ['确定', '不去'], function(e) { //点击了确定或者取消都会触发回调函数
                        if (e.index == 0) {
                            //点击了确定 跳转页面
                            window.location.href = 'cart.html';
                        } else {
                            //点击了取消
                            mui.toast('还差2分恢复原价');
                        }
                    });
                }
            },
            error: function(data) {
                console.log(data);
            }
        })
    });
}

//获取url中的参数并且解决中文乱码问题
function getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}
