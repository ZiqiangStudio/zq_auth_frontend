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
      <button type="submit">
        <z-loading v-if="isLoading" />
        登录<template v-if="isLoading">中...</template>
      </button>
    </form>
    <p class="action">
      还没有账号？
      <nuxt-link :to="`/register?app-name=${appName}&app-logo=${appLogo}`">
        <strong>立即注册</strong>
      </nuxt-link>
    </p>
  </div>
</template>
<script lang="ts" setup>
import User from 'assets/icon/user.svg?component';
import Lock from 'assets/icon/lock.svg?component';
import MMessage from 'vue-m-message';

const username = ref('');
const password = ref('');

const router = useRouter();
const route = useRoute();
const appName = ref(route.query['app-name']?.toString() ?? '');
const appLogo = ref(route.query['app-logo']?.toString() ?? '');

const isWxapp = route.query['wxapp']?.toString() === 'true';

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

function submit(e: Event) {
  if (isLoading.value) return;
  isLoading.value = true;
  $fetch<ResBody<LoginRes>>('https://api.cas.ziqiang.net.cn/auth/users/', {
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

      return request<ResBody<{ code: string }>>('https://api.cas.ziqiang.net.cn/sso/code/', {
        method: 'POST',
        body: {
          app: appName.value,
        },
      });
    })
    .then((res) => {
      // eslint-disable-next-line no-undef
      if (process.client && window.opener) {
        window.opener.postMessage(
          {
            code: res.code,
          },
          '*',
        );
        window.close();
      } else if (isWxapp) {
        // eslint-disable-next-line no-undef
        wx.miniProgram.postMessage({
          data: {
            code: res.code,
          },
        });
        /** 向小程序发送消息，会在以下特定时机触发组件的message事件：小程序后退、组件销毁、分享、复制链接 */
        // eslint-disable-next-line no-undef
        wx.miniProgram.navigateBack();
      }
    })
    .catch((err) => {
      isLoading.value = false;
      if ('data' in err && typeof err.data === 'object' && 'code' in err.data && typeof err.data.code === 'string') {
        /** A0311：用户未激活，邮箱认证未通过，需要重新校验 */
        if (err.data.code === 'A0311' && typeof loginRefCache.value?.id === 'number') {
          MMessage.error('登录需要验证学生身份，请重新验证');
          router.push(`/certify?id=${loginRefCache.value.id}&app-name=${appName}&app-logo=${appLogo}`);
          return;
        }
      }
      console.error(err);
      MMessage.error(err.data.msg);
    });
  e.preventDefault();
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
