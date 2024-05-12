import { createRouter, createWebHistory } from "vue-router";
import TodoView from "../views/TodoView.vue";
import PostView from "../views/PostView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "todo",
      component: TodoView,
    },
    {
      path: "/post",
      name: "post",
      component: PostView,
    },
  ],
});

export default router;
