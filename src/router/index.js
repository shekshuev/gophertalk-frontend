import AuthLayout from "@/pages/auth/Layout.vue";
import LoginPage from "@/pages/auth/Login.vue";
import RegisterPage from "@/pages/auth/Register.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("@/pages/main/Layout.vue"),
      redirect: { name: "feed" },
      children: [
        {
          path: "feed",
          name: "feed",
          component: () => import("@/pages/main/Feed.vue")
        },
        {
          path: "profile/:id(\\d+)",
          name: "profile",
          component: () => import("@/pages/main/Profile.vue")
        }
      ]
    },
    {
      path: "/auth",
      name: "auth",
      redirect: "/auth/login",
      component: AuthLayout,
      children: [
        {
          path: "register",
          name: "register",
          component: RegisterPage
        },
        {
          path: "login",
          name: "login",
          component: LoginPage
        }
      ]
    }
  ]
});

export default router;
