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
        userInput[prop] = document.forms.userInput[prop].value;
    }
    console.log(userInput);
}

window.onload = () => {
    document.forms.userInput.oninput = () => {
        setData();
    }
    setForm();
};
