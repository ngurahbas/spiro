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
    console.log(userInput);
}

const maxR = 200;
const midX = 250;
const midY = 250;
const rpm = 0.2;

var ctx;
var canvas;

clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const drawCircle = (ctx, x, y, r) => {
    ctx.arc(x, y, r, 0, Math.PI * 2);
}

var start;
const paint = (timeStamp) => {
    if (!start) {
        start = timeStamp;
        console.log(timeStamp);
    }

    let ctx = document.getElementById("drawingCanvas").getContext("2d");
    let outR = maxR;
    

    ctx.beginPath();
    clearCanvas();
    drawCircle(ctx, midX, midY, outR);
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
