<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="show"
      ref="confimration_modal"
      :class="{ show: show === true }"
      :style="{ display: 'block' }"
      class="modal modal__confirm"
      id="confirmModal"
      tabindex=""
      role="dialog"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div class="w-100 h-100 d-flex">
        <div class="modal__dialog" role="document">
          <div class="modal__header mb-3">
            <div class="d-flex align-items-center justify-content-between">
              <span class="modal__header__title text--capital">
                {{ "Confirmation" }}
              </span>
              <span
                class="modal__close modal__close--white d-flex align-items-center justify-content-between"
              >
                <span class="text--capital text--regular" @click="handleClose">
                  close
                </span>
              </span>
            </div>
            <span class="modal__header__subtitle text--capital">
              {{ isTitleNull ? props.title : "" }}
            </span>
          </div>
          <div class="modal__content">
            <div class="modal__body">
              <h5 class="modal__head__title text--capital mb-3">
                Are you sure you want to accept this loan
              </h5>
              <p class="form__lable"></p>
              <div class="d-flex mt-5">
                <button
                  class="button button--lg modal__confirm__button modal__confirm__button--cancel mr-2"
                  @click.prevent="handleClose"
                >
                  cancel
                </button>

                <BasePrimaryButton
                  :buttonText="buttonText"
                  :buttonStatus="loanRequestStatus"
                  :disabled="isLoading"
                  @button-clicked="createCustomerAndLoan"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup>
import BasePrimaryButton from "@/components/BasePrimaryButton.vue";
import { useStore } from "vuex";
import { Status } from "@/types";
import { computed } from "@vue/runtime-core";

/* eslint-disable  no-unused-vars */
/* eslint-disable  no-undef */

const store = useStore();

const isTitleNull = computed(() => props.title !== "");
const buttonText = computed(() => "Accept");
const loanRequestStatus = computed(
  () => store.state.loan.loanApplicationRequestStatus
);
const isLoading = computed(() => loanRequestStatus === Status.NORMAL);

const props = defineProps([
  "show",
  "title",
  "loan",
  "customer",
  "loanAccountForm",
]);

const emits = defineEmits(["handle-close", "alert-notification"]);

let newAccountForm = props.loanAccountForm.value;

const handleClose = () => {
  emits("handle-close");
};

const createCustomerAndLoan = () => {
  store
    .dispatch("loan/createCustomer", props.customer)
    .then((res) => {
      newAccountForm.accountHolderKey = res.data.data || res.data;
      newAccountForm.loanAmount = loan.totalLoanAmount;
      newAccountForm.maxLoanAmount = loan.totalLoanAmount;
      try {
        store
          .dispatch("loan/createLoanAccount", newAccountForm)
          .then((res) => {
            emits("alert-notification", "SUCCESS", res.data.message);
            handleClose();
          })
          .catch((e) => {
            if (e.status == 401)
              return emits(
                "alert-notification",
                loanRequestStatus,
                "Session expired, please login again"
              );
            emits("alert-notification", loanRequestStatus, e?.data?.message);
            handleClose();
          });
      } catch (e) {
        if (e.status == 401)
          return emits(
            "alert-notification",
            loanRequestStatus,
            "Session expired, please login again"
          );
        emits("alert-notification", loanRequestStatus, error?.data?.message);
        handleClose();
      }
    })
    .catch((error) => {
      if (error.status == 401)
        return emits(
          "alert-notification",
          loanRequestStatus,
          "Session expired, please login again"
        );
      emits("alert-notification", "ERROR", error?.data?.message);
    });

  // 22788623975
};
</script>
