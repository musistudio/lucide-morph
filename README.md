# Lucide Morph

Lucide Morph is a Vite + React editor and npm package for animated SVG icon
transitions. It includes preset morphs, Lucide icon pairing, SVG upload support,
and framework-ready runtime packages for React, Vue, and Web Components.

## Features

- Preview icon morph animations with editable duration, size, stroke width, and color.
- Preview async `from → loading → to` flows with a configurable loading hold.
- Start from 78 built-in Lucide-only presets with From → Loading → To transitions.
- Pair Lucide icons or upload custom SVGs.
- Install one npm package and use the same presets from React, Vue, or Web
  Components.

## npm package

Install the package together with the framework integration you use:

```sh
npm install @musistudio/lucide-morph
```

Use React 18 or newer for the React entry, or install Vue 3.3 or newer for the
Vue entry.

The published package exposes one root preset entry and three framework-specific
subpath packages:

```txt
@musistudio/lucide-morph
@musistudio/lucide-morph/react
@musistudio/lucide-morph/vue
@musistudio/lucide-morph/webcomponent
```

The root entry contains all preset data and pure helpers:

```ts
import {
  getPresetById,
  morphPresets,
  renderMorphIconSvg,
} from "@musistudio/lucide-morph"

console.log(morphPresets.length)
console.log(getPresetById("menu-x"))
console.log(getPresetById("collapse-sidebar-to-expand-inspector"))
```

### React

```tsx
import { useState } from "react"
import { MorphIcon } from "@musistudio/lucide-morph/react"

export function Example() {
  const [active, setActive] = useState(false)

  return (
    <button type="button" onClick={() => setActive((value) => !value)}>
      <MorphIcon
        preset="menu-x"
        active={active}
        size={32}
        color="#FF5B00"
        title={active ? "Close menu" : "Open menu"}
      />
    </button>
  )
}
```

The copy button on every preset card produces a ready-to-paste React wrapper
using this package entry. The copied component keeps the editor's current
`size`, `color`, `strokeWidth`, and `duration` values and exposes an `active`
prop so the application controls the transition:

```tsx
import { MorphIcon } from "@musistudio/lucide-morph/react"

export function MenuToXIcon({ active = false }: { active?: boolean }) {
  return <MorphIcon preset="menu-x" active={active} />
}
```

The Hero's Code card includes a React, Vue, and Web Component switch and shows
the package install command. The preview copy button sits directly to the right
of **Run preview** and copies npm-package code for the selected framework using
the current preset and editor settings.

### Vue

```vue
<script setup lang="ts">
import { ref } from "vue"
import { MorphIcon } from "@musistudio/lucide-morph/vue"

const active = ref(false)
</script>

<template>
  <button type="button" @click="active = !active">
    <MorphIcon
      preset="play-pause"
      :active="active"
      :size="32"
      color="#FF5B00"
      title="Toggle playback"
    />
  </button>
</template>
```

### Web Component

```ts
import { defineMorphIconElement } from "@musistudio/lucide-morph/webcomponent"

defineMorphIconElement()
```

```html
<lucide-morph preset="plus-check" active size="32" color="#FF5B00"></lucide-morph>
```

Every entry also exports `morphPresets`, `getPresetById`, `cloneAsset`, and the
shared `MorphAsset` types.

All three components accept the same runtime controls:

- `preset`: a preset id such as `"menu-x"`, or a preset object.
- `active`: maps `false` to the `from` frame and `true` to the `to` frame.
- `state`: explicitly controls `"from"`, `"loading"`, or `"to"` and takes
  precedence over `active`.
- `progress`: directly controls interpolation progress when provided.
- `size`, `color`, `strokeWidth`, and `duration`: visual and timing options.
- `title`: adds an accessible image label; without it the icon is decorative.

To build a release locally and inspect the files that will be published:

```sh
npm run build:package
npm pack --dry-run
```

## Async loading states

When loading mode is enabled, presets include `from`, `loading`, and `to` path
keyframes together, plus the loading loop direction and speed. Loading preview
and runtime usage require the complete three-state path set; there is no generic
spinner or cross-fade fallback.

Built-in presets use exact Lucide source geometry for every `from` and `to`
endpoint, converted to equivalent cubic commands only where path interpolation
requires it. Their loading scenes remain individually authored: Search retracts
its handle and opens its lens into `LoaderCircle`, Volume continues its sound
waves around the speaker, Sun retracts its rays into a circular core, and the
outlined Play icon opens into a stroke loader. Shared path utilities normalize
commands and never choose scene geometry.

Generated components accept a controlled `state` prop with `"from"`, `"loading"`,
or `"to"`. Keep the component in `loading` for the lifetime of the real async
operation, then move to `to` on success or back to `from` when it is cancelled or
fails. The editor's loading duration only simulates that wait during preview.

```tsx
import { useState } from "react"
import { MorphIcon } from "@musistudio/lucide-morph/react"

const [iconState, setIconState] = useState<"from" | "loading" | "to">("from")

async function play() {
  setIconState("loading")

  try {
    await startPlayback()
    setIconState("to")
  } catch {
    setIconState("from")
  }
}

<MorphIcon preset="play-pause" state={iconState} title="Playback state" />
```

## Examples

- [Live demo on GitHub Pages](https://musistudio.github.io/Lucide-Morph/)

## Getting Started

Install dependencies:

```sh
npm install
```

Start the development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

Preview a production build:

```sh
npm run preview
```

Run the npm package component tests:

```sh
npx playwright install chromium
npm test
```

The test command builds `dist-package` first, then loads the root, React, Vue,
and Web Component package exports in a real browser. It also verifies that the
preset gallery copies npm-package usage code.

## License

MIT
