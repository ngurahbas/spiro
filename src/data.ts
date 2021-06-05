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