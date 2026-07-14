import { useState } from "react"
import { createRoot } from "react-dom/client"
import { createApp, h, ref } from "vue"
import {
  getPresetById,
  morphPresets,
} from "@musistudio/lucide-morph"
import {
  MorphIcon as ReactMorphIcon,
  type MorphIconState,
} from "@musistudio/lucide-morph/react"
import { MorphIcon as VueMorphIcon } from "@musistudio/lucide-morph/vue"
import { defineMorphIconElement } from "@musistudio/lucide-morph/webcomponent"

const metadata = document.querySelector<HTMLOutputElement>("#package-metadata")

if (metadata) {
  metadata.value = JSON.stringify({
    firstPresetId: morphPresets[0]?.id,
    menuPresetName: getPresetById("menu-x").name,
    presetCount: morphPresets.length,
  })
}

function ReactExample() {
  const [active, setActive] = useState(false)
  const [state, setState] = useState<MorphIconState | undefined>()

  return (
    <section aria-label="React package example">
      <button
        id="react-toggle"
        type="button"
        onClick={() => {
          setState(undefined)
          setActive((current) => !current)
        }}
      >
        Toggle React icon
      </button>
      <button id="react-loading" type="button" onClick={() => setState("loading")}>
        Load React icon
      </button>
      <ReactMorphIcon
        data-testid="react-icon"
        preset="menu-x"
        active={active}
        state={state}
        duration={1}
        size={40}
        color="#ff5b00"
        title="React menu morph"
      />
    </section>
  )
}

const reactRoot = document.querySelector("#react-example")
if (reactRoot) createRoot(reactRoot).render(<ReactExample />)

createApp({
  setup() {
    const active = ref(false)
    const state = ref<MorphIconState | undefined>()

    return () =>
      h("section", { "aria-label": "Vue package example" }, [
        h(
          "button",
          {
            id: "vue-toggle",
            type: "button",
            onClick: () => {
              state.value = undefined
              active.value = !active.value
            },
          },
          "Toggle Vue icon",
        ),
        h(
          "button",
          {
            id: "vue-loading",
            type: "button",
            onClick: () => {
              state.value = "loading"
            },
          },
          "Load Vue icon",
        ),
        h(VueMorphIcon, {
          active: active.value,
          color: "#ff5b00",
          duration: 1,
          preset: "play-pause",
          size: 40,
          state: state.value,
          title: "Vue play morph",
        }),
      ])
  },
}).mount("#vue-example")

defineMorphIconElement()
