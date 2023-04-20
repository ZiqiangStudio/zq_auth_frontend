<template>
  <div class="container">
    <page-header :app-logo="appLogo" />
    <form @submit="submit">
      <z-input
        v-model="username"
        maxlength="16"
        minlength="4"
        pattern="^[a-zA-Z0-9_-]{4,16}$"
        label="用户名/手机号/学号"
        required
        placeholder="请输入用户名"
        :custom-rule="usernameRule"
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
        pattern="^[a-zA-Z0-9_-]{6,18}$"
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
      <button>登录</button>
    </form>
    <p class="action">
      还没有账号？<nuxt-link to="/register"><strong>立即注册</strong></nuxt-link>
    </p>
  </div>
</template>
<script lang="ts" setup>
import User from 'assets/icon/user.svg?component';
import Lock from 'assets/icon/lock.svg?component';

const username = ref('');
const password = ref('');

const route = useRoute();
const appName = ref(route.params['app-name']?.toString() ?? '');
const appLogo = ref(route.params['app-logo']?.toString() ?? '');

function submit(e: Event) {
  $fetch<ResBody<{ code: string }>>('/api/sso/code/', {
    method: 'post',
    body: {
      username: username.value,
      password: password.value,
      app: appName.value,
    },
  }).then((res) => {
    console.log(res.data.code);
  });
  e.preventDefault();
}

function usernameRule(value: string) {
  if (/^\d+$/.test(value)) return '用户名不能全为数字';
  return '';
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
