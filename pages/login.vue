<template>
  <div class="container">
    <page-header />
    <form @submit="submit">
      <z-input v-model="username" label="用户名/手机号/学号" icon="/icon/user.svg" required placeholder="请输入用户名" />
      <z-input v-model="password" label="密码" icon="/icon/lock.svg" type="password" required placeholder="请输入密码">
        <template #extra-label>
          <nuxt-link to="/reset">忘记密码？</nuxt-link>
        </template>
      </z-input>
      <button>登录</button>
    </form>
    <p class="action">还没有账号？<nuxt-link to="/register"><strong>立即注册</strong></nuxt-link></p>
  </div>
</template>
<script lang="ts" setup>
const username = ref("");
const password = ref("");

function submit(e: Event) {
  $fetch('/api/sso/code/', {
    method: 'post',
    body: {
      username: username.value,
      password: password.value,
      app: 'team',
    },
  }).then((res) => {
    console.log(res.data.code);
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
