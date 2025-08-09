// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // Hace que JSX cuente como "uso" de variables (evita 'motion is defined but never used')
      "react/jsx-uses-react": "off",            // innecesario con React 17+, pero no estorba
      "react/jsx-uses-vars": "warn",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Si te sobra algún import realmente no usado, te avisará en 'warn'
      "no-unused-vars": ["warn", { varsIgnorePattern: "^React$" }],
    },
  },
];
