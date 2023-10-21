<template>
  <div id="checkbox" class="form-item">
    <input :id="id ?? label" v-model="selected" type="checkbox" />
    <label :for="id ?? label">{{ label }}</label>
    <slot v-if="modelValue" name="active" />
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

<style>
#checkbox {
  display: flex;
  gap: 20px;
  align-items: center;
  * {
    margin: 0;
  }
}
</style>
