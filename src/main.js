import "./assets/main.css";

import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

const ui = import.meta.glob("./components/ui/*.{vue,js}", { eager: true });
Object.entries(ui).forEach(([path, definition]) => {
  const componentName = path.replace(/^\.\/components\/ui\/(.*)\.\w+$/, "$1");
  app.component(componentName, definition.default);
});

app.use(createPinia());
app.use(router);

app.mount("#app");
