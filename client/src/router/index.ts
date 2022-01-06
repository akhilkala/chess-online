import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import Game from "@/views/Game.vue";
import Room from "@/views/Room.vue";
import NotFound from "@/views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/game/:id",
    name: "Game",
    component: Game,
  },
  {
    path: "/room/:id",
    name: "Room",
    component: Room,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
