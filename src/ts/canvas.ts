import { Circle, FillAndStroke, Point, Spiro } from "./data";
import { gcd, lcm } from "./math";

export class CanvasController {
    width: number;
    height: number;
    context: CanvasRenderingContext2D;
    spiro: Spiro;
    numOfRotation: number;

    get midX(): number {
        return this.width / 2;
    }

    get midY(): number {
        return this.height / 2;
    }

    constructor(element: HTMLCanvasElement, spiro?: Spiro) {
        this.width = element.width;
        this.height = element.height;
        this.context = element.getContext("2d");
        this.spiro = spiro;

        this.numOfRotation = lcm(spiro.staticR, spiro.rotatingR) / gcd(spiro.staticR, spiro.rotatingR);
    }

    drawPoint(point: Point, fillAndStroke?: FillAndStroke): void {
        let oldFillStyle = this.context.fillStyle;
        let oldStrokeStyle = this.context.strokeStyle;

        if (fillAndStroke) {
            this.context.fillStyle = fillAndStroke.fillStyle;
            this.context.strokeStyle = fillAndStroke.strokeStyle;
        }

        this.context.beginPath();
        this.context.rect(point.x, point.y, 1, 1);
        this.context.fill();

        this.context.fillStyle = oldFillStyle;
        this.context.strokeStyle = oldStrokeStyle;
    }

    drawCircle(circle: Circle, fillAndStroke?: FillAndStroke): void {
        let oldFillStyle = this.context.fillStyle;
        let oldStrokeStyle = this.context.strokeStyle;

        if (fillAndStroke) {
            this.context.fillStyle = fillAndStroke.fillStyle;
            this.context.strokeStyle = fillAndStroke.strokeStyle;
        }

        this.context.beginPath();
        this.context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();

        this.context.fillStyle = oldFillStyle;
        this.context.strokeStyle = oldStrokeStyle;
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    getPixel(x: number, y: number): Uint8ClampedArray {
        return this.context.getImageData(x, y, 1, 1).data;
    }
}
