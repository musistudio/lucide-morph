import type { MorphAsset, MorphLayer } from "./types";
export type PathValidation = {
    ok: true;
    template: string;
    numberCount: number;
} | {
    ok: false;
    reason: string;
    fromTemplate?: string;
    toTemplate?: string;
    fromCount?: number;
    toCount?: number;
};
export declare function getPathTemplate(path: string): string;
export declare function extractPathNumbers(path: string): number[];
export declare function validatePathPair(from: string, to: string): PathValidation;
export declare function createPathInterpolator(from: string, to: string): (progress: number) => string;
export declare function interpolatePath(layer: MorphLayer, progress: number): string;
export declare function interpolateOpacity(layer: MorphLayer, progress: number): number;
export declare function clamp(value: number, min?: number, max?: number): number;
export declare function getAssetDiagnostics(asset: MorphAsset): {
    layers: {
        id: string;
        direct: PathValidation;
        fromLoading: PathValidation | undefined;
        loadingTo: PathValidation | undefined;
    }[];
    errors: number;
    valid: boolean;
};
