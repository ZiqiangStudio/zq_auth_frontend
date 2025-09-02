<template>
  <page-back v-if="!isWxapp" />
  <page-header :image="image" title="验证邮件已发送" :notice="getNoticeText" />
  <form @submit="submit">
    <button>已在邮箱中完成验证</button>
    <button class="resend" :disabled="messageTimeout > 0" @click="resend">
      重新发送邮件{{ messageTimeout > 0 ? ` (${messageTimeout})` : '' }}
    </button>
  </form>
  <p class="action"><nuxt-link to="/help">如何访问武大邮箱？</nuxt-link></p>
</template>
<script lang="ts" setup>
import MMessage from 'vue-m-message';
import { callback } from '@/utils/callback';

const route = useRoute();
const id = route.query.id?.toString() ?? '';
const studentId = ref(route.query['student-id']?.toString() ?? '');
const email = ref(route.query.email?.toString() ?? '');

const isWxapp = ref(false);
let isCertifyOnly = false;
onMounted(() => {
  isWxapp.value = sessionStorage.getItem('wxapp') === 'true';
  isCertifyOnly = sessionStorage.getItem('certify-only') === 'true';
});

const image = isDark ? '/image/certify-pending-dark.svg' : '/image/certify-pending.svg';

const getNoticeText = computed(() => {
  if (email.value) {
    return `验证邮件已发送至${email.value}`;
  } else {
    return `验证邮件已发送至${studentId.value}@whu.edu.cn`;
  }
});

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

const router = useRouter();

function submit(e: Event) {
  e.preventDefault();
  request<CertifyRes>(`/users/${id}/certify/`, {
    method: 'GET',
  })
    .then((res) => {
      if (res.is_certified) {
        if (isCertifyOnly) {
          callback({
            is_certified: res.is_certified,
          });
        } else {
          router.replace('/login');
        }
      } else {
        MMessage.error('学生身份认证状态未更新，请确认已在邮箱中完成验证');
      }
    })
    .catch((err) => {
      console.error(err);
      MMessage.error(err.data.msg);
    });
}

interface SendRes {
  to: string;
  timeout: number;
}

function resend(e: Event) {
  e.preventDefault();
  if (email.value) {
    // 使用其他邮箱进行验证
    request<SendRes>(`/users/${id}/certify_email/`, {
      method: 'POST',
      body: {
        email_addr: email.value
      }
    }).then(() => {
      resetTimeout();
    });
  } else {
    // 使用武大邮箱进行验证
    request<SendRes>(`/users/${id}/certify/`, {
      method: 'POST',
    }).then(() => {
      resetTimeout();
    });
  }
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
  transition:
    color,
    background-color 0.3s;

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
  cursor: pointer;
}
</style>
