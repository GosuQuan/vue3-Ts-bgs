//对外暴露路由(常量路由:No auth)
export const constantRoute = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login", //命名路由
  },
  {
    path: "/",
    component: () => import("@/views/layout/index.vue"),
    name: "layout",
  },
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
  },
  {
    path: "/upload",
    component: () => import("@/views/upload/index.vue"),
    name: "upload",
  },
  {
    path: "/virtuallist",
    component: () => import("@/views/virtualList/index.vue"),
    name: "virtualList",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
  },
];
