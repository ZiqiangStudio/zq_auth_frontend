import MMessage from 'vue-m-message';

interface RefreshRes {
  access: string;
  expire_time: string;
}

interface RequestOptions {
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';
  body?: Record<string, string>;
  headers?: Record<string, string>;
}

export async function request<T>(url: string, options: RequestOptions) {
  let access = localStorage.getItem('access');
  const refresh = localStorage.getItem('refresh');
  const exp = localStorage.getItem('exp');
  if (!access || !exp) return;
  const router = useRouter();
  if (Date.now() > new Date(exp).getTime()) {
    try {
      const res = await $fetch<ResBody<RefreshRes>>('/api/auth/refresh/', {
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
  return $fetch<ResBody<T>>(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${access}`,
      ...options.headers,
    },
  }).then((res) => {
    return res.data;
  });
}
