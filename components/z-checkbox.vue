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
    height: 1em;
    width: 1em;
    border: 2px solid var(--color-primary);
    border-radius: 5px;
    &:checked {
      background-color: var(--color-primary);
      &::after {
        display: block;
        height: 0.75em;
        width: 0.75em;
        box-sizing: border-box;
        border: 2px solid var(--color-bg);
        content: '';
        transform: translate(-0.05em, -0.3em) rotate(50deg);
        clip-path: polygon(100% 20%, 50% 20%, 50% 100%, 100% 100%);
      }
    }
  }
}
</style>
