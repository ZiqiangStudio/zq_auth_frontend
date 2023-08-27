import queryString, { Stringifiable, StringifiableRecord } from 'query-string';
import MMessage from 'vue-m-message';

export function callback(data: unknown) {
  const route = useRoute();

  const isWxapp = route.query['wxapp']?.toString() === 'true' || sessionStorage.getItem('wxapp') === 'true';
  const redirectUri = route.query['redirect-uri']?.toString() ?? sessionStorage.getItem('redirect-uri');
  const responseType = route.query['response-type']?.toString() ?? sessionStorage.getItem('response-type');
  const state = route.query['state']?.toString() ?? sessionStorage.getItem('state');

  function handleError() {
    MMessage.error('无法回到应用中，请退出页面重新进入');
  }

  if (process.client && window.opener) {
    window.opener.postMessage(data, '*');
    window.close();
  } else if (typeof redirectUri === 'string' && redirectUri.length > 0) {
    if (isStringifiableRecord(data)) {
      const query = { ...data };
      if (typeof state === 'string' && state.length > 0 && typeof query['state'] === 'undefined') {
        query['state'] = state;
      }

      location.replace(
        queryString.stringifyUrl({
          url: redirectUri,
          query,
        }),
      );
    } else if (isStringifiable(data) && typeof responseType === 'string' && responseType.length > 0) {
      const query = {
        [responseType]: data,
      };
      if (typeof state === 'string' && state.length > 0) {
        query['state'] = state;
      }

      location.replace(
        queryString.stringifyUrl({
          url: redirectUri,
          query,
        }),
      );
    } else {
      handleError();
    }
  } else if (isWxapp) {
    wx.miniProgram.postMessage({
      data,
    });
    /** 向小程序发送消息，会在以下特定时机触发组件的message事件：小程序后退、组件销毁、分享、复制链接 */
    wx.miniProgram.navigateBack();
  } else {
    handleError();
  }
}

function isStringifiable(data: unknown): data is Stringifiable {
  return (
    data === null ||
    typeof data === 'undefined' ||
    typeof data === 'boolean' ||
    typeof data === 'number' ||
    typeof data === 'string' ||
    (Array.isArray(data) && data.every((i) => isStringifiable(i)))
  );
}

function isStringifiableRecord(data: unknown): data is StringifiableRecord {
  return typeof data === 'object' && data !== null && Object.values(data).every((i) => isStringifiable(i));
}
