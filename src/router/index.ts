// Composables
import { createRouter, createWebHistory, RouterOptions } from "vue-router";

const routes: RouterOptions["routes"] = [
  {
    path: "/",
    redirect: "the-forge",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "the-forge",
        name: "the-forge",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "the-forge" */ "@/views/TheForge.vue"),
      },
      {
        path: "attribute-calculator",
        name: "attribute-calculator",
        component: () =>
          import(
            /* webpackChunkName: "attribute-calculator" */ "@/views/AttributeCalculator.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(
    process.env.MY_CONFIG === "production" ? "/ethereal-skies-wwyf/" : "/"
  ),
  routes,
});

export default router;
