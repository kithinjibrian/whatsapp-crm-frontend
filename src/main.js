import { createApp, markRaw } from "vue";
import App from "./App.vue";

//vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "@mdi/font/css/materialdesignicons.css";

//vue ruoter
import router from "./route/routes";

//pinia
import { createPinia } from "pinia";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const pinia = createPinia();

createApp(App).use(pinia).use(router).use(vuetify).mount("#app");
