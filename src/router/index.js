import { createRouter, createWebHashHistory } from "vue-router";
import AddItem from "../views/AddItem.vue";
import RemoveItem from "../views/RemoveItem.vue";
import UpdateItem from "../views/UpdateItem.vue";
import SearchItem from "../views/SearchItem.vue";

const routes = [
  {
    path: "/",
    name: "AddItem",
    component: AddItem,
  },
  {
    path: "/RemoveItem",
    name: "RemoveItem",
    component: RemoveItem,
  },
  {
    path: "/UpdateItem",
    name: "UpdateItem",
    component: UpdateItem,
  },
  {
    path: "/SearchItem",
    name: "SearchItem",
    component: SearchItem,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
