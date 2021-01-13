import { createWebHistory, createRouter } from "vue-router";
import Typing from "../views/Typing";
import About from "../views/About";

const routes = [
  {
    path: "/",
    name: "Typing",
    component: Typing,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;