<template>
  <page-back />
  <page-header :image="image" title="忘记密码" notice="通过账号绑定的手机号找回密码" title-gap="30px" />
  <form @submit="submit">
    <z-input
      ref="phoneInputRef"
      v-model="phone"
      label="手机号"
      required
      minlength="11"
      maxlength="11"
      type="tel"
      pattern="[0-9]+"
      placeholder="请输入手机号"
    >
      <template #prefix>
        <Phone />
      </template>
    </z-input>
    <z-input v-model="sms" maxlength="6" minlength="6" type="number" label="验证码" required placeholder="请输入验证码">
      <template #prefix>
        <Message />
      </template>
      <template #extra-input>
        <button class="send" :disabled="messageTimeout > 0" @click="sendMessage">
          {{ messageTimeout > 0 ? messageTimeout : '获取验证码' }}
        </button>
      </template>
    </z-input>
    <z-input
      v-model="password"
      maxlength="18"
      minlength="6"
      pattern="[a-zA-Z0-9_\-]+"
      type="password"
      label="新密码"
      required
      placeholder="请输入新密码"
    >
      <template #prefix>
        <Lock />
      </template>
    </z-input>
    <z-input
      v-model="confirmedPassword"
      label="确认密码"
      maxlength="18"
      minlength="6"
      required
      type="password"
      pattern="[a-zA-Z0-9_\-]+"
      placeholder="请再次输入新密码"
      :custom-rule="confirmedPasswordRule"
    >
      <template #prefix>
        <Lock />
      </template>
    </z-input>
    <button class="submit">重置密码</button>
  </form>
</template>
<script lang="ts" setup>
import Lock from 'assets/icon/lock.svg?component';
import Message from 'assets/icon/message.svg?component';
import Phone from 'assets/icon/phone.svg?component';
import MMessage from 'vue-m-message';

const router = useRouter();

const image = isDark ? '/image/reset-dark.svg' : '/image/reset.svg';

const phone = ref('');
const sms = ref('');
const password = ref('');
const confirmedPassword = ref('');

function submit(e: Event) {
  e.preventDefault();
  $fetch<ResBody<{ status: string }>>('https://api.cas.ziqiang.net.cn/users/reset/', {
    method: 'POST',
    body: {
      phone: phone.value,
      code: sms.value,
      password: password.value,
    },
  })
    .then(() => {
      router.back();
    })
    .catch((err) => {
      MMessage.error(err.data.msg);
    });
}

const phoneInputRef = ref<HTMLInputElement | null>(null);
const messageTimeout = ref(0);
let intervalId = -1;
function sendMessage(e: Event) {
  e.preventDefault();
  if (!phoneInputRef.value) return;
  if (!phoneInputRef.value.reportValidity()) return;
  if (messageTimeout.value > 0) return;
  $fetch<ResBody<{ status: string }>>('https://api.cas.ziqiang.net.cn/auth/sms/', {
    method: 'POST',
    body: {
      phone: phone.value,
    },
  })
    .then(() => {
      messageTimeout.value = 60;
      intervalId = setInterval(() => {
        messageTimeout.value -= 1;
        if (messageTimeout.value === 0) {
          clearInterval(intervalId);
        }
      }, 1000);
    })
    .catch((err) => {
      MMessage.error(err.data.msg);
    });
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

form .submit {
  margin-top: 8px;
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
  transition: color, background-color 0.3s;

  &[disabled] {
    color: var(--color-disabled);
    background-color: var(--color-disabled-bg);
  }
}
</style>
