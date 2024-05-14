module.exports = {
  env: {
    browser: true,
    node: true, // Added node environment for Node.js
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [
    {
      files: ['.eslintrc.js', '.eslintrc.cjs'], // Corrected file extensions
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021, // Specified the ECMAScript version directly
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    indent: ['error', 2],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'no-var': 'error',
    'arrow-parens': ['error', 'always'],
    'no-unused-vars': 'error',
    'consistent-return': 'error',
    complexity: ['error', 10],
    // 'no-console': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
