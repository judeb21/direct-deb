import * as ACTIONS from "@/store/mutation";
import { Status } from "@/types";
import SessionStorageService from "@/services/sessionStorage";
import { reactive, ref } from "vue";
import ProleanApiService from "@/services/axios";

const IS_USER_AUTHENTICATED = "IS_USER_AUTHENTICATED";

const state = () => ({
  status: Status,
  authRequestStatus: "",
  authenticatedUser: {},
  loginError: "",
});

// getters
const getters = {
  [IS_USER_AUTHENTICATED]: (state) => {
    return !!state.authenticatedUser.access_Token;
  },
  isLoggedIn: (state) => state.authRequestStatus === Status.SUCCESS,
};

// actions
const actions = {
  login({ commit }, loginCredentials) {
    return new Promise((resolve, reject) => {
      commit("clearErrors");
      commit(ACTIONS.lOGING_LOADING, Status.LOADING);
      ProleanApiService.postRequest("/gateway/login", loginCredentials)
        .then(({ data }) => {
          commit(ACTIONS.LOGGING_SUCCESS, data.data);
          resolve(data);
        })
        .catch(({ response }) => {
          commit(ACTIONS.LOGGING_ERROR, response.data.errors);
          reject(response);
        });
    });
  },

  logout({ commit }) {
    commit(ACTIONS.REMOVE_AUTH);
  },
};

// mutations
const mutations = {
  [ACTIONS.LOGGING_SUCCESS](state, payload) {
    state.authRequestStatus = Status.SUCCESS;
    state.authenticatedUser = payload;
    SessionStorageService.setItem("token", payload.access_Token);
  },
  [ACTIONS.LOGGING_ERROR](state, payload) {
    state.loginError = payload;
    state.authRequestStatus = Status.ERROR;
  },
  [ACTIONS.lOGING_LOADING](state) {
    state.loginError = "";
    state.authRequestStatus = Status.LOADING;
  },
  [ACTIONS.REMOVE_AUTH](state) {
    state.authenticatedUser = reactive({});
    state.authRequestStatus = ref("");
    SessionStorageService.removeItem("token");
    SessionStorageService.clear();
  },
  clearErrors() {
    state.loginError = "";
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
