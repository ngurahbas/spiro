export interface Point {
    x: number;
    y: number;
}

export interface Circle {
    x: number;
    y: number;
    r: number;
}

export interface RotatingCircle extends Circle {
    innerR: number;
}

export interface FillAndStroke {
    fillStyle: string | CanvasGradient | CanvasPattern;
    strokeStyle: string | CanvasGradient | CanvasPattern;
}