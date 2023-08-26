export function useWxapp() {
  const route = useRoute();

  const isWxapp = ref(false);
  onMounted(() => {
    isWxapp.value = route.query['wxapp']?.toString() === 'true' || sessionStorage.getItem('wxapp') === 'true';
    if (typeof sessionStorage.getItem('wxapp') !== 'string') {
      sessionStorage.setItem('wxapp', String(isWxapp.value));
    }
  });

  return isWxapp;
}
