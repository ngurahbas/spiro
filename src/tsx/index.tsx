import * as React from "react";
import * as ReactDOM from "react-dom";

import { MainForm } from "./mainform";

ReactDOM.render(
    <MainForm staticCircleRadius={500} innerCircleRadius={230} innerCircleMidToPen={100}/>,
    document.getElementById("form-wrapper")
);