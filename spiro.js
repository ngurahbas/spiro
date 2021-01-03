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

const paint = (timeStamp) => {
    console.log(timeStamp);
};

var intPaint = setInterval(() => {window.requestAnimationFrame(paint);}, 200);

window.onload = () => {
    document.forms.userInput.oninput = () => {
        setData();
    }
    setForm();
};
