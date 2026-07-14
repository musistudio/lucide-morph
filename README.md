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

Build the package before publishing:

```sh
npm run build:package
npm publish
```

The published package exposes one root preset entry and three framework-specific
subpath packages:

```txt
lucide-morph
lucide-morph/react
lucide-morph/vue
lucide-morph/webcomponent
```

The root entry contains all preset data and pure helpers:

```ts
import { getPresetById, morphPresets } from "lucide-morph"

console.log(morphPresets.length)
console.log(getPresetById("menu-x"))
console.log(getPresetById("collapse-sidebar-to-expand-inspector"))
```

### React

```tsx
import { MorphIcon } from "lucide-morph/react"

export function Example() {
  return (
    <MorphIcon
      preset="menu-x"
      active
      size={32}
      color="#FF5B00"
      title="Open menu"
    />
  )
}
```

### Vue

```vue
<script setup lang="ts">
import { MorphIcon } from "lucide-morph/vue"
</script>

<template>
  <MorphIcon preset="play-pause" state="loading" :size="32" color="#FF5B00" />
</template>
```

### Web Component

```ts
import { defineMorphIconElement } from "lucide-morph/webcomponent"

defineMorphIconElement()
```

```html
<lucide-morph preset="plus-check" active size="32" color="#FF5B00"></lucide-morph>
```

Every entry also exports `morphPresets`, `getPresetById`, `cloneAsset`, and the
shared `MorphAsset` types.

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

<PlayToPauseIcon state={iconState} />
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

## License

MIT
