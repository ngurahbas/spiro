import * as React from "react";
import * as ReactDOM from "react-dom";
import { Spiro } from "../ts/data";

import { MainForm } from "./mainform";
import { SpiroCanvas } from "./spirocanvas";

ReactDOM.render(
    <MainForm staticR={500} rotatingR={250} rotatingMidR={100}
        canvasWidth={2048} animateAction={animate} renderAction={render} />,
    document.getElementById("form-wrapper")
);

function animate(spiro: Spiro) {

}

function render(spiro: Spiro) {

}