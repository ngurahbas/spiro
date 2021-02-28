const setForm = (form, data) => {
    for (let prop in data) {
        form[prop].value = data[prop];
    }
};

const setData = (form, data) => {
    for (let prop in data) {
        if (form[prop].value == "") {
            throw new Error("invalid input");
        }
        data[prop] = form[prop].value;
    }
}

export {setForm, setData}