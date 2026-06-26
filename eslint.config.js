import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig(globalIgnores(["dist"]), {
  files: ["**/*.{js,jsx}"],
  extends: [js.configs.recommended, reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
  languageOptions: {
    globals: globals.browser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
  rules: {
    // These are DX/fast-refresh hints, not correctness bugs. Keep them visible
    // as warnings (e.g. on-mount data fetch, context+hook in one file) without
    // failing the lint gate.
    "react-hooks/set-state-in-effect": "warn",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
  },
});
