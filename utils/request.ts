import MMessage from 'vue-m-message';
import { ResBody } from './types';

interface RefreshRes {
  access: string;
  expire_time: string;
}

interface RequestOptions {
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  body?: Record<string, string>;
  headers?: Record<string, string>;
}

export const API_PREFIX = 'https://api.cas.ziqiang.net.cn';

export async function request<T>(url: string, options: RequestOptions) {
  let access = localStorage.getItem('access');
  const refresh = localStorage.getItem('refresh');
  const exp = localStorage.getItem('exp');
  if (!access || !exp) throw Error('没有登录凭证');

  const router = useRouter();
  if (Date.now() > new Date(exp).getTime()) {
    try {
      const res = await $fetch<ResBody<RefreshRes>>(`${API_PREFIX}/auth/refresh/`, {
        method: 'POST',
        body: {
          refresh,
        },
      });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('exp', res.data.expire_time);
      access = res.data.access;
    } catch (err) {
      MMessage.error('登录凭证过期，请重新登录');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    }
  }
  return $fetch<ResBody<T>>(`${API_PREFIX}${url}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${access}`,
      ...options.headers,
    },
  }).then((res) => {
    return res.data;
  });
}
