import path from "node:path"
import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const dirname = path.dirname(fileURLToPath(import.meta.url))

const normalizeBasePath = (basePath: string) => {
  const withLeadingSlash = basePath.startsWith("/") ? basePath : `/${basePath}`
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`
}

export default defineConfig({
  base: normalizeBasePath(process.env.VITE_BASE_PATH ?? "/"),
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
})
