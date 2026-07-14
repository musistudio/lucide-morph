import type { MorphAsset } from "./morph/types";
export { cloneAsset, getPresetById, morphPresets } from "./morph/presets";
export type { MorphAsset, MorphLayer, MorphLayerMode, MorphLoadingDesign, } from "./morph/types";
export type { MorphIconPreset, MorphIconState } from "./runtime/morph";
declare const BaseHTMLElement: {
    new (): HTMLElement;
    prototype: HTMLElement;
};
export declare class MorphIconElement extends BaseHTMLElement {
    static observedAttributes: string[];
    private animationFrame;
    private position;
    connectedCallback(): void;
    attributeChangedCallback(): void;
    disconnectedCallback(): void;
    get preset(): string;
    set preset(value: string);
    get active(): boolean;
    set active(value: boolean);
    private asset;
    private resolvedState;
    private targetPosition;
    private animateToTarget;
    private render;
}
export declare function defineMorphIconElement(tagName?: string): string;
export declare function getMorphIconPreset(id: string): MorphAsset;
