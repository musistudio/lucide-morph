import path from "node:path"
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const dirname = path.dirname(fileURLToPath(import.meta.url))
const corePackageName = "@musistudio/lucide-morph"

const packageTargets = {
  core: {
    entry: "src/index.ts",
    outDir: "packages/core/dist",
    external: [] as string[],
    preserveModules: true,
  },
  react: {
    entry: "src/react.tsx",
    outDir: "packages/react/dist",
    external: [corePackageName, "react", "react/jsx-runtime"],
    preserveModules: false,
  },
  vue: {
    entry: "src/vue.ts",
    outDir: "packages/vue/dist",
    external: [corePackageName, "vue"],
    preserveModules: false,
  },
  webcomponent: {
    entry: "src/webcomponent.ts",
    outDir: "packages/webcomponent/dist",
    external: [corePackageName],
    preserveModules: false,
  },
} as const

type PackageTarget = keyof typeof packageTargets

const targetName = (process.env.MORPH_PACKAGE_TARGET ?? "core") as PackageTarget
const target = packageTargets[targetName]

if (!target) {
  throw new Error(`Unknown MORPH_PACKAGE_TARGET: ${targetName}`)
}

const isExternal = (id: string) =>
  target.external.some(
    (dependency) => id === dependency || id.startsWith(`${dependency}/`),
  )

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
    minify: false,
    outDir: target.outDir,
    lib: {
      entry: path.resolve(dirname, target.entry),
      fileName: () => "index.js",
      formats: ["es"],
    },
    rollupOptions: {
      external: isExternal,
      output: {
        chunkFileNames: target.preserveModules ? "[name].js" : "chunks/[name].js",
        entryFileNames: target.preserveModules ? "[name].js" : "index.js",
        preserveModules: target.preserveModules,
        preserveModulesRoot: target.preserveModules
          ? path.resolve(dirname, "src")
          : undefined,
      },
      treeshake: {
        moduleSideEffects: false,
      },
    },
    sourcemap: true,
  },
})
