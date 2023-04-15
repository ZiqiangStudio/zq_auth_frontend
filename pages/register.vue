<template>
  <div class="container">
    <header>
      <h1>使用<strong>自强 Studio 账号</strong>登录</h1>
      <p class="notice">使用同一个账号来登录所有的自强产品，从此无需重复输入个人信息</p>
    </header>
    <form @submit="submit">
      <div class="form-item">
        <label>用户名</label>
        <input v-model="username" placeholder="请输入用户名" />
      </div>
      <div class="form-item">
        <label>手机号</label>
        <input v-model="phone" placeholder="请输入手机号" />
      </div>
      <div class="form-item">
        <label>验证码</label>
        <div class="sms-container">
          <input v-model="sms" placeholder="请输入验证码" />
          <button @click="sendMessage">获取验证码</button>
        </div>
      </div>
      <div class="form-item">
        <label>密码</label>
        <input v-model="password" type="password" placeholder="请输入密码" />
      </div>
      <div class="form-item">
        <label>确认密码</label>
        <input v-model="confirmedPassword" type="password" placeholder="请再次输入密码" />
      </div>
      <button>注册</button>
    </form>
    <p class="action">已有账号？<nuxt-link to="/login"><strong>立即登录</strong></nuxt-link></p>
  </div>
</template>
<script lang="ts" setup>
const username = ref("");
const phone = ref("");
const sms = ref("");
const password = ref("");
const confirmedPassword = ref("");

function submit(e: Event) {
  console.log(username.value, password.value);
  e.preventDefault();
}

function sendMessage(e: Event) {
  console.log('');
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
  label,
  input {
    width: 100%;
    box-sizing: border-box;
  }

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

.sms-container {
  display: flex;
  gap: 10px;

  input {
    flex: 1;
  }

  button {
    width: auto;
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
