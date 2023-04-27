<template>
  <div class="account">
    <div class="account__header d-flex justify-content-between">
      <div
        class="account__header__items d-flex align-items-center justify-content-between"
      ></div>
    </div>
    <div class="account__container account--admin__container">
      <div class="account__left">
        <div class="account__left__bg"></div>
      </div>
      <div class="account__right d-flex flex-column">
        <div class="account__form__container vh-100">
          <div class="account__form__wrapper d-flex flex-column">
            <div class="account__head text-center">
              <h1 class="account__head__title">hello</h1>
              <p class="account__head__subtitle">
                Welcome to Prolean Core Management System
              </p>
            </div>

            <div class="account__body">
              <div class="account__form">
                <form class="form" @submit.stop.prevent="login">
                  <div class="form__item">
                    <label for="username" class="form__label">Email</label>
                    <input
                      label="Email"
                      placeholder="Email"
                      v-model="loginForm.email"
                      type="email"
                      class="input form__input form__input--lg"
                    />
                  </div>

                  <div class="form__item">
                    <label for="password" class="form__label">Password</label>
                    <input
                      label="password"
                      id="password"
                      placeholder="Password"
                      v-model="loginForm.password"
                      type="password"
                      class="input form__input form__input--lg"
                    />
                  </div>

                  <div
                    class="form__item form__action d-flex align-items-center justify-content-between"
                  >
                    <div style="position: relative; z-index: 3">
                      <BasePrimaryButton
                        :buttonText="buttonText"
                        :buttonStatus="authRequestStatus"
                        :disabled="isLoading"
                        @button-clicked="login"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AlertNotification
      :show="alert.show"
      :status="alert.status"
      :title="alert.title"
      :description="alert.description"
      @close-modal="closeNotification"
    />
  </div>
</template>
<script setup>
import { reactive, ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import BasePrimaryButton from "@/components/BasePrimaryButton.vue";
import { Status } from "@/types";
import AlertNotification from "@/components/AlertNotification.vue";

const loginForm = reactive({
  email: ref(""),
  password: ref(""),
  company: ref(""),
});

let alert = ref({
  show: false,
  status: "",
  title: "",
  description: "",
});

const router = useRouter();
const route = useRoute();
const store = useStore();

const authRequestStatus = computed(() => store.state.auth.authRequestStatus);
const buttonText = computed(() => "Login");
const isLoading = computed(() => authRequestStatus === Status.LOADING);

const alertSuccess = (description) => {
  alert.value.status = "success";
  alert.value.title = "Success";
  alert.value.description = description;
  alert.value.show = true;
};

const alertError = (description) => {
  alert.value.status = "fail";
  alert.value.title = "Error";
  alert.value.description = description;
  alert.value.show = true;
};

const alertWarning = (description) => {
  alert.value.status = "warn";
  alert.value.title = "Warning";
  alert.value.description = description;
  alert.value.show = true;
};

const showNotification = (status, message) => {
  if (status === Status.SUCCESS) return alertSuccess(message);
  if (status === Status.LOADING) return alertWarning(message);
  return alertError(message);
};

const closeNotification = () => {
  alert.value.show = false;
};

const login = () => {
  const redirectPath = route.query.redirect || "/dashboard";

  store
    .dispatch("auth/login", loginForm)
    .then(() => router.push(redirectPath))
    .catch((e) => {
      showNotification(authRequestStatus, e.data.message);
    });
};
</script>
