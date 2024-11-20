import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/guide",
      name: "guide",
      children: [
        {
          path: "",
          name: "guideList",
          component: () => import("@/views/GuideList.vue"),
        },
        {
          path: ":tourId",
          name: "tourDetail",
          component: () => import("@/views/TourDetail.vue"),
        },
      ],
    },
    {
      path: "/mypage",
      name: "myPage",
      component: () => import("@/views/MyPage.vue"),
    },
  ],
});

export default router;
