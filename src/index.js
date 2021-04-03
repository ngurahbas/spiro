import { sinByRev, cosByRev } from './math.js'
import { setForm, setData } from './binding.js'
import { clearCanvas, drawCircle, drawDots } from './canvas.js'

const userInput = {
    inR: 9,
    outR: 17,
    mPos: 0.5,
};

const startCalculateDots = (canvas) => {
    let maxR = Math.min(canvas.width, canvas.height) / 2;
    let midX = canvas.width / 2;
    let midY = canvas.height / 2;

    let calc_revToDot = new Map();
    let calc_lastCalcInRev = 0;
    let calc_lastCalcOutRev = 0;
    const calculateDots = () => {
        const calc_revPerCycle = 1;
        const calc_revInc = 0.01;

        let inRev, outRev;
        let calcFinished = false;
        for (inRev = calc_lastCalcInRev; inRev <= (calc_lastCalcInRev + calc_revPerCycle); inRev += calc_revInc) {
            inRev = Math.round(inRev * 100) / 100;
            outRev = inRev * (userInput.inR / userInput.outR);

            let radiusRatio = userInput.inR / userInput.outR;
            let inR = maxR * radiusRatio;
            let cToC = maxR - inR;
            let inX = midX + cToC * sinByRev(-outRev);
            let inY = midY - cToC * cosByRev(-outRev);

            let mRadius = inR * userInput.mPos;
            let markerX = inX + mRadius * sinByRev(inRev);
            let markerY = inY - mRadius * cosByRev(inRev);

            calc_revToDot.set(inRev, {
                x: markerX,
                y: markerY
            });
            if (inRev > 0 && inRev % 1 == 0 && outRev % 1 == 0) {
                calcFinished = true;
                break;
            }

        }
        calc_lastCalcInRev = inRev;
        calc_lastCalcOutRev = outRev;
        if (!calcFinished) {
            setTimeout(calculateDots, 5);
        }
    };

    calculateDots();
    return calc_revToDot;
};

const rps = 1;

var start;
var intPaint;
const startOver = (canvas, revToDots) => {
    let ctx = canvas.getContext("2d");

    const paint = (timeStamp) => {
        if (!start) {
            start = timeStamp;
        }

        let outR = Math.min(canvas.width, canvas.height) / 2;
        let midX = canvas.width / 2;
        let midY = canvas.height / 2;

        let roundEltime = Math.round(timeStamp - start);
        let inRev = rps * roundEltime / 1000;
        let outRev = inRev * (userInput.inR / userInput.outR);

        let radiusRatio = userInput.inR / userInput.outR;
        let inR = outR * radiusRatio;
        let cToC = outR - inR;
        let inX = midX + cToC * sinByRev(-outRev);
        let inY = midY - cToC * cosByRev(-outRev);

        let mRadius = inR * userInput.mPos;
        let markerX = inX + mRadius * sinByRev(inRev);
        let markerY = inY - mRadius * cosByRev(inRev);

        clearCanvas(ctx, canvas.width, canvas.height);
        drawDots(ctx, revToDots, inRev);
        drawCircle(ctx, midX, midY, outR);
        drawCircle(ctx, inX, inY, inR);
        drawCircle(ctx, markerX, markerY, 4);
    };

    start = null;
    intPaint = setInterval(() => {
        window.requestAnimationFrame(paint);
    }, 20);
};

window.onload = () => {
    let canvas = document.getElementById("drawingCanvas");

    document.forms.userInput.oninput = () => {
        setData(document.forms.userInput, userInput);

        clearInterval(intPaint);

        let revToDots = startCalculateDots(canvas);
        startOver(canvas, revToDots);
    }
    setForm(document.forms.userInput, userInput);

    let revToDots = startCalculateDots(canvas);
    startOver(canvas, revToDots);
};
