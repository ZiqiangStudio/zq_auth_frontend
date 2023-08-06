// index.js

Page({
  data: {},
  onLogin() {
    // 向小程序发送消息，会在以下特定时机触发组件的message事件：小程序后退、组件销毁、分享、复制链接
    wx.navigateTo({
      url: '/pages/login-webview/login-webview',
    });
  },
});
