import path from "node:path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
  build: {
    copyPublicDir: false,
    emptyOutDir: true,
    outDir: "dist-package",
    lib: {
      entry: {
        index: path.resolve(dirname, "src/index.ts"),
        react: path.resolve(dirname, "src/react.tsx"),
        vue: path.resolve(dirname, "src/vue.ts"),
        webcomponent: path.resolve(dirname, "src/webcomponent.ts"),
      },
      fileName: (_format, entryName) => `${entryName}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "vue"],
      output: {
        chunkFileNames: "chunks/[name]-[hash].js",
      },
    },
    sourcemap: true,
  },
})
