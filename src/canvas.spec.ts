import assert = require("assert");
import { JSDOM } from "jsdom";
import { CanvasModel, getCanvasModel } from "./canvas";

const testDom = new JSDOM(
    '<html><head></head><body><canvas id="canvas" width="1024" height="1024"></body></html>'
);

let canvasElement = testDom.window.document.getElementById('canvas') as HTMLCanvasElement;

describe("Getting model form Canvas Element", () => {
    it("should return CanvasModel", () => {
        let canvasModel = getCanvasModel(canvasElement);
        assert(canvasModel != null);
        assert(canvasModel.height == 1024);
        assert(canvasModel.width == 1024);
    });
});