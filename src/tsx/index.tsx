import * as React from "react";
import * as ReactDOM from "react-dom";

import { MainForm } from "./mainform";
import { SpiroCanvas } from "./spirocanvas";

ReactDOM.render(
    <MainForm staticCircleRadius={500} innerCircleRadius={230} innerCircleMidToPen={100}/>,
    document.getElementById("form-wrapper")
);

function animate(staticCircleRadius?: number, innerCircleRadius?: number, innerCircleMidToPen?: number) {
    ReactDOM.render(
        <SpiroCanvas staticCircleRadius={staticCircleRadius} 
            innerCircleRadius={innerCircleRadius} innerCircleMidToPen={innerCircleMidToPen}/>,
        document.getElementById("canvas-wrapper")
    );
}

animate(500, 230, 100);