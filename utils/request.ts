type HttpMethod = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';

export function request<T>(url: string, method: HttpMethod, options?: RequestInit) {
  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  return fetch(url, fetchOptions)
    .then((res) => {
      if (res.ok) {
        return res.json() as T;
      } else {
        return res.json()
          .then((res) => Promise.reject(res))
          .catch((res) => Promise.reject(res));
      }
    })
    .catch((res) => {
      console.error(res);
      return Promise.reject(res);
    });
}

request.get = (url: string, options?: RequestInit) => request(url, 'GET', options);
request.delete = (url: string, options?: RequestInit) => request(url, 'DELETE', options);
request.post = (url: string, options?: RequestInit) => request(url, 'POST', options);
request.put = (url: string, options?: RequestInit) => request(url, 'PUT', options);
request.patch = (url: string, options?: RequestInit) => request(url, 'PATCH', options);
