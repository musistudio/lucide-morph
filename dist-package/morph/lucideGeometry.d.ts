export declare function lucidePath(path: string): string;
export declare function lucideLine(x1: number, y1: number, x2: number, y2: number): string;
export declare function lucideCircle(cx: number, cy: number, radius: number): string;
export declare function lucideRoundedRect(x: number, y: number, width: number, height: number, rx: number, ry?: number): string;
export declare function lucidePolygon(points: string): string;
export declare function joinLucidePaths(...paths: string[]): string;
export declare function collapsedLucidePath(x?: number, y?: number): string;
