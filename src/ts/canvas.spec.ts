import { assert } from "chai";
import { JSDOM } from "jsdom";
import { CanvasController } from "./canvas";

const testDom = new JSDOM(
    '<html><head></head><body><canvas id="canvas" width="1024" height="1024"></body></html>'
);

let canvasElement = testDom.window.document.getElementById('canvas') as HTMLCanvasElement;

describe('constructor of CanvasObjectController accept canvas element as input', () => {
    it('should create new valid object', () => {
        let canvasController = new CanvasController(canvasElement,
            { staticR: 500, rotatingR: 300, rotatingMidR: 250, canvasWidth: 1024 });
        assert.equal(canvasController.spiro.canvasWidth, 1024);
    });
});
