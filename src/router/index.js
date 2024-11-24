import { createRouter, createWebHistory } from "vue-router";
import { useMemberStore } from "../stores/member";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/signin",
      name: "signin",
      component: () => import("@/views/SignIn.vue"),
    },
    {
      path: "/join",
      name: "join",
      component: () => import("@/views/Join.vue"),
    },
    {
      path: "/kakao",
      name: "loading",
      component: () => import("../views/Loading.vue"),
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
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "myReservation",
          component: () => import("@/views/MyReservation.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "review",
          name: "myReview",
          component: () => import("@/views/MyReview.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "tour",
          name: "myTour",
          component: () => import("@/views/MyTours.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/tour/add",
      name: "addTour",
      component: () => import("@/views/AddTour.vue"),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const memberStore = useMemberStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!memberStore.isLogin) {
      next({ name: "home" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
