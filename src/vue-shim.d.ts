declare module "vue" {
  export type Component = unknown

  export function computed<T>(getter: () => T): { readonly value: T }
  export function defineComponent(options: Record<string, unknown>): Component
  export function h(
    type: string | Component,
    props?: Record<string, unknown> | null,
    children?: unknown,
  ): unknown
  export function onBeforeUnmount(callback: () => void): void
  export function ref<T>(value: T): { value: T }
  export function watch(
    source: () => unknown,
    callback: () => void,
    options?: { immediate?: boolean },
  ): void
}
