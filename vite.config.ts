import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "site",
    emptyOutDir: true,
  },
  server: {
    open: true,
  },
});
