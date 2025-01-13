import js from "@eslint/js";
import pluginVitest from "@vitest/eslint-plugin";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import pluginVue from "eslint-plugin-vue";

export default [
  {
    name: "app/files-to-lint",
    files: ["**/*.{js,mjs,jsx,vue}"]
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]
  },
  {
    name: "vue/multi-word-component-names",
    value: "off"
  },

  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],

  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"]
  },
  skipFormatting
];
