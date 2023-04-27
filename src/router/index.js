import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SessionStorageService from "@/services/sessionStorage";

const routes = [
  {
    path: "/",
    name: "Home",
    /* eslint-disable  no-unused-vars */
    redirect: (to) => {
      return { name: "Dashboard" };
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/login",
    name: "ClientLoginView",
    component: () => import("@/views/auth/ClientLoginView.vue"),
  },
  {
    path: "/admin-login",
    name: "AdminLoginView",
    component: () => import("@/views/auth/AdminLoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,

  //scroll to top of the page
  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0, behavior: "smooth" }), 300);
      })
    );
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = SessionStorageService.getItem("token");
    if (!token) {
      next({ name: "ClientLoginView" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
