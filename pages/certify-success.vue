<template>
  <page-header v-if="isLoading" title="正在认证学生身份" notice="请耐心等待，这个时间不会持续太长" />
  <page-header
    v-if="isSuccess"
    :image="image"
    title="学生身份认证成功"
    notice="你可以回到应用中继续注册流程"
    title-gap="15px"
  />
  <page-header
    v-else-if="!isLoading"
    title="学生身份认证失败"
    notice="也许链接已经过期，你可以回到应用中重新发送邮件"
  />
</template>
<script lang="ts" setup>
import MMessage from 'vue-m-message';
import { type ResBody } from '@/utils/types';
import { API_PREFIX } from '@/utils/request';

const route = useRoute();
const code = route.query.code?.toString() ?? '';

const isSuccess = ref(false);
const isLoading = ref(true);

interface CertifyRes {
  is_certified: boolean;
  certify_time: string;
}
let restRetry = 3;
function certify() {
  if (code.length === 0 || restRetry === 0) {
    isLoading.value = false;
    return;
  }
  $fetch<ResBody<CertifyRes>>(`${API_PREFIX}/users/verify_callback/?code=${code}`, {
    method: 'GET',
  })
    .then((res) => {
      isSuccess.value = res.data.is_certified;
      isLoading.value = false;
    })
    .catch((err) => {
      MMessage.error(`${err.data.msg} 正在重试`);
      setTimeout(() => {
        restRetry -= 1;
        certify();
      }, 500);
    });
}

onMounted(() => {
  certify();
});

const image = isDark ? '/image/certify-success-dark.svg' : '/image/certify-success.svg';
</script>
