var assert = require('chai').assert;
import { JSDOM } from "jsdom";
import { CanvasController } from "./canvas";

const testDom = new JSDOM(
    '<html><head></head><body><canvas id="canvas" width="1024" height="1024"></body></html>'
);

let canvasElement = testDom.window.document.getElementById('canvas') as HTMLCanvasElement;

describe('constructor of CanvasObjectController accept canvas element as input', () => {
    it('should create new valid object', () => {
        let canvasController = new CanvasController(canvasElement);
        assert.equal(canvasController.width, 1024);
        assert.equal(canvasController.height, 1024);
    });
});

describe('Canvas Controller Behaviour', () => {
    let canvasController = new CanvasController(canvasElement);
    it('should draw single pixel successfully', () => {
        let before = canvasController.getPixel(0, 0);
        canvasController.draw({ x: 0, y: 0 });
        let after = canvasController.getPixel(0, 0);
        assert.equal(before[3], 0);
        assert.equal(after[3], 255);
    });
});

