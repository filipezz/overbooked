import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/Home.vue";
import Details from "../pages/Details.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/book/:id",
    name: "Detail",
    component: Details,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
