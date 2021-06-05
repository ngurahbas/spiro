import { Point } from "./data";

export interface CanvasReference {
    width: number;
    height: number;
    context: RenderingContext;
}

export class CanvasController implements CanvasReference{
    width: number;
    height: number;
    context: CanvasRenderingContext2D;

    get midX(): number {
        return this.width / 2;
    }

    get midY(): number {
        return this.height / 2;
    }

    constructor(element: HTMLCanvasElement) {
        this.width = element.width;
        this.height = element.height;
        this.context = element.getContext("2d");
    }

    draw(point: Point): void {
        this.context.beginPath();
        this.context.rect(point.x, point.y, 1, 1);
        this.context.fill();
    }

    getPixel(x: number, y: number): Uint8ClampedArray {
        return this.context.getImageData(x, y, 1, 1).data;
    }
}
