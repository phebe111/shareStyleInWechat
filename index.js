'use strict';
(function() {
    //var vConsole = new VConsole();
    

    setJSSDK();
})()
var curScrollTop = 0; //记录点击时页面滚动的位置

function ajaxData(method, url, data, callBack, callBackError) {
    $.ajax({
        type: method,
        url: url,
        data: data,
        dataType: "json",
        timeout: 6000,
        success: function(data) {
            if (callBack) {
                callBack(data)
            }
        },
        error: callBackError
    });
}

function setJSSDK() {
    ajaxData('POST', '/MMChatApi/utilitys/jssdk', {
        url: window.location.href
    }, response => {
        wx.status = true;
        wx.error(res => {});
        wx.config(response);
        wxready();
    }, () => {
        wx.status = false;
    })
}

function wxready() {
    wx.ready(function() {
        wx.hideMenuItems({
            menuList: ['menuItem:share:qq', 'menuItem:share:weiboApp', 'menuItem:share:facebook', 'menuItem:share:QZone', 'menuItem:openWithQQBrowser', 'menuItem:openWithSafari', 'menuItem:copyUrl'], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            success: res => {}
        });
        var shareImg = window.location.origin + '/mmchat/static/leaflet/share.png';
        var share_config = {
            title: '和生活商业化合作邀约', // 分享标题
            desc: '一站式数字生活服务入口', // 分享描述
            link: window.location.href, // 分享链接
            imgUrl: shareImg, // 分享图标
            success: res => {

            },
            cancel: res => {
                // 用户取消分享后执行的回调函数
            }
        }

        wx.onMenuShareTimeline(share_config);
        wx.onMenuShareAppMessage(share_config);
        wx.onMenuShareQQ(share_config);
    });
}

function dialog() {
    curScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //console.log("当前高度"+curScrollTop)
    $(".wrap").hide()
    $(".cover").show();
    var h = document.body.clientHeight;
    // console.log("高度2"+document.body.clientHeight)
    var th = h * 650 / 5686
    window.scrollTo(0, th);
}

function closeDialog() {
    $(".cover").hide();
    $(".wrap").show()
    window.scrollTo(0, curScrollTop);
}
// console.log("宽度" + document.body.clientWidth)
// console.log("高度" + document.body.clientHeight)