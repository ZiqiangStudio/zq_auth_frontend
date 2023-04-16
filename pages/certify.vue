<template>
  <page-back />
  <page-header image="/image/certify.svg" title="验证学生身份" notice="我们会发送一封邮件到您的武大邮箱来验证您的学生身份" />
  <form @submit="submit">
    <z-input v-model="name" label="姓名" icon="/icon/user.svg" required placeholder="请输入姓名" />
    <z-input v-model="studentId" label="学号" icon="/icon/info.svg" required placeholder="请输入学号" />
    <button>发送验证邮件</button>
  </form>
  <p class="action"><nuxt-link to="/register">无法访问武大邮箱？</nuxt-link></p>
</template>
<script lang="ts" setup>
const name = ref('');
const studentId = ref('');

const route = useRoute();
const id = route.query.id?.toString() ?? '';

const router = useRouter();

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
  request<ChangeRes>(`/api/users/${id}/`, {
    method: 'PATCH',
    body: {
      name: name.value,
      student_id: studentId.value,
    }
  })
    .then(() => {
      return request<SendRes>(`/api/users/${id}/certify/`, {
        method: 'POST',
      });
    })
    .then(() => {
      router.push(`/certify-pending?id=${id}`);
    });
}
</script>
<style scoped lang="less">
form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

form button {
  margin-top: 20px;
}

.action {
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}
</style>
