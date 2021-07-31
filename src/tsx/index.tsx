import * as React from "react";
import * as ReactDOM from "react-dom";
import { Spiro } from "../ts/data";

import { MainForm } from "./mainform";
import { SpiroCanvas } from "./spirocanvas";

ReactDOM.render(
    <MainForm staticR={500} rotatingR={250} rotatingMidR={100}
        animateAction={animate} renderAction={render} />,
    document.getElementById("form-wrapper")
);

function animate(spiro: Spiro) {
    ReactDOM.render(
        <SpiroCanvas staticR={spiro.staticR}
            rotatingR={spiro.rotatingR} rotatingMidR={spiro.rotatingMidR}
            canvasWidth={spiro.canvasWidth} />,
        document.getElementById("canvas-wrapper")
    );
}

function render(spiro: Spiro) {
    ReactDOM.render(
        <SpiroCanvas staticR={spiro.staticR}
            rotatingR={spiro.rotatingR} rotatingMidR={spiro.rotatingMidR}
            canvasWidth={spiro.canvasWidth} />,
        document.getElementById("canvas-wrapper")
    );
}