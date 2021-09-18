import * as React from "react";
import { RefObject } from "react";
import * as ReactDOM from "react-dom";
import { Spiro } from "../ts/data";

import { MainForm } from "./mainform";
import { SpiroCanvas } from "./spirocanvas";

ReactDOM.render(
    <MainForm staticR={500} rotatingR={250} rotatingMidR={100}
        canvasWidth={2048} animateAction={animate} renderAction={render} />,
    document.getElementById("form-wrapper")
);


let spiroCanvas: RefObject<SpiroCanvas> = React.createRef();
ReactDOM.render(<SpiroCanvas canvasWidth={500} ref={spiroCanvas}/>, document.getElementById("canvas-wrapper"));

function animate(spiro: Spiro) {
    spiroCanvas.current.animateInCanvas(spiro);
}

function render(spiro: Spiro) {
    spiroCanvas.current.renderInCanvas(spiro);
}