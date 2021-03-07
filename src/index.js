import {sinByRev, cosByRev} from './math.js'
import {setForm, setData} from './binding.js'

var userInput = {
    inR: 9,
    outR: 17,
    mPos: 0.5,
};

const maxR = 200;
const midX = 250;
const midY = 250;

var calc_revToDot = new Map();
var calc_lastCalcInRev = 0;
var calc_lastCalcOutRev = 0;

const calc_revPerCycle = 1;
const calc_revInc = 0.01;
const calculateDots = () => {
    console.log("calculateDots");
    let inRev,outRev;
    let calcFinished = false;
    for (inRev = calc_lastCalcInRev; inRev <= (calc_lastCalcInRev + calc_revPerCycle); inRev += calc_revInc) {
        inRev = Math.round(inRev*100)/100;
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

const startCalculateDots = () => {
    calc_revToDot = new Map();
    calc_lastCalcInRev = 0;
    calc_lastCalcOutRev = 0;
    calculateDots();
};

const clearCanvas = (context) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

const drawCircle = (context, x, y, r) => {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.stroke();
}

const drawDots = (context, lastRev) => {
    let keyIt= calc_revToDot.keys();
    let k1 = keyIt.next().value;

    context.beginPath();
    let result = keyIt.next();
    while (!result.done && result.value < lastRev) {
        let pos1 = calc_revToDot.get(k1);
        let k2 = result.value;
        let pos2 = calc_revToDot.get(k2);

        context.moveTo(pos1.x, pos1.y);
        context.lineTo(pos2.x, pos2.y);

        k1 = k2;
        result = keyIt.next();
    }

    context.stroke();
}

const rps = 1;

var ctx;
var canvas;

var start;
var outRev = 0;
var inRev = 0;
const paint = (timeStamp) => {
    if (!start) {
        start = timeStamp;
    }

    let outR = maxR;

    let elTime = timeStamp - start;
    let roundEltime = Math.round(elTime);
    let inRev = rps * roundEltime / 1000;
    let outRev = inRev * (userInput.inR / userInput.outR);

    let radiusRatio = userInput.inR / userInput.outR;
    let inR = maxR * radiusRatio;
    let cToC = outR - inR;
    let inX = midX + cToC * sinByRev(-outRev);
    let inY = midY - cToC * cosByRev(-outRev);

    let mRadius = inR * userInput.mPos;
    let markerX = inX + mRadius * sinByRev(inRev);
    let markerY = inY - mRadius * cosByRev(inRev);

    clearCanvas(ctx);
    drawDots(ctx, inRev); 
    drawCircle(ctx, midX, midY, outR);
    drawCircle(ctx, inX, inY, inR);
    drawCircle(ctx, markerX, markerY, 4);
};

var intPaint;
const startOver = () => {
    start = null;
    intPaint = setInterval(() => { window.requestAnimationFrame(paint); }, 20);
};

window.onload = () => {
    document.forms.userInput.oninput = () => {
        setData(document.forms.userInput, userInput);
        
        clearInterval(intPaint);
        startOver();
        startCalculateDots();
    }
    setForm(document.forms.userInput, userInput);

    canvas = document.getElementById("drawingCanvas");
    ctx = canvas.getContext("2d");
    startOver();
    startCalculateDots();
};