import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import "virtual:uno.css";
import "@unocss/reset/tailwind.css";

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedstate));

app.mount("#app");
