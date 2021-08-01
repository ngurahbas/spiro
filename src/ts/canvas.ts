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
        let timing = 20;
        let speed = 0.001;

        let revTiming = speed * timing;
        let startTime: DOMHighResTimeStamp;
        let inRev = 0;
        let complete = false;
        let animate = (timeStamp: DOMHighResTimeStamp) => {
            clear(this.context, this.width, this.height);
            if (!startTime) {
                startTime = timeStamp;
            }
            //revolution calculation
            let elapsed = Math.round(timeStamp - startTime);
            if (inRev >= this.numOfRotation) {
                inRev = 0;
                complete = true;
            }
            inRev += speed * timing;

            //static part;
            drawCircle(this.context,
                { x: this.midX, y: this.midY, r: this.spiro.staticR },
                { fillStyle: null, strokeStyle: "#000000" })
            
        }

        animateInteval = setInterval(() => {
            window.requestAnimationFrame(animate);
        }, timing);
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
    if (fillAndStroke.fillStyle) {
        context.fill();
    }
    context.stroke();

    context.fillStyle = oldFillStyle;
    context.strokeStyle = oldStrokeStyle;
}

function clear(context: CanvasRenderingContext2D, width: number, height: number) {
    context.clearRect(0, 0, width, height);
}

function getPixel(context: CanvasRenderingContext2D, x: number, y: number): Uint8ClampedArray {
    return context.getImageData(x, y, 1, 1).data;
}