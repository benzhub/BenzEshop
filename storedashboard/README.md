# React + TypeScript + Vite

### 設定ESLint 
```bash
npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev
```


./vite.config.js
```jsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
```


./.eslintrc.cjs
```jsx
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
```

### 安裝 React Router Dom
```bash
npm install react-router-dom@6
```

### 安裝 TailwindCSS & 設定 prettier-plugin-tailwindcss
```bash
npm install -D tailwindcss postcss autoprefixer prettier prettier-plugin-tailwindcss
npx tailwindcss init -p
```
https://github.com/tailwindlabs/prettier-plugin-tailwindcss

./prettier.config.cjs
```javascript
module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.js',
}
```

./tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

./src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 安裝 DaisyUI
https://daisyui.com/docs/install/

Install daisyUI:
```bash
npm i -D daisyui@latest
```

Then add daisyUI to your tailwind.config.js files:
```javascript
module.exports = {
  //...
  plugins: [require("daisyui")],
}
```

### daisyUI themes
https://daisyui.com/docs/themes/

tailwind.config.js
```javascript
module.exports = {
  //...
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
}
```
./index.html
```html
<html data-theme="cupcake"></html>
```

### 設定React Query
https://tanstack.com/query/v3/docs/framework/react/installation
```bash
npm install @tanstack/react-query
npm install @tanstack/react-query-devtools
```


### 設定時間日期格式
```bash
npm install --save date-fns
```

### 設定React Hook Form
https://react-hook-form.com/
```bash
npm install react-hook-form
```

### 設定 zod
https://www.npmjs.com/package/zod
```bash
npm i zod
```

### 設定 Notifications
https://react-hot-toast.com/docs
```bash
npm install react-hot-toast
```