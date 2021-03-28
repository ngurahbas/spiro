const clearCanvas = (context, width, height) => {
    context.clearRect(0, 0, width, height);
}

const drawCircle = (context, x, y, r) => {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.stroke();
}

export {clearCanvas, drawCircle};