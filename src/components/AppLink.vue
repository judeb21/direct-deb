<template>
  <a v-if="isExternal" :href="to">
    <slot />
  </a>
  <router-link v-bind="$props" v-else>
    <slot />
  </router-link>
</template>
<script setup>
import { computed } from "@vue/runtime-core";
import { RouterLink } from "vue-router";

/* eslint-disable  no-unused-vars */
/* eslint-disable  no-undef */
const props = defineProps({
  ...RouterLink.props,
});

const isExternal = computed(
  () => typeof to === "string" && to.startsWith("http")
);
</script>
