import "./assets/main.css";

import en from "@/locales/en";
import ru from "@/locales/ru";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime"; //if using
import { createPinia } from "pinia";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";

dayjs.extend(relativeTime); //if using
dayjs.locale("en");

import App from "./App.vue";
import router from "./router";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    ru
  }
});

const app = createApp(App);
app.use(i18n);
app.provide("dayjs", dayjs);

const ui = import.meta.glob("./components/ui/*.{vue,js}", { eager: true });
Object.entries(ui).forEach(([path, definition]) => {
  const componentName = path.replace(/^\.\/components\/ui\/(.*)\.\w+$/, "$1");
  app.component(componentName, definition.default);
});

app.use(createPinia());
app.use(router);

app.mount("#app");
