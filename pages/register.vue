<template>
  <div class="container">
    <header>
      <app-header app-logo="" />
      <h1>使用<strong>自强 Studio 账号</strong>登录</h1>
      <p class="notice">使用同一个账号来登录所有的自强产品，从此无需重复输入个人信息</p>
    </header>
    <form @submit="submit">
      <div class="form-item">
        <label>用户名</label>
        <div class="input-container">
          <input v-model="username" required placeholder="请输入用户名" />
          <img src="/icon/user.svg" />
        </div>
      </div>
      <div class="form-item">
        <label>手机号</label>
        <div class="input-container">
          <input ref="phoneInputRef" v-model="phone" minlength="11" maxlength="11" type="tel" pattern="[0-9]+" required placeholder="请输入手机号" />
          <img src="/icon/phone.svg" />
        </div>
      </div>
      <div class="form-item">
        <label>验证码</label>
        <div class="sms-container">
          <div class="input-container">
            <input v-model="sms" required placeholder="请输入验证码" />
            <img src="/icon/message.svg" />
          </div>
          <button :disabled="messageTimeout > 0" @click="sendMessage">{{ messageTimeout > 0 ? messageTimeout : '获取验证码' }}</button>
        </div>
      </div>
      <div class="form-item">
        <label>密码</label>
        <div class="input-container">
          <input v-model="password" required type="password" placeholder="请输入密码" />
          <img src="/icon/lock.svg" />
        </div>
      </div>
      <div class="form-item">
        <label>确认密码</label>
        <div class="input-container">
          <input v-model="confirmedPassword" required type="password" placeholder="请再次输入密码" />
          <img src="/icon/lock.svg" />
        </div>
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

const phoneInputRef = ref<HTMLInputElement | null>(null);
const messageTimeout = ref(0);
let intervalId = -1;
function sendMessage(e: Event) {
  if (!phoneInputRef.value) return;
  if (!phoneInputRef.value.reportValidity()) return;
  if (messageTimeout.value > 0) return;
  $fetch<{ status: string }>('/api/auth/sms/', {
    method: 'post',
    body: {
      phone: phone.value,
    },
  }).then((res) => {
    messageTimeout.value = 60;
    intervalId = setInterval(() => {
      messageTimeout.value -= 1;
      if (messageTimeout.value === 0) {
        clearInterval(intervalId);
      }
    }, 1000);
    console.log(res.status);
  });
  e.preventDefault();
}
</script>
<style lang="less" scoped>
.container header {
  text-align: center;
  margin-bottom: 20px;

  h1 {
    margin-top: 40px;
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

.input-container {
  position: relative;

  img {
    position: absolute;
    left: 11px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
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
    white-space: nowrap;
    width: 45%;
    transition: color, background-color .3s;

    &[disabled] {
      color: var(--color-disabled);
      background-color: var(--color-disabled-bg);
    }
  }
}
</style>
