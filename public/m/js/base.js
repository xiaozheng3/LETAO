/*
 * @Author: zw
 * @Date:   2017-12-31 11:05:49
 * @Last Modified by:   zw
 * @Last Modified time: 2017-12-31 11:09:36
 */

    /*320  32
                    360 36
    640 屏幕根元素字体大小就是64px
                    屏幕 / 10*/
    var windowWidth = document.documentElement.clientWidth;
    console.log(windowWidth);
    var htmlfontSize = windowWidth / 10;
    document.querySelector('html').style.fontSize = htmlfontSize + 'px';
    window.addEventListener('resize', function() {
        var windowWidth = document.documentElement.clientWidth;
        console.log(windowWidth);
        var htmlfontSize = windowWidth / 10;
        document.querySelector('html').style.fontSize = htmlfontSize + 'px';
    });


