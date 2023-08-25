<template>
  <page-back />
  <page-header :image="image" title="验证学生身份" notice="我们会发送一封邮件到您的武大邮箱来验证您的学生身份" />
  <form @submit="submit">
    <z-input v-model="name" label="姓名" required placeholder="请输入姓名">
      <template #prefix>
        <User />
      </template>
    </z-input>
    <z-input v-model="studentId" label="学号" required placeholder="请输入学号">
      <template #prefix>
        <Message />
      </template>
    </z-input>
    <button type="submit">发送验证邮件</button>
    <button :disabled="isCertifyOnly" class="skip" @click="confirmSkip">跳过</button>
  </form>
  <p class="action"><nuxt-link to="/register">无法访问武大邮箱？</nuxt-link></p>
</template>
<script lang="ts" setup>
import User from 'assets/icon/user.svg?component';
import Message from 'assets/icon/message.svg?component';
import MMessage from 'vue-m-message';

const image = isDark ? '/image/certify-dark.svg' : '/image/certify.svg';

const name = ref('');
const studentId = ref('');

const route = useRoute();
const id = route.query.id?.toString() ?? '';

const router = useRouter();

const isCertifyOnly = ref(false);

onMounted(() => {
  isCertifyOnly.value = sessionStorage.getItem('certify-only') === 'true';
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
      student_id: studentId.value,
    },
  })
    .then(() => {
      return request<SendRes>(`/users/${id}/certify/`, {
        method: 'POST',
      });
    })
    .then(() => {
      router.push(`/certify-pending?id=${id}&student-id=${studentId.value}`);
    })
    .catch((err) => {
      MMessage.error(err.data.msg);
    });
}

function confirmSkip(e: Event) {
  e.preventDefault();
  if (confirm('确定要跳过学生身份认证吗？')) {
    router.push(`/login`);
  }
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
}

.skip {
  background-color: var(--color-button-secondary-bg);
  color: var(--color-primary);
  transition: color, background-color 0.3s;

  &[disabled] {
    color: var(--color-disabled);
    background-color: var(--color-disabled-bg);
  }
}
</style>
