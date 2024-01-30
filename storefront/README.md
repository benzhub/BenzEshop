
### install TailwindCSS

https://daisyui.com/docs/install/

1. Install daisyUI:
```bash
npm i -D daisyui@latest
```
2. Then add daisyUI to your tailwind.config.js files:
```bash
module.exports = {
  //...
  plugins: [require("daisyui")],
}
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

