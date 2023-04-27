<template>
  <div class="toaster show">
    <div
      class="toaster__container"
      v-if="show"
      v-bind:class="{
        'toaster--success': status === 'success',
        'toaster--error': status === 'fail',
        'toaster--warn': status === 'warn',
      }"
    >
      <div class="text-right">
        <span class="cancel-icon">
          <img @click="handleClick" src="@/assets/img/cancel-icon.svg" alt="" />
        </span>
      </div>
      <div>
        <span class="d-block text--small text--600 text--white">{{
          title
        }}</span>
        <span class="d-block text--tiny text--400 text--white">{{
          description
        }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import "@/assets/scss/alert-notification.scss";

/* eslint-disable  no-unused-vars */
/* eslint-disable  no-undef */
const props = defineProps(["show", "status", "title", "description"]);
const emits = defineEmits(["close-modal"]);

const handleClick = () => {
  emits("close-modal");
};
</script>
