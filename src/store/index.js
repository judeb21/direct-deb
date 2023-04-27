import { createStore, createLogger } from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
// import loan from "./modules/loan";
// import creditScore from "./modules/creditScore";
const debug = process.env.NODE_ENV !== "production";

const store = createStore({
  modules: {
    auth,
    // loan,
    // creditScore,
  },
  strict: debug,
  plugins: debug ? [createLogger(), createPersistedState()] : [],
});

export default store;
