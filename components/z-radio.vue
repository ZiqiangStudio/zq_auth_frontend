<template>
  <div id="radio" class="form-item">
    <input :id="id ?? label" type="radio" name="radio" @change="onChange" />
    <label :for="id ?? label">{{ label }}</label>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
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
    type: null,
    required: true,
    default: '',
  },
  value: {
    type: null,
    required: true,
  },
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void;
}>();

function onChange() {
  emit('update:modelValue', props.value);
}
</script>

<style scoped lang="less">
#radio {
  display: flex;
  gap: 8px;
  align-items: center;
  * {
    margin: 0;
  }
}
</style>
