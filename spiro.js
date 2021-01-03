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

const maxR = 200;
const midX = 250;
const midY = 250;
const rps = 0.1;

var ctx;
var canvas;

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

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const drawCircle = (ctx, x, y, r) => {
    ctx.arc(x, y, r, 0, Math.PI * 2);
}

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

    console.log(maxR * radiusRatio);
    console.log("x,y = ", inX, inY);

    clearCanvas();
    ctx.beginPath(); 
    drawCircle(ctx, midX, midY, outR);
    ctx.stroke();
    ctx.beginPath(); 
    drawCircle(ctx, inX, inY, inR);
    ctx.stroke();

};

var intPaint = setInterval(() => {window.requestAnimationFrame(paint);}, 1000);

window.onload = () => {
    document.forms.userInput.oninput = () => {
        setData();
    }
    setForm();

    canvas = document.getElementById("drawingCanvas");
    ctx = canvas.getContext("2d");

};
