<template>
  <div />
</template>
<script setup lang="ts">
const router = useRouter();

onMounted(() => {
  const { search } = location;
  router.replace(`/login${search}`);
});
</script>
