import { assert } from "chai";
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
        canvasController.drawPoint({ x: 0, y: 0 }, { fillStyle: 'rgba(0, 0, 0, 255)', strokeStyle: null });
        let after = canvasController.getPixel(0, 0);
        assert.equal(before[3], 0);
        assert.equal(after[3], 255);
    });
    it("should clear canvas successfully", () => {
        canvasController.clear();
        let after = canvasController.getPixel(0, 0);
        assert.equal(after[3], 0);
    });
    it("should draw circle successfully", () => {
        canvasController.drawCircle({ x: canvasController.midX, y: canvasController.midY, r: 100 },
            { fillStyle: 'rgba(255, 0, 0, 255)', strokeStyle: 'rgba(0, 0, 255, 255)' });
        let testPixel = canvasController.getPixel(canvasController.midX, canvasController.midY);
        assert.equal(testPixel[0], 255);
        assert.equal(testPixel[1], 0);
        assert.equal(testPixel[2], 0);
        assert.equal(testPixel[3], 255);
    });
});

