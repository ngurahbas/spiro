export interface Point {
    x: number;
    y: number;
    width?: number;
}

export interface Circle {
    x: number;
    y: number;
    r: number;
}

export interface Spiro {
    staticR: number;
    rotatingR: number;
    rotatingMidR: number;
    canvasWidth: number;
}

export interface RotatingCircle extends Circle {
    innerR: number;
}

export interface FillAndStroke {
    fillStyle: string | CanvasGradient | CanvasPattern;
    strokeStyle: string | CanvasGradient | CanvasPattern;
}