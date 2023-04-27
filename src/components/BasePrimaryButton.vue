<template>
  <button
    type="submit"
    role="button"
    class="button form__button form__button--lg"
    @click.prevent="handleClick"
    :disabled="buttonIsDisabled"
  >
    <slot></slot>
    {{ buttonIsDisabled ? "" : props.buttonText }}
    <div
      v-if="props.buttonStatus === loadingState"
      class="spinner-border text-light"
      role="status"
    ></div>
  </button>
</template>
<script setup>
import { Status } from "@/types";
import { computed } from "@vue/runtime-core";

/* eslint-disable  no-unused-vars */
/* eslint-disable  no-undef */

const props = defineProps(["buttonText", "buttonStatus", "disabled"]);

const buttonIsDisabled = computed(
  () => props.disabled || props.buttonStatus === Status.LOADING
);
const loadingState = computed(() => Status.LOADING);

const emits = defineEmits(["button-clicked"]);

const handleClick = () => {
  emits("button-clicked");
};
</script>
