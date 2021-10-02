import { Circle, FillAndStroke, Point, Spiro } from "./data";
import { cosByRev, gcd, lcm, sinByRev } from "./math";

export class CanvasController {

    readonly STEP_SIZE = 0.02;
    readonly SPEED = 0.001;

    context: CanvasRenderingContext2D;

    spiro: Spiro;

    graph: {
        currentRev: number,
        points: { rev: number, point: Point }[]
    };

    numOfRotation: number;

    animateInteval: ReturnType<typeof setInterval>;

    get midX(): number {
        return this.spiro.canvasWidth / 2;
    }

    get midY(): number {
        return this.spiro.canvasWidth / 2;
    }

    constructor(element: HTMLCanvasElement) {
        this.context = element.getContext("2d");
    }

    startPopulate() {
        console.log("startPopulate");
        this.graph = { currentRev: 0, points: [] };

        let calculateGraphInterval: ReturnType<typeof setInterval>;
        let calculateGraph = () => {
            let limit = 1000;
            let numOfCalcPoints = 0;

            while (numOfCalcPoints <= limit && this.graph.currentRev < this.numOfRotation) {
                let { markerPos } = calculatePosition(
                    this.spiro,
                    { x: this.midX, y: this.midY },
                    this.graph.currentRev
                );
                this.graph.points.push({ rev: this.graph.currentRev, point: markerPos });
                this.graph.currentRev += this.STEP_SIZE;

                numOfCalcPoints++;
            }

            if (this.graph.currentRev >= this.numOfRotation)  {
                console.log("startPopulate ended ", this.graph.currentRev, this.numOfRotation);
                clearInterval(calculateGraphInterval)
            }
        };

        clearInterval(calculateGraphInterval);
        calculateGraph();
        calculateGraphInterval = setInterval(calculateGraph, 1);
    }

    startAnimation(spiro: Spiro) {
        this.spiro = spiro;
        this.numOfRotation = lcm(spiro.staticR, spiro.rotatingR) / gcd(spiro.staticR, spiro.rotatingR);

        this.startPopulate();
        // this.animateInteval && clearInterval(this.animateInteval);

        let startTime: DOMHighResTimeStamp;
        let inRev = 0;
        let animate = (timeStamp: DOMHighResTimeStamp) => {
            clear(this.context, this.spiro.canvasWidth, this.spiro.canvasWidth);
            if (!startTime) {
                startTime = timeStamp;
            }
    
            let roundEltime = Math.round(timeStamp - startTime);
            inRev = this.SPEED * roundEltime;
            let { midPos, markerPos } = calculatePosition(
                spiro,
                { x: this.midX, y: this.midY },
                inRev
            );

            //static part;
            drawCircle(this.context,
                { x: this.midX, y: this.midY, r: this.spiro.staticR },
                { fillStyle: null, strokeStyle: "#000000" });

            //moving part;
            //rotating circle
            drawCircle(this.context,
                { x: midPos.x, y: midPos.y, r: this.spiro.rotatingR },
                { fillStyle: null, strokeStyle: "#000000" });
            //marker
            drawPoint(this.context, markerPos);

            drawGraph(this.context, this.graph.points, inRev);
            window.requestAnimationFrame(animate);
        }

        window.requestAnimationFrame(animate);
    }

    startRender(spiro: Spiro) {
        throw new Error("Method not implemented.");
    }
}

function calculatePosition(spiro: Spiro, mid: Point, inRev: number): { midPos: Point, markerPos: Point } {
    let outRev = inRev * (spiro.rotatingR / (spiro.staticR - spiro.rotatingR));
    let deltaR = spiro.staticR - spiro.rotatingR;

    let midX = mid.x + deltaR * sinByRev(-outRev);
    let midY = mid.y - deltaR * cosByRev(-outRev);

    let markerX = midX + spiro.rotatingMidR * sinByRev(inRev);
    let markerY = midY - spiro.rotatingMidR * cosByRev(inRev);

    return {
        midPos: { x: midX, y: midY },
        markerPos: { x: markerX, y: markerY }
    };
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
    context.rect(point.x, point.y, 4, 4);
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

function drawGraph(
    context: CanvasRenderingContext2D,
    points: { rev: number, point: Point }[],
    currentRev: number,
    fillAndStroke?: FillAndStroke): void {
    let oldFillStyle = context.fillStyle;
    let oldStrokeStyle = context.strokeStyle;

    if (fillAndStroke) {
        context.fillStyle = fillAndStroke.fillStyle;
        context.strokeStyle = fillAndStroke.strokeStyle;
    }


    context.beginPath();
    context.moveTo(points[0].point.x, points[0].point.y);
    for (let idx = 1; idx < (points.length - 1); idx++) {
        let point = points[idx];
        context.lineTo(point.point.x, point.point.y);
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
