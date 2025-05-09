import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'

export default [
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      '@eslint/js': js,
      react: react,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
