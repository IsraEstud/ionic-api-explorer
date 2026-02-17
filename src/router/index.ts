import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const PokemonPage = () => import("../views/PokemonPage.vue");
const JokesPage = () => import("../views/JokesPage.vue");
const WeatherPage = () => import("../views/WeatherPage.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    redirect: "/folder/Inbox",
  },
  {
    path: "/folder/:id",
    component: () => import("../views/FolderPage.vue"),
  },
  {
    path: "/pokemon",
    component: PokemonPage,
  },
  {
    path: "/jokes",
    component: JokesPage,
  },
  {
    path: "/weather",
    component: WeatherPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
