<template>
  <div class="form-item">
    <div class="label-container">
      <label>{{ label }}</label>
      <slot name="extra-label"/>
    </div>
    <div class="extra-input-container">
      <div class="input-container">
        <input
          ref="inputRef"
          :value="modelValue"
          :type="type"
          :required="required"
          :placeholder="placeholder"
          :maxlength="maxlength"
          :minlength="minlength"
          :pattern="pattern"
          @input="onChange"
        />
        <img :src="icon" />
      </div>
      <slot name="extra-input" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';

const props = defineProps({
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
  minlength: {
    type: String,
    required: false,
  },
  maxlength: {
    type: String,
    required: false,
  },
  pattern: {
    type: String,
    required: false,
  },
  customRule: {
    type: Function as PropType<(value: string) => string>,
    required: false,
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
function reportValidity() {
  if (inputRef.value) {
    inputRef.value.reportValidity();
  }
}

defineExpose({
  reportValidity,
});

function onChange(e: Event) {
  const newValue = (e.target as HTMLInputElement).value;
  if (props.customRule) {
    const msg = props.customRule(newValue);
    if (msg.length > 0 && inputRef.value) {
      inputRef.value.setCustomValidity(msg);
    } else if (inputRef.value) {
      inputRef.value.setCustomValidity('');
    }
  }
  emit('update:modelValue', newValue);
}

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

  div {
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
