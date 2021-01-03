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

window.onload = () => {
    setForm();
};
