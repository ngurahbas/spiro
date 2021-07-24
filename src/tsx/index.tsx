import * as React from "react";
import * as ReactDOM from "react-dom";

import { MainForm } from "./mainform";

ReactDOM.render(
    <MainForm staticCircleRadius={10}/>,
    document.getElementById("form-wrapper")
);