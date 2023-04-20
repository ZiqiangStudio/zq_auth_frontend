<template>
  <div class="container">
    <page-header />
    <form @submit="submit">
      <z-input
        v-model="username"
        label="用户名"
        required
        maxlength="16"
        minlength="4"
        pattern="[a-zA-Z0-9_\-]+"
        placeholder="请输入用户名"
        :custom-rule="usernameRule"
      >
        <template #prefix>
          <User />
        </template>
      </z-input>
      <z-input
        ref="phoneInputRef"
        v-model="phone"
        label="手机号"
        required
        minlength="11"
        maxlength="11"
        type="tel"
        pattern="1[3-9]\d+"
        placeholder="请输入手机号"
      >
        <template #prefix>
          <Phone />
        </template>
      </z-input>
      <z-input
        v-model="sms"
        label="验证码"
        minlength="6"
        maxlength="6"
        type="number"
        required
        pattern="[0-9]+"
        placeholder="请输入验证码"
      >
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
        label="密码"
        required
        type="password"
        maxlength="18"
        minlength="6"
        pattern="[a-zA-Z0-9_\-]+"
        placeholder="请输入密码"
      >
        <template #prefix>
          <Lock />
        </template>
      </z-input>
      <z-input
        v-model="confirmedPassword"
        label="确认密码"
        required
        type="password"
        maxlength="18"
        minlength="6"
        pattern="[a-zA-Z0-9_\-]+"
        placeholder="请再次输入密码"
        :custom-rule="confirmedPasswordRule"
      >
        <template #prefix>
          <Lock />
        </template>
      </z-input>
      <button class="submit">注册</button>
    </form>
    <p class="action">
      已有账号？<nuxt-link to="/login"><strong>立即登录</strong></nuxt-link>
    </p>
  </div>
</template>
<script lang="ts" setup>
import ZInput from '@/components/z-input.vue';
import Lock from 'assets/icon/lock.svg?component';
import Message from 'assets/icon/message.svg?component';
import User from 'assets/icon/user.svg?component';
import Phone from 'assets/icon/phone.svg?component';
import MMessage from 'vue-m-message';

const username = ref('');
const phone = ref('');
const sms = ref('');
const password = ref('');
const confirmedPassword = ref('');

const router = useRouter();

interface RegisterRes {
  id: number;
  username: string;
  name: string;
  phone: string;
  student_id: string;
  is_certified: boolean;
  certify_time: null | string;
  update_time: string;
  create_time: string;
  expire_time: string;
  access: string;
  refresh: string;
}

function submit(e: Event) {
  e.preventDefault();
  $fetch<ResBody<RegisterRes>>('/api/users/', {
    method: 'POST',
    body: {
      username: username.value,
      phone: phone.value,
      code: sms.value,
      password: password.value,
    },
  })
    .then((res) => {
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('exp', res.data.expire_time);
      localStorage.setItem('refresh', res.data.refresh);
      router.push(`/certify?id=${res.data.id}`);
    })
    .catch((err) => {
      MMessage.error(err.data.msg);
    });
}

const phoneInputRef = ref<InstanceType<typeof ZInput> | null>(null);
const messageTimeout = ref(0);
let intervalId = -1;
function sendMessage(e: Event) {
  e.preventDefault();
  if (!phoneInputRef.value) return;
  if (!phoneInputRef.value.reportValidity()) return;
  if (messageTimeout.value > 0) return;
  $fetch<ResBody<{ status: string }>>('/api/auth/sms/', {
    method: 'POST',
    body: {
      phone: phone.value,
    },
  })
    .then((res) => {
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

function usernameRule(value: string) {
  if (/^\d+$/.test(value)) return '用户名不能全为数字';
  return '';
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
