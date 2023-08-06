// pages/login-webview/login-webview.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    webviewSrc: `https://cas.ziqiang.net.cn/login?app-name=zq_recruitment&wxapp=true`,
  },

  onMessage(data) {
    const code = data.detail.data[0].code;
    if (code) {
      wx.showToast({
        title: '登录成功',
      });
    }
  },
});
