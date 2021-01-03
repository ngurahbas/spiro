var userInput = {
    inR: 1,
    outR: 2,
    mPos: 0.5,
};

const setForm = () => {
    for (let prop in userInput) {
        document.forms.userInput[prop].value = userInput[prop];
    }
};

const setData = () => {
    for (let prop in userInput) {
        if (document.forms.userInput[prop].value == "") {
            throw new Error("invalid input");
        }
        userInput[prop] = document.forms.userInput[prop].value;
    }
}

const sinByRev = (rev) => {
    let calRev = rev % 1;
    let angle = calRev * Math.PI * 2;
    return Math.sin(angle);
}

const cosByRev = (rev) => {
    let calRev = rev % 1;
    let angle = calRev * Math.PI * 2;
    return Math.cos(angle);
}

const maxR = 200;
const midX = 250;
const midY = 250;

var calc_revToDot = new Map();
var calc_lastCalcInRev = 0;
var calc_lastCalcOutRev = 0;

const calc_revPerCycle = 2;
const calc_revInc = 0.01;
const calculateDots = () => {
    let outRev;
    for (let inRev = calc_lastCalcInRev; inRev <= (calc_lastCalcInRev + calc_revPerCycle); inRev += calc_revInc) {
        inRev = Math.round(inRev*100)/100;
        outRev = inRev * (userInput.inR / userInput.outR);

        let radiusRatio = userInput.inR / userInput.outR;
        let inR = maxR * radiusRatio;
        let cToC = maxR - inR;
        let inX = midX + cToC * sinByRev(outRev);
        let inY = midY - cToC * cosByRev(outRev);

        let mRadius = inR * userInput.mPos;
        let markerX = inX + mRadius * sinByRev(inRev);
        let markerY = inY - mRadius * cosByRev(inRev);

        calc_revToDot.set(inRev, {
            x: markerX,
            y: markerY 
        });
        if (inRev > 0 && inRev % 1 == 0 && outRev % 1 == 0) {
            break;
        }

    }
    calc_lastCalcInRev = inRev;
    calc_lastCalcOutRev = outRev;
};

calculateDots();

const clearCanvas = (context) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

const drawCircle = (context, x, y, r) => {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
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
    let inX = midX + cToC * sinByRev(outRev);
    let inY = midY - cToC * cosByRev(outRev);

    let mRadius = inR * userInput.mPos;
    let markerX = inX + mRadius * sinByRev(inRev);
    let markerY = inY - mRadius * cosByRev(inRev);

    clearCanvas(ctx);
    drawCircle(ctx, midX, midY, outR);
    drawCircle(ctx, inX, inY, inR);
    drawCircle(ctx, markerX, markerY, 1);
};

var intPaint;
const startOver = () => {
    start = null;
    intPaint = setInterval(() => { window.requestAnimationFrame(paint); }, 20);
};

window.onload = () => {
    document.forms.userInput.oninput = () => {
        setData();
        clearInterval(intPaint);
        startOver();
    }
    setForm();

    canvas = document.getElementById("drawingCanvas");
    ctx = canvas.getContext("2d");
    startOver();

};
