import type { Component } from "vue";
import type { MorphAsset } from "./morph/types";
export { cloneAsset, getPresetById, morphPresets } from "./morph/presets";
export type { MorphAsset, MorphLayer, MorphLayerMode, MorphLoadingDesign, } from "./morph/types";
export type { MorphIconPreset, MorphIconState } from "./runtime/morph";
export declare const MorphIcon: Component;
export declare function getMorphIconPreset(id: string): MorphAsset;
export default MorphIcon;
