import { spawn } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const viteBin = path.join(root, "node_modules", "vite", "bin", "vite.js")
const targets = ["core", "react", "vue", "webcomponent"]

function runViteBuild(target) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.execPath,
      [viteBin, "build", "--config", "vite.package.config.ts"],
      {
        cwd: root,
        env: {
          ...process.env,
          MORPH_PACKAGE_TARGET: target,
        },
        stdio: "inherit",
      },
    )

    child.on("error", reject)
    child.on("exit", (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`Package build failed for ${target} with exit code ${code}.`))
    })
  })
}

for (const target of targets) {
  await runViteBuild(target)
}
