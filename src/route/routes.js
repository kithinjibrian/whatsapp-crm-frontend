import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/Home.vue";
import Contacts from "../views/Contacts.vue";
import Contact from "../views/Contact.vue";
import Import from "../views/Import.vue";
import Lists from "../views/Lists.vue";
import List from "../views/List.vue";
import Groups from "../views/Groups.vue";
import Text from "../views/Text.vue";
import GroupText from "../views/GroupText.vue";
import Qr from "../views/Qr.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/contacts",
    name: "Contacts",
    component: Contacts,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/import",
    name: "Import",
    component: Import,
  },
  {
    path: "/lists",
    name: "Lists",
    component: Lists,
  },
  {
    path: "/list",
    name: "List",
    component: List,
  },
  {
    path: "/groups",
    name: "Groups",
    component: Groups,
  },
  {
    path: "/text",
    name: "Text",
    component: Text,
  },
  {
    path: "/grouptext",
    name: "GroupText",
    component: GroupText,
  },
  {
    path: "/qr",
    name: "Qr",
    component: Qr,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
