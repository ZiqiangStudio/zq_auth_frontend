<template>
  <page-back v-if="!isWxapp" />
  <page-header :image="image" title="使用其他邮箱验证" notice="请输入您的姓名和常用邮箱，我们将发送验证邮件" />
  <form @submit="submit">
    <z-input v-model="name" label="姓名" required placeholder="请输入姓名">
      <template #prefix>
        <User />
      </template>
    </z-input>
    <z-input v-model="email" label="邮箱" required placeholder="请输入您的邮箱" type="email">
      <template #prefix>
        <Message />
      </template>
    </z-input>
    <button type="submit">发送验证邮件</button>
    <button class="skip" @click="backToCertify">返回</button>
  </form>
</template>
<script lang="ts" setup>
import User from 'assets/icon/user.svg?component';
import Message from 'assets/icon/message.svg?component';
import MMessage from 'vue-m-message';

const image = isDark ? '/image/certify-dark.svg' : '/image/certify.svg';

const name = ref('');
const email = ref('');

const route = useRoute();
const id = route.query.id?.toString() ?? '';

const router = useRouter();

const isWxapp = ref(false);

onMounted(() => {
  isWxapp.value = sessionStorage.getItem('wxapp') === 'true';
});

interface ChangeRes {
  id: number;
  username: string;
  name: string;
  phone: string;
  student_id: string;
  is_certified: boolean;
  certify_time: string | null;
  update_time: string;
  create_time: string;
}

interface SendRes {
  to: string;
  timeout: number;
}

function submit(e: Event) {
  e.preventDefault();
  if (id.length === 0) return;
  request<ChangeRes>(`/users/${id}/`, {
    method: 'PATCH',
    body: {
      name: name.value,
    },
  })
    .then(() => {
      return request<SendRes>(`/users/${id}/certify_email/`, {
        method: 'POST',
        body: {
          email_addr: email.value
        }
      });
    })
    .then(() => {
      router.push(`/certify-pending?id=${id}&email=${encodeURIComponent(email.value)}`);
    })
    .catch((err) => {
      MMessage.error(err.data.msg);
    });
}

function backToCertify(e: Event) {
  e.preventDefault();
  router.push(`/certify?id=${id}`);
}
</script>
<style scoped lang="less">
form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

form button:first-of-type {
  margin-top: 20px;
}

.action {
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  cursor: pointer;
}

.skip {
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
</style>
