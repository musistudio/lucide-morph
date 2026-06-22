# Morph Icon

Morph Icon is a Vite + React editor for designing animated SVG icon transitions.
It includes preset morphs, Lucide icon pairing, SVG upload support, optional
OpenAI-compatible layer generation, and React component export.

## Features

- Preview icon morph animations with editable duration, size, stroke width, and color.
- Start from built-in presets such as menu-to-close, play-to-pause, plus-to-check, and arrow transitions.
- Pair Lucide icons or upload custom SVGs.
- Generate morph layers through an OpenAI-compatible chat completions endpoint.
- Export reusable path morph components for React, Vue, and Web Components.

## Examples

- [Live demo on GitHub Pages](https://musistudio.github.io/Morph-Icon/)

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

## OpenAI-Compatible Generation

The app can call an OpenAI-compatible chat completions API from the browser to
generate morph layers. You can configure these values in the UI, or provide
defaults through Vite environment variables:

```sh
VITE_OPENAI_API_KEY=your_api_key
VITE_OPENAI_BASE_URL=https://api.openai.com/v1
VITE_OPENAI_MODEL=gpt-5.4
```

Values prefixed with `VITE_` are exposed to client-side code. Do not bundle a
private API key into a public production deployment.

## License

MIT
