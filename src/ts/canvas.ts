import { Circle, FillAndStroke, Point, Spiro } from "./data";
import { gcd, lcm } from "./math";

export class CanvasController {
    width: number;
    height: number;
    context: CanvasRenderingContext2D;
    spiro: Spiro;
    numOfRotation: number;
    points: { key: number, value: Point };// rev to Point map

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

        this.startAnimation();
    }

    startAnimation() {
        let animateInteval;
        function animate(timeStamp: DOMHighResTimeStamp) {
            console.log("timeStamp: " + timeStamp);
        }

        animateInteval = setInterval(() => {
            window.requestAnimationFrame(animate);
        }, 20);
    }

}

//encapsulate
function drawPoint(context: CanvasRenderingContext2D, point: Point, fillAndStroke?: FillAndStroke): void {
    let oldFillStyle = context.fillStyle;
    let oldStrokeStyle = context.strokeStyle;

    if (fillAndStroke) {
        context.fillStyle = fillAndStroke.fillStyle;
        context.strokeStyle = fillAndStroke.strokeStyle;
    }

    context.beginPath();
    context.rect(point.x, point.y, 1, 1);
    context.fill();

    context.fillStyle = oldFillStyle;
    context.strokeStyle = oldStrokeStyle;
}

function drawCircle(context: CanvasRenderingContext2D, circle: Circle, fillAndStroke?: FillAndStroke): void {
    let oldFillStyle = context.fillStyle;
    let oldStrokeStyle = context.strokeStyle;

    if (fillAndStroke) {
        context.fillStyle = fillAndStroke.fillStyle;
        context.strokeStyle = fillAndStroke.strokeStyle;
    }

    context.beginPath();
    context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
    context.fill();
    context.stroke();

    context.fillStyle = oldFillStyle;
    context.strokeStyle = oldStrokeStyle;
}

function clear(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, this.width, this.height);
}

function getPixel(context: CanvasRenderingContext2D, x: number, y: number): Uint8ClampedArray {
    return context.getImageData(x, y, 1, 1).data;
}