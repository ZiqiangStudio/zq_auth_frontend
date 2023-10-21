<template>
  <div class="container">
    <page-header :app-logo="appLogo" />
    <form @submit="submit">
      <z-input
        v-model="username"
        maxlength="16"
        minlength="4"
        pattern="[a-zA-Z0-9_\-]+"
        title="只能包含英文大小写、数字、_和-"
        label="用户名/手机号/学号"
        required
        placeholder="请输入用户名"
      >
        <template #prefix>
          <User />
        </template>
      </z-input>
      <z-input
        v-model="password"
        label="密码"
        maxlength="18"
        minlength="6"
        pattern="[a-zA-Z0-9_\-]+"
        title="只能包含英文大小写、数字、_和-"
        type="password"
        required
        placeholder="请输入密码"
      >
        <template #prefix>
          <Lock />
        </template>
        <template #extra-label>
          <nuxt-link to="/reset">忘记密码？</nuxt-link>
        </template>
      </z-input>
      <z-checkbox id="auto-login" v-model="isAutoLogin" label="自动登录">
        <template #active>
          <z-radio v-model="expireTimeLocal" label="7天" :value="7" />
          <z-radio v-model="expireTimeLocal" label="14天" :value="14" />
        </template>
      </z-checkbox>
      <button type="submit">
        <z-loading v-if="isLoading" />
        登录<template v-if="isLoading">中...</template>
      </button>
    </form>
    <p class="action">
      还没有账号？
      <nuxt-link to="/register">
        <strong>立即注册</strong>
      </nuxt-link>
    </p>
  </div>
</template>
<script lang="ts" setup>
import User from 'assets/icon/user.svg?component';
import Lock from 'assets/icon/lock.svg?component';
import MMessage from 'vue-m-message';
import { callback } from '@/utils/callback';
import { ResBody } from '@/utils/types';
import { API_PREFIX } from '@/utils/request';

const username = ref('');
const password = ref('');
const isAutoLogin = ref(false);
const expireTimeLocal = ref(7); // 以天为单位

const router = useRouter();
const route = useRoute();
const appName = ref('');
const appLogo = ref('');

let isWxapp = false;
let isCertifyOnly = false;
let responseType = '';

const isLoading = ref(false);

interface LoginRes {
  id: number;
  username: string;
  is_certified: boolean;
  expire_time: string;
  access: string;
  refresh: string;
}

const loginRefCache = ref<LoginRes | null>(null);

function getSsoCodeRequest() {
  return request<{ code: string }>('/sso/code/', {
    method: 'POST',
    body: {
      app: appName.value,
    },
  }).then((res) => {
    callback({
      [responseType]: res.code,
    });
  });
}

function handleCertifyOnly() {
  return request<LoginRes>('/users/', {
    method: 'GET',
  }).then((res) => {
    if (res.is_certified) {
      callback({
        is_certified: res.is_certified,
      });
      return;
    } else if (res) {
      router.replace(`/certify?id=${res.id}`);
    }
  });
}

onMounted(() => {
  appName.value = route.query['app-name']?.toString() ?? sessionStorage.getItem('app-name') ?? '';
  appLogo.value = route.query['app-logo']?.toString() ?? sessionStorage.getItem('app-logo') ?? '';
  isWxapp = route.query['wxapp']?.toString() === 'true' || sessionStorage.getItem('wxapp') === 'true';
  isCertifyOnly = route.query['certify-only']?.toString() === 'true';
  const redirectUri = route.query['redirect-uri']?.toString() ?? sessionStorage.getItem('redirect-uri') ?? '';
  responseType = route.query['response-type']?.toString() ?? sessionStorage.getItem('response-type') ?? 'code';
  const state = route.query['state']?.toString() ?? sessionStorage.getItem('state') ?? '';
  const manually = route.query.manually?.toString() === 'true';

  if (appName.value.length === 0) {
    MMessage.error('参数错误无法正常登录，请退出页面重新进入');
    return;
  }

  // 储存应用信息
  if (sessionStorage.getItem('app-name') !== appName.value) {
    sessionStorage.setItem('wxapp', isWxapp.toString());
    sessionStorage.setItem('app-name', appName.value);
    sessionStorage.setItem('app-logo', appLogo.value);
    sessionStorage.setItem('certify-only', isCertifyOnly.toString());
    sessionStorage.setItem('redirect-url', redirectUri);
    sessionStorage.setItem('response-type', responseType);
    sessionStorage.setItem('state', state);
  }

  /**
   * 自动登录，当仅验证学生时，获取用户信息并返回
   */
  if (
    !manually &&
    isAutoLogin &&
    typeof localStorage.getItem('access') === 'string' &&
    Date.parse(localStorage.getItem('exp-local') ?? Date()) > Date.now() &&
    !isLoading.value
  ) {
    isLoading.value = true;

    if (isCertifyOnly) {
      handleCertifyOnly()
        .catch((err) => {
          console.warn('自动登录失败', err);
          localStorage.removeItem('access');
          localStorage.removeItem('exp');
          localStorage.removeItem('exp-local');
          localStorage.removeItem('refresh');
        })
        .finally(() => {
          isLoading.value = false;
        });
    } else {
      getSsoCodeRequest()
        .catch((err) => {
          console.warn('自动登录失败', err);
          localStorage.removeItem('access');
          localStorage.removeItem('exp');
          localStorage.removeItem('exp-local');
          localStorage.removeItem('refresh');
        })
        .finally(() => {
          isLoading.value = false;
        });
    }
  }
});

function submit(e: Event) {
  e.preventDefault();

  if (appName.value.length === 0) {
    MMessage.error('参数错误无法正常登录，请退出页面重新进入');
    return;
  }

  if (isLoading.value) return;
  isLoading.value = true;

  $fetch<ResBody<LoginRes>>(`${API_PREFIX}/auth/users/`, {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value,
    },
  })
    .then((res) => {
      loginRefCache.value = res.data;

      localStorage.setItem('access', res.data.access);
      localStorage.setItem('exp', res.data.expire_time);
      localStorage.setItem('refresh', res.data.refresh);
      localStorage.setItem('exp-local', new Date(Date.now() + expireTimeLocal.value * 24 * 60 * 60 * 1000).toString());

      if (isCertifyOnly) {
        if (res.data.is_certified) {
          callback({
            is_certified: res.data.is_certified,
          });
          return;
        } else {
          router.replace(`/certify?id=${loginRefCache.value.id}`);
          return;
        }
      }

      return getSsoCodeRequest();
    })
    .then(() => {
      isLoading.value = false;
    })
    .catch((err) => {
      isLoading.value = false;
      if ('data' in err && typeof err.data === 'object' && 'code' in err.data && typeof err.data.code === 'string') {
        /** A0311：用户未激活，邮箱认证未通过，需要重新校验 */
        if (err.data.code === 'A0311' && typeof loginRefCache.value?.id === 'number') {
          MMessage.error('登录需要验证学生身份，请重新验证');
          router.replace(`/certify?id=${loginRefCache.value.id}`);
          return;
        }
      }
      console.error(err);
      MMessage.error((err.data && err.data.msg) || err.message);
    });
}
</script>
<style lang="less" scoped>
form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

form button {
  margin-top: 38px;
}

.action {
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}
</style>
