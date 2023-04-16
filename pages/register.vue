<template>
  <div class="container">
    <page-header />
    <form @submit="submit">
      <z-input
        v-model="username"
        label="用户名"
        icon="/icon/user.svg"
        required
        placeholder="请输入用户名"
      />
      <z-input
        ref="phoneInputRef"
        v-model="phone"
        label="手机号"
        icon="/icon/phone.svg"
        required
        minlength="11"
        maxlength="11"
        type="tel"
        pattern="[0-9]+"
        placeholder="请输入手机号"
      />
      <z-input
        v-model="sms"
        label="验证码"
        icon="/icon/message.svg"
        required
        placeholder="请输入验证码"
      >
        <template #extra-input>
          <button class="send" :disabled="messageTimeout > 0" @click="sendMessage">
            {{ messageTimeout > 0 ? messageTimeout : '获取验证码' }}
          </button>
        </template>
      </z-input>
      <z-input
        v-model="password"
        label="密码"
        icon="/icon/lock.svg"
        required
        placeholder="请输入密码"
      />
      <z-input
        v-model="confirmedPassword"
        label="确认密码"
        icon="/icon/lock.svg"
        required
        placeholder="请再次输入密码"
        :custom-rule="confirmedPasswordRule"
      />
      <button>注册</button>
    </form>
    <p class="action">已有账号？<nuxt-link to="/login"><strong>立即登录</strong></nuxt-link></p>
  </div>
</template>
<script lang="ts" setup>
const username = ref('');
const phone = ref('');
const sms = ref('');
const password = ref('');
const confirmedPassword = ref('');

function submit(e: Event) {
  $fetch('/api/users/', {
    method: 'post',
    body: {
      username: username.value,
      phone: phone.value,
      code: sms.value,
      password: password.value,
    },
  }).then((res) => {
    console.log(res.data);
  });
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

function confirmedPasswordRule(value: string) {
  if (value === password.value) return '';
  return '确认密码必须与密码相同';
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

form {
  margin-top: 20px;
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

.send {
  width: auto;
  white-space: nowrap;
  width: 45%;
  transition: color, background-color .3s;

  &[disabled] {
    color: var(--color-disabled);
    background-color: var(--color-disabled-bg);
  }
}
</style>
