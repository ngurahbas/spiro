import * as React from "react";
import * as ReactDOM from "react-dom";

import { MainForm } from "./app";

ReactDOM.render(
    <MainForm staticCircleRadius={4} />,
    document.getElementById("form-wrapper")
);