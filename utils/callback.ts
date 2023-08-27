import MMessage from 'vue-m-message';

export function callback(data: unknown) {
  const route = useRoute();

  const isWxapp = route.query['wxapp']?.toString() === 'true' || sessionStorage.getItem('wxapp') === 'true';

  if (process.client && window.opener) {
    const url = getRedirectUrl()
    if (url) {
      handleWithUrl(url, data as any)
    } else {
      window.opener.postMessage(data, '*');
      window.close();
    }
  } else if (isWxapp) {
    wx.miniProgram.postMessage({
      data,
    });
    /** 向小程序发送消息，会在以下特定时机触发组件的message事件：小程序后退、组件销毁、分享、复制链接 */
    wx.miniProgram.navigateBack();
  } else {
    MMessage.error('无法回到应用中，请退出页面重新进入');
  }
}

function getRedirectUrl(): URL | null {
  const url = sessionStorage.getItem('redirect-url') ?? '';
  try {
    return new URL(decodeURIComponent(url))
  } catch {
    return null
  }
}

function handleWithUrl(url: URL, extend: any) {
  if (!extend || !extend['code']) {
    return
  }

  if (extend['is_certified']) {
    window.location.href = url.toString() + extend['code']
  }
}
