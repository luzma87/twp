module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:cypress/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'chai-friendly'
  ],
  rules: {
    "react/jsx-filename-extension": ["off"],
    "react/forbid-prop-types": ["off"],
    "no-unused-expressions": 0,
    "chai-friendly/no-unused-expressions": 2
  },
};
