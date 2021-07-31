import * as React from "react";
import * as ReactDOM from "react-dom";

import { MainForm } from "./mainform";
import { SpiroCanvas } from "./spirocanvas";

ReactDOM.render(
    <MainForm staticR={500} rotatingR={230} rotatingMidR={100}
        animateAction={animate} renderAction={render}/>,
    document.getElementById("form-wrapper")
);

function animate(staticCircleRadius?: number, innerCircleRadius?: number, innerCircleMidToPen?: number) {
    ReactDOM.render(
        <SpiroCanvas staticR={staticCircleRadius} 
            rotatingR={innerCircleRadius} rotatingMidR={innerCircleMidToPen}/>,
        document.getElementById("canvas-wrapper")
    );
}

function render(staticCircleRadius?: number, innerCircleRadius?: number, innerCircleMidToPen?: number) {
    ReactDOM.render(
        <SpiroCanvas staticR={staticCircleRadius} 
            rotatingR={innerCircleRadius} rotatingMidR={innerCircleMidToPen}/>,
        document.getElementById("canvas-wrapper")
    );
}