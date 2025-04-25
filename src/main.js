import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import du router
import { createPinia } from 'pinia';

import "./assets/tailwind.css"; // Import Tailwind si nécessaire

const app = createApp(App);
const pinia = createPinia()

app.use(router);
app.use(pinia);
app.mount("#app");
