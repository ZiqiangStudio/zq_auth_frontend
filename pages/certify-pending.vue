<template>
  <page-back />
  <page-header image="/image/certify-pending.svg" title="验证邮件已发送" notice="验证邮件已发送至2019301040084@whu.edu.cn" />
  <form @submit="submit">
    <button>已在邮箱中完成验证</button>
    <button class="resend" @click="resend">重新发送邮件</button>
  </form>
  <p class="action"><nuxt-link to="/register">无法访问武大邮箱？</nuxt-link></p>
</template>
<script lang="ts" setup>
function submit(e: Event) {
  e.preventDefault();
}

function resend(e: Event) {
  e.preventDefault();
}
</script>
<style scoped lang="less">
form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.resend {
  background-color: var(--color-button-secondary-bg);
  color: var(--color-primary);
}

.action {
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}
</style>
