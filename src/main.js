import "./assets/main.css";

import en from "@/locales/en";
import ru from "@/locales/ru";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";

let defaultLocale = import.meta.env.VITE_APP_DEFAULT_LOCALE;
if (!["en", "ru"].includes(defaultLocale)) {
  defaultLocale = "en";
}

dayjs.extend(relativeTime);
dayjs.locale(defaultLocale);

import App from "./App.vue";
import router from "./router";

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: "en",
  messages: {
    en,
    ru
  }
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(i18n);
app.provide("dayjs", dayjs);

const ui = import.meta.glob("./components/ui/*.{vue,js}", { eager: true });
Object.entries(ui).forEach(([path, definition]) => {
  const componentName = path.replace(/^\.\/components\/ui\/(.*)\.\w+$/, "$1");
  app.component(componentName, definition.default);
});

app.use(pinia);
app.use(router);

app.mount("#app");
