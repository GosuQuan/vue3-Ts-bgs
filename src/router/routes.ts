//对外暴露路由(常量路由:No auth)
export const constantRoute = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login", //命名路由
  },
  {
    path: "/",
    component: () => import("@/views/home/index.vue"),
    name: "layout",
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
  },
];