import { readFile } from "node:fs/promises"
import path from "node:path"
import { expect, test } from "@playwright/test"

const workspaceRoot = process.cwd()

async function readWorkspaceJson<T>(filePath: string) {
  return JSON.parse(
    await readFile(path.join(workspaceRoot, filePath), "utf8"),
  ) as T
}

async function readWorkspaceFile(filePath: string) {
  return readFile(path.join(workspaceRoot, filePath), "utf8")
}

test("publishes separated package dependency metadata", async () => {
  type PackageJson = {
    dependencies?: Record<string, string>
    peerDependencies?: Record<string, string>
    sideEffects?: boolean
  }

  const core = await readWorkspaceJson<PackageJson>("packages/core/package.json")
  const react = await readWorkspaceJson<PackageJson>(
    "packages/react/package.json",
  )
  const vue = await readWorkspaceJson<PackageJson>("packages/vue/package.json")
  const webComponent = await readWorkspaceJson<PackageJson>(
    "packages/webcomponent/package.json",
  )

  expect(core.sideEffects).toBe(false)
  expect(core.dependencies).toBeUndefined()
  expect(core.peerDependencies).toBeUndefined()

  expect(react.dependencies).toEqual({
    "@musistudio/lucide-morph": "1.0.0",
  })
  expect(react.peerDependencies).toEqual({ react: ">=18" })

  expect(vue.dependencies).toEqual({
    "@musistudio/lucide-morph": "1.0.0",
  })
  expect(vue.peerDependencies).toEqual({ vue: ">=3.3" })

  expect(webComponent.dependencies).toEqual({
    "@musistudio/lucide-morph": "1.0.0",
  })
  expect(webComponent.peerDependencies).toBeUndefined()
})

test("builds tree-shakeable framework package outputs", async () => {
  const coreIndex = await readWorkspaceFile("packages/core/dist/index.js")
  const reactEntry = await readWorkspaceFile("packages/react/dist/index.js")
  const vueEntry = await readWorkspaceFile("packages/vue/dist/index.js")
  const webComponentEntry = await readWorkspaceFile(
    "packages/webcomponent/dist/index.js",
  )

  await expect(
    readWorkspaceFile("packages/core/dist/morph/presets.js"),
  ).resolves.toContain("morphPresets")
  await expect(
    readWorkspaceFile("packages/core/dist/runtime/morph.js"),
  ).resolves.toContain("getMorphIconFrames")

  expect(coreIndex).toContain("./morph/presets.js")
  expect(coreIndex).toContain("./runtime/morph.js")

  expect(reactEntry).toContain('from "react"')
  expect(reactEntry).toContain('from "react/jsx-runtime"')
  expect(reactEntry).toContain("@musistudio/lucide-morph/runtime/morph")
  expect(reactEntry).not.toContain('from "vue"')

  expect(vueEntry).toContain('from "vue"')
  expect(vueEntry).toContain("@musistudio/lucide-morph/runtime/morph")
  expect(vueEntry).not.toContain('from "react"')

  expect(webComponentEntry).toContain(
    "@musistudio/lucide-morph/runtime/morph",
  )
  expect(webComponentEntry).not.toContain('from "react"')
  expect(webComponentEntry).not.toContain('from "vue"')
})

test.describe("published npm package entries", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tests/fixtures/package.html")
  })

  test("loads preset helpers from the root entry", async ({ page }) => {
    const metadata = await page.locator("#package-metadata").textContent()
    if (!metadata) throw new Error("Package metadata did not render.")
    const parsed = JSON.parse(metadata) as {
      firstPresetId: string
      menuPresetName: string
      presetCount: number
    }

    expect(parsed.firstPresetId).toBe("menu-x")
    expect(parsed.menuPresetName).toBe("Menu to X")
    expect(parsed.presetCount).toBeGreaterThan(70)
  })

  test("renders and updates the React package component", async ({ page }) => {
    const icon = page.getByTestId("react-icon")
    await expect(icon).toHaveRole("img")
    await expect(icon).toHaveAttribute("aria-label", "React menu morph")
    await expect(icon.locator("svg")).toHaveAttribute("viewBox", "0 0 24 24")

    const initialPath = await icon.locator("path").first().getAttribute("d")
    await page.locator("#react-toggle").click()
    await expect
      .poll(() => icon.locator("path").first().getAttribute("d"))
      .not.toBe(initialPath)

    await page.locator("#react-loading").click()
    await expect(icon).toHaveAttribute("aria-busy", "true")
    await expect(icon.locator("animateTransform")).toHaveCount(1)
  })

  test("renders and updates the Vue package component", async ({ page }) => {
    const icon = page.getByRole("img", { name: "Vue play morph" })
    await expect(icon.locator("svg")).toHaveAttribute("viewBox", "0 0 24 24")

    const initialPath = await icon.locator("path").first().getAttribute("d")
    await page.locator("#vue-toggle").click()
    await expect
      .poll(() => icon.locator("path").first().getAttribute("d"))
      .not.toBe(initialPath)

    await page.locator("#vue-loading").click()
    await expect(icon).toHaveAttribute("aria-busy", "true")
    await expect(icon.locator("animateTransform")).toHaveCount(1)
  })

  test("renders and updates the Web Component package entry", async ({ page }) => {
    const icon = page.locator("#web-component-icon")
    await expect(icon).toHaveRole("img")
    await expect(icon).toHaveAttribute("aria-label", "Web Component plus morph")
    await expect(icon.locator("svg")).toHaveAttribute("viewBox", "0 0 24 24")

    const initialPath = await icon.locator("path").first().getAttribute("d")
    await icon.evaluate((element) => element.setAttribute("progress", "1"))
    await expect
      .poll(() => icon.locator("path").first().getAttribute("d"))
      .not.toBe(initialPath)
  })
})

test("gallery copy button copies npm package usage", async ({ context, page }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"])
  await page.goto("/")

  await page
    .locator('button[aria-label="Copy npm usage for Menu to X"]')
    .dispatchEvent("click")
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toContain('import { MorphIcon } from "@musistudio/lucide-morph-react"')
  const clipboard = await page.evaluate(() => navigator.clipboard.readText())

  expect(clipboard).toContain('preset="menu-x"')
  expect(clipboard).toContain("export function MenuToXIcon")
  expect(clipboard).toContain("size={180}")
  expect(clipboard).toContain('color="#232323"')
  expect(clipboard).toContain("strokeWidth={2}")
  expect(clipboard).toContain("duration={420}")
  expect(clipboard).not.toContain("const asset:")
})

test("hero switches and copies the selected framework usage", async ({
  context,
  page,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"])
  await page.goto("/")

  const codeCard = page.getByTestId("hero-code-card")
  const framework = codeCard.getByRole("group", { name: "Code framework" })
  const react = framework.getByRole("button", { name: "React" })
  const vue = framework.getByRole("button", { name: "Vue" })
  const webComponent = framework.getByRole("button", {
    name: "Web Component",
  })

  await expect(react).toHaveAttribute("aria-pressed", "true")

  await vue.click()
  await expect(vue).toHaveAttribute("aria-pressed", "true")
  await expect(codeCard).toContainText(
    "npm install @musistudio/lucide-morph-vue",
  )
  await expect(codeCard).not.toContainText("Component entry")
  await page.getByRole("button", { name: "Copy Vue npm usage" }).click()
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toContain('from "@musistudio/lucide-morph-vue"')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    '<script setup lang="ts">',
  )

  await webComponent.click()
  await expect(webComponent).toHaveAttribute("aria-pressed", "true")
  await expect(codeCard).toContainText(
    "npm install @musistudio/lucide-morph-webcomponent",
  )
  await page
    .getByRole("button", { name: "Copy Web Component npm usage" })
    .click()
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toContain('from "@musistudio/lucide-morph-webcomponent"')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    'document.createElement("lucide-morph")',
  )
})
