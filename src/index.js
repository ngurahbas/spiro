import { sinByRev, cosByRev } from './math.js'
import { setForm, setData } from './binding.js'
import { clearCanvas, drawCircle, drawDots } from './canvas.js'

const userInput = {
    inR: 9,
    outR: 17,
    mPos: 0.7,
};

function point(x, y) {
    return {
        x: x,
        y: y
    };
}

function calculateMidInnerCircle(outMidPoint, inR, outR, outRev) {
    let cToC = outR - inR;
    let x = outMidPoint.x + cToC * sinByRev(-outRev);
    let y = outMidPoint.y - cToC * cosByRev(-outRev);

    return point(x, y);
}

function calculateMarkerPoint(inMidPoint, mRadius, inRev) {
    let x = inMidPoint.x + mRadius * sinByRev(inRev);
    let y = inMidPoint.y - mRadius * cosByRev(inRev);

    return point(x, y);
}

var intCalculateDots;
const startCalculateDots = (canvas) => {
    let outR = Math.min(canvas.width, canvas.height) / 2 - 1;
    let midPoint = point(canvas.width / 2, canvas.height / 2);
    let radiusRatio = userInput.inR / userInput.outR;
    let deltaRatio = userInput.inR / (userInput.outR - userInput.inR);
    let inR = outR * radiusRatio;
    let mRadius = inR * userInput.mPos;

    let calc_revToDot = new Map();
    let calc_lastCalcInRev = 0;
    let calc_lastCalcOutRev = 0;

    clearInterval(intCalculateDots)
    const calculateDots = () => {
        const calc_revPerCycle = 1;
        const calc_revInc = 0.01;

        let inRev, outRev;
        let calcFinished = false;
        for (inRev = calc_lastCalcInRev; inRev <= (calc_lastCalcInRev + calc_revPerCycle); inRev += calc_revInc) {
            inRev = Math.round(inRev * 100) / 100;
            outRev = inRev * deltaRatio;

            let inMidPoint = calculateMidInnerCircle(midPoint, inR, outR, outRev);

            let markerPoint = calculateMarkerPoint(inMidPoint, mRadius, inRev);

            calc_revToDot.set(inRev, markerPoint);
            if (inRev > 0 && inRev % 1 == 0 && outRev % 1 == 0) {
                calcFinished = true;
                break;
            }
        }
        calc_lastCalcInRev = inRev;
        calc_lastCalcOutRev = outRev;
        if (calcFinished) {
            clearInterval(intCalculateDots)
            console.log("calculateDots finished", inRev, outRev);
        }
    };

    calculateDots();
    intCalculateDots = setInterval(calculateDots, 5);
    return calc_revToDot;
};

const rps = 0.7;//rev per second of inner circle

var start;
var intPaint;
const startOver = (canvas, revToDots) => {
    let ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;

    const paint = (timeStamp) => {
        if (!start) {
            start = timeStamp;
        }

        let outR = Math.min(canvas.width, canvas.height) / 2 - 1;
        let midPoint = point(canvas.width / 2, canvas.height / 2);
        let radiusRatio = userInput.inR / userInput.outR;
        let deltaRatio = userInput.inR / (userInput.outR - userInput.inR);
        let inR = outR * radiusRatio;
        let mRadius = inR * userInput.mPos;

        let roundEltime = Math.round(timeStamp - start);
        let inRev = rps * roundEltime / 1000;
        let outRev = inRev * deltaRatio;

        let cToC = outR - inR;
        let inX = midPoint.x + cToC * sinByRev(-outRev);
        let inY = midPoint.y - cToC * cosByRev(-outRev);

        let markerX = inX + mRadius * sinByRev(inRev);
        let markerY = inY - mRadius * cosByRev(inRev);

        clearCanvas(ctx, canvas.width, canvas.height);
        drawDots(ctx, revToDots, inRev, "#000000");

        drawCircle(ctx, midPoint.x, midPoint.y, outR, "#006");
        drawCircle(ctx, inX, inY, inR, "#900", "rgba(153, 0, 0, 0.9)");
        drawCircle(ctx, markerX, markerY, 4, "#060");

        let oldStrokeStyle = ctx.strokeStyle;
        let oldLineDash = ctx.getLineDash();
        let oldLineWidth = ctx.lineWidth;

        ctx.strokeStyle = "#060";
        ctx.setLineDash([8, 8]);
        ctx.lineWidth = 2 * ctx.lineWidth;

        ctx.beginPath();
        ctx.moveTo(inX, inY);
        ctx.lineTo(markerX, markerY);
        ctx.stroke();

        ctx.strokeStyle = oldStrokeStyle;
        ctx.setLineDash(oldLineDash);
        ctx.lineWidth = oldLineWidth;
    };

    start = null;
    intPaint = setInterval(() => {
        window.requestAnimationFrame(paint);
    }, 20);
};

const exportImage = (format) => {
    let canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    let context = canvas.getContext("2d");
    context.lineWidth = 2 * context.lineWidth;

    let outR = Math.min(canvas.width, canvas.height) / 2 - 1;
    let midPoint = point(canvas.width / 2, canvas.height / 2);
    let radiusRatio = userInput.inR / userInput.outR;
    let deltaRatio = userInput.inR / (userInput.outR - userInput.inR);
    let inR = outR * radiusRatio;
    let mRadius = inR * userInput.mPos;

    let finished = false;
    let inRev = 0, outRev = 0;

    let inMidPoint = calculateMidInnerCircle(midPoint, inR, outR, outRev);
    let markerPoint = calculateMarkerPoint(inMidPoint, mRadius, inRev);

    if (format != 'PNG') {
        console.log('notPng');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    context.beginPath()
    do {
        inRev += 0.01;
        inRev = Math.round(inRev * 100) / 100;
        outRev = inRev * deltaRatio;

        context.moveTo(markerPoint.x, markerPoint.y);

        let inMidPoint = calculateMidInnerCircle(midPoint, inR, outR, outRev);
        markerPoint = calculateMarkerPoint(inMidPoint, mRadius, inRev);

        context.lineTo(markerPoint.x, markerPoint.y);

        inRev = Math.round(inRev * 100) / 100;
        outRev = inRev * deltaRatio;
    } while (inRev % 1 != 0 || outRev % 1 != 0);
    context.stroke()

    let image;
    if (format == "PNG") {
        image = canvas.toDataURL();
    } else if (format == "JPEG") {
        image = canvas.toDataURL('image/jpeg');
    }

    let a = document.createElement('a');
    a.href = image;
    a.download = 'spirograph_' + userInput.inR + '_' + userInput.outR + '_' + userInput.mPos
            + '.' + format.toLowerCase();
    document.body.appendChild(a);
    a.click();
    a.remove();
}

window.onload = () => {
    let canvas = document.getElementById("drawingCanvas");

    document.forms.userInput.oninput = () => {
        try {
            if (parseInt(document.forms.userInput.inR.value) >= parseInt(document.forms.userInput.outR.value)) {
                throw new Error("Inner R must be less than Outter R.");
            }

            if (parseInt(document.forms.userInput.inR.value) <= 0 ||
                parseInt(document.forms.userInput.outR.value) <= 0) {
                throw new Error("R value must be positive.")
            }

            setData(document.forms.userInput, userInput);
        } catch (e) {
            document.getElementById("errorSpan").textContent = e;
            return;
        }
        document.getElementById("errorSpan").textContent = " ";

        clearInterval(intPaint);

        let revToDots = startCalculateDots(canvas);
        startOver(canvas, revToDots);
    }

    document.forms.userInput.expPng.onclick = () => { exportImage("PNG"); };
    document.forms.userInput.expJpg.onclick = () => { exportImage("JPEG"); };

    setForm(document.forms.userInput, userInput);

    let revToDots = startCalculateDots(canvas);
    startOver(canvas, revToDots);
};
