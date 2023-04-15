<template>
  <div class="form-item">
    <div class="label-container">
      <label>{{ label }}</label>
      <slot name="extra-label"/>
    </div>
    <div class="extra-input-container">
      <div class="input-container">
        <input
          :value="modelValue"
          :type="type"
          :required="required"
          :placeholder="placeholder"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <img :src="icon" />
      </div>
      <slot name="extra-input" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<HTMLInputElement['type']>,
    required: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
});

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>
<style lang="less" scoped>
.form-item {
  label,
  input {
    width: 100%;
    box-sizing: border-box;
  }

  .label-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
    font-size: 13px;
  }
}

.extra-input-container {
  display: flex;
  gap: 10px;

  input {
    flex: 1;
  }
}

.input-container {
  position: relative;

  img {
    position: absolute;
    left: 11px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
  }
}

</style>
