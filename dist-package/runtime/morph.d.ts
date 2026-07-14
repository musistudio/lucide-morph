import type { MorphAsset, MorphLayerMode } from "../morph/types";
export type MorphIconState = "from" | "loading" | "to";
export type MorphIconPreset = string | MorphAsset;
export type MorphIconFrame = {
    id: string;
    d: string;
    opacity: number;
    mode: MorphLayerMode;
};
export type MorphIconSvgOptions = {
    color?: string;
    loading?: boolean;
    size?: number;
    strokeWidth?: number;
    title?: string;
};
export declare function hasLoadingMorph(asset: MorphAsset): boolean;
export declare function resolveMorphIconAsset(preset?: MorphIconPreset, asset?: MorphAsset): MorphAsset;
export declare function resolveMorphIconState(asset: MorphAsset, state: MorphIconState | undefined, active?: boolean): MorphIconState;
export declare function targetPositionForState(asset: MorphAsset, state: MorphIconState): 0 | 1 | 2;
export declare function progressToPosition(asset: MorphAsset, progress: number): number;
export declare function getMorphIconFrames(asset: MorphAsset, position: number): MorphIconFrame[];
export declare function getViewBoxCenter(viewBox: string): {
    x: number;
    y: number;
};
export declare function renderMorphIconSvg(asset: MorphAsset, position: number, { color, loading, size, strokeWidth, title, }?: MorphIconSvgOptions): string;
