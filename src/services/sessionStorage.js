import jwt from "vue-jwt-decode";

const setItem = (key, value) => {
  window.sessionStorage.setItem(key, value);
};

const getItem = (key) => {
  const item = window.sessionStorage.getItem(key);
  return item;
};

const decodeToken = () => {
  let decoded = getItem("token");
  decoded = jwt.decode(decoded);
  return decoded;
};

const removeItem = (key) => {
  window.sessionStorage.removeItem(key);
};

const clear = () => {
  window.sessionStorage.clear();
};

export default {
  setItem,
  getItem,
  decodeToken,
  removeItem,
  clear,
};
