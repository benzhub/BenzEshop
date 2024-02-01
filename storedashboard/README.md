# React + TypeScript + Vite

### 安裝 TailwindCSS & 設定 prettier-plugin-tailwindcss
```bash
npm install -D tailwindcss postcss autoprefixer prettier prettier-plugin-tailwindcss
npx tailwindcss init -p
```
https://github.com/tailwindlabs/prettier-plugin-tailwindcss

./prettier.config.js
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
<html data-theme="cupcake"></html>