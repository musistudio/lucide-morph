import { cp, mkdir, rm } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const typeRoot = path.join(root, "dist-types")

const copies = [
  ["index.d.ts", "packages/core/dist/index.d.ts"],
  ["react.d.ts", "packages/react/dist/index.d.ts"],
  ["vue.d.ts", "packages/vue/dist/index.d.ts"],
  ["webcomponent.d.ts", "packages/webcomponent/dist/index.d.ts"],
  ["morph", "packages/core/dist/morph"],
  ["runtime", "packages/core/dist/runtime"],
]

for (const [from, to] of copies) {
  const source = path.join(typeRoot, from)
  const destination = path.join(root, to)

  await mkdir(path.dirname(destination), { recursive: true })
  await cp(source, destination, { force: true, recursive: true })
}

await rm(typeRoot, { force: true, recursive: true })
