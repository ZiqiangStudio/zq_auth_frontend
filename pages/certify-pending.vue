<template>
  <page-back />
  <page-header :image="image" title="验证邮件已发送" notice="验证邮件已发送至2019301040084@whu.edu.cn" />
  <form @submit="submit">
    <button>已在邮箱中完成验证</button>
    <button class="resend" :disabled="messageTimeout > 0" @click="resend">重新发送邮件{{ messageTimeout > 0 ? ` (${messageTimeout})` : '' }}</button>
  </form>
  <p class="action"><nuxt-link to="/register">无法访问武大邮箱？</nuxt-link></p>
</template>
<script lang="ts" setup>
const route = useRoute();
const id = route.params.id?.toString() ?? '';

const image = isDark ? '/image/certify-pending-dark.svg' : '/image/certify-pending.svg';

const messageTimeout = ref(0);
function resetTimeout() {
  messageTimeout.value = 60;
  const intervalId = setInterval(() => {
    messageTimeout.value -= 1;
    if (messageTimeout.value === 0) {
      clearInterval(intervalId);
    }
  }, 1000);
}
onMounted(() => {
  resetTimeout();
});

interface CertifyRes {
  is_certified: boolean;
  certify_time: string;
}

function submit(e: Event) {
  e.preventDefault();
  request<CertifyRes>(`/api/users/${id}/certify/`, {
    method: 'GET',
  }).then((res) => {
    if (res.data.is_certified) {
      location.href = '/';
    }
  })
}

interface SendRes {
  to: string;
  timeout: number;
}

function resend(e: Event) {
  e.preventDefault();
  request<SendRes>(`/api/users/${id}/certify/`, {
    method: 'POST',
  }).then(() => {
    resetTimeout();
  });
}
</script>
<style scoped lang="less">
form {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.resend {
  background-color: var(--color-button-secondary-bg);
  color: var(--color-primary);
  transition: color, background-color .3s;

  &[disabled] {
    color: var(--color-disabled);
    background-color: var(--color-disabled-bg);
  }
}

.action {
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}
</style>
