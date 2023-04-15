<template>
  <div class="container">
    <header>
      <h1>使用<strong>自强 Studio 账号</strong>登录</h1>
      <p class="notice">使用同一个账号来登录所有的自强产品，从此无需重复输入个人信息</p>
    </header>
    <form @submit="submit">
      <div class="form-item">
        <label>用户名/手机号/学号</label>
        <input v-model="username" placeholder="请输入用户名" />
      </div>
      <div class="form-item">
        <div class="label-container">
          <label>密码</label>
          <nuxt-link to="find"><strong>忘记密码？</strong></nuxt-link>
        </div>
        <input v-model="password" type="password" placeholder="请输入密码" />
      </div>
      <button>登录</button>
    </form>
    <p class="action">还没有账号？<nuxt-link to="/register"><strong>立即注册</strong></nuxt-link></p>
  </div>
</template>
<script lang="ts" setup>
const username = ref("");
const password = ref("");

function submit(e: Event) {
  console.log(username.value, password.value);
  e.preventDefault();
}
</script>
<style lang="less" scoped>
.container header {
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 28px;
    margin-bottom: 6px;
  }

  .notice {
    padding: 0 20px;
    font-size: 15px;
    color: var(--color-secondary);
  }
}

.form-item {
  .label-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
    font-size: 13px;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action {
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}
</style>
