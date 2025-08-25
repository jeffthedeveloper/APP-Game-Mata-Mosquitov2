// eslint.config.js
export default [
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn"
    },
    languageOptions: {
      globals: {
        "browser": true,
        "es2021": true
      }
    }
  }
];