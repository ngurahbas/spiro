const clearCanvas = (context, width, height) => {
    context.clearRect(0, 0, width, height);
}

const drawCircle = (context, x, y, r) => {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.stroke();
}

const drawDots = (context, revToDots, lastRev) => {
    let keyIt = revToDots.keys();
    let k1 = keyIt.next().value;

    context.beginPath();
    let result = keyIt.next();
    while (!result.done && result.value < lastRev) {
        let pos1 = revToDots.get(k1);
        let k2 = result.value;
        let pos2 = revToDots.get(k2);

        context.moveTo(pos1.x, pos1.y);
        context.lineTo(pos2.x, pos2.y);

        k1 = k2;
        result = keyIt.next();
    }

    context.stroke();
}

export {clearCanvas, drawCircle, drawDots};