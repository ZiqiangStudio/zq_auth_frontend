<template>
  <div id="checkbox" class="form-item">
    <input :id="id ?? label" v-model="selected" type="checkbox" />
    <label :for="id ?? label">{{ label }}</label>
    <slot v-if="modelValue" name="active" />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    required: true,
    default: '',
  },
  id: {
    type: String,
    required: false,
    default: undefined,
  },
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const selected = ref(false);

watch(selected, (value) => {
  emit('update:modelValue', value);
});
</script>

<style scoped lang="less">
#checkbox {
  display: flex;
  gap: 8px;
  align-items: center;

  * {
    margin: 0;
  }

  input {
    appearance: none;
    height: 20px;
    width: 20px;
    border: 2px solid var(--color-primary);
    border-radius: 5px;
    &:checked {
      background-color: var(--color-primary);
      &::after {
        display: block;
        height: 13px;
        width: 13px;
        box-sizing: border-box;
        border: 2px solid var(--color-bg);
        content: ' ';
        transform: translate(1px, -2px) rotate(50deg);
        clip-path: polygon(100% 20%, 60% 20%, 60% 100%, 100% 100%);
      }
    }
  }
}
</style>
